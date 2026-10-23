import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, ArrowRight, Eye, EyeOff, LockKeyhole, Mail, UserRound,
} from 'lucide-react';

const apiBaseUrl = import.meta.env.PROD
  ? ''
  : (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function AuthPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === '/login';
  const googleButtonRef = useRef(null);
  const redirectTimerRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [message, setMessage] = useState('');
  const [formError, setFormError] = useState('');
  const [googleStatus, setGoogleStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailValue, setEmailValue] = useState(location.state?.email || '');
  const [passwordValue, setPasswordValue] = useState('');

  useEffect(() => {
    if (location.state?.email) setEmailValue(location.state.email);
    if (location.state?.registrationMessage) setMessage(location.state.registrationMessage);
  }, [location.state]);

  useEffect(() => () => window.clearTimeout(redirectTimerRef.current), []);

  const sendAuthRequest = useCallback(async (endpoint, payload) => {
    const response = await fetch(`${apiBaseUrl}/api/auth/${endpoint}`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const responseText = await response.text();
    let result;
    try {
      result = responseText ? JSON.parse(responseText) : {};
    } catch {
      throw new Error('Máy chủ trả về phản hồi không hợp lệ. Vui lòng thử lại.');
    }
    if (!response.ok) throw new Error(result.message || 'Không thể xác thực tài khoản.');
    return result;
  }, []);

  const handleGoogleCredential = useCallback(async (response) => {
    setIsSubmitting(true);
    setMessage('');
    setFormError('');
    try {
      await sendAuthRequest('google', { credential: response.credential });
      setMessage('Đăng nhập thành công. Đang chuyển về trang chủ...');
      window.dispatchEvent(new Event('mannersgo-auth-changed'));
      redirectTimerRef.current = window.setTimeout(() => navigate('/'), 1500);
    } catch (error) {
      setFormError(error.message || 'Không thể đăng nhập bằng Google. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  }, [navigate, sendAuthRequest]);

  useEffect(() => {
    if (!googleClientId) {
      setGoogleStatus('Cần cấu hình VITE_GOOGLE_CLIENT_ID để bật đăng nhập Google.');
      return undefined;
    }

    const container = googleButtonRef.current;
    if (!container) return undefined;

    let cancelled = false;
    const renderGoogleButton = () => {
      if (cancelled || !window.google?.accounts?.id || !googleButtonRef.current) return;
      window.google.accounts.id.initialize({
        client_id: googleClientId,
        callback: handleGoogleCredential,
      });
      const button = googleButtonRef.current;
      button.replaceChildren();
      window.google.accounts.id.renderButton(button, {
        type: 'standard',
        theme: 'outline',
        size: 'large',
        shape: 'pill',
        text: isLogin ? 'signin_with' : 'signup_with',
        locale: 'vi',
        width: Math.min(420, Math.max(button.clientWidth, 200)),
      });
      setGoogleStatus('');
    };

    let script = document.querySelector('script[data-google-identity]');
    if (!script) {
      script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client?hl=vi';
      script.async = true;
      script.defer = true;
      script.dataset.googleIdentity = 'true';
      script.addEventListener('load', renderGoogleButton, { once: true });
      script.addEventListener('error', () => {
        if (!cancelled) setGoogleStatus('Không tải được dịch vụ Google. Hãy kiểm tra kết nối mạng rồi thử lại.');
      }, { once: true });
      document.head.appendChild(script);
    } else if (window.google?.accounts?.id) {
      renderGoogleButton();
    } else {
      script.addEventListener('load', renderGoogleButton, { once: true });
    }

    return () => {
      cancelled = true;
    };
  }, [handleGoogleCredential, isLogin]);

  async function handleSubmit(event) {
    event.preventDefault();
    setFormError('');
    setMessage('');
    const form = new FormData(event.currentTarget);
    const name = String(form.get('name') || '').trim();
    const email = String(form.get('email') || '').trim();
    const password = String(form.get('password') || '');

    if (!emailPattern.test(email)) {
      setFormError('Vui lòng nhập email hợp lệ có ký tự @.');
      return;
    }
    if (!isLogin && password.length < 6) {
      setFormError('Mật khẩu phải có ít nhất 6 ký tự.');
      return;
    }
    if (!isLogin && password !== form.get('confirmPassword')) {
      setFormError('Mật khẩu xác nhận chưa khớp. Vui lòng kiểm tra lại.');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await sendAuthRequest(isLogin ? 'login' : 'register', {
        ...(isLogin ? {} : { name }),
        email,
        password,
      });
      if (isLogin) {
        setMessage(result.message || 'Đăng nhập thành công. Đang chuyển về trang chủ...');
        window.dispatchEvent(new Event('mannersgo-auth-changed'));
        redirectTimerRef.current = window.setTimeout(() => navigate('/'), 1500);
      } else {
        setPasswordValue('');
        const registrationMessage = result.message || 'Đăng ký thành công. Đang chuyển đến trang đăng nhập...';
        setMessage(registrationMessage);
        redirectTimerRef.current = window.setTimeout(() => {
          navigate('/login', {
            replace: true,
            state: { email, registrationMessage },
          });
        }, 1500);
      }
    } catch (error) {
      setFormError(error.message || 'Không thể kết nối máy chủ. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }

  }

  return (
    <main className="auth-screen">
      <div className={`auth-page${isLogin ? ' is-login' : ' is-register'}`}>
        <section className="auth-art" aria-label="Giới thiệu MannersGo">
          <Link to="/" className="auth-art-link" aria-label="MannersGo — về trang chủ">
            <img className="auth-illustration" src="/mannersgo/auth-artwork.png" alt="MannersGo — nhỏ thẻ lớn kỹ năng, tự tin chinh phục môi trường Nhật" />
          </Link>
        </section>

        <section className="auth-form-side">
          <div className="auth-switch">
            <Link className="auth-home-link" to="/">
              <ArrowLeft aria-hidden="true" size={17} />
              Quay lại trang chủ
            </Link>
            <div className="auth-switch-options">
              <span>{isLogin ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}</span>
              <Link className="button button-outline" to={isLogin ? '/register' : '/login'}>
                {isLogin ? 'Đăng ký' : 'Đăng nhập'}
              </Link>
            </div>
          </div>

          <div className="auth-form">
            <h2>{isLogin ? 'Chào mừng trở lại!' : 'Đăng ký tài khoản'}</h2>
            <p>
              {isLogin
                ? 'Đăng nhập để tiếp tục hành trình rèn luyện văn hoá công sở Nhật Bản cùng MannersGo!'
                : 'Bắt đầu hành trình rèn luyện kỹ năng văn hoá công sở Nhật Bản cùng MannersGo!'}
            </p>

            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <label className="auth-input">
                  <UserRound aria-hidden="true" />
                  <input autoComplete="name" maxLength={80} name="name" placeholder="Họ và tên" required />
                </label>
              )}

              <label className="auth-input">
                <Mail aria-hidden="true" />
                <input autoComplete="email" maxLength={254} name="email" type="email" placeholder="Email" required value={emailValue} onChange={(event) => setEmailValue(event.target.value)} />
              </label>

              <label className="auth-input">
                <LockKeyhole aria-hidden="true" />
                <input
                  autoComplete={isLogin ? 'current-password' : 'new-password'}
                  maxLength={128}
                  minLength={isLogin ? undefined : 6}
                  name="password"
                  placeholder="Mật khẩu"
                  required
                  type={showPassword ? 'text' : 'password'}
                  value={passwordValue}
                  onChange={(event) => setPasswordValue(event.target.value)}
                />
                <button
                  aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                  onClick={() => setShowPassword((shown) => !shown)}
                  type="button"
                >
                  {showPassword ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
                </button>
              </label>

              {!isLogin && (
                <label className="auth-input">
                  <LockKeyhole aria-hidden="true" />
                  <input
                    autoComplete="new-password"
                    maxLength={128}
                    minLength={6}
                    name="confirmPassword"
                    placeholder="Xác nhận mật khẩu"
                    required
                    type={showConfirmation ? 'text' : 'password'}
                  />
                  <button
                    aria-label={showConfirmation ? 'Ẩn mật khẩu xác nhận' : 'Hiện mật khẩu xác nhận'}
                    onClick={() => setShowConfirmation((shown) => !shown)}
                    type="button"
                  >
                    {showConfirmation ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
                  </button>
                </label>
              )}

              {!isLogin && (
                <label className="auth-terms">
                  <input name="terms" required type="checkbox" />
                  <span>Tôi đồng ý với <a href="#terms">Điều khoản dịch vụ</a> và <a href="#privacy">Chính sách bảo mật</a></span>
                </label>
              )}

              {formError && <p className="auth-message auth-message-error" role="alert">{formError}</p>}
              {message && <p className="auth-message auth-message-success" role="status">{message}</p>}

              <button className="button button-primary auth-submit" disabled={isSubmitting} type="submit">
                {isSubmitting ? 'Đang xử lý...' : isLogin ? 'Đăng nhập' : 'Đăng ký'}
                {!isSubmitting && <ArrowRight aria-hidden="true" size={19} />}
              </button>
            </form>

            <div className="auth-divider"><span>Hoặc {isLogin ? 'đăng nhập' : 'đăng ký'} bằng</span></div>
            {googleClientId ? (
              <div className="auth-google-mount" ref={googleButtonRef} aria-label="Tiếp tục với Google" />
            ) : (
              <button className="auth-google-unconfigured" disabled type="button">
                <span className="social-google" aria-hidden="true">G</span> Tiếp tục với Google
              </button>
            )}
            {googleStatus && <p className="auth-google-status" role="status">{googleStatus}</p>}
          </div>
        </section>
      </div>
    </main>
  );
}
