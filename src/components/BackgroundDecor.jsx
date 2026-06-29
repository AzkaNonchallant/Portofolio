import { useState, useEffect, useRef, useCallback, lazy, Suspense } from 'react'
import { createPortal } from 'react-dom'
import { useTheme } from '../context/themeContext.jsx'
import './BackgroundDecor.css'

function Star({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <path d="M12 0 L15 9 L24 12 L15 15 L12 24 L9 15 L0 12 L9 9 Z" fill="currentColor" />
    </svg>
  )
}
function Diamond({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <rect x="3" y="3" width="18" height="18" rx="2" transform="rotate(20 12 12)" fill="currentColor" />
    </svg>
  )
}
function Triangle({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <path d="M12 2 L22 20 L2 20 Z" fill="currentColor" />
    </svg>
  )
}

function Seaweed({ className }) {
  return (
    <svg viewBox="0 0 40 120" className={className} aria-hidden="true" focusable="false">
      <path
        d="M20 120 C20 100 5 90 10 70 C15 50 30 45 25 25 C22 12 15 8 20 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path d="M20 90 C30 85 38 75 32 65" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      <path d="M18 60 C8 55 2 45 10 38" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  )
}
function Bubble({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.6" />
      <circle cx="8" cy="8" r="2" fill="currentColor" opacity="0.3" />
    </svg>
  )
}
function Starfish({ className }) {
  return (
    <svg viewBox="0 0 60 60" className={className} aria-hidden="true" focusable="false">
      <path
        d="M30 5 L35 22 L52 18 L40 30 L52 42 L35 38 L30 55 L25 38 L8 42 L20 30 L8 18 L25 22 Z"
        fill="currentColor"
        opacity="0.85"
      />
    </svg>
  )
}
function Shell({ className }) {
  return (
    <svg viewBox="0 0 50 50" className={className} aria-hidden="true" focusable="false">
      <path d="M25 45 C10 45 5 30 5 20 C5 10 15 5 25 5 C35 5 45 10 45 20 C45 30 40 45 25 45Z" fill="currentColor" opacity="0.8" />
      <path d="M25 5 L25 45" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
      <path d="M10 15 Q25 25 40 15" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="none" />
      <path d="M7 25 Q25 35 43 25" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="none" />
      <path d="M10 35 Q25 42 40 35" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" fill="none" />
    </svg>
  )
}

function OceanDecorations() {
  return (
    <>
      <Seaweed className="decor__shape decor__seaweed decor__seaweed--a" />
      <Seaweed className="decor__shape decor__seaweed decor__seaweed--b" />
      <Seaweed className="decor__shape decor__seaweed decor__seaweed--c" />
      <Bubble className="decor__shape decor__bubble decor__bubble--a" />
      <Bubble className="decor__shape decor__bubble decor__bubble--b" />
      <Bubble className="decor__shape decor__bubble decor__bubble--c" />
      <Bubble className="decor__shape decor__bubble decor__bubble--d" />
      <Bubble className="decor__shape decor__bubble decor__bubble--e" />
      <Starfish className="decor__shape decor__starfish decor__starfish--a" />
      <Starfish className="decor__shape decor__starfish decor__starfish--b" />
      <Shell className="decor__shape decor__shell decor__shell--a" />
      <Shell className="decor__shape decor__shell decor__shell--b" />
    </>
  )
}

const SQUID_LINES = [
  "Halo! 👋",
  "Lagi cari project apa nih?",
  "Klik tombol Contact yuk!",
  "Klik Angler Untuk Kembali Ke Tema Sebelumnya!",
]
const INK_DURATION   = 1800
const LIGHT_DURATION = 1800

function useTimers() {
  const refs = useRef({})

  const set = useCallback((key, fn, delay) => {
    clearTimeout(refs.current[key])
    refs.current[key] = setTimeout(fn, delay)
  }, [])

  const clear = useCallback((...keys) => {
    keys.forEach(k => clearTimeout(refs.current[k]))
  }, [])

  const clearAll = useCallback(() => {
    Object.values(refs.current).forEach(clearTimeout)
  }, [])

  useEffect(() => () => clearAll(), [clearAll])

  return { set, clear, clearAll }
}

function SquidMascot() {
  const { theme, toggleTheme } = useTheme()
  const [frame, setFrame]           = useState(0)
  const [bubbleText, setBubbleText] = useState(null)
  const [inkActive, setInkActive]   = useState(false)
  const [inkPos, setInkPos]         = useState({ x: '92%', y: '88%' })
  const [mounted, setMounted]       = useState(false)
  const [busy, setBusy]             = useState(false)

  const wrapRef = useRef(null)
  const { set, clearAll } = useTimers()

  const scheduleNextBlink = useCallback(() => {
    const delay = 2500 + Math.random() * 3000
    set('blink', () => {
      setFrame(prev => {
        if (prev === 2) { scheduleNextBlink(); return prev }
        return 1
      })
      set('restore', () => { setFrame(0); scheduleNextBlink() }, 120)
    }, delay)
  }, [set])

  // Use requestIdleCallback so mascot doesn't block initial paint
  useEffect(() => {
    const id = typeof requestIdleCallback !== 'undefined'
      ? requestIdleCallback(() => { setMounted(true); scheduleNextBlink() })
      : setTimeout(() => { setMounted(true); scheduleNextBlink() }, 200)

    return () => {
      if (typeof cancelIdleCallback !== 'undefined') cancelIdleCallback(id)
      else clearTimeout(id)
      clearAll()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const showBubble = useCallback(() => {
    const text = SQUID_LINES[Math.floor(Math.random() * SQUID_LINES.length)]
    setBubbleText(text)
    set('bubble', () => setBubbleText(null), 2500)
  }, [set])

  const handleClick = useCallback(() => {
    if (busy) return
    setBusy(true)
    clearAll()
    setFrame(2)
    showBubble()

    if (theme === 'blue') {
      if (wrapRef.current) {
        const rect = wrapRef.current.getBoundingClientRect()
        setInkPos({
          x: `${((rect.left + rect.width / 2) / window.innerWidth) * 100}%`,
          y: `${((rect.top + rect.height * 0.3) / window.innerHeight) * 100}%`,
        })
      }
      setInkActive(true)
      set('themeSwap', () => toggleTheme(), INK_DURATION * 0.45)
      set('inkEnd', () => {
        setInkActive(false)
        setFrame(0)
        setBusy(false)
        scheduleNextBlink()
      }, INK_DURATION)
    } else {
      set('restore', () => {
        setFrame(0)
        setBusy(false)
        scheduleNextBlink()
      }, 900)
    }
  }, [busy, theme, toggleTheme, showBubble, clearAll, set, scheduleNextBlink])

  // Keyboard accessibility
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }, [handleClick])

  const src = frame === 0
    ? '/img/Squid2.avif'
    : frame === 1
    ? '/img/Squid1.avif'
    : '/img/SquidSup.avif'

  return (
    <>
      <div className="decor__squid-wrap" ref={wrapRef}>
        {bubbleText && (
          <div className="decor__squid-bubble is-visible" role="status" aria-live="polite">
            {bubbleText}
          </div>
        )}
        <img
          src={src}
          alt="Squid maskot — klik untuk ganti tema"
          className={`decor__squid${frame === 2 ? ' decor__squid--surprised' : ''}`}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          onMouseEnter={showBubble}
          role="button"
          tabIndex={0}
          draggable={false}
          decoding={frame === 0 ? 'sync' : 'async'}
        />
      </div>

      {mounted && createPortal(
        <div
          className={`decor__ink-overlay${inkActive ? ' is-active' : ''}`}
          style={{ '--ink-x': inkPos.x, '--ink-y': inkPos.y }}
          aria-hidden="true"
        />,
        document.body
      )}
    </>
  )
}

// ---------- AnglerfishMascot ----------
function AnglerfishMascot() {
  const { theme, toggleTheme } = useTheme()
  const [frame, setFrame]             = useState(0)
  const [lightActive, setLightActive] = useState(false)
  const [lightPos, setLightPos]       = useState({ x: '8%', y: '85%' })
  const [mounted, setMounted]         = useState(false)
  const [busy, setBusy]               = useState(false)

  const wrapRef      = useRef(null)
  const tagRefSound  = useRef(null)
  const { set, clearAll } = useTimers()

  const scheduleNextNengok = useCallback(() => {
    const delay = 3000 + Math.random() * 3000
    set('nengok', () => {
      setFrame(prev => {
        if (prev === 2) { scheduleNextNengok(); return prev }
        return 1
      })
      set('restore', () => { setFrame(0); scheduleNextNengok() }, 350)
    }, delay)
  }, [set])

  useEffect(() => {
    const id = typeof requestIdleCallback !== 'undefined'
      ? requestIdleCallback(() => { setMounted(true); scheduleNextNengok() })
      : setTimeout(() => { setMounted(true); scheduleNextNengok() }, 250)

    return () => {
      if (typeof cancelIdleCallback !== 'undefined') cancelIdleCallback(id)
      else clearTimeout(id)
      clearAll()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const playTagClick = useCallback(() => {
    const a = tagRefSound.current
    if (!a) return
    a.currentTime = 0
    a.volume = 0.35
    a.play().catch(() => {})
  }, [])

  const handleClick = useCallback(() => {
    if (theme !== 'dark' || busy) return
    setBusy(true)
    clearAll()

    if (wrapRef.current) {
      const rect = wrapRef.current.getBoundingClientRect()
      setLightPos({
        x: `${((rect.left + rect.width * 0.62) / window.innerWidth) * 100}%`,
        y: `${((rect.top + rect.height * 0.12) / window.innerHeight) * 100}%`,
      })
    }

    setFrame(2)
    setLightActive(true)
    set('themeSwap', () => toggleTheme(), LIGHT_DURATION * 0.45)
    set('lightEnd', () => {
      setLightActive(false)
      setFrame(0)
      setBusy(false)
      scheduleNextNengok()
    }, LIGHT_DURATION)
  }, [theme, busy, toggleTheme, clearAll, set, scheduleNextNengok])

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }, [handleClick])

  const src = frame === 0
    ? '/img/AnglerIdle.avif'
    : frame === 1
    ? '/img/AnglerNengok.avif'
    : '/img/AnglerNyala.avif'

  const isInteractive = theme === 'dark'

  return (
    <>
      <audio ref={tagRefSound} src="/sounds/Light.mp3" preload="none" />

      <div
        className={`decor__angler-wrap${theme === 'dark' ? ' is-active' : ''}`}
        ref={wrapRef}
      >
        <img
          src={src}
          alt={isInteractive ? 'Anglerfish maskot — klik untuk ganti tema' : 'Anglerfish maskot'}
          className={`decor__angler${frame === 2 ? ' decor__angler--nyala' : ''}`}
          onClick={handleClick}
          onKeyDown={isInteractive ? handleKeyDown : undefined}
          onMouseEnter={playTagClick}
          role={isInteractive ? 'button' : undefined}
          tabIndex={isInteractive ? 0 : -1}
          draggable={false}
          decoding="async"
          loading="lazy"
        />
      </div>

      {mounted && createPortal(
        <div
          className={`decor__ink-overlay${lightActive ? ' is-active' : ''}`}
          style={{
            '--ink-x': lightPos.x,
            '--ink-y': lightPos.y,
            '--overlay-color': 'var(--blue)',
          }}
          aria-hidden="true"
        />,
        document.body
      )}
    </>
  )
}

export default function BackgroundDecor() {
  return (
    <>
     
      <div className="decor" aria-hidden="true">
        <Star     className="decor__shape decor__shape--pink   decor__shape--a" />
        <Star     className="decor__shape decor__shape--cream  decor__shape--b" />
        <Diamond  className="decor__shape decor__shape--yellow decor__shape--c" />
        <Triangle className="decor__shape decor__shape--cream  decor__shape--d" />
        <Diamond  className="decor__shape decor__shape--pink   decor__shape--e" />
        <Star     className="decor__shape decor__shape--yellow decor__shape--f" />
        <OceanDecorations />
        
      </div>
      <SquidMascot />
      <AnglerfishMascot />
    </>
  )
}