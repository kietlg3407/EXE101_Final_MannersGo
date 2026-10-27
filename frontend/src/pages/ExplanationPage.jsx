import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, BookOpen, CheckCircle2, Lightbulb } from 'lucide-react';
import Header from '../components/Header.jsx';
import detailedExplanations from '../data/detailedExplanations.js';
import quizQuestions from '../data/quizQuestions.js';

const styles = `
  .mg-explanation { --ex-navy: #102d68; --ex-pink: #ff3d75; min-height: 100vh; color: var(--ex-navy); background: #fffefa; font-family: 'Be Vietnam Pro', Arial, sans-serif; }
  .mg-explanation *, .mg-explanation *::before, .mg-explanation *::after { box-sizing: border-box; }
  .mg-explanation a { color: inherit; text-decoration: none; }
  .explanation-shell { width: min(100% - 36px, 1020px); margin: 0 auto; padding: 24px 0 42px; }
  .explanation-back { display: inline-flex; align-items: center; gap: 7px; margin-bottom: 16px; color: #526c96 !important; font-size: 13px; font-weight: 700; }
  .explanation-back:hover { color: var(--ex-pink) !important; }
  .explanation-hero { padding: clamp(20px, 4vw, 38px); border: 1px solid #e5edf7; border-radius: 22px; background: linear-gradient(120deg, #eff8ff, #fff3f6); }
  .explanation-eyebrow { display: inline-flex; align-items: center; gap: 7px; color: var(--ex-pink); font-size: 11px; font-weight: 800; letter-spacing: .04em; text-transform: uppercase; }
  .explanation-hero h1 { margin: 11px 0; font: 900 clamp(25px, 4vw, 38px)/1.2 Nunito, 'Be Vietnam Pro', sans-serif; }
  .explanation-question { margin: 0; color: #405a84; font-size: 14px; line-height: 1.8; }
  .explanation-content { display: grid; gap: 14px; margin-top: 16px; }
  .explanation-section { padding: clamp(17px, 3vw, 26px); border: 1px solid #e8edf5; border-radius: 18px; background: #fff; box-shadow: 0 5px 18px #19386b08; }
  .explanation-section h2 { display: flex; align-items: center; gap: 9px; margin: 0 0 13px; font: 900 18px/1.35 Nunito, 'Be Vietnam Pro', sans-serif; }
  .explanation-section h2 svg { flex: 0 0 auto; color: #ff5680; }
  .explanation-section p { margin: 0; color: #405a84; font-size: 13px; line-height: 1.8; white-space: pre-line; }
  .explanation-phrase { padding: 15px; border-left: 4px solid #ff6c91; border-radius: 0 12px 12px 0; background: #fff5f7; }
  .explanation-phrase strong { display: block; color: #17376d; font-size: 16px; line-height: 1.7; }
  .explanation-phrase span { display: block; margin-top: 5px; color: #697fa2; font-size: 12px; }
  .explanation-phrase p { margin-top: 7px; }
  .explanation-answer { display: grid; gap: 10px; }
  .explanation-answer-item { padding: 12px 14px; border: 1px solid #edf0f4; border-radius: 12px; background: #fbfcfe; }
  .explanation-answer-item.correct { border-color: #bfe8d2; background: #f1fbf5; }
  .explanation-answer-title { display: flex; align-items: center; gap: 8px; margin-bottom: 5px; color: #4b6285; font-size: 12px; font-weight: 800; }
  .explanation-answer-item.correct .explanation-answer-title { color: #218157; }
  .explanation-answer-item p { font-size: 12px; }
  .explanation-list { display: grid; gap: 9px; margin: 0; padding: 0; list-style: none; }
  .explanation-list li { position: relative; padding-left: 19px; color: #405a84; font-size: 13px; line-height: 1.75; }
  .explanation-list li::before { content: ''; width: 7px; height: 7px; position: absolute; top: .62em; left: 2px; border-radius: 50%; background: #ff6b91; }
  .explanation-source { color: #8292ac !important; font-size: 11px !important; }
  .explanation-not-found { width: min(100% - 36px, 680px); margin: 56px auto; padding: 28px; border: 1px solid #e8edf5; border-radius: 20px; background: white; text-align: center; }
  .explanation-not-found h1 { margin-top: 0; font: 900 26px Nunito, sans-serif; }
  .explanation-not-found p { color: #60789e; line-height: 1.7; }
  .explanation-not-found a { display: inline-flex; align-items: center; gap: 7px; color: var(--ex-pink); font-weight: 700; }
  @media (max-width: 600px) {
    .explanation-shell { width: calc(100% - 24px); padding-top: 16px; }
    .explanation-hero { border-radius: 16px; }
    .explanation-question { font-size: 12px; }
    .explanation-section { border-radius: 14px; }
    .explanation-section h2 { font-size: 16px; }
    .explanation-section p, .explanation-list li { font-size: 12px; }
    .explanation-phrase strong { font-size: 14px; }
  }
`;

