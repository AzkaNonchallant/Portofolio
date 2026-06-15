import { useState } from 'react'
import { ArrowRight, Github } from 'lucide-react'
import './ProjectSection.css'

const PROJECTS = [
  {
    id: 1,
    category: 'DESIGN',
    categoryColor: 'cat--design',
    title: 'RERA',
    emoji: '🌟',
    desc: 'UI Design Tool for Designer',
    stack: ['Desktop', 'React', 'Tauri', 'TypeScript'],
    github: '#',
    img: null,
  },
  {
    id: 2,
    category: 'MOBILE',
    categoryColor: 'cat--mobile',
    title: 'Habit Tracker',
    emoji: '🌿',
    desc: 'Productivity Mobile App',
    stack: ['Flutter', 'Firebase', 'Riverpod'],
    github: '#',
    img: null,
  },
  {
    id: 3,
    category: 'WEB',
    categoryColor: 'cat--web',
    title: 'Portfolio Website',
    emoji: '🐚',
    desc: 'Personal Portfolio Website',
    stack: ['React', 'Tailwind CSS', 'Framer Motion'],
    github: '#',
    img: null,
  },
  {
    id: 4,
    category: 'MOBILE',
    categoryColor: 'cat--mobile',
    title: 'Ocean Wallet',
    emoji: '🐚',
    desc: 'Personal Finance App',
    stack: ['Flutter', 'Supabase', 'Dart'],
    github: '#',
    img: null,
  },
  {
    id: 5,
    category: 'WEB',
    categoryColor: 'cat--web',
    title: 'Wave Store',
    emoji: '⭐',
    desc: 'E-Commerce Website',
    stack: ['Next.js', 'Supabase', 'Stripe'],
    github: '#',
    img: null,
  },
  {
    id: 6,
    category: 'BACKEND',
    categoryColor: 'cat--backend',
    title: 'API Service',
    emoji: '🪸',
    desc: 'RESTful API for Mobile App',
    stack: ['Node.js', 'Express', 'PostgreSQL'],
    github: '#',
    img: null,
  },
]

const FILTERS = ['ALL PROJECTS', 'WEB', 'MOBILE', 'DESIGN', 'BACKEND']

export default function ProjectSection({ id }) {
  const [active, setActive] = useState('ALL PROJECTS')

  const filtered = active === 'ALL PROJECTS'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === active)

  return (
    <section id={id} className="projects">
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
            onClick={() => setActive(f)}
          >
            {f === 'ALL PROJECTS' && <span className="filter-icon">⊞</span>}
            {f === 'WEB' && <span className="filter-icon">🌐</span>}
            {f === 'MOBILE' && <span className="filter-icon">📱</span>}
            {f === 'DESIGN' && <span className="filter-icon">✏️</span>}
            {f === 'BACKEND' && <span className="filter-icon">&lt;/&gt;</span>}
            {f}
          </button>
        ))}
      </div>

      <div className="projects__grid">
        {filtered.map(project => (
          <div key={project.id} className="project-card">
            <div className="project-card__img">
              <span className={`project-card__cat ${project.categoryColor}`}>{project.category}</span>
              <div className="project-card__img-placeholder" />
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