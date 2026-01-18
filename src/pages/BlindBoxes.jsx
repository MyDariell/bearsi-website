import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import CollectionNav from '../components/CollectionNav'
import ProductCard from '../components/ProductCard'
import { api } from '../services/api'
import './BlindBoxes.css'

function BlindBoxes() {
  const navigate = useNavigate()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true)
        const data = await api.getProducts()
        // Transform API data to match component expectations
        const transformedProducts = data.products.map(p => ({
          id: p.id,
          slug: p.slug,
          image: p.images[0], // Use first image
          title: p.name,
          price: `CA $ ${p.price.toFixed(2)}`
        }))
        setProducts(transformedProducts)
      } catch (err) {
        console.error('Failed to fetch products:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const handleProductClick = (product) => {
    navigate(`/product/${product.slug}`)
  }

  if (loading) {
    return (
      <div className="blind-boxes-page">
        <Navbar />
        <CollectionNav />
        <section className="products-section">
          <div className="container">
            <h1 className="section-title">Blind Boxes</h1>
            <div className="loading">Loading products...</div>
          </div>
        </section>
      </div>
    )
  }

  if (error) {
    return (
      <div className="blind-boxes-page">
        <Navbar />
        <CollectionNav />
        <section className="products-section">
          <div className="container">
            <h1 className="section-title">Blind Boxes</h1>
            <div className="error">Failed to load products. Please try again later.</div>
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="blind-boxes-page">
      <Navbar />
      <CollectionNav />
      <section className="products-section">
        <div className="container">
          <h1 className="section-title">Blind Boxes</h1>
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                image={product.image}
                title={product.title}
                price={product.price}
                onClick={() => handleProductClick(product)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default BlindBoxes
