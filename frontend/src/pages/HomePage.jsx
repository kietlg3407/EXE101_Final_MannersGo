import { ArrowRight, BookOpen, ChevronDown, IdCard, Lightbulb, Mail, Utensils, UsersRound } from 'lucide-react';
import Header from '../components/Header.jsx';

const topics = [
  { icon: BookOpen, title: <>Chào hỏi &amp;<br />Giao tiếp</>, studyTopic: 'Chào hỏi và giao tiếp', tone: 'pink', art: 'frog' },
  { icon: IdCard, title: <>Danh thiếp</>, studyTopic: 'Danh thiếp', tone: 'blue', art: 'business-card' },
  { icon: Mail, title: <>Email<br />công việc</>, studyTopic: 'Email và công việc', tone: 'yellow', art: 'laptop' },
  { icon: UsersRound, title: <>Trong<br />cuộc họp</>, studyTopic: 'Trong cuộc họp', tone: 'green', art: 'meeting' },
  { icon: Utensils, title: <>Quy tắc<br />bàn ăn</>, studyTopic: 'Quy tắc bàn ăn', tone: 'purple', art: 'bento' },
];

const benefits = [
  {
    icon: BookOpen,
    title: <>Học qua<br />tình huống thực tế</>,
    description: 'Các tình huống mô phỏng công sở Nhật Bản sát với thực tế.',
    tone: 'pink',
  },
  {
    icon: Lightbulb,
    title: <>Dễ nhớ,<br />dễ áp dụng</>,
    description: 'Nội dung ngắn gọn, trực quan với thẻ bài và minh hoạ.',
    tone: 'blue',
  },
  {
    icon: UsersRound,
    title: <>Tăng sự tự tin<br />khi làm việc tại Nhật</>,
    description: 'Rèn luyện kỹ năng giao tiếp và ứng xử chuẩn Nhật.',
    tone: 'green',
  },
];

