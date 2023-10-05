import Link from "next/link"

const SecondaryButton = ({text, href, center = false}) => {
  return (
    <div className={`secondary-button ${center ? 'center' : ''}`}>
      <span><Link href={href}>{text} <span className="secondary-button__arrow">→</span></Link></span>
    </div>
  )
}

export default SecondaryButton