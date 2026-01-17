import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import CartItem from '../components/CartItem'
import { useCart } from '../context/CartContext'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import dayjs from 'dayjs'
import './Cart.css'

function Cart() {
  const navigate = useNavigate()
  const { cartItems, getCartTotal } = useCart()

  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [emailError, setEmailError] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [isPickupConfirmed, setIsPickupConfirmed] = useState(false)
  const [uploadedFile, setUploadedFile] = useState(null)

  // Mockup data: each location has specific dates and times
  const locationSchedule = {
    'Brentwood': {
      availableDates: [
        dayjs('2026-01-24'),
        dayjs('2026-01-26')
      ],
      timeSlots: {
        '2026-01-24': ['10:00 AM - 12:00 PM', '2:00 PM - 4:00 PM'],
        '2026-01-26': ['1:00 PM - 3:00 PM', '4:00 PM - 6:00 PM']
      }
    },
    'Metrotown': {
      availableDates: [
        dayjs('2026-01-25'),
        dayjs('2026-01-27')
      ],
      timeSlots: {
        '2026-01-25': ['11:00 AM - 1:00 PM', '3:00 PM - 5:00 PM'],
        '2026-01-27': ['10:00 AM - 12:00 PM', '2:00 PM - 4:00 PM']
      }
    },
    'Richmond Center': {
      availableDates: [
        dayjs('2026-01-24'),
        dayjs('2026-01-28')
      ],
      timeSlots: {
        '2026-01-24': ['12:00 PM - 2:00 PM', '4:00 PM - 6:00 PM'],
        '2026-01-28': ['10:00 AM - 12:00 PM', '1:00 PM - 3:00 PM']
      }
    }
  }

  const locations = Object.keys(locationSchedule)

  // Function to check if date is available for selected location
  const shouldDisableDate = (date) => {
    if (!selectedLocation) return true
    const availableDates = locationSchedule[selectedLocation].availableDates
    return !availableDates.some(availableDate =>
      availableDate.format('YYYY-MM-DD') === date.format('YYYY-MM-DD')
    )
  }

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!value) {
      return false
    }
    if (!emailRegex.test(value)) {
      return false
    }
    return true
  }

  const validatePhone = (value) => {
    const phoneRegex = /^[\d\s\-()]+$/
    if (!value) {
      return false
    }
    if (value.replace(/[\s\-()]/g, '').length < 10) {
      return false
    }
    if (!phoneRegex.test(value)) {
      return false
    }
    return true
  }

  const handleEmailChange = (e) => {
    const value = e.target.value
    setEmail(value)

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (value && !emailRegex.test(value)) {
      setEmailError('Please enter a valid email address')
    } else {
      setEmailError('')
    }
  }

  const handlePhoneChange = (e) => {
    const value = e.target.value
    setPhone(value)

    const phoneRegex = /^[\d\s\-()]+$/
    if (value) {
      if (value.replace(/[\s\-()]/g, '').length < 10) {
        setPhoneError('Please enter a valid phone number')
      } else if (!phoneRegex.test(value)) {
        setPhoneError('Phone number can only contain numbers, spaces, dashes, and parentheses')
      } else {
        setPhoneError('')
      }
    } else {
      setPhoneError('')
    }
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

  const handleUnconfirmPickup = () => {
    setIsPickupConfirmed(false)
  }

  const isEmailValid = validateEmail(email)
  const isPhoneValid = validatePhone(phone)
  const isCheckoutEnabled = isEmailValid && isPhoneValid && isPickupConfirmed && uploadedFile

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
                className={`cart-input ${emailError ? 'error' : ''}`}
                value={email}
                onChange={handleEmailChange}
                placeholder="your@email.com"
              />
              {emailError && <p className="error-message">{emailError}</p>}
            </div>

            <div className="cart-section">
              <label className="cart-label">*Phone number :</label>
              <input
                type="tel"
                className={`cart-input ${phoneError ? 'error' : ''}`}
                value={phone}
                onChange={handlePhoneChange}
                placeholder="123-456-7890"
              />
              {phoneError && <p className="error-message">{phoneError}</p>}
              <p className="cart-hint">
                *have your email ready to receive your receipt and phone
                number in case I need to contact you regarding your
                order.
              </p>
            </div>

            <div className="cart-section">
              <h3 className="cart-section-title underline">Choose Pickup - time and location</h3>

              <div className="pickup-locations">
                {locations.map((location) => (
                  <button
                    key={location}
                    className={`location-btn ${selectedLocation === location ? 'active' : ''} ${isPickupConfirmed ? 'disabled' : ''}`}
                    onClick={() => !isPickupConfirmed && setSelectedLocation(location)}
                    disabled={isPickupConfirmed}
                  >
                    {location}
                  </button>
                ))}
              </div>

              {selectedLocation && (
                <div className="calendar-container">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar
                      value={selectedDate ? dayjs(selectedDate) : null}
                      onChange={(newDate) => {
                        if (!isPickupConfirmed && newDate) {
                          setSelectedDate(newDate.format('YYYY-MM-DD'))
                          setSelectedTime('')
                        }
                      }}
                      shouldDisableDate={shouldDisableDate}
                      disabled={isPickupConfirmed}
                      sx={{
                        width: '100%',
                        '& .MuiPickersDay-root': {
                          fontFamily: 'var(--font-body)',
                          '&.Mui-selected': {
                            backgroundColor: 'var(--brown-700)',
                            color: 'var(--cream-100)',
                            '&:hover': {
                              backgroundColor: 'var(--brown-800)',
                            },
                          },
                          '&:not(.Mui-disabled):hover': {
                            backgroundColor: 'var(--tan-300)',
                          },
                        },
                        '& .MuiDayCalendar-weekDayLabel': {
                          fontFamily: 'var(--font-body)',
                          color: 'var(--brown-700)',
                        },
                        '& .MuiPickersCalendarHeader-label': {
                          fontFamily: 'var(--font-display)',
                          color: 'var(--brown-900)',
                        },
                      }}
                    />
                  </LocalizationProvider>

                  {selectedDate && (
                    <div className="time-slots-container">
                      <p className="time-slots-label">Available Times:</p>
                      <div className="time-slots">
                        {locationSchedule[selectedLocation].timeSlots[selectedDate]?.map((time) => (
                          <button
                            key={time}
                            className={`time-btn ${selectedTime === time ? 'selected' : ''} ${isPickupConfirmed ? 'disabled' : ''}`}
                            onClick={() => {
                              if (!isPickupConfirmed) {
                                setSelectedTime(time)
                              }
                            }}
                            disabled={isPickupConfirmed}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <p className="cart-hint">
                If none of the available pickup times or locations work for
                you, please feel free to DM us on Instagram or email us. We'll
                be happy to coordinate an alternative time and location for
                you to receive your bear.
              </p>

              {!isPickupConfirmed ? (
                <button
                  className="confirm-btn"
                  onClick={handleConfirmPickup}
                >
                  Confirm
                </button>
              ) : (
                <button
                  className="confirm-btn confirmed"
                  onClick={handleUnconfirmPickup}
                >
                  Confirmed ✓ (Click to change)
                </button>
              )}
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
