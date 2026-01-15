import './ProductCard.css'

function ProductCard({ image, title, price, onClick }) {
  return (
    <div className="product-card" onClick={onClick}>
      <div className="product-image">
        <img src={image} alt={title} />
      </div>
      <h3 className="product-title">{title}</h3>
      <p className="product-price">{price}</p>
    </div>
  )
}

export default ProductCard
