import { useEffect, useRef } from 'react'
import './ImageCarousel.css'
import carousel1 from '../assets/images/testimonial_carousel/carousel_1.png'
import carousel2 from '../assets/images/testimonial_carousel/carousel_2.png'
import carousel3 from '../assets/images/testimonial_carousel/carousel_3.png'
import carousel4 from '../assets/images/testimonial_carousel/carousel_4.png'
import carousel5 from '../assets/images/testimonial_carousel/carousel_5.png'

function ImageCarousel() {
  const carouselRef = useRef(null)

  const images = [
    carousel1,
    carousel2,
    carousel3,
    carousel4,
    carousel5,
  ]

  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel) return

    let scrollPosition = 0
    const scrollSpeed = 0.5

    const scroll = () => {
      scrollPosition += scrollSpeed

      if (scrollPosition >= carousel.scrollWidth / 2) {
        scrollPosition = 0
      }

      carousel.scrollLeft = scrollPosition
    }

    const intervalId = setInterval(scroll, 20)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <section className="carousel-section">
      <div className="carousel-container" ref={carouselRef}>
        <div className="carousel-track">
          {images.map((img, index) => (
            <div key={`first-${index}`} className="carousel-item">
              <img src={img} alt={`Bear ${index + 1}`} />
            </div>
          ))}
          {images.map((img, index) => (
            <div key={`second-${index}`} className="carousel-item">
              <img src={img} alt={`Bear ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ImageCarousel
