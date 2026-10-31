import { useCallback, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight, BookOpen, Heart, Lightbulb, LogIn, Sparkles, Target, UserPlus, X,
} from 'lucide-react';
import Header from '../components/Header.jsx';

const apiBaseUrl = import.meta.env.PROD
  ? ''
  : (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

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
  .blog-hero-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; margin-top: 22px; }
  .blog-interest-btn {
    min-height: 46px;
    display: inline-flex;
    align-items: center;
    gap: 9px;
    padding: 0 18px;
    border: 2px solid #ff7397;
    border-radius: 26px;
    background: #fff;
    color: var(--blog-navy);
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(255, 61, 117, 0.12);
    transition: all .2s ease;
  }
  .blog-interest-btn:hover {
    transform: translateY(-2px);
    border-color: var(--blog-pink);
    box-shadow: 0 8px 20px rgba(255, 61, 117, 0.22);
  }
  .blog-interest-btn.active {
    background: linear-gradient(135deg, #ff5787 0%, #ff3871 100%);
    border-color: transparent;
    color: #fff;
    box-shadow: 0 6px 18px rgba(255, 56, 113, 0.35);
  }
  .blog-interest-icon {
    color: var(--blog-pink);
    transition: transform .25s cubic-bezier(.175, .885, .32, 1.275);
  }
  .blog-interest-btn:hover .blog-interest-icon {
    transform: scale(1.18);
  }
  .blog-interest-btn.active .blog-interest-icon {
    color: #fff;
    fill: #fff;
    animation: heartPop .35s ease-out;
  }
  @keyframes heartPop {
    0% { transform: scale(1); }
    50% { transform: scale(1.35); }
    100% { transform: scale(1); }
  }
  .blog-interest-badge {
    padding: 2px 10px;
    border-radius: 12px;
    background: #ffe6ed;
    color: var(--blog-pink);
    font-size: 12px;
    font-weight: 800;
    letter-spacing: .2px;
    transition: all .2s ease;
  }
  .blog-interest-btn.active .blog-interest-badge {
    background: rgba(255, 255, 255, 0.28);
    color: #fff;
  }
  .blog-interest-note {
    width: 100%;
    margin-top: 10px;
    color: #60799f;
    font-size: 12px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .blog-interest-note strong {
    color: var(--blog-pink);
    font-weight: 800;
  }
  .blog-cta { min-height: 44px; display: inline-flex; align-items: center; justify-content: center; gap: 8px; padding: 0 18px; border: 1px solid transparent; border-radius: 24px; background: var(--blog-pink); color: #fff !important; font-size: 12px; font-weight: 700; transition: transform .16s, box-shadow .16s; }
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

  /* Auth Required Modal */
  .blog-modal-overlay {
    position: fixed;
    inset: 0;
    z-index: 999;
    background: rgba(16, 43, 104, 0.48);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
    animation: fadeIn .18s ease;
  }
  .blog-modal-card {
    width: min(100%, 420px);
    background: #fff;
    border-radius: 24px;
    padding: 28px 24px 22px;
    box-shadow: 0 16px 40px rgba(16, 43, 104, 0.22);
    position: relative;
    text-align: center;
    animation: scaleIn .22s cubic-bezier(.175, .885, .32, 1.15);
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(.92); }
    to { opacity: 1; transform: scale(1); }
  }
  .blog-modal-close {
    position: absolute;
    top: 14px;
    right: 14px;
    width: 32px;
    height: 32px;
    display: grid;
    place-items: center;
    border: none;
    border-radius: 50%;
    background: #f1f5fa;
    color: #587199;
    cursor: pointer;
    transition: background .15s;
  }
  .blog-modal-close:hover {
    background: #e2eaf5;
    color: var(--blog-navy);
  }
  .blog-modal-icon-badge {
    width: 62px;
    height: 62px;
    margin: 0 auto 15px;
    border-radius: 50%;
    background: #ffe7ef;
    display: grid;
    place-items: center;
    color: var(--blog-pink);
  }
  .blog-modal-title {
    margin: 0 0 10px;
    font: 900 20px/1.3 Nunito, 'Be Vietnam Pro', sans-serif;
    color: var(--blog-navy);
  }
  .blog-modal-desc {
    margin: 0 0 20px;
    font-size: 13.5px;
    line-height: 1.6;
    color: #557099;
  }
  .blog-modal-actions {
    display: flex;
    flex-direction: column;
    gap: 9px;
  }
  .blog-modal-btn {
    min-height: 44px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border-radius: 22px;
    font-size: 13px;
    font-weight: 700;
    text-decoration: none;
    cursor: pointer;
    transition: all .16s ease;
  }
  .blog-modal-btn.primary {
    background: linear-gradient(100deg, #ff5380, #ff3771);
    color: #fff !important;
    box-shadow: 0 6px 16px rgba(255, 55, 113, 0.28);
  }
  .blog-modal-btn.primary:hover {
    box-shadow: 0 8px 22px rgba(255, 55, 113, 0.38);
    transform: translateY(-1px);
  }
  .blog-modal-btn.secondary {
    background: #eff6ff;
    color: #17427d !important;
    border: 1px solid #cce2fd;
  }
  .blog-modal-btn.secondary:hover {
    background: #e3effd;
  }
  .blog-modal-btn.text-only {
    background: transparent;
    border: none;
    color: #7085a6;
    font-size: 12px;
    font-weight: 600;
    min-height: 32px;
  }
  .blog-modal-btn.text-only:hover {
    color: var(--blog-navy);
  }

  /* Toast */
  .blog-toast {
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 1000;
    background: #102d68;
    color: #fff;
    padding: 12px 20px;
    border-radius: 24px;
    font-size: 13px;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    box-shadow: 0 8px 24px rgba(16, 45, 104, 0.28);
    animation: toastSlideUp .25s ease-out;
  }
  @keyframes toastSlideUp {
    from { opacity: 0; transform: translateY(14px); }
    to { opacity: 1; transform: translateY(0); }
  }

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
    .blog-hero-copy { padding: 22px 18px 16px; }
    .blog-breadcrumb { margin-bottom: 12px; font-size: 10px; }
    .blog-hero h1 { font-size: 34px; }
    .blog-hero-copy > p { margin-top: 10px; font-size: 12px; }
    .blog-hero-actions { margin-top: 16px; gap: 8px; }
    .blog-interest-btn { min-height: 40px; padding: 0 14px; font-size: 12px; }
    .blog-interest-badge { font-size: 11px; padding: 1px 7px; }
    .blog-interest-note { font-size: 11px; }
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
    .blog-modal-card { padding: 22px 18px 18px; border-radius: 20px; }
    .blog-modal-title { font-size: 18px; }
    .blog-modal-desc { font-size: 12px; }
  }
`;

export default function BlogPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [interestCount, setInterestCount] = useState(48);
  const [isInterested, setIsInterested] = useState(false);
  const [loadingInterest, setLoadingInterest] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const fetchSession = useCallback(async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/api/auth/me`, { credentials: 'include' });
      if (response.ok) {
        const result = await response.json();
        setUser(result.user || null);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    }
  }, []);

  const fetchInterests = useCallback(async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/api/interests?project=mannersgo-cards`, {
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        setInterestCount(data.count ?? 48);
        setIsInterested(Boolean(data.isInterested));
      }
    } catch {
      // fallback smoothly
    }
  }, []);

  useEffect(() => {
    fetchSession();
    fetchInterests();
    window.addEventListener('mannersgo-auth-changed', fetchSession);
    window.addEventListener('mannersgo-auth-changed', fetchInterests);
    return () => {
      window.removeEventListener('mannersgo-auth-changed', fetchSession);
      window.removeEventListener('mannersgo-auth-changed', fetchInterests);
    };
  }, [fetchSession, fetchInterests]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3500);
  };

  const handleInterestClick = async () => {
    // If not logged in, trigger notification modal
    if (!user) {
      setShowAuthModal(true);
      return;
    }

    if (loadingInterest) return;
    setLoadingInterest(true);

    // Optimistic UI update
    const previousInterested = isInterested;
    const previousCount = interestCount;
    const nextInterested = !previousInterested;
    setIsInterested(nextInterested);
    setInterestCount((prev) => (nextInterested ? prev + 1 : Math.max(0, prev - 1)));

    try {
      const response = await fetch(`${apiBaseUrl}/api/interests/toggle`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ project: 'mannersgo-cards' }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Không thể cập nhật lượt quan tâm.');
      }

      const data = await response.json();
      setIsInterested(Boolean(data.isInterested));
      setInterestCount(data.count);
      showToast(data.message || (data.isInterested ? 'Cảm ơn bạn đã quan tâm dự án! ❤️' : 'Đã huỷ quan tâm dự án.'));
    } catch (error) {
      // Revert optimistic update
      setIsInterested(previousInterested);
      setInterestCount(previousCount);
      showToast(error.message || 'Đã xảy ra lỗi. Vui lòng thử lại sau.');
    } finally {
      setLoadingInterest(false);
    }
  };

  return (
    <div className="mg-blog">
      <style>{styles}</style>
      <Header activePage="blog" />
      <main className="blog-shell">
        <section className="blog-hero">
          <div className="blog-hero-copy">
            <div className="blog-breadcrumb">
              <span>Blog</span>
              <span>›</span>
              <span>Giới thiệu thẻ bài</span>
            </div>
            <h1>
              Giới thiệu
              <span>Thẻ bài MannersGo</span>
            </h1>
            <p>
              Bộ thẻ được thiết kế dựa trên những tình huống giao tiếp thực tế trong môi trường công sở Nhật Bản, giúp bạn học dễ nhớ, dễ áp dụng và tự tin hơn khi làm việc.
            </p>

            <div className="blog-hero-actions">
              <button
                type="button"
                className={`blog-interest-btn ${isInterested ? 'active' : ''}`}
                onClick={handleInterestClick}
                disabled={loadingInterest}
                aria-pressed={isInterested}
                title={user ? 'Bấm để bày tỏ sự quan tâm đến dự án' : 'Đăng nhập để bày tỏ sự quan tâm'}
              >
                <Heart
                  size={19}
                  className="blog-interest-icon"
                  fill={isInterested ? '#fff' : 'none'}
                />
                <span>{isInterested ? 'Đã quan tâm' : 'Quan tâm dự án'}</span>
                <span className="blog-interest-badge">
                  {interestCount.toLocaleString('vi-VN')}
                </span>
              </button>

              <a className="blog-cta secondary" href="#physical-deck">
                Khám phá chi tiết <ArrowRight size={15} />
              </a>

              <div className="blog-interest-note">
                <Sparkles size={14} color="#ff3d75" />
                <span>
                  Đã có <strong>{interestCount.toLocaleString('vi-VN')}</strong> người quan tâm dự án bộ thẻ này
                </span>
              </div>
            </div>
          </div>

          <div className="blog-hero-art">
            <img src="/mannersgo/ảnh bộ bài 1.png" alt="Ếch MannersGo giới thiệu các thẻ tình huống công sở Nhật Bản" />
          </div>
        </section>

        <section className="blog-benefits" aria-labelledby="blog-benefits-title">
          <h2 className="blog-benefits-heading" id="blog-benefits-title">
            <Sparkles size={21} /> Điểm nổi bật của thẻ bài
          </h2>
          {benefits.map(({ icon: Icon, title, description, tone }) => (
            <article className={`blog-benefit ${tone}`} key={title}>
              <span className="blog-benefit-icon">
                <Icon size={25} strokeWidth={2.2} />
              </span>
              <div>
                <h2>{title}</h2>
                <p>{description}</p>
              </div>
            </article>
          ))}
        </section>

        <section className="blog-deck-section" id="physical-deck">
          <div className="blog-deck-copy">
            <span className="blog-section-label">
              <BookOpen size={16} /> Bộ thẻ MannersGo
            </span>
            <h2>Giới thiệu thẻ thật</h2>
            <p>
              Bộ thẻ vật lý có thiết kế tươi sáng, hình minh hoạ trực quan và nội dung ngắn gọn để bạn dễ xem lại, cùng học với bạn bè hoặc mang theo bên mình.
            </p>
            <a className="blog-cta" href="/flashcards">
              Xem chi tiết bộ thẻ <ArrowRight size={16} />
            </a>
          </div>
          <div className="blog-deck-art">
            <img src="/mannersgo/ảnh bộ bài 2.png" alt="Hộp thẻ MannersGo và các thẻ bài tình huống" />
          </div>
        </section>
      </main>

      {/* Modal thông báo cần đăng nhập */}
      {showAuthModal && (
        <div
          className="blog-modal-overlay"
          onClick={() => setShowAuthModal(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div className="blog-modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="blog-modal-close"
              onClick={() => setShowAuthModal(false)}
              aria-label="Đóng"
            >
              <X size={18} />
            </button>

            <div className="blog-modal-icon-badge">
              <Heart size={30} fill="#ff3d75" />
            </div>

            <h3 className="blog-modal-title" id="modal-title">
              Đăng nhập để quan tâm dự án
            </h3>
            <p className="blog-modal-desc">
              Bạn cần có tài khoản MannersGo để bày tỏ sự quan tâm đến dự án bộ thẻ bài. Hãy đăng nhập hoặc tạo tài khoản miễn phí để ủng hộ dự án nhé!
            </p>

            <div className="blog-modal-actions">
              <Link
                to="/login"
                state={{ from: '/blog' }}
                className="blog-modal-btn primary"
              >
                <LogIn size={16} /> Đăng nhập ngay
              </Link>
              <Link
                to="/register"
                state={{ from: '/blog' }}
                className="blog-modal-btn secondary"
              >
                <UserPlus size={16} /> Chưa có tài khoản? Đăng ký
              </Link>
              <button
                type="button"
                className="blog-modal-btn text-only"
                onClick={() => setShowAuthModal(false)}
              >
                Để sau
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast thông báo */}
      {toastMessage && (
        <div className="blog-toast" role="status">
          <Heart size={16} fill="#ff3d75" color="#ff3d75" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
