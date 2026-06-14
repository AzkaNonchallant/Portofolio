import './BackgroundDecor.css'

/**
 * Scattered comic-confetti shapes that float gently in the background.
 * Pass a `variant` to tweak the shape set per section if needed.
 */
function Star({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M12 0 L15 9 L24 12 L15 15 L12 24 L9 15 L0 12 L9 9 Z"
        fill="currentColor"
      />
    </svg>
  )
}

function Diamond({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" transform="rotate(20 12 12)" fill="currentColor" />
    </svg>
  )
}

function Triangle({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12 2 L22 20 L2 20 Z" fill="currentColor" />
    </svg>
  )
}

export default function BackgroundDecor() {
  return (
    <div className="decor" aria-hidden="true">
      <Star className="decor__shape decor__shape--pink decor__shape--a" />
      <Star className="decor__shape decor__shape--cream decor__shape--b" />
      <Diamond className="decor__shape decor__shape--yellow decor__shape--c" />
      <Triangle className="decor__shape decor__shape--cream decor__shape--d" />
      <Diamond className="decor__shape decor__shape--pink decor__shape--e" />
      <Star className="decor__shape decor__shape--yellow decor__shape--f" />
    </div>
  )
}