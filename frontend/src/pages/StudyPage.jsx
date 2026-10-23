import { useState } from 'react';
import {
  ArrowLeft, ArrowRight, BookOpen, Check, ChevronRight, Circle, Heart,
  Lightbulb, ListChecks, RotateCw, Search, Shuffle, Volume2,
  ChartNoAxesColumnIncreasing, IdCard, Puzzle, MessageCircle, Mail, UsersRound, Utensils,
} from 'lucide-react';
import Header from '../components/Header';
import flashcards from '../data/flashcards';

const topics = [
  { name: 'Chào hỏi và giao tiếp', icon: MessageCircle, description: 'Lời chào, cách xưng hô và giao tiếp lịch sự nơi công sở.' },
  { name: 'Danh thiếp', icon: IdCard, description: 'Cách trao, nhận và sắp xếp danh thiếp đúng phép lịch sự.' },
  { name: 'Email và công việc', icon: Mail, description: 'Email công việc và những nguyên tắc phối hợp hằng ngày.' },
  { name: 'Trong cuộc họp', icon: UsersRound, description: 'Ứng xử, báo cáo và trao đổi hiệu quả trong cuộc họp.' },
  { name: 'Quy tắc bàn ăn', icon: Utensils, description: 'Phép lịch sự khi dùng bữa và dự tiệc cùng đồng nghiệp.' },
];

const studyStyles = `
  .mg-study {
    --study-navy: #102e68;
    --study-pink: #ff477b;
    --study-blue: #45a8f7;
    --study-green: #5cbd95;
    min-height: 100vh;
    color: var(--study-navy);
    background: #fffefa;
    font-family: 'Be Vietnam Pro', Arial, sans-serif;
  }
  .mg-study *, .mg-study *::before, .mg-study *::after { box-sizing: border-box; }
  .mg-study button, .mg-study input { font: inherit; }
  .mg-study button { color: inherit; }
  .study-layout { min-height: calc(100vh - 70px); display: grid; grid-template-columns: 239px minmax(0, 1fr); }
  .study-sidebar { min-height: calc(100vh - 70px); position: relative; display: flex; flex-direction: column; padding: 26px 20px; border-right: 1px solid #eff1f4; background: #fff; }
  .study-side-links { display: grid; gap: 4px; }
  .study-side-link { width: 100%; min-height: 51px; display: flex; align-items: center; gap: 17px; padding: 0 20px; border: 0; border-radius: 15px; background: transparent; color: #60789e; font-size: 14px; font-weight: 600; text-align: left; text-decoration: none; cursor: pointer; }
  .study-side-link svg { flex: 0 0 25px; }
  .study-side-link.active { background: #ffe6ec; color: #f23067; }
  .study-side-link:disabled { opacity: .55; cursor: not-allowed; }
  .study-sidebar-promo { margin-top: auto; padding: 24px 4px 0; text-align: center; }
  .study-promo-blossom { position: absolute; left: 24px; color: #ffbac9; font-size: 25px; }
  .study-promo-blossom.top { top: 49%; }
  .study-promo-blossom.bottom { top: 60%; left: 15px; font-size: 32px; }
  .study-speech { width: fit-content; max-width: 150px; position: relative; z-index: 1; margin: 0 auto 5px; padding: 14px 19px; border-radius: 50%; background: #ffe3eb; color: #142e64; font-size: 14px; font-weight: 700; line-height: 1.5; transform: rotate(-5deg); }
  .study-speech::after { content: ''; position: absolute; right: 17px; bottom: -8px; border-top: 15px solid #ffe3eb; border-left: 6px solid transparent; transform: rotate(-23deg); }
  .study-sidebar-frog { width: 190px; height: 213px; display: block; margin: 0 auto; object-fit: contain; object-position: center; filter: drop-shadow(0 6px 3px #293f5c20); }
  .study-content { min-width: 0; width: min(100%, 1358px); display: grid; grid-template-columns: minmax(430px, 1fr) minmax(260px, 290px); align-content: start; gap: 18px; margin: 0 auto; padding: 14px 22px 28px 20px; }
  .study-main-column { min-width: 0; }
  .study-lesson-head { min-height: 91px; display: flex; align-items: center; gap: 14px; padding: 0 7px 12px; }
  .study-back-link { align-self: flex-start; position: absolute; margin-top: 4px; display: flex; align-items: center; gap: 6px; padding: 0; border: 0; background: transparent; color: #24416f; font-size: 11px; cursor: pointer; }
  .study-lesson-icon { width: 51px; height: 51px; flex: 0 0 51px; display: grid; place-items: center; margin-top: 14px; border-radius: 12px; background: linear-gradient(145deg, #ff89a5, #ff5680); color: white; }
  .study-lesson-title { min-width: 0; margin-top: 14px; }
  .study-lesson-title h1 { margin: 0 0 4px; font: 900 24px/1.1 Nunito, 'Be Vietnam Pro', sans-serif; letter-spacing: -.6px; }
  .study-lesson-title p { margin: 0; color: #506b98; font-size: 12px; line-height: 1.5; }
  .study-lesson-progress { width: 84px; flex: 0 0 84px; align-self: flex-start; margin: 20px 3px 0 auto; color: #a3264d; text-align: right; font-size: 12px; font-weight: 700; }
  .study-progress-track { height: 9px; overflow: hidden; margin-top: 5px; border-radius: 10px; background: #ffe7ec; }
  .study-progress-track span { height: 100%; display: block; border-radius: inherit; background: linear-gradient(90deg, #ff678d, #ff4778); transition: width .2s ease; }
  .study-card-panel { min-height: 344px; position: relative; padding: 22px 26px 12px; border: 1px solid #f0f1f3; border-radius: 19px; background: #fff; box-shadow: 0 6px 24px #19386b0b; }
  .study-card-counter { position: absolute; z-index: 3; top: 12px; left: 42px; padding: 8px 15px; border-radius: 22px; background: #ffe2e9; color: #fa376d; font-size: 12px; font-weight: 700; }
  .study-card-stage { height: clamp(175px, 19vw, 218px); position: relative; overflow: hidden; border-radius: 17px; background: #edf5ff; }
  .study-question-stage { display: grid; align-content: center; justify-items: center; gap: 12px; padding: 24px 60px; background: radial-gradient(circle at top right, #fff2f6, transparent 42%), linear-gradient(135deg, #eef6ff, #fffafa); text-align: center; }
  .study-question-label, .study-answer-label { color: #f04473; font-size: 11px; font-weight: 800; letter-spacing: .05em; text-transform: uppercase; }
  .study-question-stage p { max-width: 680px; margin: 0; color: #17376b; font-size: clamp(15px, 1.5vw, 19px); font-weight: 800; line-height: 1.55; }
  .study-card-arrow { width: 38px; height: 38px; position: absolute; z-index: 4; top: 50%; display: grid; place-items: center; border: 1px solid #ff7d9d; border-radius: 50%; background: #fff6f8; color: #ff4779; cursor: pointer; transform: translateY(-50%); transition: background .16s, transform .16s; }
  .study-card-arrow:hover { background: #ffe7ed; transform: translateY(-50%) scale(1.06); }
  .study-card-arrow.prev { left: 7px; }
  .study-card-arrow.next { right: 7px; }
  .study-card-copy { padding-top: 11px; text-align: center; }
  .study-card-copy h2 { margin: 4px auto 0; color: #102e68; font-size: 15px; font-weight: 800; line-height: 1.55; }
  .study-card-copy p { margin: 0; color: #526c98; font-size: 12px; }
  .study-audio { min-height: 39px; display: flex; align-items: center; gap: 9px; margin: 9px auto 0; padding: 0 16px; border: 1px solid #ffc2d0; border-radius: 22px; background: #fff1f4; color: #ed3767; font-size: 13px; font-weight: 700; cursor: pointer; }
  .study-audio:hover { background: #ffe7ed; }
  .study-explanation { min-height: 109px; position: relative; display: flex; align-items: flex-start; gap: 11px; overflow: hidden; margin-top: 18px; padding: 15px 18px; border: 1px solid #d7eaff; border-radius: 18px; background: #eff8ff; }
  .study-explanation-icon { color: #349bf4; }
  .study-explanation-copy { min-width: 0; max-width: calc(100% - 108px); }
  .study-explanation h3 { margin: 0 0 7px; font-size: 14px; font-weight: 800; }
  .study-explanation p { margin: 0; color: #294975; font-size: 11px; line-height: 1.6; }
  .study-teacher-frog { width: 90px; height: 92px; position: absolute; right: 8px; bottom: 12px; object-fit: contain; }
  .study-controls { display: grid; grid-template-columns: 1fr 1.25fr; gap: 16px; margin: 26px 48px 0; }
  .study-control { min-height: 45px; display: inline-flex; align-items: center; justify-content: center; gap: 8px; border: 1px solid #ff6b91; border-radius: 26px; background: #fff; color: #17376b; font-size: 13px; font-weight: 600; cursor: pointer; transition: transform .15s, box-shadow .15s, background .15s; }
  .study-control:hover { transform: translateY(-2px); box-shadow: 0 6px 15px #17376b12; }
  .study-control.primary { border-color: transparent; background: linear-gradient(100deg, #ff5683, #ff3e74); color: #fff; }
  .study-right-column { min-width: 0; padding-top: 0; }
  .study-panel { padding: 15px 17px; border: 1px solid #edf0f3; border-radius: 18px; background: #fff; box-shadow: 0 5px 18px #19386b08; }
  .study-progress-panel { min-height: 163px; }
  .study-list-panel { padding: 15px 9px 8px; }
  .study-panel h2 { margin: 0 0 12px; color: #102d68; font-size: 14px; font-weight: 800; }
  .study-progress-content { display: flex; align-items: center; gap: 14px; }
  .study-donut { width: 96px; height: 96px; flex: 0 0 96px; display: grid; place-items: center; border-radius: 50%; background: conic-gradient(from -10deg, #ff5680 0deg 242deg, #e7eef7 242deg 360deg); }
  .study-donut::before { content: ''; width: 77px; height: 77px; grid-area: 1 / 1; border-radius: 50%; background: white; }
  .study-donut-inner { z-index: 1; grid-area: 1 / 1; text-align: center; }
  .study-donut-inner strong { display: block; font: 900 17px/1.15 Nunito, sans-serif; }
  .study-donut-inner small { display: block; margin-top: 2px; color: #6780a7; font-size: 10px; }
  .study-status-list { flex: 1; display: grid; gap: 14px; }
  .study-status { display: grid; grid-template-columns: 19px 1fr auto; align-items: center; gap: 6px; font-size: 11px; white-space: nowrap; }
  .study-status strong { font-size: 12px; }
  .study-status.done svg { color: var(--study-green); fill: var(--study-green); stroke: white; }
  .study-status.learning svg { color: var(--study-pink); }
  .study-status.new svg { color: #d4dfef; }
  .study-list-panel h2 { padding: 0 8px; margin-bottom: 5px; }
  .study-card-search { height: 34px; display: flex; align-items: center; gap: 8px; margin: 0 8px 6px; padding: 0 10px; border: 1px solid #e5eaf2; border-radius: 18px; color: #6880a4; }
  .study-card-search input { width: 100%; min-width: 0; border: 0; outline: 0; background: transparent; color: var(--study-navy); font-size: 11px; }
  .study-empty-search { margin: 12px; color: #60789e; font-size: 12px; }
  .study-card-list { display: grid; }
  .study-list-item { min-height: 48px; display: grid; grid-template-columns: 30px minmax(0,1fr) 20px 13px; align-items: center; gap: 8px; padding: 0 9px; border: 0; border-top: 1px solid #e8edf3; background: transparent; color: #25436f; font-size: 11px; text-align: left; cursor: pointer; }
  .study-list-item:first-child { border-top: 0; }
  .study-list-item:hover { background: #fff7f9; }
  .study-list-item.active { border-top-color: transparent; border-radius: 14px; background: #ffe7ed; color: #fa3a6d; font-weight: 700; }
  .study-list-number { width: 28px; height: 28px; display: grid; place-items: center; border: 1px solid #e2e9f2; border-radius: 50%; background: #f8faff; color: #25436f; font-size: 12px; }
  .study-list-item.active .study-list-number { border-color: #ff6389; background: #ff6389; color: white; }
  .study-list-title { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .study-list-check { width: 20px; height: 20px; display: grid; place-items: center; border-radius: 50%; background: #61bd96; color: white; }
  .study-list-arrow { color: #7089ad; }
  .study-list-item.active .study-list-arrow { color: #f6386c; }
  .study-shuffle { width: 82%; min-height: 46px; display: flex; align-items: center; justify-content: center; gap: 8px; margin: 61px auto 0; border: 0; border-radius: 25px; background: #fff0f3; color: #fa376c; font-size: 13px; font-weight: 700; cursor: pointer; }
  .study-shuffle:hover { background: #ffe2e9; }
  .study-topic-chooser { grid-column: 1 / -1; padding: clamp(20px, 4vw, 48px); border: 1px solid #f0f1f3; border-radius: 22px; background: white; box-shadow: 0 8px 28px #19386b0b; }
  .study-topic-chooser h1 { margin: 0 0 8px; font: 900 clamp(24px, 3vw, 34px)/1.2 Nunito, 'Be Vietnam Pro', sans-serif; }
  .study-topic-chooser > p { margin: 0 0 26px; color: #60789e; line-height: 1.6; }
  .study-topic-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 230px), 1fr)); gap: 15px; }
  .study-topic-option { min-height: 155px; display: grid; grid-template-columns: 48px 1fr; align-content: start; gap: 4px 13px; padding: 20px; border: 1px solid #edf0f5; border-radius: 17px; background: #fffefa; color: var(--study-navy); text-align: left; cursor: pointer; transition: border-color .16s, transform .16s, box-shadow .16s; }
  .study-topic-option:hover { border-color: #ff9cb2; box-shadow: 0 8px 20px #fa376c14; transform: translateY(-2px); }
  .study-topic-option-icon { width: 46px; height: 46px; grid-row: span 2; display: grid; place-items: center; border-radius: 14px; background: #ffe6ec; color: #f23067; }
  .study-topic-option strong { align-self: center; font-size: 15px; }
  .study-topic-option small { grid-column: 2; color: #60789e; font-size: 12px; line-height: 1.55; }
  @media (max-width: 1120px) {
    .study-layout { grid-template-columns: 200px minmax(0, 1fr); }
    .study-sidebar { padding-inline: 14px; }
    .study-side-link { padding-inline: 14px; }
    .study-content { grid-template-columns: minmax(390px, 1fr) minmax(235px, 260px); gap: 12px; padding-inline: 13px; }
    .study-controls { margin-inline: 20px; }
    .study-list-item { grid-template-columns: 28px minmax(0,1fr) 18px 11px; gap: 5px; padding-inline: 6px; font-size: 10px; }
    .study-panel { padding-inline: 12px; }
    .study-list-panel { padding-inline: 7px; }
  }
  @media (max-width: 850px) {
    .study-layout { grid-template-columns: 70px minmax(0,1fr); }
    .study-sidebar { padding: 18px 8px; }
    .study-side-link { justify-content: center; min-height: 49px; gap: 0; padding: 0; font-size: 0; }
    .study-side-link svg { width: 23px; flex-basis: 23px; }
    .study-sidebar-promo { display: none; }
    .study-content { grid-template-columns: minmax(0,1fr) 240px; }
  }
  @media (max-width: 680px) {
    .study-layout { min-height: calc(100vh - 64px); display: block; }
    .study-sidebar { min-height: 0; position: sticky; z-index: 10; top: 64px; display: block; overflow-x: auto; padding: 7px 9px; border-right: 0; border-bottom: 1px solid #edf0f4; }
    .study-side-links { min-width: max-content; display: flex; gap: 6px; }
    .study-side-link { min-height: 38px; justify-content: flex-start; gap: 7px; padding: 0 11px; border-radius: 12px; font-size: 10px; white-space: nowrap; }
    .study-side-link svg { width: 16px; flex-basis: 16px; }
    .study-content { width: 100%; grid-template-columns: minmax(0,1fr); gap: 12px; padding: 10px 12px 24px; }
    .study-lesson-head { min-height: 77px; gap: 9px; padding: 0 2px 8px; }
    .study-back-link { font-size: 9px; }
    .study-lesson-icon { width: 43px; height: 43px; flex-basis: 43px; margin-top: 14px; }
    .study-lesson-icon svg { width: 24px; }
    .study-lesson-title h1 { font-size: 20px; }
    .study-lesson-title p { font-size: 9px; }
    .study-lesson-progress { width: 59px; flex-basis: 59px; margin-top: 21px; font-size: 10px; }
    .study-progress-track { height: 7px; }
    .study-card-panel { min-height: 0; padding: 21px 15px 11px; border-radius: 15px; }
    .study-card-counter { top: 10px; left: 24px; padding: 6px 11px; font-size: 10px; }
    .study-card-stage { height: clamp(170px, 55vw, 240px); border-radius: 12px; }
    .study-question-stage { padding: 22px 40px; }
    .study-card-arrow { width: 32px; height: 32px; }
    .study-card-arrow.prev { left: 5px; }
    .study-card-arrow.next { right: 5px; }
    .study-question-stage p { font-size: 13px; }
    .study-card-copy h2 { font-size: 12px; }
    .study-card-copy p { font-size: 10px; }
    .study-audio { min-height: 35px; font-size: 11px; }
    .study-explanation { min-height: 90px; margin-top: 10px; padding: 12px; }
    .study-explanation h3 { font-size: 12px; }
    .study-explanation p { font-size: 10px; }
    .study-explanation-copy { max-width: calc(100% - 54px); }
    .study-teacher-frog { width: 63px; height: 72px; right: 3px; }
    .study-controls { gap: 8px; margin: 13px 12px 0; }
    .study-control { min-height: 40px; gap: 5px; font-size: 10px; }
    .study-right-column { display: grid; grid-template-columns: 1fr; gap: 8px; }
    .study-progress-panel { min-height: 0; }
    .study-panel { padding: 12px; border-radius: 14px; }
    .study-list-panel { padding: 11px 8px 6px; }
    .study-list-item { min-height: 42px; grid-template-columns: 28px minmax(0,1fr) 20px 13px; gap: 7px; padding-inline: 8px; font-size: 10px; }
    .study-shuffle { width: 100%; min-height: 40px; margin-top: 0; }
  }
  @media (max-width: 380px) {
    .study-content { padding-inline: 8px; }
    .study-controls { margin-inline: 4px; }
  }
`;

