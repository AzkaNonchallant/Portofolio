import { useState, useEffect, useRef, useCallback } from 'react'
import './GithubSection.css'

const GITHUB_USERNAME = 'AzkaNonchallant'
const TOKEN = import.meta.env.VITE_GITHUB_TOKEN

const TABS = [
  { id: 'calendar', label: 'Calendar' },
  { id: 'langs',    label: 'Languages' },
  { id: 'repos',    label: 'Repos' },
]

const LANG_COLORS = [
  'var(--pink)', 'var(--yellow)', 'var(--tan)',
  'var(--blue-deep)', 'var(--pink-dark)', '#a78bfa', '#34d399'
]

function Calendar({ weeks, total }) {
  const getLevel = (count) => {
    if (count === 0) return 0
    if (count <= 2)  return 1
    if (count <= 5)  return 2
    if (count <= 10) return 3
    return 4
  }

  return (
    <div className="gh-cal">
      <p className="gh-cal__total">{total} contributions this year</p>
      <div className="gh-cal__grid">
        {weeks.map((week, wi) => (
          <div key={wi} className="gh-cal__week">
            {week.contributionDays.map((day, di) => (
              <div
                key={di}
                className={`gh-cal__cell gh-cal__cell--${getLevel(day.contributionCount)}`}
                title={`${day.date}: ${day.contributionCount}`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="gh-cal__legend">
        <span>Sedikit</span>
        {[0,1,2,3,4].map(l => <div key={l} className={`gh-cal__cell gh-cal__cell--${l}`} />)}
        <span>Banyak</span>
      </div>
    </div>
  )
}

function LangBar({ langs, onHover }) {
  const total = langs.reduce((s, l) => s + l.size, 0)
  return (
    <div className="gh-langs">
      <div className="gh-langs__bar">
        {langs.slice(0, 7).map((l, i) => (
          <div
            key={l.name}
            className="gh-langs__seg"
            style={{
              width: `${(l.size / total * 100).toFixed(1)}%`,
              background: LANG_COLORS[i % LANG_COLORS.length]
            }}
            title={`${l.name}: ${(l.size / total * 100).toFixed(1)}%`}
            onMouseEnter={onHover}
          />
        ))}
      </div>
      <ul className="gh-langs__list">
        {langs.slice(0, 7).map((l, i) => (
          <li key={l.name} className="gh-langs__item" onMouseEnter={onHover}>
            <span className="gh-langs__dot" style={{ background: LANG_COLORS[i % LANG_COLORS.length] }} />
            <span className="gh-langs__name">{l.name}</span>
            <span className="gh-langs__pct">{(l.size / total * 100).toFixed(0)}%</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function RepoCard({ repo, onHover, onClick }) {
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="gh-repo"
      onMouseEnter={onHover}
      onClick={onClick}
    >
      <div className="gh-repo__header">
        <span className="gh-repo__name">{repo.name}</span>
        {repo.language && <span className="gh-repo__lang">{repo.language}</span>}
      </div>
      {repo.description && <p className="gh-repo__desc">{repo.description}</p>}
      <div className="gh-repo__footer">
        <span>⭐ {repo.stargazers_count}</span>
        <span>🍴 {repo.forks_count}</span>
        <span>🕐 {new Date(repo.updated_at).toLocaleDateString('id')}</span>
      </div>
    </a>
  )
}

// ---------- Main ----------
export default function GitHubSection() {
  const [tab, setTab]         = useState('calendar')
  const [calData, setCal]     = useState(null)
  const [langs, setLangs]     = useState([])
  const [repos, setRepos]     = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  // Sound refs
  const popRef     = useRef(null)
  const clickRef   = useRef(null)
  const tabRef     = useRef(null)
  const popLoaded  = useRef(false)
  const clickLoaded = useRef(false)
  const tabLoaded  = useRef(false)

  const playPop = useCallback(() => {
    const a = popRef.current
    if (!a) return
    if (!popLoaded.current) { a.load(); popLoaded.current = true }
    a.currentTime = 0; a.volume = 0.3; a.play().catch(() => {})
  }, [])

  const playClick = useCallback(() => {
    const a = clickRef.current
    if (!a) return
    if (!clickLoaded.current) { a.load(); clickLoaded.current = true }
    a.currentTime = 0; a.volume = 0.4; a.play().catch(() => {})
  }, [])

  const playTab = useCallback(() => {
    const a = tabRef.current
    if (!a) return
    if (!tabLoaded.current) { a.load(); tabLoaded.current = true }
    a.currentTime = 0; a.volume = 0.35; a.play().catch(() => {})
  }, [])

  const handleTabClick = useCallback((id) => {
    playTab()
    setTab(id)
  }, [playTab])

  const headers = {
    'Authorization': `Bearer ${TOKEN}`,
    'Content-Type': 'application/json',
  }

  useEffect(() => {
    const query = `{
      user(login: "${GITHUB_USERNAME}") {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays { date contributionCount }
            }
          }
        }
      }
    }`

    fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers,
      body: JSON.stringify({ query }),
    })
      .then(r => r.json())
      .then(d => {
        const cal = d.data?.user?.contributionsCollection?.contributionCalendar
        if (cal) setCal(cal)
        setLoading(false)
      })
      .catch(() => { setError('Gagal memuat data'); setLoading(false) })
  }, [])

  useEffect(() => {
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&type=public`, { headers })
      .then(r => r.json())
      .then(async data => {
        setRepos(data.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at)).slice(0, 6))
        const langMap = {}
        await Promise.all(
          data.slice(0, 20).map(repo =>
            fetch(repo.languages_url, { headers })
              .then(r => r.json())
              .then(ld => {
                Object.entries(ld).forEach(([lang, bytes]) => {
                  langMap[lang] = (langMap[lang] || 0) + bytes
                })
              })
              .catch(() => {})
          )
        )
        setLangs(
          Object.entries(langMap)
            .map(([name, size]) => ({ name, size }))
            .sort((a, b) => b.size - a.size)
        )
      })
      .catch(() => {})
  }, [])

  return (
    <section className="gh-section outline">
      {/* Audio */}
      <audio ref={popRef}   src="/sounds/pop.mp3"             preload="none" />
      <audio ref={clickRef} src="/sounds/click.mp3"           preload="none" />
      <audio ref={tabRef}   src="/sounds/SectionProject.mp3"  preload="none" />

      <div className="gh-section__header">
        <div className="gh-section__title-row">
          <span className="gh-section__icon"></span>
          <h2 className="gh-section__title">GITHUB</h2>
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="gh-section__link"
            onClick={playClick}
          >
            @{GITHUB_USERNAME} ↗
          </a>
        </div>
        <hr className="gh-section__rule" />
      </div>

      <div className="gh-section__tabs">
        {TABS.map(t => (
          <button
            key={t.id}
            className={`gh-tab ${tab === t.id ? 'gh-tab--active' : ''}`}
            onClick={() => handleTabClick(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="gh-section__body">
        {loading && <p className="gh-section__status"> Memuat data GitHub...</p>}
        {error   && <p className="gh-section__status gh-section__status--err">{error}</p>}

        {!loading && !error && (
          <>
            {tab === 'calendar' && calData && (
              <Calendar weeks={calData.weeks} total={calData.totalContributions} />
            )}

            {tab === 'langs' && (
              langs.length > 0
                ? <LangBar langs={langs} onHover={playPop} />
                : <p className="gh-section__status">Memuat languages...</p>
            )}

            {tab === 'repos' && (
              <div className="gh-repos">
                {repos.map(r => (
                  <RepoCard
                    key={r.name}
                    repo={r}
                    onHover={playPop}
                    onClick={playClick}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}