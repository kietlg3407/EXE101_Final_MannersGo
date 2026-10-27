import {
  ArrowRight, BookOpen, Check, ClipboardList, Lightbulb, MessageCircle,
  Play, Target, UsersRound,
} from 'lucide-react';
import Header from '../components/Header.jsx';

const principles = [
  {
    icon: Target,
    title: 'Sứ mệnh',
    description: 'Giúp người học nắm vững quy tắc và văn hoá công sở Nhật Bản một cách thực tế và gần gũi.',
    tone: 'pink',
  },
  {
    icon: Lightbulb,
    title: 'Tầm nhìn',
    description: 'Trở thành nền tảng học văn hoá công sở Nhật Bản được yêu thích và tin cậy nhất.',
    tone: 'blue',
  },
  {
    icon: UsersRound,
    title: 'Giá trị cốt lõi',
    items: ['Dễ hiểu', 'Thực tế', 'Gần gũi', 'Ứng dụng được ngay'],
    tone: 'green',
  },
];

const steps = [
  {
    icon: BookOpen,
    title: 'Học qua thẻ bài',
    description: 'Nội dung ngắn gọn, trực quan, dễ nhớ.',
    tone: 'pink',
  },
  {
    icon: Play,
    title: 'Tình huống thực tế',
    description: 'Các tình huống mô phỏng công sở Nhật Bản.',
    tone: 'blue',
  },
  {
    icon: ClipboardList,
    title: 'Làm quiz tương tác',
    description: 'Luyện tập và kiểm tra hiểu biết sau mỗi bài học.',
    tone: 'yellow',
  },
  {
    icon: MessageCircle,
    title: 'Ứng dụng vào thực tế',
    description: 'Tự tin giao tiếp và làm việc trong môi trường Nhật Bản.',
    tone: 'green',
  },
];

