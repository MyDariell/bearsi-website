import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import CollectionNav from '../components/CollectionNav'
import ProductCard from '../components/ProductCard'
import { getAllProducts } from '../data/products'
import './BlindBoxes.css'

function BlindBoxes() {
  const navigate = useNavigate()
  const products = getAllProducts()

  const handleProductClick = (product) => {
    navigate(`/product/${product.slug}`)
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
                image={product.thumbnail}
                title={product.name}
                price={product.priceFormatted}
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
