import { useCart } from '../context/CartContext'
import './CartItem.css'

function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart()

  const handleQuantityChange = (change) => {
    const newQuantity = item.quantity + change
    if (newQuantity >= 1) {
      updateQuantity(item.id, newQuantity)
    }
  }

  const handleRemove = () => {
    removeFromCart(item.id)
  }

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={item.images[0]} alt={item.name} />
      </div>
      <div className="cart-item-details">
        <h3 className="cart-item-name">{item.name}</h3>
        <p className="cart-item-price">{item.price}</p>
        <div className="cart-item-controls">
          <div className="cart-quantity-controls">
            <button
              className="cart-qty-btn"
              onClick={() => handleQuantityChange(-1)}
            >
              -
            </button>
            <span className="cart-qty-display">{item.quantity}</span>
            <button
              className="cart-qty-btn"
              onClick={() => handleQuantityChange(1)}
            >
              +
            </button>
          </div>
          <button className="cart-remove-btn" onClick={handleRemove}>
            remove
          </button>
        </div>
        <p className="cart-item-subtotal">
          sub total {item.price.replace('CA $ ', 'CA $ ')
            .replace(/[\d.]+/, (match) => (parseFloat(match) * item.quantity).toFixed(2))}
        </p>
      </div>
    </div>
  )
}

export default CartItem
