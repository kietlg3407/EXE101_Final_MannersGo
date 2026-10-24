import {
  ArrowRight, BookOpen, Heart, Lightbulb, Sparkles, Target,
} from 'lucide-react';
import Header from '../components/Header.jsx';

const benefits = [
  {
    icon: BookOpen,
    title: 'Tình huống thực tế',
    description: 'Luyện cách ứng xử qua các tình huống thường gặp tại công sở Nhật Bản.',
    tone: 'pink',
  },
  {
    icon: Lightbulb,
    title: 'Ngắn gọn, dễ nhớ',
    description: 'Mỗi thẻ tập trung vào một nội dung, có gợi ý và giải thích dễ hiểu.',
    tone: 'blue',
  },
  {
    icon: Target,
    title: 'Học theo nhịp của bạn',
    description: 'Phù hợp cho người mới tìm hiểu văn hoá Nhật và người đi làm.',
    tone: 'green',
  },
  {
    icon: Heart,
    title: 'Kết hợp online',
    description: 'Dùng bộ thẻ giấy để ôn tập, sau đó luyện thêm cùng MannersGo online.',
    tone: 'yellow',
  },
];

const styles = `
  .mg-blog {
    --blog-navy: #102d68;
    --blog-pink: #ff3d75;
    color: var(--blog-navy);
    background: #fffefa;
    font-family: 'Be Vietnam Pro', Arial, sans-serif;
  }
  .mg-blog *, .mg-blog *::before, .mg-blog *::after { box-sizing: border-box; }
  .mg-blog a { color: inherit; text-decoration: none; }
  .blog-shell { width: min(100% - 64px, 1320px); margin: 0 auto; padding-bottom: 36px; }
  .blog-hero {
    min-height: 340px;
    display: grid;
    grid-template-columns: .83fr 1.17fr;
    align-items: stretch;
    overflow: hidden;
    border-radius: 0 0 22px 22px;
    background: linear-gradient(105deg, #eff8ff 0%, #eef8ff 43%, #fff2f5 100%);
  }
  .blog-hero-copy { align-self: center; padding: 34px 18px 34px 40px; }
  .blog-breadcrumb { display: flex; align-items: center; gap: 8px; margin-bottom: 16px; color: #60789e; font-size: 12px; }
  .blog-breadcrumb span:last-child { color: var(--blog-pink); font-weight: 700; }
  .blog-hero h1 { margin: 0; font: 900 clamp(32px, 4vw, 52px)/1.12 Nunito, 'Be Vietnam Pro', sans-serif; letter-spacing: -1.2px; }
  .blog-hero h1 span { display: block; color: var(--blog-pink); }
  .blog-hero-copy > p { max-width: 475px; margin: 15px 0 0; color: #405a84; font-size: 14px; line-height: 1.75; }
  .blog-hero-actions { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 22px; }
  .blog-cta { min-height: 43px; display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 0 18px; border: 1px solid transparent; border-radius: 24px; background: var(--blog-pink); color: #fff !important; font-size: 12px; font-weight: 700; transition: transform .16s, box-shadow .16s; }
  .blog-cta:hover { transform: translateY(-2px); box-shadow: 0 7px 17px #ff3d7530; }
  .blog-cta.secondary { border-color: #c9daf1; background: #fff; color: var(--blog-navy) !important; }
  .blog-hero-art { min-width: 0; min-height: 340px; display: flex; align-items: center; justify-content: center; }
  .blog-hero-art img { width: 100%; height: 100%; max-height: 390px; object-fit: cover; object-position: center; }
  .blog-benefits { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 12px; margin-top: 18px; padding: 20px; border: 1px solid #f5e8ec; border-radius: 20px; background: linear-gradient(110deg, #fff4f6, #fffafa); }
  .blog-benefits-heading { grid-column: 1 / -1; display: flex; align-items: center; gap: 9px; margin: 0 0 3px; font: 900 20px Nunito, 'Be Vietnam Pro', sans-serif; }
  .blog-benefits-heading svg { color: var(--blog-pink); fill: #ff9db4; }
  .blog-benefit { min-width: 0; display: flex; align-items: flex-start; gap: 11px; padding: 10px 7px; }
  .blog-benefit-icon { width: 48px; height: 48px; flex: 0 0 48px; display: grid; place-items: center; border-radius: 50%; }
  .blog-benefit.pink .blog-benefit-icon { background: #ffe3eb; color: #f33d73; }
  .blog-benefit.blue .blog-benefit-icon { background: #e2f2ff; color: #3799e9; }
  .blog-benefit.green .blog-benefit-icon { background: #e3f7ec; color: #37a878; }
  .blog-benefit.yellow .blog-benefit-icon { background: #fff0d5; color: #e6a529; }
  .blog-benefit h2 { margin: 3px 0 5px; font: 800 14px/1.35 Nunito, 'Be Vietnam Pro', sans-serif; }
  .blog-benefit p { margin: 0; color: #62799e; font-size: 11px; line-height: 1.55; }
  .blog-deck-section { min-height: 300px; display: grid; grid-template-columns: .75fr 1.25fr; align-items: center; gap: 20px; overflow: hidden; margin-top: 18px; border: 1px solid #e4eff9; border-radius: 20px; background: linear-gradient(110deg, #edf8ff, #fff4f6); }
  .blog-deck-copy { padding: 30px 0 30px 30px; }
  .blog-section-label { display: inline-flex; align-items: center; gap: 7px; color: var(--blog-pink); font-size: 11px; font-weight: 800; letter-spacing: .04em; text-transform: uppercase; }
  .blog-deck-copy h2 { margin: 10px 0 9px; font: 900 clamp(23px, 2.7vw, 34px)/1.2 Nunito, 'Be Vietnam Pro', sans-serif; }
  .blog-deck-copy p { max-width: 440px; margin: 0; color: #506b93; font-size: 13px; line-height: 1.7; }
  .blog-deck-copy .blog-cta { margin-top: 18px; }
  .blog-deck-art { min-width: 0; height: 100%; min-height: 300px; display: flex; align-items: center; }
  .blog-deck-art img { width: 100%; height: 100%; min-height: 300px; object-fit: cover; object-position: center; }
  @media (max-width: 900px) {
    .blog-shell { width: min(100% - 36px, 760px); }
    .blog-hero { grid-template-columns: 1fr 1fr; min-height: 290px; }
    .blog-hero-copy { padding: 25px 12px 25px 25px; }
    .blog-hero-art { min-height: 290px; }
    .blog-benefits { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .blog-deck-section { grid-template-columns: .9fr 1.1fr; }
  }
  @media (max-width: 600px) {
    .blog-shell { width: calc(100% - 24px); padding-bottom: 24px; }
    .blog-hero { grid-template-columns: 1fr; border-radius: 0 0 16px 16px; }
    .blog-hero-copy { padding: 22px 18px 12px; }
    .blog-breadcrumb { margin-bottom: 12px; font-size: 10px; }
    .blog-hero h1 { font-size: 36px; }
    .blog-hero-copy > p { margin-top: 10px; font-size: 12px; }
    .blog-hero-actions { margin-top: 15px; }
    .blog-cta { min-height: 40px; padding-inline: 14px; font-size: 11px; }
    .blog-hero-art { min-height: 0; height: auto; aspect-ratio: 1.8; }
    .blog-benefits { gap: 4px; margin-top: 12px; padding: 14px 11px; border-radius: 15px; }
    .blog-benefits-heading { font-size: 17px; }
    .blog-benefit { gap: 8px; padding: 8px 2px; }
    .blog-benefit-icon { width: 38px; height: 38px; flex-basis: 38px; }
    .blog-benefit-icon svg { width: 21px; }
    .blog-benefit h2 { font-size: 12px; }
    .blog-benefit p { font-size: 10px; }
    .blog-deck-section { grid-template-columns: 1fr; gap: 0; margin-top: 12px; border-radius: 15px; }
    .blog-deck-copy { padding: 20px 17px 5px; }
    .blog-deck-copy h2 { font-size: 25px; }
    .blog-deck-copy p { font-size: 11px; }
    .blog-deck-art, .blog-deck-art img { min-height: 0; }
    .blog-deck-art { aspect-ratio: 1.75; }
  }
`;

