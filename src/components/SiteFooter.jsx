import { Mail, Instagram, Github } from 'lucide-react'
import './SiteFooter.css'

const LINKS = [
  { icon: Mail, label: 'Email', href: 'mailto:hello@example.com' },
  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com' },
  { icon: Github, label: 'GitHub', href: 'https://github.com' },
]

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <p className="site-footer__text">
        Yuk kolaborasi — kirim pesan dan ceritakan idemu.
      </p>

      <ul className="site-footer__links">
        {LINKS.map(({ icon: Icon, label, href }) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="site-footer__link"
              title={label}
            >
              <Icon size={16} strokeWidth={2.5} aria-hidden="true" />
              <span className="sr-only">{label}</span>
            </a>
          </li>
        ))}
      </ul>

      <p className="site-footer__copy">© {new Date().getFullYear()} Azka Aydirrafif</p>
    </footer>
  )
}
