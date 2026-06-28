import { useRef, useState, useEffect } from 'react'
import { X, Minus } from 'lucide-react'
import './DesktopWindow.css'

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    () => window.matchMedia(`(max-width: ${breakpoint}px)`).matches
  )

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`)
    const handler = (e) => setIsMobile(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [breakpoint])

  return isMobile
}

export default function DesktopWindow({ id, title, children, onClose, initialPos, zIndex, onFocus }) {
  const [pos, setPos] = useState(initialPos ?? { x: 100, y: 80 })
  const [minimized, setMinimized] = useState(false)
  const drag = useRef(null)
  const isMobile = useIsMobile()

  const onTitlebarPointerDown = (e) => {
    if (isMobile) return // mobile = fixed bottom sheet, gak perlu drag
    if (e.target.closest('button')) return
    e.preventDefault()
    onFocus?.(id)
    drag.current = {
      startX: e.clientX,
      startY: e.clientY,
      startLeft: pos.x,
      startTop: pos.y,
    }

    const onMove = (ev) => {
      if (!drag.current) return
      setPos({
        x: drag.current.startLeft + ev.clientX - drag.current.startX,
        y: drag.current.startTop + ev.clientY - drag.current.startY,
      })
    }

    const onUp = () => {
      drag.current = null
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
  }

  return (
    <>
      {isMobile && (
        <div
          className="dwindow__backdrop"
          onClick={() => onClose(id)}
          style={{ zIndex: zIndex - 1 }}
        />
      )}
      <div
        className={`dwindow ${minimized ? 'dwindow--minimized' : ''}`}
        style={
          isMobile
            ? { zIndex, position: 'fixed' } // posisi diatur CSS, bukan inline
            : { left: pos.x, top: pos.y, zIndex, position: 'fixed', transform: 'none' }
        }
        onPointerDown={(e) => {
          if (e.target.closest('button')) return
          onFocus?.(id)
        }}
      >
        <div className="dwindow__titlebar" onPointerDown={onTitlebarPointerDown}>
          <span className="dwindow__title">{title}</span>
          <div className="dwindow__controls">
            <button
              className="dwindow__btn dwindow__btn--min"
              onClick={(e) => { e.stopPropagation(); setMinimized(m => !m) }}
            >
              <Minus size={10} strokeWidth={3} />
            </button>
            <button
              className="dwindow__btn dwindow__btn--close"
              onClick={(e) => { e.stopPropagation(); onClose(id) }}
            >
              <X size={10} strokeWidth={3} />
            </button>
          </div>
        </div>

        {!minimized && <div className="dwindow__body">{children}</div>}
      </div>
    </>
  )
}