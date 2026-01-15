import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import CollectionNav from '../components/CollectionNav'
import ProductCard from '../components/ProductCard'
import './BlindBoxes.css'
import vdayBlindBox from '../assets/images/products/vday_collection/vday_blindbox/vday_blindbox.png'
import vdayBlindBoxCouples from '../assets/images/products/vday_collection/vday_blindbox_couples/vday_blindbox_couples.png'

function BlindBoxes() {
  const navigate = useNavigate()

  const products = [
    {
      id: 1,
      slug: 'vday-blind-box',
      image: vdayBlindBox,
      title: 'Valentine\'s Day Blind Box',
      price: 'CA $ 20.00'
    },
    {
      id: 2,
      slug: 'vday-blind-box-couples',
      image: vdayBlindBoxCouples,
      title: 'Valentine\'s Day Blind Box Couple Package',
      price: 'CA $ 45.00'
    }
  ]

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
