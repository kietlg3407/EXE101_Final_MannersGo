import { Router } from 'express';
import mongoose from 'mongoose';
import Preorder from '../models/Preorder.js';

const router = Router();
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post('/', async (req, res, next) => {
  const { name, email, quantity, message } = req.body ?? {};
  const normalizedName = typeof name === 'string' ? name.trim() : '';
  const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
  const normalizedMessage = typeof message === 'string' ? message.trim() : '';
  const parsedQuantity = Number(quantity);

  if (!normalizedName || normalizedName.length > 80) {
    return res.status(400).json({ message: 'Vui lòng nhập họ tên (tối đa 80 ký tự).' });
  }

  if (!emailPattern.test(normalizedEmail) || normalizedEmail.length > 254) {
    return res.status(400).json({ message: 'Vui lòng nhập địa chỉ email hợp lệ.' });
  }

  if (typeof message !== 'undefined' && (typeof message !== 'string' || normalizedMessage.length > 500)) {
    return res.status(400).json({ message: 'Lời nhắn không được vượt quá 500 ký tự.' });
  }

  if (!Number.isInteger(parsedQuantity) || parsedQuantity < 1 || parsedQuantity > 20) {
    return res.status(400).json({ message: 'Số lượng bộ trải nghiệm phải từ 1 đến 20.' });
  }

  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ message: 'Dịch vụ đăng ký chưa kết nối cơ sở dữ liệu. Vui lòng thử lại sau.' });
  }

  try {
    const preorder = await Preorder.create({
      name: normalizedName,
      email: normalizedEmail,
      quantity: parsedQuantity,
      message: normalizedMessage,
    });

    return res.status(201).json({
      message: 'Đăng ký thành công! MannersGo sẽ sớm liên hệ với bạn.',
      preorder: { id: preorder.id, name: preorder.name, quantity: preorder.quantity },
    });
  } catch (error) {
    return next(error);
  }
});

export default router;
