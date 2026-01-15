import { useNavigate } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  const navigate = useNavigate()

  const handleNavClick = (page) => {
    console.log(`Navigating to ${page}`)
  }

  const handleLogoClick = () => {
    navigate('/')
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="logo" onClick={handleLogoClick}>Bearsi</h1>
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
            className="nav-btn"
            onClick={() => handleNavClick('Cart')}
          >
            Cart
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