const styles = `
  .mg-about {
    --about-navy: #102d68;
    --about-pink: #ff3d75;
    min-height: 100vh;
    color: var(--about-navy);
    background: #fffefa;
    font-family: 'Be Vietnam Pro', Arial, sans-serif;
  }
  .mg-about *, .mg-about *::before, .mg-about *::after { box-sizing: border-box; }
  .mg-about a { color: inherit; text-decoration: none; }
  .about-shell { width: min(100% - 64px, 1320px); margin: 0 auto; }
  .about-hero {
    min-height: 304px;
    display: grid;
    grid-template-columns: .94fr 1.06fr;
    align-items: stretch;
    overflow: hidden;
    background: linear-gradient(110deg, #fffefa 0%, #fffefa 44%, #eef7ff 100%);
  }
  .about-copy {
    position: relative;
    z-index: 2;
    align-self: center;
    padding: 22px 0 20px 28px;
  }
  .about-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 5px;
    color: var(--about-pink);
    font-size: 13px;
    font-weight: 800;
  }
  .about-eyebrow svg { fill: #ff91a9; color: #ff91a9; }
  .about-title {
    margin: 0 0 2px;
    color: var(--about-navy);
    font: 900 clamp(42px, 5vw, 60px)/1 Nunito, 'Be Vietnam Pro', sans-serif;
    letter-spacing: -2.7px;
  }
  .about-title span { color: var(--about-pink); }
  .about-lead {
    max-width: 490px;
    margin: 8px 0 9px;
    color: #122f68;
    font-size: 19px;
    font-weight: 800;
    line-height: 1.35;
  }
  .about-description {
    max-width: 490px;
    margin: 0;
    color: #243f70;
    font-size: 13px;
    line-height: 1.55;
  }
  .about-cta {
    min-height: 40px;
    display: inline-flex;
    align-items: center;
    gap: 11px;
    margin-top: 11px;
    padding: 0 19px;
    border-radius: 24px;
    background: var(--about-pink);
    color: white !important;
    font-size: 12px;
    font-weight: 700;
    transition: transform .18s ease, box-shadow .18s ease;
  }
  .about-cta:hover { transform: translateY(-2px); box-shadow: 0 7px 17px #ff3d7533; }
  .about-hero-visual {
    min-height: 304px;
    position: relative;
    overflow: hidden;
    border-radius: 44% 0 0 32% / 54% 0 0 44%;
    background: #e8f5ff;
  }
  .about-hero-visual img {
    width: 100%;
    height: 100%;
    position: absolute;
    inset: 0;
    object-fit: cover;
    object-position: center 54%;
  }
  .about-values { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; margin-top: 13px; }
  .about-value {
    min-height: 130px;
    display: flex;
    align-items: flex-start;
    gap: 16px;
    padding: 17px 22px;
    border-radius: 17px;
  }
  .about-value.pink { background: #fff0f3; }
  .about-value.blue { background: #eef7ff; }
  .about-value.green { background: #eff9f1; }
  .about-value-icon {
    width: 63px;
    height: 63px;
    flex: 0 0 63px;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: #ff477b;
    color: white;
  }
  .about-value.blue .about-value-icon { background: #4ba8f5; }
  .about-value.green .about-value-icon { background: #4fbd91; }
  .about-value h2 { margin: 2px 0 6px; font: 900 19px/1.15 Nunito, 'Be Vietnam Pro', sans-serif; }
  .about-value p { margin: 0; color: #35537f; font-size: 12px; line-height: 1.6; }
  .about-value-checks { display: grid; gap: 3px; margin: 0; padding: 0; list-style: none; }
  .about-value-checks li { display: flex; align-items: center; gap: 7px; color: #35537f; font-size: 12px; line-height: 1.4; }
  .about-value-checks svg { color: #4fbd91; fill: #4fbd91; stroke: white; }
  .about-steps { padding: 14px 20px 22px; }
  .about-steps h2 { margin: 0; font: 900 25px/1.2 Nunito, 'Be Vietnam Pro', sans-serif; letter-spacing: -.5px; }
  .about-steps-intro { margin: 3px 0 8px; color: #57719b; font-size: 13px; }
  .about-step-grid { display: grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap: 22px; }
  .about-step { min-width: 0; position: relative; padding-top: 1px; }
  .about-step-illustration {
    height: 94px;
    position: relative;
    display: grid;
    place-items: center;
    overflow: hidden;
    border-radius: 55px;
  }
  .about-step.pink .about-step-illustration { background: radial-gradient(ellipse at center, #ffeaf0, #fff4f6); }
  .about-step.blue .about-step-illustration { background: radial-gradient(ellipse at center, #e4f2ff, #f6fbff); }
  .about-step.yellow .about-step-illustration { background: radial-gradient(ellipse at center, #fff2d4, #fffaf0); }
  .about-step.green .about-step-illustration { background: radial-gradient(ellipse at center, #e2f5e7, #f6fbf6); }
  .about-step-illustration::before {
    content: '';
    width: 67%;
    height: 55%;
    position: absolute;
    bottom: -15px;
    border-radius: 50%;
    background: #fff9;
  }
  .about-step-icon {
    width: 88px;
    height: 59px;
    position: relative;
    z-index: 1;
    display: grid;
    place-items: center;
    border: 3px solid #53617a;
    border-radius: 8px;
    background: white;
    color: #4a9ce6;
    box-shadow: 0 5px 0 #b9c8d8;
    transform: rotate(-7deg);
  }
  .about-step.pink .about-step-icon { width: 102px; height: 59px; border-radius: 10px; color: #ff5680; transform: rotate(7deg); }
  .about-step.yellow .about-step-icon { color: #f4a918; }
  .about-step.green .about-step-icon { width: 82px; height: 67px; color: #45b986; transform: rotate(6deg); }
  .about-step-num {
    width: 31px;
    height: 31px;
    position: absolute;
    z-index: 2;
    top: 29px;
    left: -10px;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: #ff4b7b;
    color: white;
    font-size: 13px;
    font-weight: 800;
  }
  .about-step.blue .about-step-num { background: #48a5f5; }
  .about-step.yellow .about-step-num { background: #ffb321; }
  .about-step.green .about-step-num { background: #4fbd91; }
  .about-step-card-stack { width: 145px; height: 88px; position: relative; z-index: 1; object-fit: contain; }
  .about-step-laptop { width: 145px; height: 88px; position: relative; z-index: 1; object-fit: contain; }
  .about-step-checklist { width: 145px; height: 88px; position: relative; z-index: 1; object-fit: contain; }
  .about-step-analyst { width: 145px; height: 88px; position: relative; z-index: 1; object-fit: contain; }
  .about-step h3 { margin: 7px 0 2px; font: 900 15px/1.25 Nunito, 'Be Vietnam Pro', sans-serif; }
  .about-step p { max-width: 230px; margin: 0; color: #58719a; font-size: 12px; line-height: 1.55; }
  @media (min-width: 1400px) {
    .about-shell { width: min(100% - 90px, 1320px); }
    .about-hero, .about-hero-visual { min-height: 330px; }
    .about-value { min-height: 140px; }
    .about-step-illustration { height: 105px; }
  }
  @media (max-width: 1050px) {
    .about-shell { width: min(100% - 38px, 980px); }
    .about-hero { min-height: 285px; grid-template-columns: .95fr 1.05fr; }
    .about-hero-visual { min-height: 285px; }
    .about-copy { padding-left: 19px; }
    .about-title { font-size: 48px; }
    .about-lead { font-size: 16px; }
    .about-description { font-size: 11px; }
    .about-value { min-height: 120px; gap: 11px; padding: 15px 14px; }
    .about-value-icon { width: 52px; height: 52px; flex-basis: 52px; }
    .about-value h2 { font-size: 16px; }
    .about-value p, .about-value-checks li { font-size: 10px; }
    .about-step-grid { gap: 14px; }
  }
  @media (max-width: 720px) {
    .about-shell { width: calc(100% - 28px); }
    .about-hero { display: flex; flex-direction: column; min-height: 0; margin-top: 8px; border-radius: 16px; }
    .about-copy { padding: 18px 16px 12px; }
    .about-eyebrow { font-size: 11px; }
    .about-title { font-size: clamp(39px, 12vw, 52px); }
    .about-lead { margin-top: 7px; font-size: 15px; }
    .about-description { font-size: 11px; }
    .about-cta { min-height: 38px; margin-top: 10px; font-size: 11px; }
    .about-hero-visual { min-height: 235px; margin: 0 8px 8px; border-radius: 12px; }
    .about-values { grid-template-columns: 1fr; gap: 7px; margin-top: 9px; }
    .about-value { min-height: 88px; align-items: center; gap: 12px; padding: 12px 14px; border-radius: 13px; }
    .about-value-icon { width: 48px; height: 48px; flex-basis: 48px; }
    .about-value-icon svg { width: 27px; }
    .about-value h2 { margin: 0 0 4px; font-size: 15px; }
    .about-value p, .about-value-checks li { font-size: 10px; }
    .about-steps { padding: 13px 8px 20px; }
    .about-steps h2 { font-size: 21px; }
    .about-steps-intro { font-size: 11px; }
    .about-step-grid { grid-template-columns: repeat(2, minmax(0,1fr)); gap: 14px 12px; padding: 2px 8px; }
    .about-step-illustration { height: 84px; }
    .about-step-icon { width: 73px; height: 50px; }
    .about-step.pink .about-step-icon { width: 85px; height: 51px; }
    .about-step.green .about-step-icon { width: 68px; height: 58px; }
    .about-step-num { width: 27px; height: 27px; top: 25px; left: -7px; font-size: 11px; }
    .about-step-card-stack { width: 122px; height: 78px; }
    .about-step-laptop { width: 122px; height: 78px; }
    .about-step-checklist { width: 122px; height: 78px; }
    .about-step-analyst { width: 122px; height: 78px; }
    .about-step h3 { margin-top: 6px; font-size: 13px; }
    .about-step p { font-size: 10px; }
  }
  @media (max-width: 390px) {
    .about-shell { width: calc(100% - 20px); }
    .about-copy { padding-inline: 13px; }
    .about-title { font-size: 39px; }
    .about-hero-visual { min-height: 205px; }
    .about-value { padding-inline: 11px; }
  }
`;

