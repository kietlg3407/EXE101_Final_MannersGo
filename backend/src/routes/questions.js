import { Router } from 'express';
import { questions } from '../data/questions.js';

const router = Router();

router.get('/', (req, res) => {
  const category = typeof req.query.category === 'string' ? req.query.category : '';
  const selected = category
    ? questions.filter((question) => question.category.toLowerCase() === category.toLowerCase())
    : questions;
  res.json({
    questions: selected.map(({ correctAnswer, ...publicQuestion }) => publicQuestion),
  });
});

router.get('/:id', (req, res) => {
  const question = questions.find((item) => item.id === req.params.id);
  if (!question) return res.status(404).json({ message: 'Không tìm thấy câu hỏi.' });
  const { correctAnswer, ...publicQuestion } = question;
  return res.json({ question: publicQuestion });
});

router.post('/:id/answer', (req, res) => {
  const question = questions.find((item) => item.id === req.params.id);
  if (!question) return res.status(404).json({ message: 'Không tìm thấy câu hỏi.' });

  const { answer } = req.body ?? {};
  if (answer !== null && (!Number.isInteger(answer) || answer < 0 || answer >= question.options.length)) {
    return res.status(400).json({ message: 'Lựa chọn trả lời không hợp lệ.' });
  }

  return res.json({
    isCorrect: answer === question.correctAnswer,
    correctAnswer: question.correctAnswer,
    explanation: question.explanation,
    japanesePhrase: question.japanesePhrase,
    pronunciation: question.pronunciation,
    translation: question.translation,
    etiquetteTip: question.etiquetteTip,
  });
});

export default router;
