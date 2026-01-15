import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import ImageCarousel from '../components/ImageCarousel'

function Home() {
  return (
    <div className="home-page">
      <Navbar />
      <Hero />
      <ImageCarousel />
    </div>
  )
}

export default Home
