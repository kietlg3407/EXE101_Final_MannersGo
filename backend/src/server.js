import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import preorderRouter from './routes/preorders.js';
import contactRouter from './routes/contact.js';
import scenarioRouter from './routes/scenarios.js';
import questionRouter from './routes/questions.js';
import authRouter from './routes/auth.js';
import interestRouter from './routes/interests.js';

const app = express();
const port = Number(process.env.PORT) || 5000;
const configuredOrigins = (process.env.CLIENT_ORIGIN || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);
const allowedOrigins = process.env.NODE_ENV === 'production'
  ? configuredOrigins
  : [...new Set(configuredOrigins.flatMap((origin) => {
    if (origin.startsWith('http://localhost:')) {
      return [origin, origin.replace('http://localhost:', 'http://127.0.0.1:')];
    }
    if (origin.startsWith('http://127.0.0.1:')) {
      return [origin, origin.replace('http://127.0.0.1:', 'http://localhost:')];
    }
    return [origin];
  }))];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
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
app.use('/api/auth', authRouter);
app.use('/api/interests', interestRouter);

app.use((req, res) => {
  res.status(404).json({ message: `Không tìm thấy endpoint ${req.method} ${req.path}.` });
});

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({ message: 'Đã xảy ra lỗi máy chủ. Vui lòng thử lại sau.' });
});

async function start() {
  if (process.env.NODE_ENV === 'production') {
    const missing = ['MONGODB_URI', 'AUTH_TOKEN_SECRET', 'CLIENT_ORIGIN']
      .filter((name) => !process.env[name]);
    if (missing.length) {
      throw new Error(`Missing required production environment variables: ${missing.join(', ')}`);
    }
    if (process.env.AUTH_TOKEN_SECRET.length < 32) {
      throw new Error('AUTH_TOKEN_SECRET must contain at least 32 characters.');
    }
  }

  if (!process.env.MONGODB_URI) {
    console.warn('MONGODB_URI is not set. Registration requests will be unavailable.');
  } else {
    await mongoose.connect(process.env.MONGODB_URI);
    console.info('Connected to MongoDB Atlas.');
  }

  app.listen(port, () => {
    console.info(`MannersGo API listening on port ${port}`);
  });
}

start().catch((error) => {
  console.error('Could not start MannersGo API:', error.message);
  process.exitCode = 1;
});
