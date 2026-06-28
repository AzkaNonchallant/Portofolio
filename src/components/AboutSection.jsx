import { useRef } from 'react'
import './AboutSection.css'

const SKILLS = [
  'Dart', 'JavaScript', 'PHP', 'Kotlin', 'Python',
  'Sql', 'Git', 'Composer', '.Net', 'Postman',
  'Photoshop', 'After Effect', 'Figma', 'FireBase', 'npm'
]

const PROJECTS = [
  { title: 'KPT', tag: 'PKL' },
  { title: 'Habit Tracker', tag: 'Tracker' },
  { title: 'Rera', tag: 'Editorial' },
]

export default function AboutSection() {
  const popRef = useRef(null)

  const playPop = () => {
    const audio = popRef.current
    if (!audio) return
    audio.currentTime = 0
    audio.volume = 0.4
    audio.play().catch(() => {})
  }

  return (
    <section className="about outline" aria-labelledby="about-title">
      <audio ref={popRef} src="/sounds/pop.mp3" preload="auto" />

      <div className="about__intro">
        <span className="about__eyebrow">About Me</span>
        <h2 id="about-title" className="about__title">
          Hey, My name is Azka Aydirrafif Syah
        </h2>
        <p className="about__text">
          Im a Student from Vocational High School SMK PLUS PELITA NUSANTARA 
          I currently reside in Cibinong , Focusing on Learning more about Website,
          Mobile and Data im also a Designer and Illustrator , My Favorite design Combination is
          Pop Color, Bold Typography, Retro And a little bit of Comic 
        </p>

        <ul className="about__skills">
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
        <span className="about__eyebrow">Proyek terbaru</span>
        <ul className="about__project-list">
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

        <br />

        <ul className="about__project-list">
          <li className="about__all" onMouseEnter={playPop}>
            <span className="about__project-tag">Semua</span>
            <span className="about__project-title">Cek Semua ➡</span>
          </li>
        </ul>
      </div>
    </section>
  )
}