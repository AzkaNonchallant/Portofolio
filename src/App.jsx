import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BackgroundDecor from './components/BackgroundDecor.jsx'
import ProfileCard from './components/ProfileCard.jsx'
import SiteFooter from './components/SiteFooter.jsx'
import { useWindowManager } from './desktop/windowManager.jsx'
import './App.css'
import Contact from './pages/Contact.jsx'

function Home() {
  const { openWindow, WindowLayer } = useWindowManager()

  return (
    <main className="page halftone">
      <BackgroundDecor />

      <div className="page__content">
        <section className="hero-section">
          <ProfileCard onOpen={openWindow} />
        </section>
        <SiteFooter />
      </div>

      <div className="window-layer">
        <WindowLayer />
      </div>
    </main>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  )
}