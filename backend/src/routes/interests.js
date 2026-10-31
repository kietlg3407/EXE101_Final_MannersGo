import { Router } from 'express';
import ProjectInterest from '../models/ProjectInterest.js';
import {
  requireAllowedOrigin,
  requireDatabase,
  requireSession,
  readSessionToken,
  verifyToken,
} from './auth.js';

const router = Router();
const DEFAULT_PROJECT = 'mannersgo-cards';
const BASELINE_COUNT = 48;

router.get('/', async (req, res, next) => {
  if (!requireDatabase(res)) return;

  try {
    const project = req.query.project || DEFAULT_PROJECT;
    const realCount = await ProjectInterest.countDocuments({ project });
    const count = BASELINE_COUNT + realCount;

    let isInterested = false;
    const token = readSessionToken(req);
    const claims = token ? verifyToken(token) : null;
    if (claims?.sub) {
      const existing = await ProjectInterest.findOne({ user: claims.sub, project });
      isInterested = Boolean(existing);
    }

    return res.json({
      project,
      count,
      isInterested,
      realCount,
    });
  } catch (error) {
    return next(error);
  }
});

router.post('/toggle', requireAllowedOrigin, requireSession, async (req, res, next) => {
  const project = req.body?.project || DEFAULT_PROJECT;
  const userId = req.authUser._id;

  try {
    const existing = await ProjectInterest.findOne({ user: userId, project });
    let isInterested = false;

    if (existing) {
      await ProjectInterest.deleteOne({ _id: existing._id });
      isInterested = false;
    } else {
      await ProjectInterest.create({ user: userId, project });
      isInterested = true;
    }

    const realCount = await ProjectInterest.countDocuments({ project });
    const count = BASELINE_COUNT + realCount;

    return res.json({
      message: isInterested
        ? 'Cảm ơn bạn đã quan tâm đến dự án MannersGo! ❤️'
        : 'Đã huỷ quan tâm dự án.',
      isInterested,
      count,
      realCount,
    });
  } catch (error) {
    return next(error);
  }
});

export default router;