function Sidebar({ activeSection, onSelectSection }) {
  const items = [
    [BookOpen, 'Học thẻ', 'study'],
    [Puzzle, 'Chủ đề', 'topics'],
  ];

  return (
    <aside className="study-sidebar">
      <nav className="study-side-links" aria-label="Menu học tập">
        {items.map(([Icon, label, section]) => (
          <button className={`study-side-link${activeSection === section ? ' active' : ''}`} type="button" key={section} onClick={() => onSelectSection(section)}>
            <Icon size={24} strokeWidth={2.3} />{label}
          </button>
        ))}
        <a className="study-side-link" href="/quiz/office-basics"><ListChecks size={24} strokeWidth={2.3} />Làm quiz</a>
        <button className="study-side-link" type="button" disabled title="Tính năng sẽ sớm được bổ sung">
          <ChartNoAxesColumnIncreasing size={24} strokeWidth={2.3} />Tiến độ học
        </button>
        <button className="study-side-link" type="button" disabled title="Tính năng sẽ sớm được bổ sung">
          <Heart size={24} strokeWidth={2.3} />Yêu thích
        </button>
      </nav>
      <div className="study-sidebar-promo">
        <span className="study-promo-blossom top">✿</span>
        <span className="study-promo-blossom bottom">✿</span>
        <div className="study-speech">Cùng học<br />mỗi ngày nhé!</div>
        <img className="study-sidebar-frog" src="/mannersgo/Kawaii%20Frog%20Reading%20a%20Book.png" alt="Ếch MannersGo đọc sách" />
      </div>
    </aside>
  );
}

