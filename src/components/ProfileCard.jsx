import {
  MapPin,
  ChevronUp,
  ChevronDown,
  Play,
  Pause,
  ArrowLeft,
} from "lucide-react";
import { useRef, useState, useEffect, useCallback } from "react";
import NavBar from "./NavBar.jsx";
import StatsBar from "./StatsBar.jsx";
import "./ProfileCard.css";

const TAGS = ['Data Analyst', 'Frontend Dev', 'Mobile Dev', 'Illustrator']

export default function ProfileCard({ onOpen }) {
  const audioRef    = useRef(null)
  const tagSoundRef = useRef(null)
  const clickSoundRef = useRef(null)
  const tagLoaded   = useRef(false)
  const clickLoaded = useRef(false)

  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = 0.5

    const tryPlay = () => {
      audio.play()
        .then(() => {
          setPlaying(true)
          document.removeEventListener("click", tryPlay)
          document.removeEventListener("keydown", tryPlay)
        })
        .catch(() => {})
    }

    document.addEventListener("click", tryPlay)
    document.addEventListener("keydown", tryPlay)

    return () => {
      audio.pause()
      document.removeEventListener("click", tryPlay)
      document.removeEventListener("keydown", tryPlay)
    }
  }, [])

  const togglePlay = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) { audio.pause(); setPlaying(false) }
    else         { audio.play();  setPlaying(true)  }
  }, [playing])

  const skipPrev = useCallback(() => {
    if (audioRef.current) audioRef.current.currentTime = 0
  }, [])

  const skipNext = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = 0
    audio.play()
    setPlaying(true)
  }, [])

  const playTagPop = useCallback(() => {
    const a = tagSoundRef.current
    if (!a) return
    if (!tagLoaded.current) { a.load(); tagLoaded.current = true }
    a.currentTime = 0
    a.volume = 0.35
    a.play().catch(() => {})
  }, [])

  const playClickSound = useCallback(() => {
    const a = clickSoundRef.current
    if (!a) return
    if (!clickLoaded.current) { a.load(); clickLoaded.current = true }
    a.currentTime = 0
    a.volume = 0.35
    a.play().catch(() => {})
  }, [])

  return (
    <section className="card outline" aria-label="Kartu profil">
     
      <audio
        ref={audioRef}
        src="/music/moonlight-hush.mp3"
        loop
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      />
      <audio ref={tagSoundRef}   src="/sounds/pop.mp3"   preload="none" />
      <audio ref={clickSoundRef} src="/sounds/click.mp3" preload="none" />

      <NavBar />

      <div className="card__body">
        <aside className="card__rail">
          <div className="card__field">
            <span className="card__field-label">School</span>
            <span className="card__field-value">SMK PLUS PELITA NUSANTARA</span>
          </div>

          <div className="card__field">
            <span className="card__field-label">Experience</span>
            <span className="card__field-value">8-9 Month Internship</span>
          </div>

          <div className="card__field card__field--name">
            <span className="card__field-label">Real name</span>
            <span className="card__field-value">Azka Aydirrafif Syah</span>
          </div>
        </aside>

        <div className="card__photo">
          <div className="card__photo-frame halftone--deep">
            <div className="card__photo-placeholder">
              <img
                src="/img/muka/Pendek.avif"
                loading="lazy"
                decoding="async"
                width={1100}
                height={1100}
                alt="Foto profil Azka"
                className="card__photo-img"
              />
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
            <img
              src="/img/Octopop.svg"
              alt="Album cover"
              width={56}
              height={56}
              className="card__media-thumb"
              loading="lazy"
            />
            <div className="card__media-arrows" />
          </div>
        </div>

        <div className="card__footer-block card__footer-block--center">
          <button type="button" className="card__player-btn" onClick={skipPrev} title="Restart">
            <ChevronUp size={16} strokeWidth={2.5} />
          </button>

          <div className="card__visualizer halftone--deep" aria-hidden="true" data-playing={playing}>
            {Array.from({ length: 24 }).map((_, i) => (
              <span key={i} className="card__visualizer-bar" />
            ))}
          </div>

          <button
            type="button"
            className="card__player-btn card__player-btn--play"
            onClick={togglePlay}
            onMouseEnter={playClickSound}
            title={playing ? "Pause" : "Play"}
          >
            {playing
              ? <Pause size={16} strokeWidth={2.5} fill="currentColor" />
              : <Play  size={16} strokeWidth={2.5} fill="currentColor" />
            }
          </button>

          <button type="button" className="card__player-btn" onClick={skipNext} title="Restart & Play">
            <ChevronDown size={16} strokeWidth={2.5} />
          </button>
        </div>

        <div className="card__footer-block card__footer-block--end">
          <div className="card__tags">
            {TAGS.map(tag => (
              <span key={tag} className="card__tag" onMouseEnter={playTagPop}>
                {tag}
              </span>
            ))}
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