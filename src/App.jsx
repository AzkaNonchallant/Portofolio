import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BackgroundDecor from './components/BackgroundDecor.jsx'
import ProfileCard from './components/ProfileCard.jsx'
import SiteFooter from './components/SiteFooter.jsx'
import PageTransition from './components/PageTransition.jsx'
import { useWindowManager } from './desktop/WindowManager.jsx'
import './App.css'

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

  <WindowLayer />
</main>
)
}

export default function App() {
  return (
    <BrowserRouter>
   
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
   
    </BrowserRouter>
  )
}