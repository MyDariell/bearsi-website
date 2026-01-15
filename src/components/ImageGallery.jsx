import { useState } from 'react'
import './ImageGallery.css'

function ImageGallery({ images }) {
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div className="image-gallery">
      <div className="gallery-thumbnails">
        {images.map((img, index) => (
          <div
            key={index}
            className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
            onClick={() => setSelectedImage(index)}
          >
            <img src={img} alt={`Product view ${index + 1}`} />
          </div>
        ))}
      </div>
      <div className="gallery-main">
        <img src={images[selectedImage]} alt="Product main view" />
      </div>
    </div>
  )
}

export default ImageGallery
