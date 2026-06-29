import { useState, useRef, useCallback } from 'react'
import { ArrowRight, Github } from 'lucide-react'
import './ProjectSection.css'

const PROJECTS = [
  { id: 1, category: 'DESIGN',  categoryColor: 'cat--design',  title: 'Superman Poster',   emoji: '🎇', desc: 'A poster design',                                              stack: ['Photoshop'],                     github: '',                                                          img: '/img/Superman.avif' },
  { id: 2, category: 'MOBILE',  categoryColor: 'cat--mobile',  title: 'Ai Habit Tracker',  emoji: '🌿', desc: 'Productivity Mobile App',                                      stack: ['Flutter', 'Golang'],             github: 'https://github.com/AzkaNonchallant/ai-habit-tracker.git',  img: '/img/ai.avif' },
  { id: 3, category: 'WEB',     categoryColor: 'cat--web',     title: 'Face Recognition',  emoji: '😁', desc: 'Hand Recognition',                                             stack: ['Python'],                        github: 'https://github.com/AzkaNonchallant/Pengenal-MukaPY.git',  img: '/img/python.avif' },
  { id: 4, category: 'MOBILE',  categoryColor: 'cat--mobile',  title: 'Rera 3D',           emoji: '🖌', desc: 'Turn your 2D drawing into 3D',                                 stack: ['Flutter', 'Supabase', 'Three-js'], github: '#',                                                        img: '/img/Rera.avif' },
  { id: 5, category: 'WEB',     categoryColor: 'cat--web',     title: 'KPT',               emoji: '⭐', desc: 'Tracking activity on the company',                             stack: ['Code Igniter', 'JS'],            github: 'https://github.com/AzkaNonchallant/kpt.git',               img: null },
  { id: 6, category: 'BACKEND', categoryColor: 'cat--backend', title: 'Pet Tracker',       emoji: '🪸', desc: 'RESTful API for Mobile App',                                   stack: ['Node.js', 'Express', 'Mysql'],   github: '#',                                                         img: '/img/Express.avif' },
  { id: 7, category: 'WEB',     categoryColor: 'cat--web',     title: 'Inventory',         emoji: '🧺', desc: 'Website Tracking Activity With Chart',                         stack: ['Laravel'],                       github: 'https://github.com/AzkaNonchallant/Gudang.git',            img: '/img/inventory.avif' },
  { id: 8, category: 'MOBILE',     categoryColor: 'cat--mobile',     title: 'Iphone',         emoji: '📟', desc: 'Landing Page',                         stack: ['Flutter'],                       github: 'https://github.com/AzkaNonchallant/Landing-Page-nyoba-.git',            img: '/img/Landing.avif' },
  { id: 9, category: 'BACKEND',     categoryColor: 'cat--backend',     title: 'Money Tracker',         emoji: '💰', desc: 'Money Tracking API',                         stack: ['Express', 'Node.js'],                       github: 'https://github.com/AzkaNonchallant/duit-be.git',            img: '/img/Be.avif' },
]

const FILTERS = ['ALL PROJECTS', 'WEB', 'MOBILE', 'DESIGN', 'BACKEND']

function ProjectCard({ project, onHover }) {
  return (
    <div className="project-card" onMouseEnter={onHover}>
      <div className="project-card__img">
        <span className={`project-card__cat ${project.categoryColor}`}>{project.category}</span>
        {project.img
          ? <img src={project.img} alt={project.title} className="project-card__img-photo" loading="lazy" decoding="async" />
          : <div className="project-card__img-placeholder" />
        }
      </div>
      <div className="project-card__body">
        <div className="project-card__title-row">
          <h3 className="project-card__title">
            <span className="project-card__emoji">{project.emoji}</span>
            {project.title}
          </h3>
          {project.github && project.github !== '#' && (
            <a href={project.github} className="project-card__arrow" aria-label="Lihat project" target="_blank" rel="noopener noreferrer">
              <ArrowRight size={18} strokeWidth={2} />
            </a>
          )}
        </div>
        <p className="project-card__desc">{project.desc}</p>
        <div className="project-card__footer">
          <div className="project-card__stack">
            {project.stack.map(t => (
              <span key={t} className="project-card__tag">{t}</span>
            ))}
          </div>
          {project.github && project.github !== '#' && (
            <a href={project.github} className="project-card__github" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
              <Github size={18} strokeWidth={2} />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ProjectSection({ id }) {
  const [active, setActive] = useState('ALL PROJECTS')

  const filterSoundRef = useRef(null)
  const hoverSoundRef  = useRef(null)
  const filterLoaded   = useRef(false)
  const hoverLoaded    = useRef(false)

  const playFilter = useCallback(() => {
    const a = filterSoundRef.current
    if (!a) return
    if (!filterLoaded.current) { a.load(); filterLoaded.current = true }
    a.currentTime = 0
    a.volume = 0.45
    a.play().catch(() => {})
  }, [])

  const playHover = useCallback(() => {
    const a = hoverSoundRef.current
    if (!a) return
    if (!hoverLoaded.current) { a.load(); hoverLoaded.current = true }
    a.currentTime = 0
    a.volume = 0.35
    a.play().catch(() => {})
  }, [])

  const handleFilter = useCallback((f) => {
    if (f !== active) playFilter()
    setActive(f)
  }, [active, playFilter])

  const filtered = active === 'ALL PROJECTS'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === active)

  return (
    <section id={id} className="projects">
      <audio ref={filterSoundRef} src="/sounds/SectionProject.mp3" preload="none" />
      <audio ref={hoverSoundRef}  src="/sounds/pop.mp3"            preload="none" />

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
          <ProjectCard key={project.id} project={project} onHover={playHover} />
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