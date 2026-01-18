import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import CartItem from '../components/CartItem'
import { useCart } from '../context/CartContext'
import { api } from '../services/api'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar'
import dayjs from 'dayjs'
import './Cart.css'

function Cart() {
  const navigate = useNavigate()
  const { cartItems, getCartTotal, clearCart } = useCart()

  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [emailError, setEmailError] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [selectedTimeslot, setSelectedTimeslot] = useState(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [isPickupConfirmed, setIsPickupConfirmed] = useState(false)
  const [uploadedFile, setUploadedFile] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // API data
  const [locations, setLocations] = useState([])
  const [timeslots, setTimeslots] = useState([])
  const [loadingLocations, setLoadingLocations] = useState(true)
  const [loadingTimeslots, setLoadingTimeslots] = useState(false)

  // Fetch locations on mount
  useEffect(() => {
    async function fetchLocations() {
      try {
        const data = await api.getLocations()
        setLocations(data.locations)
      } catch (err) {
        console.error('Failed to fetch locations:', err)
      } finally {
        setLoadingLocations(false)
      }
    }
    fetchLocations()
  }, [])

  // Fetch timeslots when location changes
  useEffect(() => {
    if (!selectedLocation) {
      setTimeslots([])
      return
    }

    async function fetchTimeslots() {
      try {
        setLoadingTimeslots(true)
        const data = await api.getTimeslots(selectedLocation.id)
        setTimeslots(data.timeslots)
      } catch (err) {
        console.error('Failed to fetch timeslots:', err)
      } finally {
        setLoadingTimeslots(false)
      }
    }
    fetchTimeslots()
  }, [selectedLocation])

  // Get unique available dates from timeslots
  const availableDates = timeslots.map(t => t.date)
  const uniqueDates = [...new Set(availableDates)]

  // Get timeslots for selected date
  const getTimeslotsForDate = (date) => {
    return timeslots.filter(t => t.date === date && t.spotsLeft > 0)
  }

  // Function to check if date is available for selected location
  const shouldDisableDate = (date) => {
    if (!selectedLocation) return true
    const dateStr = date.format('YYYY-MM-DD')
    return !uniqueDates.includes(dateStr)
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

  const handleLocationSelect = (location) => {
    if (!isPickupConfirmed) {
      setSelectedLocation(location)
      setSelectedDate('')
      setSelectedTime('')
      setSelectedTimeslot(null)
    }
  }

  const handleDateSelect = (newDate) => {
    if (!isPickupConfirmed && newDate) {
      const dateStr = newDate.format('YYYY-MM-DD')
      setSelectedDate(dateStr)
      setSelectedTime('')
      setSelectedTimeslot(null)
    }
  }

  const handleTimeSelect = (timeslot) => {
    if (!isPickupConfirmed) {
      setSelectedTime(`${timeslot.start_time} - ${timeslot.end_time}`)
      setSelectedTimeslot(timeslot)
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

  const handleCheckout = async () => {
    if (!isCheckoutEnabled || isSubmitting) return

    try {
      setIsSubmitting(true)

      // Note: File upload is disabled (R2 not configured yet)
      // For now, we'll submit without file upload
      const orderData = {
        customerEmail: email,
        customerPhone: phone,
        locationId: selectedLocation.id,
        timeslotId: selectedTimeslot.id,
        pickupDate: selectedDate,
        pickupTime: selectedTime,
        proofFileUrl: null, // Will be populated when R2 is enabled
        proofFileName: uploadedFile ? uploadedFile.name : null,
        items: cartItems.map(item => {
          // Extract product ID from item
          const productId = item.id
          return {
            productId: typeof productId === 'string' ? parseInt(productId.split('-')[0]) || 1 : productId,
            quantity: item.quantity
          }
        })
      }

      const result = await api.createOrder(orderData)

      // Clear cart and redirect to success page
      clearCart()
      alert(`Order created successfully! Order number: ${result.orderNumber}`)
      navigate('/')
    } catch (err) {
      console.error('Failed to create order:', err)
      alert(`Failed to create order: ${err.message}`)
    } finally {
      setIsSubmitting(false)
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
                {loadingLocations ? (
                  <p>Loading locations...</p>
                ) : (
                  locations.map((location) => (
                    <button
                      key={location.id}
                      className={`location-btn ${selectedLocation?.id === location.id ? 'active' : ''} ${isPickupConfirmed ? 'disabled' : ''}`}
                      onClick={() => handleLocationSelect(location)}
                      disabled={isPickupConfirmed}
                    >
                      {location.name}
                    </button>
                  ))
                )}
              </div>

              {selectedLocation && (
                <div className="calendar-container">
                  {loadingTimeslots ? (
                    <p>Loading available dates...</p>
                  ) : (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateCalendar
                        value={selectedDate ? dayjs(selectedDate) : null}
                        onChange={handleDateSelect}
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
                  )}

                  {selectedDate && (
                    <div className="time-slots-container">
                      <p className="time-slots-label">Available Times:</p>
                      <div className="time-slots">
                        {getTimeslotsForDate(selectedDate).map((timeslot) => (
                          <button
                            key={timeslot.id}
                            className={`time-btn ${selectedTimeslot?.id === timeslot.id ? 'selected' : ''} ${isPickupConfirmed ? 'disabled' : ''}`}
                            onClick={() => handleTimeSelect(timeslot)}
                            disabled={isPickupConfirmed}
                          >
                            {timeslot.start_time} - {timeslot.end_time} ({timeslot.spotsLeft} left)
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
              disabled={!isCheckoutEnabled || isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Checkout'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
