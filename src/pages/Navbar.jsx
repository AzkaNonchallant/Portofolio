import { LayoutGrid, Home, User, Phone } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import './NavBar.css'

const NAV_ITEMS = [
  { icon: Home,       label: 'Beranda',     path: '/'         },
  { icon: Phone,      label: 'About',       path: '/about'    },
  { icon: LayoutGrid, label: 'Semua proyek',path: '/projects' },
  { icon: User,       label: 'Contact Me',  path: '/contact'  },
]

export default function NavBar() {
  const navigate = useNavigate()

  return (
    <nav className="navbar" aria-label="Navigasi utama">
      <ul className="navbar__icons">
        {NAV_ITEMS.map(({ icon: Icon, label, path }) => (
          <li key={label}>
            <button
              type="button"
              className="navbar__btn"
              title={label}
              onClick={() => navigate(path)}
            >
              <Icon size={16} strokeWidth={2.5} aria-hidden="true" />
              <span className="sr-only">{label}</span>
            </button>
          </li>
        ))}
        <li className="navbar__avatar" aria-hidden="true">
          <div className="navbar__avatar-img" />
        </li>
      </ul>

      <div className="navbar__page">
        <span className="navbar__page-mark">Az</span>
        <span className="navbar__page-num">K4</span>
      </div>
    </nav>
  )
}