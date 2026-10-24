import quizQuestions from './quizQuestions.js';

const flashcards = quizQuestions.map((question, index) => {
  const answer = question.answers[question.correct];
  const japanese = answer.match(/[\u3040-\u30ff\u3400-\u9fff]+/g)?.join(' ') || null;

  return {
    id: `flashcard-${index + 1}`,
    explanationId: question.explanationId,
    category: question.studyTopic,
    title: question.question,
    question: question.question,
    answer,
    hint: question.hint,
    explanation: question.explanation,
    japanese,
  };
});

export default flashcards;
