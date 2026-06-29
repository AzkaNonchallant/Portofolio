import { Users, Folder } from 'lucide-react'
import { useRef } from 'react'
import './StatsBar.css'

const STATS = [
  { icon: Users,  value: 'About',   label: 'About',           windowId: 'about'    },
  { icon: Folder, value: 'Project', label: 'Proyek selesai',  windowId: 'projects' },
  { icon: Folder, value: 'Contact', label: 'Contact',         windowId: 'contact'  },
]

export default function StatsBar({ onOpen }) {
  const popRef    = useRef(null)
  const popLoaded = useRef(false)

  const playPop = () => {
    const a = popRef.current
    if (!a) return
    if (!popLoaded.current) { a.load(); popLoaded.current = true }
    a.currentTime = 0
    a.volume = 0.4
    a.play().catch(() => {})
  }

  const handleClick = (windowId) => {
    playPop()
    onOpen?.(windowId)
  }

  return (
    <>
      <audio ref={popRef} src="/sounds/flashlight.mp3" preload="none" />
      <ul className="stats-bar" aria-label="Statistik singkat">
        {STATS.map(({ icon: Icon, value, label, windowId }) => (
          <li
            key={label}
            className="stats-bar__item"
            title={`Buka ${label}`}
            onClick={() => handleClick(windowId)}
            style={{ cursor: onOpen ? 'pointer' : 'default' }}
          >
            <Icon size={14} strokeWidth={2.5} aria-hidden="true" />
            <span>{value}</span>
          </li>
        ))}
      </ul>
    </>
  )
}