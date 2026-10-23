import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Check, LockKeyhole, Mail, Pencil, Phone, UserRound, X,
} from 'lucide-react';
import Header from '../components/Header.jsx';

const apiBaseUrl = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');

const profileStyles = `
  .mg-profile { min-height: 100vh; padding: 24px; background: linear-gradient(180deg, #f0f8ff, #fffefa 360px); color: #102b68; }
  .mg-profile *, .mg-profile *::before, .mg-profile *::after { box-sizing: border-box; }
  .mg-profile-shell { width: min(100%, 1000px); margin: 0 auto; }
  .mg-profile-back { display: inline-flex; align-items: center; gap: 8px; margin: 0 0 16px; color: #526b96; font-size: 13px; font-weight: 600; }
  .mg-profile-card { overflow: hidden; border: 1px solid #e8eef7; border-radius: 22px; background: white; box-shadow: 0 12px 35px #19386b0b; }
  .mg-profile-cover { min-height: 270px; position: relative; display: flex; align-items: end; gap: 24px; padding: 25px 36px; background: url('/mannersgo/Pastel%20Sakura%20Mountain%20Torii%20Landscape.png') center bottom / cover; }
  .mg-profile-avatar { width: 160px; height: 160px; flex: 0 0 160px; display: grid; place-items: center; overflow: hidden; border: 6px solid white; border-radius: 50%; background: #ffe9f0; box-shadow: 0 5px 18px #102b681c; }
  .mg-profile-avatar img { width: 120%; height: 120%; object-fit: contain; }
  .mg-profile-identity { padding-bottom: 8px; }
  .mg-profile-identity h1 { margin: 0; color: #102b68; font: 900 32px/1.2 Nunito, 'Be Vietnam Pro', sans-serif; }
  .mg-profile-handle { margin-top: 3px; color: #6a7c9b; font-size: 14px; }
  .mg-profile-bio { max-width: 440px; margin: 10px 0 0; color: #526b96; font-size: 13px; line-height: 1.6; }
  .mg-profile-details { margin: 24px; padding: 0 20px; border: 1px solid #edf0f4; border-radius: 17px; }
  .mg-profile-row { min-height: 83px; display: grid; grid-template-columns: 54px minmax(120px, 1fr) minmax(160px, 1.7fr) 40px; align-items: center; gap: 14px; border-bottom: 1px solid #edf0f4; }
  .mg-profile-row:last-child { border-bottom: 0; }
  .mg-profile-icon { width: 46px; height: 46px; display: grid; place-items: center; border-radius: 50%; background: #fff0f4; color: #ff4779; }
  .mg-profile-icon.phone { background: #eaf6ff; color: #3598e9; }
  .mg-profile-icon.email { background: #fff5df; color: #e9a915; }
  .mg-profile-icon.password { background: #f2edff; color: #8c68df; }
  .mg-profile-label { color: #657895; font-size: 13px; font-weight: 600; }
  .mg-profile-value { min-width: 0; color: #17376b; font-size: 15px; font-weight: 600; overflow-wrap: anywhere; }
  .mg-profile-editor { display: flex; gap: 8px; }
  .mg-profile-editor input, .mg-profile-password-form input { width: 100%; min-width: 0; height: 40px; padding: 0 11px; border: 1px solid #dce7f5; border-radius: 9px; outline: none; color: #17376b; font: inherit; }
  .mg-profile-editor input:focus, .mg-profile-password-form input:focus { border-color: #68aaf0; box-shadow: 0 0 0 3px #68aaf020; }
  .mg-profile-edit, .mg-profile-icon-button { display: grid; width: 38px; height: 38px; place-items: center; border: 0; border-radius: 10px; background: transparent; color: #7589a8; cursor: pointer; }
  .mg-profile-edit:hover, .mg-profile-icon-button:hover { background: #f3f7fc; color: #ff4779; }
  .mg-profile-icon-button.save { color: #28a574; }
  .mg-profile-password-button { min-height: 40px; grid-column: 3 / 5; justify-self: end; padding: 0 22px; border: 0; border-radius: 24px; background: #fff0f4; color: #e84976; font-size: 12px; font-weight: 700; cursor: pointer; }
  .mg-profile-password-form { display: grid; grid-column: 2 / 5; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 9px; padding: 0 0 14px; }
  .mg-profile-password-form input:first-child:last-of-type { grid-column: 1 / -1; }
  .mg-profile-form-actions { display: flex; grid-column: 1 / -1; justify-content: flex-end; gap: 8px; }
  .mg-profile-form-actions button { min-height: 36px; padding: 0 14px; border: 1px solid #e0e8f2; border-radius: 20px; background: white; color: #526b96; font-size: 12px; font-weight: 700; cursor: pointer; }
  .mg-profile-form-actions button[type='submit'] { border-color: #ff4779; background: #ff4779; color: white; }
  .mg-profile-status { margin: 0 24px 22px; padding: 11px 14px; border-radius: 10px; background: #effaf5; color: #26835d; font-size: 13px; }
  .mg-profile-status.error { background: #fff0f1; color: #c43c57; }
  .mg-profile-loading { padding: 80px 20px; color: #657895; text-align: center; }
  @media (max-width: 640px) {
    .mg-profile { padding: 14px; }
    .mg-profile-cover { min-height: 235px; gap: 14px; padding: 18px; }
    .mg-profile-avatar { width: 112px; height: 112px; flex-basis: 112px; }
    .mg-profile-identity h1 { font-size: 25px; }
    .mg-profile-handle { font-size: 12px; }
    .mg-profile-bio { font-size: 11px; }
    .mg-profile-details { margin: 14px; padding: 0 12px; }
    .mg-profile-row { min-height: 75px; grid-template-columns: 42px minmax(78px, .8fr) minmax(95px, 1.3fr) 32px; gap: 8px; }
    .mg-profile-icon { width: 38px; height: 38px; }
    .mg-profile-icon svg { width: 19px; }
    .mg-profile-label { font-size: 11px; }
    .mg-profile-value { font-size: 12px; }
    .mg-profile-edit, .mg-profile-icon-button { width: 32px; height: 34px; }
    .mg-profile-password-button { grid-column: 3 / 5; padding-inline: 10px; font-size: 10px; }
    .mg-profile-password-form { grid-column: 1 / 5; }
    .mg-profile-status { margin-inline: 14px; }
  }
  @media (max-width: 390px) {
    .mg-profile-cover { gap: 10px; padding-inline: 12px; }
    .mg-profile-avatar { width: 90px; height: 90px; flex-basis: 90px; }
    .mg-profile-identity h1 { font-size: 21px; }
    .mg-profile-row { grid-template-columns: 36px minmax(68px, .8fr) minmax(80px, 1.2fr) 28px; gap: 6px; }
  }
`;

