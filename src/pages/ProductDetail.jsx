import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import ImageGallery from '../components/ImageGallery'
import CartModal from '../components/CartModal'
import { useCart } from '../context/CartContext'
import { api } from '../services/api'
import './ProductDetail.css'

function ProductDetail() {
  const { productId } = useParams()
  const [quantity, setQuantity] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { addToCart } = useCart()

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true)
        const data = await api.getProductBySlug(productId)
        // Transform API data to match component expectations
        const transformedProduct = {
          id: data.product.id,
          slug: data.product.slug,
          name: data.product.name,
          stock: data.product.stock_status === 'in_stock' ? 'Currently In Stock' : 'Out of Stock',
          price: `CA $ ${data.product.price.toFixed(2)}`,
          description: data.product.description,
          bears: data.product.bears,
          images: data.product.images
        }
        setProduct(transformedProduct)
      } catch (err) {
        console.error('Failed to fetch product:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [productId])

  if (loading) {
    return (
      <div className="product-detail-page">
        <Navbar />
        <div className="loading">Loading product...</div>
      </div>
    )
  }

  if (error || !product) {
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
            <p className="product-stock">{product.stock}</p>
            <p className="product-price">{product.price}</p>

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
