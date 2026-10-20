import { Router } from 'express';
import mongoose from 'mongoose';
import ContactMessage from '../models/ContactMessage.js';

const router = Router();
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post('/', async (req, res, next) => {
  const { name, email, message } = req.body ?? {};
  const normalizedName = typeof name === 'string' ? name.trim() : '';
  const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
  const normalizedMessage = typeof message === 'string' ? message.trim() : '';

  if (!normalizedName || normalizedName.length > 80) {
    return res.status(400).json({ message: 'Vui lòng nhập họ tên (tối đa 80 ký tự).' });
  }
  if (!emailPattern.test(normalizedEmail) || normalizedEmail.length > 254) {
    return res.status(400).json({ message: 'Vui lòng nhập địa chỉ email hợp lệ.' });
  }
  if (!normalizedMessage || normalizedMessage.length > 2000) {
    return res.status(400).json({ message: 'Nội dung cần có và không được vượt quá 2.000 ký tự.' });
  }
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ message: 'Dịch vụ liên hệ chưa kết nối cơ sở dữ liệu. Vui lòng thử lại sau.' });
  }

  try {
    await ContactMessage.create({
      name: normalizedName,
      email: normalizedEmail,
      message: normalizedMessage,
    });
    return res.status(201).json({ message: 'Đã gửi tin nhắn thành công. MannersGo sẽ sớm phản hồi bạn.' });
  } catch (error) {
    return next(error);
  }
});

export default router;
