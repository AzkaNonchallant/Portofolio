import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './PageTransition.css'

function TransitionBars() {
  const location = useLocation()
  const [phase, setPhase] = useState('idle')

  useEffect(() => {
    console.log('route changed:', location.pathname)
    setPhase('cover')

    const swapTimer = setTimeout(() => {
      setPhase('uncover')
    }, 500)

    const idleTimer = setTimeout(() => {
      setPhase('idle')
    }, 1000)

    return () => {
      clearTimeout(swapTimer)
      clearTimeout(idleTimer)
    }
  }, [location.pathname])

  return (
    <>
      <div className={`pt-bar pt-bar--1 pt-bar--${phase}`} />
      <div className={`pt-bar pt-bar--2 pt-bar--${phase}`} />
      <div className={`pt-bar pt-bar--3 pt-bar--${phase}`} />
    </>
  )
}

export default function PageTransition({ children }) {
  return (
    <div className="pt-wrapper">
      {children}
      <TransitionBars />
    </div>
  )
}