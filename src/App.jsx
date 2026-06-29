
import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext.jsx'
import './App.css'


import BackgroundDecor from './components/BackgroundDecor.jsx'
import ProfileCard     from './components/ProfileCard.jsx'
import SiteFooter      from './components/SiteFooter.jsx'


const AboutSection   = lazy(() => import('./components/AboutSection.jsx'))
const ProjectSection = lazy(() => import('./components/ProjectSection.jsx'))
const ContactSection = lazy(() => import('./components/ContactSection.jsx'))
const Contact        = lazy(() => import('./pages/Contact.jsx'))


import { useWindowManager } from './desktop/windowManager.jsx'


function WindowFallback() {
  return <div style={{ padding: '2rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', opacity: 0.5 }}>Loading...</div>
}

const LAZY_WINDOW_DEFS = {
  about:    { title: 'about.exe',    Component: AboutSection,   initialPos: { x: 60,  y: 60  } },
  projects: { title: 'projects.exe', Component: ProjectSection, initialPos: { x: 120, y: 90  } },
  contact:  { title: 'contact.exe',  Component: ContactSection, initialPos: { x: 180, y: 120 } },
}

function Home() {
  const { openWindow, renderWindows } = useWindowManager(LAZY_WINDOW_DEFS)

  return (
    <main className="page halftone">
      <BackgroundDecor />
      <Suspense fallback={<WindowFallback />}>
        {renderWindows}
      </Suspense>
      <div className="page__content">
        <ProfileCard onOpen={openWindow} />
        <SiteFooter />
      </div>
    </main>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/contact"
            element={
              <Suspense fallback={<WindowFallback />}>
                <Contact />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}