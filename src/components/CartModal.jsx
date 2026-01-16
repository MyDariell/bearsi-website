import { useNavigate } from 'react-router-dom'
import './CartModal.css'

function CartModal({ isOpen, onClose, productName }) {
  const navigate = useNavigate()

  if (!isOpen) return null

  const handleViewCart = () => {
    navigate('/cart')
    onClose()
  }

  const handleContinueShopping = () => {
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-body">
          <p className="modal-message">Item successfully added to cart!</p>
          <div className="modal-buttons">
            <button className="modal-btn modal-btn-primary" onClick={handleViewCart}>
              view cart
            </button>
            <button className="modal-btn modal-btn-secondary" onClick={handleContinueShopping}>
              continue shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartModal
