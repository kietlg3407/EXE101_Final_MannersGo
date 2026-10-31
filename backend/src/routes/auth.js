import { Router } from 'express';
import { OAuth2Client } from 'google-auth-library';
import {
  createHmac, randomBytes, scrypt as scryptCallback, timingSafeEqual,
} from 'node:crypto';
import { promisify } from 'node:util';
import mongoose from 'mongoose';
import User from '../models/User.js';

const router = Router();
const scrypt = promisify(scryptCallback);
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const sessionCookie = 'mannersgo_session';
const sessionDuration = 7 * 24 * 60 * 60;
const googleClient = new OAuth2Client();

function getAllowedOrigins() {
  const configuredOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean);
  if (process.env.NODE_ENV === 'production') return configuredOrigins;
  return [...new Set(configuredOrigins.flatMap((origin) => {
    if (origin.startsWith('http://localhost:')) {
      return [origin, origin.replace('http://localhost:', 'http://127.0.0.1:')];
    }
    if (origin.startsWith('http://127.0.0.1:')) {
      return [origin, origin.replace('http://127.0.0.1:', 'http://localhost:')];
    }
    return [origin];
  }))];
}

function requireAllowedOrigin(req, res, next) {
  const origin = req.get('origin');
  if (origin && !getAllowedOrigins().includes(origin)) {
    return res.status(403).json({ message: 'Nguồn truy cập không được phép.' });
  }
  return next();
}

function requireDatabase(res) {
  if (mongoose.connection.readyState === 1) return true;
  res.status(503).json({ message: 'Dịch vụ tài khoản chưa kết nối cơ sở dữ liệu.' });
  return false;
}

function getTokenSecret() {
  const secret = process.env.AUTH_TOKEN_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error('AUTH_TOKEN_SECRET must be configured with at least 32 characters.');
  }
  return secret;
}

function signToken(userId) {
  const now = Math.floor(Date.now() / 1000);
  const header = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
  const payload = Buffer.from(JSON.stringify({
    sub: userId,
    iat: now,
    exp: now + sessionDuration,
  })).toString('base64url');
  const content = `${header}.${payload}`;
  const signature = createHmac('sha256', getTokenSecret()).update(content).digest('base64url');
  return `${content}.${signature}`;
}

function verifyToken(token) {
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const [header, payload, signature] = parts;
  const expected = createHmac('sha256', getTokenSecret())
    .update(`${header}.${payload}`)
    .digest();
  const supplied = Buffer.from(signature, 'base64url');
  if (supplied.length !== expected.length || !timingSafeEqual(supplied, expected)) return null;

  try {
    const decodedHeader = JSON.parse(Buffer.from(header, 'base64url').toString());
    const decodedPayload = JSON.parse(Buffer.from(payload, 'base64url').toString());
    if (decodedHeader.alg !== 'HS256' || decodedPayload.exp <= Date.now() / 1000 || !decodedPayload.sub) return null;
    return decodedPayload;
  } catch {
    return null;
  }
}

function readSessionToken(req) {
  const cookieHeader = req.headers.cookie || '';
  const session = cookieHeader.split(';').map((part) => part.trim())
    .find((part) => part.startsWith(`${sessionCookie}=`));
  return session ? decodeURIComponent(session.slice(sessionCookie.length + 1)) : '';
}

function setSessionCookie(res, userId) {
  const secure = process.env.NODE_ENV === 'production';
  const sameSite = secure ? 'None' : 'Lax';
  res.setHeader('Set-Cookie', `${sessionCookie}=${encodeURIComponent(signToken(userId))}; HttpOnly; Path=/; Max-Age=${sessionDuration}; SameSite=${sameSite}${secure ? '; Secure' : ''}`);
}

function clearSessionCookie(res) {
  const secure = process.env.NODE_ENV === 'production';
  const sameSite = secure ? 'None' : 'Lax';
  res.setHeader('Set-Cookie', `${sessionCookie}=; HttpOnly; Path=/; Max-Age=0; SameSite=${sameSite}${secure ? '; Secure' : ''}`);
}

function publicUser(user) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone || '',
    hasPassword: Boolean(user.passwordHash),
  };
}

async function requireSession(req, res, next) {
  if (!requireDatabase(res)) return;
  let claims;
  try {
    claims = verifyToken(readSessionToken(req));
  } catch {
    return res.status(503).json({ message: 'Máy chủ chưa được cấu hình dịch vụ xác thực.' });
  }
  if (!claims) return res.status(401).json({ message: 'Bạn chưa đăng nhập.' });

  try {
    const user = await User.findById(claims.sub).select('+passwordHash');
    if (!user) return res.status(401).json({ message: 'Tài khoản không còn tồn tại.' });
    req.authUser = user;
    return next();
  } catch (error) {
    return next(error);
  }
}

async function hashPassword(password) {
  const salt = randomBytes(16).toString('hex');
  const hash = await scrypt(password, salt, 64);
  return `${salt}:${hash.toString('hex')}`;
}

async function verifyPassword(password, storedHash) {
  if (typeof storedHash !== 'string') return false;
  const [salt, hashHex] = storedHash.split(':');
  if (!salt || !hashHex || !/^[a-f0-9]{128}$/i.test(hashHex)) return false;
  const actual = await scrypt(password, salt, 64);
  const expected = Buffer.from(hashHex, 'hex');
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

function sendAuthenticatedUser(res, user, status = 200) {
  try {
    setSessionCookie(res, user.id);
    return res.status(status).json({ message: 'Đăng nhập thành công.', user: publicUser(user) });
  } catch (error) {
    return res.status(503).json({ message: 'Máy chủ chưa được cấu hình dịch vụ xác thực.' });
  }
}

router.post('/register', requireAllowedOrigin, async (req, res, next) => {
  const { name, email, password } = req.body ?? {};
  const normalizedName = typeof name === 'string' ? name.trim() : '';
  const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';

  if (!normalizedName || normalizedName.length > 80) {
    return res.status(400).json({ message: 'Vui lòng nhập họ tên (tối đa 80 ký tự).' });
  }
  if (!emailPattern.test(normalizedEmail) || normalizedEmail.length > 254) {
    return res.status(400).json({ message: 'Vui lòng nhập email hợp lệ có ký tự @.' });
  }
  if (typeof password !== 'string' || password.length < 6 || password.length > 128) {
    return res.status(400).json({ message: 'Mật khẩu phải có từ 6 đến 128 ký tự.' });
  }
  if (!requireDatabase(res)) return undefined;

  try {
    const user = await User.create({
      name: normalizedName,
      email: normalizedEmail,
      passwordHash: await hashPassword(password),
    });
    return res.status(201).json({
      message: 'Đăng ký thành công. Vui lòng đăng nhập.',
      user: publicUser(user),
    });
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ message: 'Email này đã được đăng ký.' });
    return next(error);
  }
});

router.post('/login', requireAllowedOrigin, async (req, res, next) => {
  const { email, password } = req.body ?? {};
  const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
  if (!emailPattern.test(normalizedEmail) || typeof password !== 'string' || !password || password.length > 128) {
    return res.status(400).json({ message: 'Vui lòng nhập email và mật khẩu hợp lệ.' });
  }
  if (!requireDatabase(res)) return undefined;

  try {
    const user = await User.findOne({ email: normalizedEmail }).select('+passwordHash');
    if (!user || !await verifyPassword(password, user.passwordHash)) {
      return res.status(401).json({ message: 'Email hoặc mật khẩu không chính xác.' });
    }
    return sendAuthenticatedUser(res, user);
  } catch (error) {
    return next(error);
  }
});