const styles = `
  .mg-home {
    --mg-navy: #102b68;
    --mg-pink: #ff3d75;
    --mg-blue: #4ca8f5;
    --mg-green: #48bd91;
    --mg-ink: #16346d;
    --mg-muted: #526b96;
    min-height: 100vh;
    color: var(--mg-navy);
    background: #fffefa;
    font-family: 'Be Vietnam Pro', Arial, sans-serif;
  }
  .mg-home *, .mg-home *::before, .mg-home *::after { box-sizing: border-box; }
  .mg-home a { color: inherit; text-decoration: none; }
  .mg-home button { font: inherit; }
  .mg-main { width: min(100% - 64px, 1320px); margin: 0 auto; }
  .mg-hero {
    min-height: 378px;
    position: relative;
    display: grid;
    grid-template-columns: .91fr 1.09fr;
    overflow: hidden;
    background: linear-gradient(105deg, #fffefa 0%, #fffefa 42%, #eff7ff 100%);
  }
  .mg-hero-copy {
    position: relative;
    z-index: 5;
    align-self: center;
    padding: 24px 0 26px 27px;
  }
  .mg-eyebrow {
    min-height: 33px;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 0 13px;
    border-radius: 22px;
    background: #fff0f4;
    color: var(--mg-pink);
    font-size: 12px;
    font-weight: 800;
  }
  .mg-eyebrow span { font-size: 17px; }
  .mg-hero h1 {
    margin: 13px 0 10px;
    color: var(--mg-navy);
    font: 900 clamp(36px, 4.3vw, 52px)/1.08 Nunito, 'Be Vietnam Pro', sans-serif;
    letter-spacing: -1.8px;
  }
  .mg-hero h1 em { color: var(--mg-pink); font-style: normal; }
  .mg-hero-copy > p {
    max-width: 450px;
    margin: 0;
    color: var(--mg-ink);
    font-size: 14px;
    line-height: 1.55;
  }
  .mg-hero-actions { display: flex; flex-wrap: wrap; gap: 13px; margin-top: 16px; }
  .mg-cta {
    min-width: 210px;
    height: 46px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 0 20px;
    border: 0;
    border-radius: 25px;
    background: var(--mg-pink);
    color: white !important;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    transition: transform .18s ease, box-shadow .18s ease;
  }
  .mg-cta:hover { transform: translateY(-2px); box-shadow: 0 7px 17px #ff3d7533; }
  .mg-cta.secondary { min-width: 160px; background: #fff0f3; color: var(--mg-pink) !important; font-weight: 500; }
  .mg-hero-art {
    min-height: 378px;
    position: relative;
    overflow: hidden;
    border-radius: 48% 0 0 35% / 54% 0 0 43%;
    background: #dcedff;
  }
  .mg-hero-image {
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0;
    display: block;
    object-fit: cover;
    object-position: center;
  }
  .mg-benefits { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; }
  .mg-benefit {
    min-height: 118px;
    display: flex;
    align-items: center;
    gap: 17px;
    padding: 17px 24px;
    border-radius: 17px;
  }
  .mg-benefit.pink { background: #fff0f3; }
  .mg-benefit.blue { background: #edf7ff; }
  .mg-benefit.green { background: #eff9f1; }
  .mg-benefit-icon {
    width: 63px;
    height: 63px;
    flex: 0 0 63px;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: var(--mg-pink);
    color: white;
  }
  .mg-benefit.blue .mg-benefit-icon { background: var(--mg-blue); }
  .mg-benefit.green .mg-benefit-icon { background: var(--mg-green); }
  .mg-benefit h2 {
    margin: 0 0 5px;
    color: var(--mg-navy);
    font: 900 17px/1.25 Nunito, 'Be Vietnam Pro', sans-serif;
  }
  .mg-benefit p { margin: 0; color: #3d5a8c; font-size: 12px; line-height: 1.55; }
  .mg-topics {
    padding: 16px 24px 17px;
    border-radius: 22px;
    background: #eef7ff;
  }
  .mg-topics-heading { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
  .mg-topics-heading h2 { margin: 0; color: var(--mg-navy); font: 900 22px Nunito, 'Be Vietnam Pro', sans-serif; }
  .mg-topics-heading a { display: inline-flex; align-items: center; gap: 7px; color: #1476e6; font-size: 12px; font-weight: 600; }
  .mg-topic-grid { display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 10px; }
  .mg-topic {
    min-height: 107px;
    position: relative;
    display: grid;
    grid-template-columns: 43px 1fr;
    align-items: center;
    gap: 8px;
    overflow: hidden;
    padding: 10px 10px 9px;
    border: 2px solid white;
    border-radius: 16px;
    background: #fff;
    transition: transform .18s ease, box-shadow .18s ease;
  }
  .mg-topic:hover { transform: translateY(-3px); box-shadow: 0 8px 18px #1e3b6414; }
  .mg-topic.pink { background: #fff5f7; }
  .mg-topic.blue { background: #f2f9ff; }
  .mg-topic.yellow { background: #fff9ed; }
  .mg-topic.green { background: #f2fbf4; }
  .mg-topic.purple { background: #f8f3ff; }
  .mg-topic-icon {
    width: 43px;
    height: 43px;
    display: grid;
    place-items: center;
    align-self: start;
    border-radius: 50%;
    background: var(--mg-pink);
    color: white;
  }
  .mg-topic.blue .mg-topic-icon { background: var(--mg-blue); }
  .mg-topic.yellow .mg-topic-icon { background: #ffb72c; }
  .mg-topic.green .mg-topic-icon { background: var(--mg-green); }
  .mg-topic.purple .mg-topic-icon { background: #a265ef; }
  .mg-topic-title { align-self: end; padding-bottom: 5px; color: var(--mg-navy); font-size: 12px; font-weight: 700; line-height: 1.35; }
  .mg-topic-art { height: 50px; position: absolute; right: 8px; bottom: 21px; left: 48px; display: flex; align-items: center; justify-content: flex-end; }
  .mg-topic-art img { width: 80px; height: 62px; object-fit: contain; }
  .mg-topic-art .mini-frog { width: 81px; height: 64px; background: url('/mannersgo/frog-good.png') no-repeat center 28% / contain; }
  .mg-topic-art .mini-business-card { width: 75px; height: 39px; position: relative; border: 2px solid #455d78; border-radius: 5px; background: white; transform: rotate(-11deg); }
  .mg-topic-art .mini-business-card::before { content: '◉'; position: absolute; top: 7px; left: 7px; color: #4c9fe8; font-size: 11px; }
  .mg-topic-art .mini-business-card::after { content: ''; width: 29px; height: 3px; position: absolute; top: 11px; right: 7px; background: #a5bdd7; box-shadow: 0 8px #d0dcea, 0 16px #d0dcea; }
  .mg-topic-art .mini-laptop { width: 74px; height: 46px; position: relative; border: 3px solid #314765; border-radius: 5px 5px 3px 3px; background: linear-gradient(135deg, #ddecfb, #fff); transform: rotate(-9deg); }
  .mg-topic-art .mini-laptop::after { content: ''; height: 6px; position: absolute; right: -8px; bottom: -9px; left: -8px; border: 2px solid #314765; border-radius: 2px 2px 7px 7px; background: #b8d2ed; }
  .mg-topic-art .mini-meeting { font-size: 35px; filter: drop-shadow(0 2px 2px #20395b25); }
  .mg-topic-art .mini-bento { width: 67px; height: 42px; display: grid; place-items: center; border: 4px solid #28364c; border-radius: 8px; background: linear-gradient(90deg, #fff 0 48%, #80bd63 48% 70%, #ffb14c 70%); font-size: 23px; transform: rotate(-10deg); }
  .mg-topic-arrow { width: 24px; height: 24px; position: absolute; right: 8px; bottom: 7px; display: grid; place-items: center; border-radius: 50%; background: #ffe2e9; color: var(--mg-pink); }
  .mg-topic.blue .mg-topic-arrow { background: #d9eeff; color: var(--mg-blue); }
  .mg-topic.yellow .mg-topic-arrow { background: #ffedc7; color: #e9a21b; }
  .mg-topic.green .mg-topic-arrow { background: #d8f2e3; color: var(--mg-green); }
  .mg-topic.purple .mg-topic-arrow { background: #eadcff; color: #9758e7; }
  .mg-bottom-space { height: 24px; }
  @media (min-width: 1400px) {
    .mg-main { width: min(100% - 90px, 1320px); }
    .mg-hero, .mg-hero-art { min-height: 405px; }
    .mg-hero-copy { padding-left: 30px; }
    .mg-topic { min-height: 112px; }
  }
  @media (max-width: 1050px) {
    .mg-main { width: min(100% - 38px, 980px); }
    .mg-hero { grid-template-columns: .95fr 1.05fr; min-height: 345px; }
    .mg-hero-art { min-height: 345px; }
    .mg-hero h1 { font-size: clamp(32px, 4.3vw, 43px); }
    .mg-hero-copy { padding-left: 20px; }
    .mg-hero-copy > p { font-size: 12px; }
    .mg-benefit { gap: 12px; padding-inline: 14px; }
    .mg-benefit-icon { width: 52px; height: 52px; flex-basis: 52px; }
    .mg-benefit h2 { font-size: 14px; }
    .mg-benefit p { font-size: 10px; }
    .mg-topic { grid-template-columns: 36px 1fr; padding-inline: 7px; }
    .mg-topic-icon { width: 36px; height: 36px; }
    .mg-topic-title { font-size: 10px; }
    .mg-topic-art { left: 40px; }
  }
  @media (max-width: 720px) {
    .mg-main { width: calc(100% - 28px); }
    .mg-hero { display: flex; flex-direction: column; min-height: auto; margin-top: 9px; border-radius: 17px; }
    .mg-hero-copy { padding: 21px 17px 15px; }
    .mg-eyebrow { min-height: 29px; padding-inline: 10px; font-size: 9px; }
    .mg-hero h1 { margin: 12px 0 8px; font-size: clamp(28px, 8vw, 38px); letter-spacing: -.9px; }
    .mg-hero-copy > p { font-size: 11px; line-height: 1.6; }
    .mg-hero-actions { gap: 8px; margin-top: 13px; }
    .mg-cta { min-width: 0; height: 40px; padding-inline: 14px; font-size: 10px; }
    .mg-cta.secondary { min-width: 0; }
    .mg-hero-art { min-height: 235px; margin: 0 9px 9px; border-radius: 13px; }
    .mg-benefits { grid-template-columns: 1fr; gap: 7px; }
    .mg-benefit { min-height: 76px; gap: 12px; padding: 10px 13px; border-radius: 13px; }
    .mg-benefit-icon { width: 45px; height: 45px; flex-basis: 45px; }
    .mg-benefit-icon svg { width: 22px; }
    .mg-benefit h2 { margin-bottom: 2px; font-size: 12px; }
    .mg-benefit p { font-size: 9px; }
    .mg-topics { padding: 14px 11px; border-radius: 16px; }
    .mg-topics-heading { margin-bottom: 8px; }
    .mg-topics-heading h2 { font-size: 17px; }
    .mg-topics-heading a { gap: 3px; font-size: 9px; }
    .mg-topic-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 7px; }
    .mg-topic { min-height: 78px; grid-template-columns: 32px 1fr; gap: 5px; padding: 7px; border-radius: 12px; }
    .mg-topic-icon { width: 32px; height: 32px; }
    .mg-topic-icon svg { width: 17px; }
    .mg-topic-title { font-size: 8px; }
    .mg-topic-art { height: 34px; right: 5px; bottom: 17px; left: 37px; }
    .mg-topic-art .mini-frog { width: 53px; height: 43px; }
    .mg-topic-art .mini-business-card { width: 48px; height: 29px; }
    .mg-topic-art .mini-laptop { width: 48px; height: 30px; }
    .mg-topic-art .mini-meeting { font-size: 24px; }
    .mg-topic-art .mini-bento { width: 45px; height: 30px; font-size: 17px; }
    .mg-topic-arrow { width: 20px; height: 20px; right: 5px; bottom: 4px; }
    .mg-bottom-space { height: 16px; }
  }
  @media (max-width: 390px) {
    .mg-main { width: calc(100% - 20px); }
    .mg-hero-copy { padding-inline: 13px; }
    .mg-hero h1 { font-size: 27px; }
    .mg-cta { padding-inline: 10px; font-size: 9px; }
    .mg-topic-art { opacity: .8; }
  }
  @media (prefers-reduced-motion: reduce) {
    .mg-home *, .mg-home *::before, .mg-home *::after { scroll-behavior: auto !important; transition-duration: .01ms !important; }
  }
`;

