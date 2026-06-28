import { Users, Folder } from 'lucide-react'
import './StatsBar.css'

const STATS = [
  { icon: Users,         value: 'About', label: 'About',      windowId: 'about'    },
  { icon: Folder,          value: 'Project', label: 'Proyek selesai', windowId: 'projects' },
  { icon: Folder,          value: 'Contact', label: 'Proyek selesai', windowId: 'contact' },

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