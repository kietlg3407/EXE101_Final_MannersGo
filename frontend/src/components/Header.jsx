import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, Menu, Search, X } from 'lucide-react';

const apiBaseUrl = import.meta.env.PROD
  ? ''
  : (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

const headerStyles = `
  .mg-site-header {
    height: 70px;
    position: sticky;
    z-index: 20;
    top: 0;
    border-bottom: 1px solid #f0f0ed;
    background: #fffefaf2;
    backdrop-filter: blur(14px);
  }
  .mg-site-header *, .mg-site-header *::before, .mg-site-header *::after { box-sizing: border-box; }
  .mg-site-header a { color: inherit; text-decoration: none; }
  .mg-site-header-inner {
    width: min(100% - 64px, 1320px);
    height: 100%;
    display: flex;
    align-items: center;
    gap: 25px;
    margin: 0 auto;
  }
  .mg-site-brand {
    width: 190px;
    height: 66px;
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
  }
  .mg-site-brand img { width: 100%; height: 100%; object-fit: contain; object-position: left center; }
  .mg-site-nav {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: clamp(20px, 3vw, 39px);
    margin: 0 auto;
  }
  .mg-site-nav a {
    height: 100%;
    position: relative;
    display: inline-flex;
    align-items: center;
    color: #102b68;
    font-size: 12px;
    font-weight: 600;
    white-space: nowrap;
  }
  .mg-site-nav a:hover, .mg-site-nav a.active { color: #ff3d75; }
  .mg-site-nav a.active::after {
    content: '';
    height: 3px;
    position: absolute;
    right: 0;
    bottom: 14px;
    left: 0;
    border-radius: 4px;
    background: #ff3d75;
  }
  .mg-site-actions { display: flex; flex: 0 0 auto; align-items: center; gap: 11px; }
  .mg-site-search {
    width: 34px;
    height: 36px;
    display: grid;
    place-items: center;
    border: 0;
    background: transparent;
    color: #102b68;
    cursor: pointer;
  }
  .mg-site-button {
    min-width: 114px;
    height: 42px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #adc9f2;
    border-radius: 24px;
    background: white;
    color: #102b68 !important;
    font-size: 12px;
    font-weight: 600;
    white-space: nowrap;
  }
  .mg-site-button.primary { min-width: 117px; border-color: #ff3d75; background: #ff3d75; color: white !important; }
  .mg-site-account { position: relative; }
  .mg-site-account-button {
    display: inline-flex; align-items: center; gap: 5px; padding: 3px;
    border: 0; background: transparent; color: #102b68; cursor: pointer;
  }
  .mg-site-account-avatar {
    width: 38px; height: 38px; display: grid; place-items: center; overflow: hidden;
    border: 1px solid #dcebd1; border-radius: 50%; background: #e9f6cb;
  }
  .mg-site-account-avatar img { width: 125%; height: 125%; object-fit: contain; }
  .mg-site-account-menu {
    min-width: 190px; position: absolute; top: calc(100% + 10px); right: 0; z-index: 25;
    display: grid; gap: 4px; padding: 12px; border: 1px solid #e6edf8;
    border-radius: 12px; background: white; box-shadow: 0 12px 28px #102b681c;
  }
  .mg-site-account-name { padding: 5px 8px 9px; color: #64799f; font-size: 12px; }
  .mg-site-account-menu a, .mg-site-account-menu button {
    padding: 9px 8px; border: 0; border-radius: 7px; background: transparent;
    color: #102b68; font-size: 12px; text-align: left; cursor: pointer;
  }
  .mg-site-account-menu a:hover, .mg-site-account-menu button:hover { background: #f5f8fd; }
  .mg-site-menu {
    display: none;
    border: 0;
    background: transparent;
    color: #102b68;
    cursor: pointer;
  }
  @media (max-width: 1050px) {
    .mg-site-header-inner { width: min(100% - 38px, 980px); gap: 13px; }
    .mg-site-brand { width: 160px; }
    .mg-site-nav { gap: 17px; }
    .mg-site-button { min-width: 89px; height: 38px; font-size: 10px; }
    .mg-site-button.primary { min-width: 90px; }
  }
  @media (max-width: 720px) {
    .mg-site-header { height: 64px; }
    .mg-site-header-inner { width: calc(100% - 28px); gap: 8px; }
    .mg-site-brand { width: 125px; height: 52px; }
    .mg-site-menu { display: grid; width: 34px; height: 38px; place-items: center; order: 2; margin-left: auto; }
    .mg-site-nav {
      height: auto;
      position: absolute;
      top: 63px;
      right: 0;
      left: 0;
      display: none;
      align-items: stretch;
      gap: 0;
      padding: 8px 20px 13px;
      background: white;
      box-shadow: 0 12px 20px #1c365418;
    }
    .mg-site-nav.open { display: grid; }
    .mg-site-nav a { min-height: 42px; border-bottom: 1px solid #f0f2f5; font-size: 12px; }
    .mg-site-nav a.active::after { right: auto; bottom: 4px; width: 38px; }
    .mg-site-actions { order: 3; gap: 5px; }
    .mg-site-search { width: 27px; }
    .mg-site-button { min-width: auto; height: 34px; padding: 0 11px; font-size: 9px; }
    .mg-site-button.primary { min-width: auto; }
  }
  @media (max-width: 390px) {
    .mg-site-header-inner { width: calc(100% - 20px); }
    .mg-site-brand { width: 108px; height: 46px; }
    .mg-site-actions { gap: 3px; }
    .mg-site-button { padding-inline: 8px; font-size: 8px; }
    .mg-site-search { width: 23px; }
  }
`;

const navItems = [
  { label: 'Trang chủ', href: '/', id: 'home' },
  { label: 'Học thẻ', href: '/flashcards', id: 'flashcards' },
  { label: 'Làm quiz', href: '/quiz/office-basics', id: 'quiz' },
  { label: 'Blog', href: '/#topics', id: 'blog' },
  { label: 'Về dự án', href: '/about', id: 'about' },
];

export default function Header({ activePage = 'home' }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [logoutError, setLogoutError] = useState('');

  const refreshSession = useCallback(async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/api/auth/me`, { credentials: 'include' });
      if (!response.ok) {
        setUser(null);
        return;
      }
      const result = await response.json();
      setUser(result.user || null);
    } catch {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    refreshSession();
    window.addEventListener('mannersgo-auth-changed', refreshSession);
    return () => window.removeEventListener('mannersgo-auth-changed', refreshSession);
  }, [refreshSession]);

  async function handleLogout() {
    setLogoutError('');
    try {
      const response = await fetch(`${apiBaseUrl}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Không thể đăng xuất. Vui lòng thử lại.');
      setUser(null);
      setAccountMenuOpen(false);
      window.dispatchEvent(new Event('mannersgo-auth-changed'));
      if (location.pathname === '/profile') navigate('/');
    } catch (error) {
      setLogoutError(error.message || 'Không thể đăng xuất. Vui lòng thử lại.');
    }
  }

  return (
    <>
      <style>{headerStyles}</style>
      <header className="mg-site-header">
        <div className="mg-site-header-inner">
          <a className="mg-site-brand" href="/" aria-label="MannersGo — trang chủ">
            <img src="/mannersgo/logo.png" alt="MannersGo — Japanese Office Survival" />
          </a>
          <button className="mg-site-menu" type="button" aria-label={menuOpen ? 'Đóng menu' : 'Mở menu'} onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <nav className={`mg-site-nav${menuOpen ? ' open' : ''}`} aria-label="Điều hướng chính">
            {navItems.map(({ label, href, id }) => (
              <a className={activePage === id ? 'active' : ''} href={href} key={id} onClick={() => setMenuOpen(false)}>{label}</a>
            ))}
          </nav>
          <div className="mg-site-actions">
            <a className="mg-site-search" href="/#topics" aria-label="Tìm kiếm"><Search size={21} /></a>
            {user ? (
              <div className="mg-site-account">
                <button
                  aria-expanded={accountMenuOpen}
                  aria-label={`Tài khoản ${user.name}`}
                  className="mg-site-account-button"
                  onClick={() => setAccountMenuOpen((open) => !open)}
                  type="button"
                >
                  <span className="mg-site-account-avatar">
                    <img src="/mannersgo/Cheerful%20Frog%20in%20a%20Blue%20Suit.png" alt="" />
                  </span>
                  <ChevronDown aria-hidden="true" size={15} />
                </button>
                {accountMenuOpen && (
                  <div className="mg-site-account-menu">
                    <span className="mg-site-account-name">{user.name}</span>
                    <a href="/profile" onClick={() => setAccountMenuOpen(false)}>Hồ sơ</a>
                    <a href="/#home" onClick={() => setAccountMenuOpen(false)}>Trang chủ</a>
                    <button onClick={handleLogout} type="button">Đăng xuất</button>
                    {logoutError && <span className="mg-site-account-name" role="alert">{logoutError}</span>}
                  </div>
                )}
              </div>
            ) : (
              <>
                <a className="mg-site-button" href="/login">Đăng nhập</a>
                <a className="mg-site-button primary" href="/register">Đăng ký</a>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
