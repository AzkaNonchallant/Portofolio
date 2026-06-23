import { Heart, Star, MessageCircle } from 'lucide-react'
import './StatsBar.css'

const STATS = [
  { icon: Heart,         value: '977', label: 'Apresiasi',      windowId: 'about'    },
  { icon: Star,          value: '730', label: 'Proyek selesai', windowId: 'projects' },
  { icon: MessageCircle, value: '444', label: 'Ulasan klien',   windowId: 'contact'  },
]

export default function StatsBar({ onOpen }) {
  return (
    <ul className="stats-bar" aria-label="Statistik singkat">
      {STATS.map(({ icon: Icon, value, label, windowId }) => (
        <li
          key={label}
          className="stats-bar__item"
          title={`Buka ${label}`}
          onClick={() => onOpen?.(windowId)}
          style={{ cursor: onOpen ? 'pointer' : 'default' }}
        >
          <Icon size={14} strokeWidth={2.5} aria-hidden="true" />
          <span>{value}</span>
        </li>
      ))}
    </ul>
  )
}