export default function ExplanationPage() {
  const { id } = useParams();
  const detail = detailedExplanations.find((item) => item.id === id);
  const question = quizQuestions.find((item) => item.explanationId === id);

  if (!detail || !question) {
    return (
      <div className="mg-explanation">
        <style>{styles}</style>
        <Header />
        <main className="explanation-not-found">
          <h1>Không tìm thấy lời giải</h1>
          <p>Đường dẫn này chưa có lời giải chi tiết. Hãy quay lại quiz để chọn tình huống khác.</p>
          <Link to="/quiz"><ArrowLeft size={16} /> Quay lại quiz</Link>
        </main>
      </div>
    );
  }

  return (
    <div className="mg-explanation">
      <style>{styles}</style>
      <Header activePage="quiz" />
      <main className="explanation-shell">
        <Link className="explanation-back" to="/quiz"><ArrowLeft size={16} /> Quay lại quiz</Link>
        <section className="explanation-hero">
          <span className="explanation-eyebrow"><BookOpen size={16} /> Lời giải chi tiết</span>
          <h1>{detail.title}</h1>
          <p className="explanation-question">
            {question.question.match(/ \((.*)\)$/)?.[1]?.replace(/\)$/, '') || question.question}
          </p>
        </section>

        <div className="explanation-content">
          <section className="explanation-section">
            <h2><CheckCircle2 size={20} /> Câu gợi ý</h2>
            <div className="explanation-phrase">
              <strong>{detail.phrase}</strong>
              <p>{detail.phraseTranslation}</p>
            </div>
          </section>

          <section className="explanation-section">
            <h2><Lightbulb size={20} /> Điểm cần nhớ</h2>
            <p>{detail.point}</p>
          </section>

          <section className="explanation-section">
            <h2><BookOpen size={20} /> Phân tích từng lựa chọn</h2>
            <div className="explanation-answer">
              {detail.answerAnalysis.map(({ option, result, detail: analysis }) => (
                <article className={`explanation-answer-item${option === detail.correctAnswer ? ' correct' : ''}`} key={option}>
                  <div className="explanation-answer-title">
                    {option === detail.correctAnswer ? <CheckCircle2 size={17} /> : <span>{option}</span>}
                    {option === detail.correctAnswer ? `${option} · ${result}` : `${option} · ${result}`}
                  </div>
                  <p>{analysis}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="explanation-section">
            <h2>Quy tắc ứng xử</h2>
            <ul className="explanation-list">{detail.rules.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>

          <section className="explanation-section">
            <h2>Lỗi thường gặp</h2>
            <ul className="explanation-list">{detail.commonMistakes.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>

          <section className="explanation-section">
            <h2>Mở rộng thực tế</h2>
            <p>{detail.practicalTip}</p>
          </section>

          <section className="explanation-section">
            <h2>Nguồn tham khảo</h2>
            <p className="explanation-source">{detail.source}</p>
          </section>
        </div>
      </main>
    </div>
  );
}
