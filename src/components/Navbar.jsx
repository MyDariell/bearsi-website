import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './Navbar.css'

function Navbar() {
  const navigate = useNavigate()
  const { getCartItemsCount } = useCart()
  const cartItemsCount = getCartItemsCount()

  const handleNavClick = (page) => {
    console.log(`Navigating to ${page}`)
  }

  const handleLogoClick = () => {
    navigate('/')
  }

  const handleCartClick = () => {
    navigate('/cart')
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="logo" onClick={handleLogoClick}>bearsi</h1>
        <div className="nav-buttons">
          <button
            className="nav-btn"
            onClick={() => handleNavClick('About Us')}
          >
            About Us
          </button>
          <button
            className="nav-btn"
            onClick={() => handleNavClick('Meet the Bears')}
          >
            Meet the Bears
          </button>
          <button
            className="nav-btn cart-btn"
            onClick={handleCartClick}
          >
            Cart
            {cartItemsCount > 0 && (
              <span className="cart-badge">{cartItemsCount}</span>
            )}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