export default function BlogPage() {
  return (
    <div className="mg-blog">
      <style>{styles}</style>
      <Header activePage="blog" />
      <main className="blog-shell">
        <section className="blog-hero">
          <div className="blog-hero-copy">
            <div className="blog-breadcrumb"><span>Blog</span><span>›</span><span>Giới thiệu thẻ bài</span></div>
            <h1>Giới thiệu<span>Thẻ bài MannersGo</span></h1>
            <p>Bộ thẻ được thiết kế dựa trên những tình huống giao tiếp thực tế trong môi trường công sở Nhật Bản, giúp bạn học dễ nhớ, dễ áp dụng và tự tin hơn khi làm việc.</p>
          </div>
          <div className="blog-hero-art">
            <img src="/mannersgo/ảnh bộ bài 1.png" alt="Ếch MannersGo giới thiệu các thẻ tình huống công sở Nhật Bản" />
          </div>
        </section>

        <section className="blog-benefits" aria-labelledby="blog-benefits-title">
          <h2 className="blog-benefits-heading" id="blog-benefits-title"><Sparkles size={21} /> Điểm nổi bật của thẻ bài</h2>
          {benefits.map(({ icon: Icon, title, description, tone }) => (
            <article className={`blog-benefit ${tone}`} key={title}>
              <span className="blog-benefit-icon"><Icon size={25} strokeWidth={2.2} /></span>
              <div><h2>{title}</h2><p>{description}</p></div>
            </article>
          ))}
        </section>

        <section className="blog-deck-section" id="physical-deck">
          <div className="blog-deck-copy">
            <span className="blog-section-label"><BookOpen size={16} /> Bộ thẻ MannersGo</span>
            <h2>Giới thiệu thẻ thật</h2>
            <p>Bộ thẻ vật lý có thiết kế tươi sáng, hình minh hoạ trực quan và nội dung ngắn gọn để bạn dễ xem lại, cùng học với bạn bè hoặc mang theo bên mình.</p>
            <a className="blog-cta" href="/flashcards">Xem chi tiết bộ thẻ <ArrowRight size={16} /></a>
          </div>
          <div className="blog-deck-art">
            <img src="/mannersgo/ảnh bộ bài 2.png" alt="Hộp thẻ MannersGo và các thẻ bài tình huống" />
          </div>
        </section>
      </main>
    </div>
  );
}