export default function StudyPage() {
  const [activeSection, setActiveSection] = useState(() => (
    new URLSearchParams(window.location.search).get('view') === 'topics' ? 'topics' : 'study'
  ));
  const [selectedTopic, setSelectedTopic] = useState(() => {
    const requestedTopic = new URLSearchParams(window.location.search).get('topic');
    return topics.some(({ name }) => name === requestedTopic) ? requestedTopic : 'Danh thiếp';
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [search, setSearch] = useState('');
  const topicCards = flashcards.filter((card) => card.category === selectedTopic);
  const selectedTopicData = topics.find((topic) => topic.name === selectedTopic);
  const TopicIcon = selectedTopicData?.icon || IdCard;
  const current = topicCards[currentIndex];
  const progress = Math.round(((currentIndex + 1) / topicCards.length) * 100);
  const matchingCards = topicCards.map((card, index) => ({ title: card.title, index }))
    .filter(({ title }) => title.toLocaleLowerCase('vi').includes(search.toLocaleLowerCase('vi')));

  function goTo(index) {
    setCurrentIndex((index + topicCards.length) % topicCards.length);
  }

  function selectTopic(topic) {
    setSelectedTopic(topic);
    setCurrentIndex(0);
    setSearch('');
    setActiveSection('study');
  }

  function speakJapanese() {
    if (!('speechSynthesis' in window)) {
      window.alert('Trình duyệt này chưa hỗ trợ phát âm thanh.');
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(current.japanese);
    utterance.lang = 'ja-JP';
    window.speechSynthesis.speak(utterance);
  }

  function shuffleCard() {
    if (topicCards.length < 2) return;
    const next = Math.floor(Math.random() * (topicCards.length - 1));
    goTo(next >= currentIndex ? next + 1 : next);
  }

  return (
    <div className="mg-study">
      <style>{studyStyles}</style>
      <Header activePage="flashcards" />
      <div className="study-layout">
        <Sidebar activeSection={activeSection} onSelectSection={setActiveSection} />
        {activeSection === 'topics' ? (
          <main className="study-content">
            <section className="study-topic-chooser">
              <h1>Chủ đề học tập</h1>
              <p>Chọn một chủ đề để bắt đầu ôn luyện cùng MannersGo.</p>
              <div className="study-topic-grid">
                {topics.map(({ name, icon: Icon, description }) => (
                  <button className="study-topic-option" type="button" key={name} onClick={() => selectTopic(name)}>
                    <span className="study-topic-option-icon"><Icon size={24} /></span>
                    <strong>{name}</strong>
                    <small>{description} {flashcards.filter((card) => card.category === name).length} thẻ</small>
                  </button>
                ))}
              </div>
            </section>
          </main>
        ) : (
        <main className="study-content">
          <section className="study-main-column" aria-label={`Đang học chủ đề ${selectedTopic}`}>
            <div className="study-lesson-head">
              <button className="study-back-link" type="button" onClick={() => setActiveSection('topics')}><ArrowLeft size={16} /> Chủ đề</button>
              <span className="study-lesson-icon"><TopicIcon size={31} /></span>
              <div className="study-lesson-title">
                <h1>{selectedTopic}</h1>
                <p>{selectedTopicData?.description}</p>
              </div>
              <div className="study-lesson-progress">
                <span>{currentIndex + 1} / {topicCards.length}</span>
                <div className="study-progress-track"><span style={{ width: `${progress}%` }} /></div>
              </div>
            </div>
            <article className="study-card-panel">
              <span className="study-card-counter">Thẻ {currentIndex + 1} / {topicCards.length}</span>
              <button className="study-card-arrow prev" type="button" aria-label="Thẻ trước" onClick={() => goTo(currentIndex - 1)}><ArrowLeft size={21} /></button>
              <div className="study-card-stage study-question-stage">
                <span className="study-question-label">Câu hỏi {currentIndex + 1}</span>
                <p>{current.question}</p>
              </div>
              <button className="study-card-arrow next" type="button" aria-label="Thẻ tiếp theo" onClick={() => goTo(currentIndex + 1)}><ArrowRight size={21} /></button>
              <div className="study-card-copy">
                <span className="study-answer-label">Đáp án đúng</span>
                <h2>{current.answer}</h2>
                {current.japanese && <button className="study-audio" type="button" onClick={speakJapanese}><Volume2 size={20} /> Phát âm tiếng Nhật <ChevronRight size={17} /></button>}
              </div>
            </article>
            <section className="study-explanation">
              <span className="study-explanation-icon"><Lightbulb size={25} /></span>
              <div className="study-explanation-copy">
                <h3>Gợi ý</h3>
                <p>{current.hint}</p>
                <h3>Giải thích</h3>
                <p>{current.explanation}</p>
              </div>
              <img className="study-teacher-frog" src="/mannersgo/Ếch giáo viên đáng yêu cầm que chỉ dẫn.png" alt="Ếch giáo viên đáng yêu cầm que chỉ dẫn" />
            </section>
            <div className="study-controls">
              <button className="study-control" type="button" onClick={() => goTo(currentIndex - 1)}><BookOpen size={19} /> Thẻ trước</button>
              <button className="study-control primary" type="button" onClick={() => goTo(currentIndex + 1)}>Thẻ tiếp theo <ArrowRight size={17} /></button>
            </div>
          </section>

          <aside className="study-right-column">
            <section className="study-panel study-progress-panel">
              <h2>Tiến độ chủ đề</h2>
              <div className="study-progress-content">
                <div className="study-donut">
                  <div className="study-donut-inner"><strong>{currentIndex + 1}/{topicCards.length}</strong><small>{progress}%</small></div>
                </div>
                <div className="study-status-list">
                  <div className="study-status done"><Check size={18} /><span>Đã học</span><strong>{currentIndex}</strong></div>
                  <div className="study-status learning"><Circle size={18} /><span>Đang học</span><strong>1</strong></div>
                  <div className="study-status new"><Circle size={18} /><span>Chưa học</span><strong>{Math.max(topicCards.length - currentIndex - 1, 0)}</strong></div>
                </div>
              </div>
            </section>
            <section className="study-panel study-list-panel">
              <h2>Danh sách thẻ trong chủ đề</h2>
              <label className="study-card-search"><Search size={16} /><input aria-label="Tìm thẻ trong chủ đề" placeholder="Tìm thẻ..." value={search} onChange={(event) => setSearch(event.target.value)} /></label>
              <div className="study-card-list">
                {matchingCards.map(({ title, index }) => (
                  <button className={`study-list-item${currentIndex === index ? ' active' : ''}`} type="button" key={`${index}-${title}`} onClick={() => goTo(index)}>
                    <span className="study-list-number">{index + 1}</span>
                    <span className="study-list-title">{title}</span>
                    {index < currentIndex ? <span className="study-list-check"><Check size={14} /></span> : <span />}
                    <ChevronRight className="study-list-arrow" size={17} />
                  </button>
                ))}
                {matchingCards.length === 0 && <p className="study-empty-search">Không tìm thấy thẻ phù hợp.</p>}
              </div>
            </section>
            <button className="study-shuffle" type="button" onClick={shuffleCard}><Shuffle size={18} /> Xáo trộn thẻ <RotateCw size={17} /></button>
          </aside>
        </main>
        )}
      </div>
    </div>
  );
}
