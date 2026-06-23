import { useRef, useState, useEffect, useCallback } from 'react'
import { X, Minus } from 'lucide-react'
import './DesktopWindow.css'

export default function DesktopWindow({
  id,
  title,
  children,
  onClose,
  initialPos,
  zIndex,
  onFocus,
}) {
  const [pos, setPos] = useState(initialPos ?? { x: 100, y: 80 })
  const [minimized, setMinimized] = useState(false)

  const drag = useRef(null)
  const posRef = useRef(pos)

  useEffect(() => {
    posRef.current = pos
  }, [pos])

  // ✅ stable handlers biar event listener aman
  const onPointerMove = useCallback((e) => {
    if (!drag.current) return

    const dx = e.clientX - drag.current.startX
    const dy = e.clientY - drag.current.startY

    setPos({
      x: drag.current.startLeft + dx,
      y: drag.current.startTop + dy,
    })
  }, [])

  const onPointerUp = useCallback(() => {
    drag.current = null

    window.removeEventListener('pointermove', onPointerMove)
    window.removeEventListener('pointerup', onPointerUp)
  }, [onPointerMove])

  const onTitlebarPointerDown = (e) => {
    if (e.target.closest('button')) return

    e.preventDefault()
    e.stopPropagation()

    onFocus?.(id)

    drag.current = {
      startX: e.clientX,
      startY: e.clientY,
      startLeft: posRef.current.x,
      startTop: posRef.current.y,
    }

    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
  }

  // optional debug (kalau perlu)
  useEffect(() => {
    // console.log('pos changed:', pos)
  }, [pos])

  return (
    <div
      className={`dwindow ${minimized ? 'dwindow--minimized' : ''}`}
      style={{ left: `${pos.x}px`, top: `${pos.y}px`, zIndex }}
    >
      <div className="dwindow__titlebar" onPointerDown={onTitlebarPointerDown}>
        <span className="dwindow__title">{title}</span>

        <div className="dwindow__controls">
          <button
            className="dwindow__btn dwindow__btn--min"
            onClick={(e) => {
              e.stopPropagation()
              setMinimized((m) => !m)
            }}
          >
            <Minus size={10} strokeWidth={3} />
          </button>

          <button
            className="dwindow__btn dwindow__btn--close"
            onClick={(e) => {
              e.stopPropagation()
              onClose(id)
            }}
          >
            <X size={10} strokeWidth={3} />
          </button>
        </div>
      </div>

      {!minimized && <div className="dwindow__body">{children}</div>}
    </div>
  )
}