function HeroArtwork() {
  return (
    <div className="mg-hero-art">
      <img className="mg-hero-image" src="/mannersgo/home.png" alt="Ếch MannersGo khám phá Nhật Bản dưới chân núi Phú Sĩ" />
    </div>
  );
}

function TopicIllustration({ kind }) {
  if (kind === 'frog') return <span className="mini-frog" />;
  if (kind === 'business-card') return <span className="mini-business-card" />;
  if (kind === 'laptop') return <span className="mini-laptop" />;
  if (kind === 'meeting') return <span className="mini-meeting">👥</span>;
  return <span className="mini-bento">🍱</span>;
}

export default function HomePage() {
  return (
    <div className="mg-home">
      <style>{styles}</style>
      <Header activePage="home" />
      <main className="mg-main" id="home">
        <section className="mg-hero">
          <div className="mg-hero-copy">
            <span className="mg-eyebrow"><span>✿</span> Học văn hoá công sở Nhật Bản</span>
            <h1>Nhỏ thẻ lớn kỹ năng<br /><em>Tự tin chinh phục<br />mọi môi trường Nhật!</em></h1>
            <p>MannersGo giúp bạn nắm vững quy tắc giao tiếp, ứng xử và văn hoá công sở Nhật Bản một cách dễ hiểu, dễ nhớ, dễ áp dụng.</p>
            <div className="mg-hero-actions">
              <a className="mg-cta" href="#topics">Bắt đầu học ngay <ArrowRight size={17} /></a>
              <a className="mg-cta secondary" href="#topics">Tìm hiểu thêm <ChevronDown size={16} /></a>
            </div>
          </div>
          <HeroArtwork />
        </section>

        <section className="mg-benefits" aria-label="Lợi ích khi học cùng MannersGo">
          {benefits.map(({ icon: Icon, title, description, tone }) => (
            <article className={`mg-benefit ${tone}`} key={tone}>
              <span className="mg-benefit-icon"><Icon size={28} strokeWidth={2.1} /></span>
              <div><h2>{title}</h2><p>{description}</p></div>
            </article>
          ))}
        </section>

        <section className="mg-topics" id="topics">
          <div className="mg-topics-heading">
            <h2>Các chủ đề nổi bật</h2>
            <a href="#topics">Xem tất cả <ArrowRight size={16} /></a>
          </div>
          <div className="mg-topic-grid">
            {topics.map(({ icon: Icon, title, studyTopic, tone, art }) => (
              <a className={`mg-topic ${tone}`} href={`/flashcards?topic=${encodeURIComponent(studyTopic)}`} key={tone}>
                <span className="mg-topic-icon"><Icon size={22} strokeWidth={2.2} /></span>
                <span className="mg-topic-title">{title}</span>
                <span className="mg-topic-art"><TopicIllustration kind={art} /></span>
                <span className="mg-topic-arrow"><ArrowRight size={14} /></span>
              </a>
            ))}
          </div>
        </section>
        <div className="mg-bottom-space" />
      </main>
    </div>
  );
}