function StepIllustration({ icon: Icon, tone, index }) {
  return (
    <div className={`about-step-illustration ${tone}`}>
      {index === 0
        ? <img className="about-step-card-stack" src="/mannersgo/Kawaii%20Frog%20Card%20Stack%20Sticker.png" alt="Chồng thẻ học MannersGo có hình ếch" />
        : index === 1
          ? <img className="about-step-laptop" src="/mannersgo/Cute%20Laptop%20Video%20Sticker.png" alt="Minh họa tình huống thực tế trên máy tính" />
          : index === 2
            ? <img className="about-step-checklist" src="/mannersgo/Cute%20Checklist%20and%20Pencil%20Sticker.png" alt="Minh họa bảng checklist và bút chì cho bài quiz" />
            : index === 3
              ? <img className="about-step-analyst" src="/mannersgo/Chibi%20Frog%20Business%20Analyst%20Sticker.png" alt="Ếch MannersGo làm chuyên viên phân tích kinh doanh" />
              : <span className="about-step-icon"><Icon size={34} strokeWidth={2.4} /></span>}
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="mg-about">
      <style>{styles}</style>
      <Header activePage="about" />
      <main className="about-shell">
        <section className="about-hero">
          <div className="about-copy">
            <div className="about-eyebrow"><Lightbulb size={17} /> VỀ DỰ ÁN</div>
            <h1 className="about-title">Manners<span>G✿</span></h1>
            <p className="about-lead">Học văn hoá công sở Nhật Bản<br />một cách dễ hiểu, dễ nhớ và dễ áp dụng.</p>
            <p className="about-description">MannersGo là nền tảng học tập kết hợp thẻ bài và tình huống thực tế, giúp bạn tự tin giao tiếp, ứng xử và làm việc hiệu quả trong môi trường công sở Nhật Bản.</p>
            <a className="about-cta" href="/flashcards">Bắt đầu hành trình <ArrowRight size={17} /></a>
          </div>
          <div className="about-hero-visual">
            <img src="/mannersgo/home.png" alt="Ếch MannersGo khám phá Nhật Bản dưới chân núi Phú Sĩ" />
          </div>
        </section>

        <section className="about-values" aria-label="Sứ mệnh, tầm nhìn và giá trị cốt lõi">
          {principles.map(({ icon: Icon, title, description, items, tone }) => (
            <article className={`about-value ${tone}`} key={title}>
              <span className="about-value-icon"><Icon size={32} strokeWidth={2.5} /></span>
              <div>
                <h2>{title}</h2>
                {items ? (
                  <ul className="about-value-checks">
                    {items.map((item) => <li key={item}><Check size={16} />{item}</li>)}
                  </ul>
                ) : <p>{description}</p>}
              </div>
            </article>
          ))}
        </section>

        <section className="about-steps">
          <h2>Chúng tôi làm gì?</h2>
          <p className="about-steps-intro">Mang đến trải nghiệm học tập đơn giản nhưng hiệu quả.</p>
          <div className="about-step-grid">
            {steps.map(({ icon, title, description, tone }, index) => (
              <article className={`about-step ${tone}`} key={title}>
                <span className="about-step-num">{index + 1}</span>
                <StepIllustration icon={icon} tone={tone} index={index} />
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
