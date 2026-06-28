// windowManager.jsx

import { useState, useRef } from 'react'
import DesktopWindow from './desktopWindow/desktopWindow.jsx'
import AboutSection   from '../components/AboutSection.jsx'
import ProjectSection from '../components/ProjectSection.jsx'
import ContactSection from '../components/ContactSection.jsx'

const WINDOW_DEFS = {
  about:    { title: 'about.exe',    Component: AboutSection,   initialPos: { x: 60,  y: 60  } },
  projects: { title: 'projects.exe', Component: ProjectSection, initialPos: { x: 120, y: 90  } },
  contact:  { title: 'contact.exe',  Component: ContactSection, initialPos: { x: 180, y: 120 } },
}

// ✅ Komponen di LUAR hook — tidak pernah di-remount
function WindowLayer({ windows, onClose, onFocus }) {
  return (
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
            onClose={onClose}
            onFocus={onFocus}
          >
            <Component />
          </DesktopWindow>
        )
      })}
    </>
  )
}

export function useWindowManager() {
  const [windows, setWindows] = useState([])
  const topZRef = useRef(200)

  const nextZ = () => {
    topZRef.current += 1
    return topZRef.current
  }

  const openWindow = (id) => {
    const z = nextZ()
    setWindows(prev => {
      if (prev.find(w => w.id === id)) {
        return prev.map(w => w.id === id ? { ...w, zIndex: z } : w)
      }
      return [...prev, { id, zIndex: z }]
    })
  }

  const closeWindow = (id) => {
    setWindows(prev => prev.filter(w => w.id !== id))
  }

  const focusWindow = (id) => {
    const z = nextZ()
    setWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex: z } : w))
  }


  const renderWindows = (
    <WindowLayer
      windows={windows}
      onClose={closeWindow}
      onFocus={focusWindow}
    />
  )

  return { openWindow, renderWindows }
}