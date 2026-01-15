import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import ImageGallery from '../components/ImageGallery'
import './ProductDetail.css'

import vdayBlindBox from '../assets/images/products/vday_collection/vday_blindbox/vday_blindbox.png'
import vdayCollection1 from '../assets/images/products/vday_collection/vday_blindbox/bearsi_collection.png'
import vdayBlindBoxCouples from '../assets/images/products/vday_collection/vday_blindbox_couples/vday_blindbox_couples.png'
import vdayCollection2 from '../assets/images/products/vday_collection/vday_blindbox_couples/bearsi_collection.png'

function ProductDetail() {
  const { productId } = useParams()
  const [quantity, setQuantity] = useState(1)

  const productData = {
    'vday-blind-box': {
      name: "Valentine's Day Blind Box",
      stock: "Currently In Stock",
      price: "20.00",
      description: "Get any of the following bears:",
      bears: ["Bingsu", "Pip", "Powda", "Sunset"],
      images: [vdayBlindBox, vdayCollection1]
    },
    'vday-blind-box-couples': {
      name: "Valentine's Day Blind Box Couples Package",
      stock: "Currently In Stock",
      price: "35.00",
      description: "Get any of the following bears:",
      bears: ["Bingsu", "Pip", "Powda", "Sunset"],
      images: [vdayBlindBoxCouples, vdayCollection2]
    }
  }

  const product = productData[productId]

  if (!product) {
    return <div>Product not found</div>
  }

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1) {
      setQuantity(newQuantity)
    }
  }

  const handleAddToCart = () => {
    console.log(`Adding ${quantity} of ${product.name} to cart`)
  }

  return (
    <div className="product-detail-page">
      <Navbar />
      <div className="product-detail-container">
        <div className="product-detail-content">
          <div className="product-images">
            <ImageGallery images={product.images} />
          </div>
          <div className="product-info">
            <h1 className="product-name">{product.name}</h1>
            <p className="product-stock">{product.stock}</p>
            <p className="product-price">CA $ {product.price}</p>

            <div className="quantity-section">
              <button
                className="quantity-btn"
                onClick={() => handleQuantityChange(-1)}
              >
                -
              </button>
              <input
                type="number"
                className="quantity-input"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                min="1"
              />
              <button
                className="quantity-btn"
                onClick={() => handleQuantityChange(1)}
              >
                +
              </button>
              <button className="add-to-cart-btn" onClick={handleAddToCart}>
                Add to Cart
              </button>
            </div>

            <div className="product-description">
              <p>{product.description}</p>
              <ul>
                {product.bears.map((bear, index) => (
                  <li key={index}>{bear}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
