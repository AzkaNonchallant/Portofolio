import { Mail, Instagram, Github } from 'lucide-react'
import './SiteFooter.css'

const LINKS = [
  { icon: Mail, label: 'Email', href: 'mailto:azkaaydirrafifsyah@gmail.com/' },
  { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/azkarafif42/' },
  { icon: Github, label: 'GitHub', href: 'https://github.com/AzkaNonchallant' },
]

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <p className="site-footer__text">
        Open In Desktop In Order to See More Gimmicks
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
