import BackgroundDecor from '../components/BackgroundDecor.jsx'
import NavBar from '../components/NavBar.jsx'
import ProjectSection from '../components/ProjectSection.jsx'
import SiteFooter from '../components/SiteFooter.jsx'
import '../App.css'

export default function Projects() {
  return (
    <main className="page halftone">
      <BackgroundDecor />
      <div className="page__content">
        <div className="card outline" style={{ marginBottom: '24px' }}>
          <NavBar />
        </div>
        <ProjectSection />
        <SiteFooter />
      </div>
    </main>
  )
}