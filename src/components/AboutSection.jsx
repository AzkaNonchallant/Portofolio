import { useRef, useCallback } from 'react'
import './AboutSection.css'

const SKILLS = [
  'Dart', 'JavaScript', 'PHP', 'Kotlin', 'Python', '.NET', 'Postman',
  'Photoshop', 'After Effects', 'Figma', 'Supabase', 'Git',
  'Laravel', 'Flutter', 'Express', 'React', 'Code Igniter', 'TypeScript'
]

const PROJECTS = [
  { title: 'KPT',           tag: 'Website'       },
  { title: 'Habit Tracker', tag: 'Mobile'   },
  { title: 'Rera',          tag: 'Desktop And Mobile' },
]

export default function AboutSection() {
  const popRef     = useRef(null)
  const audioReady = useRef(false)

  const playPop = useCallback(() => {
    const audio = popRef.current
    if (!audio) return

    if (!audioReady.current) {
      audio.load()
      audioReady.current = true
    }

    audio.currentTime = 0
    audio.volume = 0.4
    audio.play().catch(() => {})
  }, [])

  return (
    <section className="about outline" aria-labelledby="about-title">
      <audio ref={popRef} src="/sounds/pop.mp3" preload="none" />

      <div className="about__intro">
        <span className="about__eyebrow" aria-hidden="true">About Me</span>

        <h2 id="about-title" className="about__title">
          Hi, My Name Is Azka Aydirrafif Syah
        </h2>

        <p className="about__text">
         I'm a Software Engineering student at SMK Plus Pelita Nusantara, passionate about building web and mobile applications while exploring data-driven solutions. I also enjoy UI design and digital illustration, blending bold typography, vibrant colors, and retro-inspired visuals into my work.
        </p>

        <ul className="about__skills" role="list" aria-label="Skill yang dikuasai">
          {SKILLS.map((skill) => (
            <li
              key={skill}
              className="about__skill"
              onMouseEnter={playPop}
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>

      <div className="about__projects">
        <span className="about__eyebrow" aria-hidden="true">Proyek terbaru</span>

        <ul className="about__project-list" role="list" aria-label="Proyek terbaru">
          {PROJECTS.map((project) => (
            <li
              key={project.title}
              className="about__project"
              onMouseEnter={playPop}
            >
              <span className="about__project-tag">{project.tag}</span>
              <span className="about__project-title">{project.title}</span>
            </li>
          ))}
        </ul>

       
      </div>
    </section>
  )
}