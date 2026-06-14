import { Heart, Star, MessageCircle } from 'lucide-react'
import './StatsBar.css'

const STATS = [
  { icon: Heart, value: '977', label: 'Apresiasi' },
  { icon: Star, value: '730', label: 'Proyek selesai' },
  { icon: MessageCircle, value: '444', label: 'Ulasan klien' },
]

export default function StatsBar() {
  return (
    <ul className="stats-bar" aria-label="Statistik singkat">
      {STATS.map(({ icon: Icon, value, label }) => (
        <li key={label} className="stats-bar__item" title={label}>
          <Icon size={14} strokeWidth={2.5} aria-hidden="true" />
          <span>{value}</span>
        </li>
      ))}
    </ul>
  )
}
