import { useState } from 'react';
import { Menu, Search, X } from 'lucide-react';

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
  const [menuOpen, setMenuOpen] = useState(false);

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
            <a className="mg-site-button" href="/login">Đăng nhập</a>
            <a className="mg-site-button primary" href="/register">Đăng ký</a>
          </div>
        </div>
      </header>
    </>
  );
}
