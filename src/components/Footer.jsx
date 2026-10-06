import { useNavigate } from 'react-router-dom'

const FOOTER_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About Us', path: '/about' },
  { label: 'Projects', path: '/projects' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Contact', path: '/contact' },
]

const PROPERTY_LINKS = [
  'Open Plot Layouts',
  'Villa Projects',
  'Weekend Home Projects',
  'Investment Plots',
  'Highway Ventures',
]
export default function Footer() {
  const navigate = useNavigate()
  return (
    <footer className="footer">
      <div className="footer-bg-text">My City Infra</div>
      <div className="footer-top">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col-brand">
              <img
                src="/image1.png"
                alt="My City Infra Developers"
                style={{ height: '90px', width: 'auto', objectFit: 'contain', marginBottom: '16px' }}
              />
              <div className="footer-brand-name">My City Infra</div>
              <div className="footer-brand-sub">Developments</div>
              <p className="footer-desc">
                A dynamic real estate development company committed to creating high-value property investments and well-planned residential ventures. My City, Your Future.
              </p>
              <div className="footer-social">
                {[
                  { href: 'https://www.facebook.com/profile.php?id=61583744480142', svg: <svg width="30" height="30" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg> },
                  { href: 'https://www.instagram.com/mycity_infra/', svg: <svg width="30" height="30" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" /></svg> },
                  { href: 'https://www.youtube.com/@MyCityInfra', svg: <svg width="30" height="30" fill="currentColor" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" /><polygon fill="white" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" /></svg> },
                  { href: 'https://wa.me/919876543210', svg: <svg width="30" height="30" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /><path d="M12 0C5.373 0 0 5.373 0 12c0 2.122.558 4.112 1.531 5.836L.057 23.215a.75.75 0 0 0 .916.916l5.379-1.474A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.715 9.715 0 0 1-4.964-1.359l-.355-.212-3.686 1.01 1.01-3.686-.212-.355A9.715 9.715 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" /></svg> },
                ].map((item, i) => (
                  <a key={i} className="footer-social-btn" href={item.href} target="_blank" rel="noopener noreferrer">
                    {item.svg}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <div className="footer-col-title">Navigate</div>
              <div className="footer-links">
                {FOOTER_LINKS.map((l) => (
                  <button key={l.path} className="footer-link" onClick={() => navigate(l.path)}>
                    {l.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="footer-col-title">Properties</div>
              <div className="footer-links">
                {PROPERTY_LINKS.map((l) => (
                  <button key={l} className="footer-link">{l}</button>
                ))}
              </div>
            </div>
            <div>
              <div className="footer-col-title">Contact</div>
              {[
                { icon: '✉️', text: 'Info.mycityinfra@gmail.com' },
                { icon: '📍', text: 'W Road No. 5, Ramakrishnapuram, Kothapet, Hyderabad, Telangana 500102' },
                { icon: '🕐', text: 'Mon – Sat: 10AM – 6PM' },
              ].map((item) => (
                <div key={item.text} className="footer-contact-i">
                  <span className="footer-contact-icon">{item.icon}</span>
                  <span className="footer-contact-text">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-inner">
            <div className="footer-copy">
              © 2026 My City Infra DEVELOPMENTS LTD. ALL RIGHTS RESERVED.
            </div>
            <div className="footer-legal">
              {['Privacy', 'Terms', 'Disclaimer'].map((l) => (
                <button key={l} className="footer-legal-btn" onClick={() => navigate('/legal')}>
                  {l}
                </button>
              ))}
            </div>
          </div>
          <div className="footer-credit">
            Designed and developed by{' '}
            <a
              href="https://qwikdigitalsolutions.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-credit-link"
            >
              Qwik Digital IT Solution
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}