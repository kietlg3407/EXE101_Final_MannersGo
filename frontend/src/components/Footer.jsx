import { Facebook, Mail, Phone } from 'lucide-react';

const contacts = [
  {
    label: 'Fanpage',
    value: 'MannersGo',
    href: 'https://www.facebook.com/profile.php?id=61595585517756&mibextid=wwXIfr&rdid=Dcl2W26RFXvqFEaJ&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1DgouPHSpk%2F%3Fmibextid%3DwwXIfr#',
    Icon: Facebook,
  },
  {
    label: 'Điện thoại',
    value: '0829367818',
    href: 'tel:0829367818',
    Icon: Phone,
  },
  {
    label: 'Email',
    value: 'mannersgo@gmail.com',
    href: 'mailto:mannersgo@gmail.com',
    Icon: Mail,
  },
];

export default function Footer() {
  return (
    <footer className="mg-footer">
      <div className="mg-footer-inner">
        <div className="mg-footer-intro">
          <strong>MannersGo</strong>
          <p>Kết nối với chúng tôi để cùng học cách ứng xử mỗi ngày.</p>
        </div>
        <nav className="mg-footer-contacts" aria-label="Thông tin liên hệ">
          {contacts.map(({ label, value, href, Icon }) => (
            <a
              className="mg-footer-contact"
              href={href}
              key={label}
              target={label === 'Fanpage' ? '_blank' : undefined}
              rel={label === 'Fanpage' ? 'noopener noreferrer' : undefined}
            >
              <span className="mg-footer-icon"><Icon size={19} aria-hidden="true" /></span>
              <span className="mg-footer-contact-copy">
                <small>{label}</small>
                <strong>{value}</strong>
              </span>
            </a>
          ))}
        </nav>
        <div className="mg-footer-bottom">© {new Date().getFullYear()} MannersGo</div>
      </div>
    </footer>
  );
}
