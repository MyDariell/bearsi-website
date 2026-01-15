import { useNavigate } from 'react-router-dom'
import './Hero.css'

function Hero() {
  const navigate = useNavigate()

  const handleShopClick = () => {
    navigate('/blind-boxes')
  }

  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Which Bear will find you?</h1>
        <p className="hero-subtitle">
          Handcrafted crochet companions, each one unique.
          <br />
          Every Bearsi bear is made with care in Vancouver.
        </p>
        <button className="hero-btn" onClick={handleShopClick}>
          Shop Blind Boxes
        </button>
      </div>
    </section>
  )
}

export default Hero
