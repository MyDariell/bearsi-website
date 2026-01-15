import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import BlindBoxes from './pages/BlindBoxes'

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blind-boxes" element={<BlindBoxes />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
