import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Apple, ArrowLeft, ArrowRight, Eye, EyeOff, LockKeyhole, Mail, UserRound,
} from 'lucide-react';

export default function AuthPage() {
  const isLogin = useLocation().pathname === '/login';
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [message, setMessage] = useState('');
  const [formError, setFormError] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    setFormError('');
    setMessage('');

    const form = new FormData(event.currentTarget);
    if (!isLogin && form.get('password') !== form.get('confirmPassword')) {
      setFormError('Mật khẩu xác nhận chưa khớp. Vui lòng kiểm tra lại.');
      return;
    }

    setMessage('Biểu mẫu đã sẵn sàng, nhưng chức năng tài khoản chưa được kết nối với máy chủ.');
  }

  function showSocialNotice(provider) {
    setMessage(`Đăng nhập bằng ${provider} chưa được kết nối với máy chủ.`);
    setFormError('');
  }

  return (
    <main className="auth-screen">
      <div className={`auth-page${isLogin ? ' is-login' : ' is-register'}`}>
        <section className="auth-art" aria-label="Giới thiệu MannersGo">
          <Link to="/" className="auth-art-link" aria-label="MannersGo — về trang chủ">
            <img className="auth-illustration" src="/mannersgo/auth-artwork.png" alt="MannersGo — nhỏ thẻ lớn kỹ năng, tự tin chinh phục môi trường Nhật" />
          </Link>
        </section>

        <section className="auth-form-side">
          <div className="auth-switch">
            <Link className="auth-home-link" to="/">
              <ArrowLeft aria-hidden="true" size={17} />
              Quay lại trang chủ
            </Link>
            <div className="auth-switch-options">
              <span>{isLogin ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}</span>
              <Link className="button button-outline" to={isLogin ? '/register' : '/login'}>
                {isLogin ? 'Đăng ký' : 'Đăng nhập'}
              </Link>
            </div>
          </div>

          <div className="auth-form">
            <h2>{isLogin ? 'Chào mừng trở lại!' : 'Đăng ký tài khoản'}</h2>
            <p>
              {isLogin
                ? 'Đăng nhập để tiếp tục hành trình rèn luyện văn hoá công sở Nhật Bản cùng MannersGo!'
                : 'Bắt đầu hành trình rèn luyện kỹ năng văn hoá công sở Nhật Bản cùng MannersGo!'}
            </p>

            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <label className="auth-input">
                  <UserRound aria-hidden="true" />
                  <input autoComplete="name" name="name" placeholder="Họ và tên" required />
                </label>
              )}

              <label className="auth-input">
                <Mail aria-hidden="true" />
                <input autoComplete="email" name="email" type="email" placeholder="Email" required />
              </label>

              <label className="auth-input">
                <LockKeyhole aria-hidden="true" />
                <input
                  autoComplete={isLogin ? 'current-password' : 'new-password'}
                  minLength={8}
                  name="password"
                  placeholder="Mật khẩu"
                  required
                  type={showPassword ? 'text' : 'password'}
                />
                <button
                  aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                  onClick={() => setShowPassword((shown) => !shown)}
                  type="button"
                >
                  {showPassword ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
                </button>
              </label>

              {!isLogin && (
                <label className="auth-input">
                  <LockKeyhole aria-hidden="true" />
                  <input
                    autoComplete="new-password"
                    minLength={8}
                    name="confirmPassword"
                    placeholder="Xác nhận mật khẩu"
                    required
                    type={showConfirmation ? 'text' : 'password'}
                  />
                  <button
                    aria-label={showConfirmation ? 'Ẩn mật khẩu xác nhận' : 'Hiện mật khẩu xác nhận'}
                    onClick={() => setShowConfirmation((shown) => !shown)}
                    type="button"
                  >
                    {showConfirmation ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
                  </button>
                </label>
              )}

              {isLogin ? (
                <div className="auth-options">
                  <label className="auth-remember">
                    <input name="remember" type="checkbox" />
                    Ghi nhớ đăng nhập
                  </label>
                  <button className="auth-text-button" onClick={() => showSocialNotice('khôi phục mật khẩu')} type="button">
                    Quên mật khẩu?
                  </button>
                </div>
              ) : (
                <label className="auth-terms">
                  <input name="terms" required type="checkbox" />
                  <span>Tôi đồng ý với <a href="#terms">Điều khoản dịch vụ</a> và <a href="#privacy">Chính sách bảo mật</a></span>
                </label>
              )}

              {formError && <p className="auth-message auth-message-error" role="alert">{formError}</p>}
              {message && <p className="auth-message" role="status">{message}</p>}

              <button className="button button-primary auth-submit" type="submit">
                {isLogin ? 'Đăng nhập' : 'Đăng ký'} <ArrowRight aria-hidden="true" size={19} />
              </button>
            </form>

            <div className="auth-divider"><span>Hoặc {isLogin ? 'đăng nhập' : 'đăng ký'} bằng</span></div>
            <div className="social-buttons">
              <button onClick={() => showSocialNotice('Google')} type="button">
                <span className="social-google" aria-hidden="true">G</span> Google
              </button>
              <button onClick={() => showSocialNotice('Facebook')} type="button">
                <span className="social-facebook" aria-hidden="true">f</span> Facebook
              </button>
              <button onClick={() => showSocialNotice('Apple')} type="button">
                <Apple aria-hidden="true" size={17} /> Apple
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
