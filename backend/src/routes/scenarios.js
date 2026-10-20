import { Router } from 'express';
import { scenarios } from '../data/scenarios.js';

const router = Router();

router.get('/', (req, res) => {
  const category = typeof req.query.category === 'string' ? req.query.category.trim().toLowerCase() : '';
  const selected = category
    ? scenarios.filter((scenario) => scenario.category.toLowerCase() === category)
    : scenarios;
  res.json({ scenarios: selected });
});

router.get('/:id', (req, res) => {
  const scenario = scenarios.find((item) => item.id === req.params.id);
  if (!scenario) return res.status(404).json({ message: 'Không tìm thấy tình huống.' });
  return res.json({ scenario });
});

export default router;
