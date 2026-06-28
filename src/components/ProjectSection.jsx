import { useState, useRef } from 'react'
import { ArrowRight, Github } from 'lucide-react'
import './ProjectSection.css'

const PROJECTS = [
  { id: 1, category: 'DESIGN',  categoryColor: 'cat--design',  title: 'Superman Poster',              emoji: '🎇', desc: 'A poster design',    stack: ['Photoshop'],       github: '', img: '/img/Superman.jpeg' },
  { id: 2, category: 'MOBILE',  categoryColor: 'cat--mobile',  title: 'Ai Habit Tracker',      emoji: '🌿', desc: 'Productivity Mobile App',         stack: ['Flutter', 'Golang'],               github: 'https://github.com/AzkaNonchallant/ai-habit-tracker.git', img: null },
  { id: 3, category: 'WEB',     categoryColor: 'cat--web',     title: 'Face Recognition',  emoji: '😁', desc: 'Face Recognition',      stack: ['Python'],        github: 'https://github.com/AzkaNonchallant/Pengenal-MukaPY.git', img: null },
  { id: 4, category: 'MOBILE',  categoryColor: 'cat--mobile',  title: 'Rera 3D',       emoji: '🖌', desc: 'Drawing Platform That Lets you turn your 2D drawing into 3D',            stack: ['Flutter', 'Supabase', 'Three-js'],                   github: '#', img: '/img/Untitled.jpg' },
  { id: 5, category: 'WEB',     categoryColor: 'cat--web',     title: 'KPT',         emoji: '⭐', desc: 'A Website that is being used fopr tracking activity on the company',              stack: ['Code Igniter', 'JS'],                 github: 'https://github.com/AzkaNonchallant/kpt.git', img: null },
  { id: 6, category: 'BACKEND', categoryColor: 'cat--backend', title: 'Pet Tracker',        emoji: '🪸', desc: 'RESTful API for Mobile App',      stack: ['Node.js', 'Express', 'Mysql'],              github: '#', img: '' },
  { id: 7, category: 'WEB',     categoryColor: 'cat--web',     title: 'Inventory',  emoji: '🧺', desc: 'Website Tracking Activity With Chart',      stack: ['Laravel'],        github: 'https://github.com/AzkaNonchallant/Gudang.git', img: null },

]

const FILTERS = ['ALL PROJECTS', 'WEB', 'MOBILE', 'DESIGN', 'BACKEND']

export default function ProjectSection({ id }) {
  const [active, setActive] = useState('ALL PROJECTS')

  const filterSoundRef = useRef(null) 
  const hoverSoundRef  = useRef(null)  

  const playFilter = () => {
    const a = filterSoundRef.current
    if (!a) return
    a.currentTime = 0
    a.volume = 0.45
    a.play().catch(() => {})
  }

  const playHover = () => {
    const a = hoverSoundRef.current
    if (!a) return
    a.currentTime = 0
    a.volume = 0.35
    a.play().catch(() => {})
  }

  const handleFilter = (f) => {
    if (f !== active) playFilter()
    setActive(f)
  }

  const filtered = active === 'ALL PROJECTS'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === active)

  return (
    <section id={id} className="projects">
      {/* Audio elements */}
      <audio ref={filterSoundRef} src="/sounds/SectionProject.mp3"  preload="auto" />
      <audio ref={hoverSoundRef}  src="/sounds/pop.mp3"    preload="auto" />

      <div className="projects__header">
        <div className="projects__title-row">
          <span className="projects__icon">🐚</span>
          <h2 className="projects__title">PROJECTS</h2>
          <span className="projects__wave">〰〰〰</span>
        </div>
        <p className="projects__sub">Collection of my selected works and experiments.</p>
        <hr className="projects__rule" />
      </div>

      <div className="projects__filters">
        {FILTERS.map(f => (
          <button
            key={f}
            className={`projects__filter-btn ${active === f ? 'projects__filter-btn--active' : ''}`}
            onClick={() => handleFilter(f)}
          >
            {f === 'ALL PROJECTS' && <span className="filter-icon">⊞</span>}
            {f === 'WEB'          && <span className="filter-icon">🌐</span>}
            {f === 'MOBILE'       && <span className="filter-icon">📱</span>}
            {f === 'DESIGN'       && <span className="filter-icon">✏️</span>}
            {f === 'BACKEND'      && <span className="filter-icon">&lt;/&gt;</span>}
            {f}
          </button>
        ))}
      </div>

      <div className="projects__grid">
        {filtered.map(project => (
          <div
            key={project.id}
            className="project-card"
            onMouseEnter={playHover}
          >
           <div className="project-card__img">
  <span className={`project-card__cat ${project.categoryColor}`}>{project.category}</span>
  {project.img ? (
    <img
      src={project.img}
      alt={project.title}
      className="project-card__img-photo"
      loading="lazy"
    />
  ) : (
    <div className="project-card__img-placeholder" />
  )}
</div>
            <div className="project-card__body">
              <div className="project-card__title-row">
                <h3 className="project-card__title">
                  <span className="project-card__emoji">{project.emoji}</span>
                  {project.title}
                </h3>
                <a href={project.github} className="project-card__arrow" aria-label="Lihat project">
                  <ArrowRight size={18} strokeWidth={2} />
                </a>
              </div>
              <p className="project-card__desc">{project.desc}</p>
              <div className="project-card__footer">
                <div className="project-card__stack">
                  {project.stack.map(t => (
                    <span key={t} className="project-card__tag">{t}</span>
                  ))}
                </div>
                <a href={project.github} className="project-card__github" aria-label="GitHub">
                  <Github size={18} strokeWidth={2} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="projects__footer">
        <span className="projects__wave">〰〰〰</span>
        <span className="projects__footer-icon">🐚</span>
        <p className="projects__motto">Always building. Always learning.</p>
        <span className="projects__wave">〰〰〰</span>
      </div>
    </section>
  )
}