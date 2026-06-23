import { useState, useCallback, useRef } from 'react'
import DesktopWindow from './desktopWindow/desktopWindow.jsx'
import AboutSection   from '../components/AboutSection.jsx'
import ProjectSection from '../components/ProjectSection.jsx'
import ContactSection from '../components/ContactSection.jsx'

const WINDOW_DEFS = {
  about:    { title: 'about.exe',    Component: AboutSection,   initialPos: { x: 60,  y: 60  } },
  projects: { title: 'projects.exe', Component: ProjectSection, initialPos: { x: 120, y: 90  } },
  contact:  { title: 'contact.exe',  Component: ContactSection, initialPos: { x: 180, y: 120 } },
}

export function useWindowManager() {
  const [windows, setWindows] = useState([])

  // Simpan topZ di ref agar callback tidak punya stale closure
  const topZRef = useRef(200)

  const nextZ = () => {
    topZRef.current += 1
    return topZRef.current
  }

  const openWindow = useCallback((id) => {
    const z = nextZ()
    setWindows(prev => {
      const exists = prev.find(w => w.id === id)
      if (exists) {
        return prev.map(w => w.id === id ? { ...w, zIndex: z, minimized: false } : w)
      }
      return [...prev, { id, zIndex: z }]
    })
  }, [])

  const closeWindow = useCallback((id) => {
    setWindows(prev => prev.filter(w => w.id !== id))
  }, [])

  const focusWindow = useCallback((id) => {
    const z = nextZ()
    setWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex: z } : w))
  }, [])

  const WindowLayer = useCallback(() => (
    <>
      {windows.map(({ id, zIndex }) => {
        const def = WINDOW_DEFS[id]
        if (!def) return null
        const { Component, title, initialPos } = def
        return (
          <DesktopWindow
            key={id}
            id={id}
            title={title}
            initialPos={initialPos}
            zIndex={zIndex}
            onClose={closeWindow}
            onFocus={focusWindow}
          >
            <Component />
          </DesktopWindow>
        )
      })}
    </>
  ), [windows, closeWindow, focusWindow])

  return { openWindow, WindowLayer }
}