router.post('/google', requireAllowedOrigin, async (req, res, next) => {
  const { credential } = req.body ?? {};
  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId) return res.status(503).json({ message: 'Đăng nhập Google chưa được cấu hình trên máy chủ.' });
  if (typeof credential !== 'string' || !credential) {
    return res.status(400).json({ message: 'Không nhận được thông tin xác thực Google.' });
  }
  if (!requireDatabase(res)) return undefined;

  let payload;
  try {
    const ticket = await googleClient.verifyIdToken({ idToken: credential, audience: clientId });
    payload = ticket.getPayload();
  } catch (error) {
    if (error.response?.status === 400) {
      return res.status(401).json({ message: 'Thông tin xác thực Google không hợp lệ.' });
    }
    return next(error);
  }
  if (!payload?.sub || !payload.email || payload.email_verified !== true) {
    return res.status(401).json({ message: 'Tài khoản Google chưa xác minh email.' });
  }

  try {
    const email = payload.email.toLowerCase();
    let user = await User.findOne({ googleId: payload.sub });
    if (!user) {
      user = await User.findOne({ email });
      if (user) {
        user.googleId = payload.sub;
        if (!user.name && payload.name) user.name = payload.name;
        await user.save();
      } else {
        user = await User.create({
          name: payload.name?.trim() || email,
          email,
          googleId: payload.sub,
        });
      }
    }
    return sendAuthenticatedUser(res, user);
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ message: 'Tài khoản này đã được liên kết với người dùng khác.' });
    return next(error);
  }
});

router.get('/me', requireSession, (req, res) => (
  res.json({ user: publicUser(req.authUser) })
));

router.put('/me', requireAllowedOrigin, requireSession, async (req, res, next) => {
  const { name, phone, email } = req.body ?? {};
  const normalizedName = typeof name === 'string' ? name.trim() : '';
  const normalizedPhone = typeof phone === 'string' ? phone.trim() : '';

  if (!normalizedName || normalizedName.length > 80) {
    return res.status(400).json({ message: 'Họ tên không được để trống và tối đa 80 ký tự.' });
  }
  if (email !== undefined && (typeof email !== 'string' || email.trim().toLowerCase() !== req.authUser.email)) {
    return res.status(400).json({ message: 'Email đăng nhập không thể thay đổi.' });
  }
  if (normalizedPhone && !/^\+?[\d\s()-]{7,30}$/.test(normalizedPhone)) {
    return res.status(400).json({ message: 'Số điện thoại không hợp lệ.' });
  }

  req.authUser.name = normalizedName;
  req.authUser.phone = normalizedPhone;
  try {
    await req.authUser.save();
    return res.json({ message: 'Đã cập nhật hồ sơ.', user: publicUser(req.authUser) });
  } catch (error) {
    return next(error);
  }
});

router.post('/change-password', requireAllowedOrigin, requireSession, async (req, res, next) => {
  const { currentPassword, newPassword } = req.body ?? {};
  if (typeof newPassword !== 'string' || newPassword.length < 6 || newPassword.length > 128) {
    return res.status(400).json({ message: 'Mật khẩu mới phải có từ 6 đến 128 ký tự.' });
  }

  try {
    if (req.authUser.passwordHash
      && (typeof currentPassword !== 'string' || !await verifyPassword(currentPassword, req.authUser.passwordHash))) {
      return res.status(401).json({ message: 'Mật khẩu hiện tại không chính xác.' });
    }
    req.authUser.passwordHash = await hashPassword(newPassword);
    await req.authUser.save();
    return res.json({ message: 'Đã đổi mật khẩu thành công.' });
  } catch (error) {
    return next(error);
  }
});

router.post('/logout', requireAllowedOrigin, (_req, res) => {
  clearSessionCookie(res);
  return res.json({ message: 'Đã đăng xuất.' });
});

export {
  requireSession,
  readSessionToken,
  verifyToken,
  requireAllowedOrigin,
  requireDatabase,
};

export default router;
