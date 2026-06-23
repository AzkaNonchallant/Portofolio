import { MapPin, ChevronUp, ChevronDown, Play, ArrowLeft } from 'lucide-react'
import NavBar from './NavBar.jsx'
import StatsBar from './StatsBar.jsx'
import './ProfileCard.css'

export default function ProfileCard({ onOpen }) {
  return (
    <section className="card outline" aria-label="Kartu profil">
      <NavBar />

      <div className="card__body">
        <aside className="card__rail">
          <div className="card__field">
            <span className="card__field-label">School</span>
            <span className="card__field-value">SMK PLUS PELITA NUSANTARA</span>
          </div>

          <div className="card__field">
            <span className="card__field-label">Experience</span>
            <span className="card__field-value">8-9 Month</span>
          </div>

          <div className="card__field card__field--name">
            <span className="card__field-label">Real name</span>
            <span className="card__field-value">Azka Aydirrafif Syah</span>
          </div>

          <button type="button" className="card__back">
            <ArrowLeft size={14} strokeWidth={2.5} />
            Kembali
          </button>
        </aside>

        <div className="card__photo">
          <div className="card__photo-frame halftone--deep">
            <div className="card__photo-placeholder">
              <span className="card__photo-hint">Foto profil di sini</span>
            </div>
          </div>

          <h1 className="card__name">
            <span>Azka</span>
            <span>Aydirrafif</span>
          </h1>

          <div className="card__stats">
            <StatsBar onOpen={onOpen} />
          </div>
        </div>
      </div>

      <div className="card__footer">
        <div className="card__footer-block">
          <div>
            <span className="card__field-label">Years active</span>
            <p className="card__years">2024 — Now</p>
          </div>
          <div className="card__media">
            <div className="card__media-thumb" aria-hidden="true" />
            <div className="card__media-arrows" />
          </div>
        </div>

        {/* Music player — dikembalikan */}
        <div className="card__footer-block card__footer-block--center">
          <button type="button" className="card__player-btn">
            <ChevronUp size={16} strokeWidth={2.5} />
          </button>

          <div className="card__visualizer halftone--deep" aria-hidden="true">
            {Array.from({ length: 24 }).map((_, i) => (
              <span key={i} className="card__visualizer-bar" />
            ))}
          </div>

          <button type="button" className="card__player-btn card__player-btn--play">
            <Play size={16} strokeWidth={2.5} fill="currentColor" />
          </button>

          <button type="button" className="card__player-btn">
            <ChevronDown size={16} strokeWidth={2.5} />
          </button>
        </div>

        <div className="card__footer-block card__footer-block--end">
          <div className="card__tags">
            <span className="card__tag">Data Analyst</span>
            <span className="card__tag">Frontend Dev</span>
            <span className="card__tag">Mobile Dev</span>
            <span className="card__tag">Illustrator</span>
          </div>
          <p className="card__location">
            <MapPin size={14} strokeWidth={2.5} />
            Cibinong, Indonesia
          </p>
        </div>
      </div>
    </section>
  )
}