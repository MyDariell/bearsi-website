import { useState } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import ImageGallery from '../components/ImageGallery'
import CartModal from '../components/CartModal'
import { useCart } from '../context/CartContext'
import { getProductBySlug } from '../data/products'
import './ProductDetail.css'

function ProductDetail() {
  const { productId } = useParams()
  const [quantity, setQuantity] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { addToCart } = useCart()

  // Get product from repository
  const product = getProductBySlug(productId)

  if (!product) {
    return (
      <div className="product-detail-page">
        <Navbar />
        <div className="error">Product not found</div>
      </div>
    )
  }

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1) {
      setQuantity(newQuantity)
    }
  }

  const handleAddToCart = () => {
    addToCart(product, quantity)
    setIsModalOpen(true)
  }

  return (
    <div className="product-detail-page">
      <Navbar />
      <CartModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productName={product.name}
      />
      <div className="product-detail-container">
        <div className="product-detail-content">
          <div className="product-images">
            <ImageGallery images={product.images} />
          </div>
          <div className="product-info">
            <h1 className="product-name">{product.name}</h1>
            <p className="product-stock">{product.stockMessage}</p>
            <p className="product-price">{product.priceFormatted}</p>

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
              <p className="desc-text" style={{ whiteSpace: 'pre-line' }}>
                {product.description}
              </p>

              {/* <div className="bears-list-section">
                <h3 className="desc-subheading">Available Bears</h3>
                <ul className="bears-list">
                  {product.bears.map((bear, index) => (
                    <li key={index}>{bear}</li>
                  ))}
                </ul>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
