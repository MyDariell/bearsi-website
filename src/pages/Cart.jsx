import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import CartItem from '../components/CartItem'
import { useCart } from '../context/CartContext'
import './Cart.css'

function Cart() {
  const navigate = useNavigate()
  const { cartItems, getCartTotal } = useCart()

  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [isPickupConfirmed, setIsPickupConfirmed] = useState(false)
  const [uploadedFile, setUploadedFile] = useState(null)

  const locations = ['Brentwood', 'Metrotown', 'Richmond Center']
  const dates = [
    { label: 'January 24', value: 'jan-24' },
    { label: 'January 25', value: 'jan-25' }
  ]
  const timeSlots = {
    'jan-24': ['10:00 - 12:00', '15:00 - 17:00'],
    'jan-25': ['16:00 - 17:00']
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf']
      if (validTypes.includes(file.type)) {
        setUploadedFile(file)
      } else {
        alert('Please upload a valid file (PNG, JPG, JPEG, or PDF)')
      }
    }
  }

  const handleConfirmPickup = () => {
    if (selectedLocation && selectedDate && selectedTime) {
      setIsPickupConfirmed(true)
    } else {
      alert('Please select a location, date, and time slot')
    }
  }

  const isCheckoutEnabled = email && phone && isPickupConfirmed && uploadedFile

  const handleCheckout = () => {
    if (isCheckoutEnabled) {
      console.log('Proceeding to checkout...')
      // Future: implement checkout logic
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <Navbar />
        <div className="cart-container">
          <h1 className="cart-title">Shopping Cart</h1>
          <p className="cart-empty">Your cart is empty</p>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <Navbar />
      <div className="cart-container">
        <h1 className="cart-title">Shopping Cart</h1>
        <div className="cart-content">
          <div className="cart-left">
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <div className="cart-right">
            <div className="cart-section">
              <label className="cart-label">*Email :</label>
              <input
                type="email"
                className="cart-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
              />
            </div>

            <div className="cart-section">
              <label className="cart-label">*Phone number :</label>
              <input
                type="tel"
                className="cart-input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="123-456-7890"
              />
              <p className="cart-hint">
                *have your email ready to receive your receipt and phone
                number in case I need to contact you regarding your
                order.
              </p>
            </div>

            <div className="cart-section">
              <h3 className="cart-section-title">Choose Pickup - time and location</h3>

              <div className="pickup-locations">
                {locations.map((location) => (
                  <button
                    key={location}
                    className={`location-btn ${selectedLocation === location ? 'active' : ''}`}
                    onClick={() => setSelectedLocation(location)}
                  >
                    {location}
                  </button>
                ))}
              </div>

              <div className="pickup-schedule">
                {dates.map((date) => (
                  <div key={date.value} className="schedule-row">
                    <button
                      className={`date-btn ${selectedDate === date.value ? 'active' : ''}`}
                      onClick={() => {
                        setSelectedDate(date.value)
                        setSelectedTime('')
                      }}
                    >
                      {date.label}
                    </button>
                    <div className="time-slots">
                      {timeSlots[date.value].map((time) => (
                        <button
                          key={time}
                          className={`time-btn ${
                            selectedDate === date.value && selectedTime === time
                              ? 'active'
                              : selectedDate !== date.value
                              ? 'disabled'
                              : ''
                          }`}
                          onClick={() => {
                            if (selectedDate === date.value) {
                              setSelectedTime(time)
                            }
                          }}
                          disabled={selectedDate !== date.value}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <p className="cart-hint">
                If none of the available pickup times or locations work for
                you, please feel free to DM us on Instagram or email us. We'll
                be happy to coordinate an alternative time and location for
                you to receive your bear.
              </p>

              <button
                className={`confirm-btn ${isPickupConfirmed ? 'confirmed' : ''}`}
                onClick={handleConfirmPickup}
              >
                {isPickupConfirmed ? 'Confirmed ✓' : 'Confirm'}
              </button>
            </div>

            <div className="cart-section">
              <h3 className="cart-section-title">Upload Proof of Transaction</h3>
              <label className="file-upload-btn">
                Choose file
                <input
                  type="file"
                  accept=".png,.jpg,.jpeg,.pdf"
                  onChange={handleFileUpload}
                  hidden
                />
              </label>
              {uploadedFile && (
                <p className="uploaded-file-name">{uploadedFile.name}</p>
              )}
              <p className="cart-hint">only support png, jpg, pdf</p>
            </div>

            <div className="cart-section order-summary">
              <h3 className="cart-section-title">Order summary</h3>
              <p className="item-count">{cartItems.length} item(s)</p>
              <div className="order-total">
                <span>Order Total</span>
                <span className="total-price">CA $ {getCartTotal().toFixed(2)}</span>
              </div>
            </div>

            <button
              className={`checkout-btn ${isCheckoutEnabled ? '' : 'disabled'}`}
              onClick={handleCheckout}
              disabled={!isCheckoutEnabled}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