export default function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [values, setValues] = useState({ name: '', phone: '' });
  const [editingField, setEditingField] = useState('');
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let active = true;
    fetch(`${apiBaseUrl}/api/auth/me`, { credentials: 'include' })
      .then(async (response) => {
        const result = await response.json();
        if (response.status === 401) {
          navigate('/login', { replace: true });
          return;
        }
        if (!response.ok) throw new Error(result.message || 'Không tải được hồ sơ.');
        if (active) {
          setUser(result.user);
          setValues({
            name: result.user.name || '',
            phone: result.user.phone || '',
          });
        }
      })
      .catch((loadError) => {
        if (active) setError(loadError.message || 'Không tải được hồ sơ.');
      })
      .finally(() => {
        if (active) setIsLoading(false);
      });
    return () => { active = false; };
  }, [navigate]);

  function updateField(field, value) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function cancelEdit() {
    setValues({
      name: user.name || '',
      phone: user.phone || '',
    });
    setEditingField('');
    setError('');
  }

  async function saveProfile(event) {
    event.preventDefault();
    setError('');
    setStatus('');
    setIsSaving(true);
    try {
      const response = await fetch(`${apiBaseUrl}/api/auth/me`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: values.name, phone: values.phone }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Không thể cập nhật hồ sơ.');
      setUser((current) => ({ ...current, ...result.user }));
      setValues({ name: result.user.name, phone: result.user.phone || '' });
      setEditingField('');
      setStatus(result.message);
      window.dispatchEvent(new Event('mannersgo-auth-changed'));
    } catch (saveError) {
      setError(saveError.message || 'Không thể cập nhật hồ sơ.');
    } finally {
      setIsSaving(false);
    }
  }

  async function changePassword(event) {
    event.preventDefault();
    setError('');
    setStatus('');
    const form = new FormData(event.currentTarget);
    const currentPassword = String(form.get('currentPassword') || '');
    const newPassword = String(form.get('newPassword') || '');
    const confirmation = String(form.get('confirmPassword') || '');
    if (newPassword.length < 6) {
      setError('Mật khẩu mới phải có ít nhất 6 ký tự.');
      return;
    }
    if (newPassword !== confirmation) {
      setError('Mật khẩu xác nhận chưa khớp.');
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch(`${apiBaseUrl}/api/auth/change-password`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message || 'Không thể đổi mật khẩu.');
      setUser((current) => ({ ...current, hasPassword: true }));
      setShowPasswordForm(false);
      setStatus(result.message);
    } catch (passwordError) {
      setError(passwordError.message || 'Không thể đổi mật khẩu.');
    } finally {
      setIsSaving(false);
    }
  }

  function renderProfileRow(field, label, Icon, tone, value) {
    const editing = editingField === field;
    return (
      <div className="mg-profile-row" key={field}>
        <span className={`mg-profile-icon ${tone}`}><Icon size={22} fill={field === 'email' ? 'currentColor' : 'none'} /></span>
        <span className="mg-profile-label">{label}</span>
        {editing ? (
          <form className="mg-profile-editor" onSubmit={saveProfile}>
            <input
              autoFocus
              autoComplete={field === 'phone' ? 'tel' : 'name'}
              maxLength={field === 'name' ? 80 : 30}
              onChange={(event) => updateField(field, event.target.value)}
              required={field !== 'phone'}
              type="text"
              value={values[field]}
              aria-label={label}
            />
            <button className="mg-profile-icon-button save" disabled={isSaving} title="Lưu" type="submit"><Check size={19} /></button>
            <button className="mg-profile-icon-button" onClick={cancelEdit} title="Hủy" type="button"><X size={19} /></button>
          </form>
        ) : (
          <span className="mg-profile-value">{value || (field === 'phone' ? 'Chưa cập nhật' : '')}</span>
        )}
        {!editing && field !== 'email' && (
          <button
            className="mg-profile-edit"
            onClick={() => { setEditingField(field); setError(''); setStatus(''); }}
            title={`Chỉnh sửa ${label.toLowerCase()}`}
            type="button"
          >
            <Pencil size={20} />
          </button>
        )}
      </div>
    );
  }

  return (
    <div>
      <Header />
      <main className="mg-profile">
        <style>{profileStyles}</style>
        <div className="mg-profile-shell">
          <a className="mg-profile-back" href="/"><ArrowLeft size={17} /> Về trang chủ</a>
          {isLoading ? (
            <div className="mg-profile-loading">Đang tải hồ sơ...</div>
          ) : user ? (
            <section className="mg-profile-card">
              <header className="mg-profile-cover">
                <div className="mg-profile-avatar">
                  <img src="/mannersgo/Cheerful%20Frog%20in%20a%20Blue%20Suit.png" alt="Ảnh đại diện MannersGo" />
                </div>
                <div className="mg-profile-identity">
                  <h1>{user.name}</h1>
                  <div className="mg-profile-handle">@{user.email.split('@')[0]}</div>
                  <p className="mg-profile-bio">Chăm chỉ học hỏi để tự tin làm việc trong môi trường Nhật Bản! ✨</p>
                </div>
              </header>
              <div className="mg-profile-details">
                {renderProfileRow('name', 'Họ và tên', UserRound, '', user.name)}
                {renderProfileRow('phone', 'Số điện thoại', Phone, 'phone', user.phone)}
                {renderProfileRow('email', 'Email', Mail, 'email', user.email)}
                {user.hasPassword && (
                  <div className="mg-profile-row">
                    <span className="mg-profile-icon password"><LockKeyhole size={21} /></span>
                    <span className="mg-profile-label">Mật khẩu</span>
                    <span className="mg-profile-value">••••••••</span>
                    <button className="mg-profile-password-button" onClick={() => { setShowPasswordForm((shown) => !shown); setError(''); setStatus(''); }} type="button">
                      Đổi mật khẩu
                    </button>
                    {showPasswordForm && (
                      <form className="mg-profile-password-form" onSubmit={changePassword}>
                        <input autoComplete="current-password" name="currentPassword" placeholder="Mật khẩu hiện tại" required type="password" />
                        <input autoComplete="new-password" minLength={6} name="newPassword" placeholder="Mật khẩu mới (ít nhất 6 ký tự)" required type="password" />
                        <input autoComplete="new-password" minLength={6} name="confirmPassword" placeholder="Xác nhận mật khẩu mới" required type="password" />
                        <div className="mg-profile-form-actions">
                          <button onClick={() => setShowPasswordForm(false)} type="button">Hủy</button>
                          <button disabled={isSaving} type="submit">{isSaving ? 'Đang lưu...' : 'Lưu mật khẩu'}</button>
                        </div>
                      </form>
                    )}
                  </div>
                )}
              </div>
              {status && <p className="mg-profile-status" role="status">{status}</p>}
              {error && <p className="mg-profile-status error" role="alert">{error}</p>}
            </section>
          ) : (
            <p className="mg-profile-status error" role="alert">{error || 'Không tải được hồ sơ tài khoản.'}</p>
          )}
        </div>
      </main>
    </div>
  );
}
