import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import preorderRouter from './routes/preorders.js';
import contactRouter from './routes/contact.js';
import scenarioRouter from './routes/scenarios.js';
import questionRouter from './routes/questions.js';

const app = express();
const port = Number(process.env.PORT) || 5000;

app.use(cors({
  origin: process.env.CLIENT_ORIGIN?.split(',').map((origin) => origin.trim()) ?? 'http://localhost:5173',
}));
app.use(express.json({ limit: '10kb' }));

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

app.use('/api/preorders', preorderRouter);
app.use('/api/contact', contactRouter);
app.use('/api/scenarios', scenarioRouter);
app.use('/api/questions', questionRouter);

app.use((req, res) => {
  res.status(404).json({ message: `Không tìm thấy endpoint ${req.method} ${req.path}.` });
});

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ message: 'Đã xảy ra lỗi máy chủ. Vui lòng thử lại sau.' });
});

async function start() {
  if (process.env.MONGODB_URI) {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.info('Connected to MongoDB Atlas.');
    } catch (error) {
      console.error('Could not connect to MongoDB:', error.message);
    }
  } else {
    console.warn('MONGODB_URI is not set. Registration requests will be unavailable.');
  }

  app.listen(port, () => {
    console.info(`MannersGo API listening on http://localhost:${port}`);
  });
}

start();
