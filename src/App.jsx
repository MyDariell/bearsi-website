import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import BlindBoxes from './pages/BlindBoxes'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import AboutUs from './pages/AboutUs'
import MeetTheBears from './pages/MeetTheBears'

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blind-boxes" element={<BlindBoxes />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/meet-the-bears" element={<MeetTheBears />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
