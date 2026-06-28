import { LayoutGrid, User, Phone } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import './NavBar.css'

const NAV_ITEMS = [
  { icon: User,       label: 'About',        path: '/about'    },
  { icon: LayoutGrid, label: 'Semua proyek', path: '/projects' },
  { icon: Phone,      label: 'Contact Me',   path: '/contact'  },
]

export default function NavBar() {
  const navigate  = useNavigate()
  const popRef    = useRef(null)

  const playPop = () => {
    const a = popRef.current
    if (!a) return
    a.currentTime = 0
    a.volume = 0.4
    a.play().catch(() => {})
  }

  const handleNav = (path) => {
    playPop()
    navigate(path)
  }

  return (
    <nav className="navbar" aria-label="Navigasi utama">
      <audio ref={popRef} src="/sounds/pop.mp3" preload="auto" />

      <ul className="navbar__icons">
       
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