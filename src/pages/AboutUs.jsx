import Navbar from '../components/Navbar'
import aboutUsTitle from '../assets/images/cosmetics/about_us_title.png'
import './AboutUs.css'

function AboutUs() {
  return (
    <div className="about-us-page">
      <Navbar />
      <div className="about-us-container">
        <div className="about-us-content">
          <img
            src={aboutUsTitle}
            alt="About Us"
            className="about-us-title-image"
          />
          <div className="about-us-text">
            <p>
              Our story began with a simple yet deeply cherished gift.
              In Christmas 2025, Gloria handcrafted a crochet bear as a present where each stitch made with care, love, and intention. That single bear carried more than yarn. It carried meaning. From that moment, we realized that something handmade could become a special delivery, not just between friends, but from our hearts to others as well. That belief became the foundation of our brand - Every bear we create is a reminder that love doesn't have to be perfect to be beautiful, and that the most meaningful gifts are the ones made with heart.
            </p>
            <p>
              Founded by four friends—Dariell, Gloria, Marvin, and David—our brand was born from a simple conversation about how we could share something meaningful and spread joy beyond ourselves. Just like friendship and handmade stitches, no two pieces are exactly the same, yet together they form something whole. Through every imperfect stitch, we hope each bear becomes a symbol of blessing, born from friendship and delivered with love.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs
