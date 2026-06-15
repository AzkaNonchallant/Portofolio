import BackgroundDecor from '../components/BackgroundDecor.jsx'
import NavBar from '../components/NavBar.jsx'
import AboutSection from '../components/AboutSection.jsx'
import SiteFooter from '../components/SiteFooter.jsx'
import '../App.css'
import ProfileCard from '../components/ProfileCard.jsx'

export default function About() {
  return (
    <main className="page halftone">
      <BackgroundDecor />
      <div className="page__content">
        
        <ProfileCard />
        <AboutSection />
        
        <SiteFooter />
      </div>
    </main>
  )
}