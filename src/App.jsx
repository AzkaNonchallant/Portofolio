import BackgroundDecor from './components/BackgroundDecor.jsx'
import ProfileCard from './components/ProfileCard.jsx'
import AboutSection from './components/AboutSection.jsx'
import SiteFooter from './components/SiteFooter.jsx'
import './App.css'

export default function App() {
  return (
    <main className="page halftone">
      <BackgroundDecor />

      <div className="page__content">

        {/* SECTION GABUNGAN */}
        <section className="hero-section">
          <ProfileCard />

          <div className="divider"></div>

          <AboutSection />
        </section>

        <SiteFooter />
      </div>
    </main>
  )
}