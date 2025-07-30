// src/components/BookingForm.jsx
import React, { useState, useEffect } from 'react';

const BookingForm = ({ bookingType, itemDetails, user, onSubmit, loading, error }) => {
  const [formData, setFormData] = useState({
    // Booking specific details - these are for UI/display only
    checkInDate: '',
    checkOutDate: '',
    departureDate: '',
    returnDate: '',
    numberOfGuests: 1,
    numberOfNights: 1,
    specialRequests: '',
    
    // Agreement
    agreeToTerms: false
  });

  const [totalPrice, setTotalPrice] = useState(0);

  // Calculate total amount when form data changes
  useEffect(() => {
    if (bookingType === 'hotel' && itemDetails?.pricePerNight) {
      const nights = formData.numberOfNights || 1;
      setTotalPrice(itemDetails.pricePerNight * nights);
    } else if (bookingType === 'flight' && itemDetails?.price) {
      const guests = formData.numberOfGuests || 1;
      setTotalPrice(itemDetails.price * guests);
    }
  }, [bookingType, itemDetails, formData.numberOfNights, formData.numberOfGuests]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Calculate number of nights for hotel bookings
  const calculateNights = (checkIn, checkOut) => {
    if (!checkIn || !checkOut) return 1;
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const diffTime = Math.abs(checkOutDate - checkInDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  // Handle date changes for hotel bookings
  useEffect(() => {
    if (bookingType === 'hotel' && formData.checkInDate && formData.checkOutDate) {
      const nights = calculateNights(formData.checkInDate, formData.checkOutDate);
      setFormData(prev => ({
        ...prev,
        numberOfNights: nights
      }));
    }
  }, [formData.checkInDate, formData.checkOutDate, bookingType]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    debugger
    if (!formData.agreeToTerms) {
      alert('Please agree to the terms and conditions to proceed.');
      return;
    }

    // Validate required fields
    if (bookingType === 'hotel') {
      if (!formData.checkInDate || !formData.checkOutDate) {
        alert('Please select check-in and check-out dates.');
        return;
      }
    } else if (bookingType === 'flight') {
      if (!formData.departureDate) {
        alert('Please select departure date.');
        return;
      }
    }

    // Prepare booking data according to BookingCreateDTO structure
    const bookingCreateDTO = {
      UserId: user?.id || user?.userId, // Use the actual user ID from your authentication
      HotelId: bookingType === 'hotel' ? itemDetails?.id : null,
      FlightId: bookingType === 'flight' ? itemDetails?.id : null,
      TotalPrice: totalPrice,
      Status: 'Confirmed' // Default status
    };

    // Include additional booking details for your frontend logic
    const additionalDetails = {
      numberOfGuests: formData.numberOfGuests,
      specialRequests: formData.specialRequests,
      ...(bookingType === 'hotel' && {
        checkInDate: formData.checkInDate,
        checkOutDate: formData.checkOutDate,
        numberOfNights: formData.numberOfNights
      }),
      ...(bookingType === 'flight' && {
        departureDate: formData.departureDate,
        returnDate: formData.returnDate || null
      })
    };

    // Combine both DTOs for submission
    const completeBookingData = {
      booking: bookingCreateDTO,
      details: additionalDetails
    };

    onSubmit(completeBookingData);
  };

  // Get minimum date (today)
  const getMinDate = () => {
    return new Date().toISOString().split('T')[0];
  };

  // Display user information (read-only)
  const displayUserInfo = () => {
    if (!user) return null;
    
    return (
      <div className="mb-4">
        <h6 className="fw-bold mb-3">
          <i className="bi bi-person me-2"></i>
          Booking For
        </h6>
        <div className="p-3 bg-light rounded">
          <div className="row">
            <div className="col-md-6">
              <small className="text-muted">Customer</small>
              <div className="fw-medium">{user.username || user.name || 'N/A'}</div>
            </div>
            <div className="col-md-6">
              <small className="text-muted">Email</small>
              <div className="fw-medium">{user.email || user.username || 'N/A'}</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-light">
        <h5 className="mb-0">
          <i className={`bi ${bookingType === 'flight' ? 'bi-airplane' : 'bi-building'} me-2`}></i>
          {bookingType === 'flight' ? 'Flight' : 'Hotel'} Booking Details
        </h5>
      </div>
      
      <div className="card-body">
        {error && (
          <div className="alert alert-danger" role="alert">
            <i className="bi bi-exclamation-triangle me-2"></i>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* User Information Display */}
          {displayUserInfo()}

          {/* Booking Details */}
          <div className="mb-4">
            <h6 className="fw-bold mb-3">
              <i className="bi bi-gear me-2"></i>
              Booking Preferences
            </h6>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="numberOfGuests" className="form-label">
                  Number of Guests <span className="text-danger">*</span>
                </label>
                <select
                  className="form-select"
                  id="numberOfGuests"
                  name="numberOfGuests"
                  value={formData.numberOfGuests}
                  onChange={handleInputChange}
                  required
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                    <option key={num} value={num}>{num} Guest{num > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Date-specific Details */}
          <div className="mb-4">
            <h6 className="fw-bold mb-3">
              <i className={`bi ${bookingType === 'flight' ? 'bi-calendar' : 'bi-calendar-range'} me-2`}></i>
              {bookingType === 'flight' ? 'Travel' : 'Stay'} Details
            </h6>
            
            {bookingType === 'hotel' ? (
              <div className="row">
                <div className="col-md-4 mb-3">
                  <label htmlFor="checkInDate" className="form-label">
                    Check-in Date <span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="checkInDate"
                    name="checkInDate"
                    value={formData.checkInDate}
                    onChange={handleInputChange}
                    min={getMinDate()}
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="checkOutDate" className="form-label">
                    Check-out Date <span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="checkOutDate"
                    name="checkOutDate"
                    value={formData.checkOutDate}
                    onChange={handleInputChange}
                    min={formData.checkInDate || getMinDate()}
                    required
                  />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Number of Nights</label>
                  <div className="form-control bg-light">
                    <strong>{formData.numberOfNights}</strong> night{formData.numberOfNights > 1 ? 's' : ''}
                  </div>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="departureDate" className="form-label">
                    Departure Date <span className="text-danger">*</span>
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="departureDate"
                    name="departureDate"
                    value={formData.departureDate}
                    onChange={handleInputChange}
                    min={getMinDate()}
                    required
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="returnDate" className="form-label">
                    Return Date (Optional)
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="returnDate"
                    name="returnDate"
                    value={formData.returnDate}
                    onChange={handleInputChange}
                    min={formData.departureDate || getMinDate()}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Special Requests */}
          <div className="mb-4">
            <label htmlFor="specialRequests" className="form-label">
              <i className="bi bi-chat-text me-2"></i>
              Special Requests (Optional)
            </label>
            <textarea
              className="form-control"
              id="specialRequests"
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleInputChange}
              rows="3"
              placeholder="Any special requirements or requests..."
            ></textarea>
          </div>

          {/* Price Summary */}
          <div className="mb-4 p-3 bg-light rounded">
            <h6 className="fw-bold mb-3">Booking Summary</h6>
            <div className="d-flex justify-content-between mb-2">
              <span>Item</span>
              <span>{itemDetails?.name || itemDetails?.airline || 'N/A'}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>
                {bookingType === 'flight' ? 'Price per Guest' : 'Price per Night'}
              </span>
              <span>PKR- {bookingType === 'flight' ? itemDetails?.price : itemDetails?.pricePerNight}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>
                Quantity ({bookingType === 'flight' ? formData.numberOfGuests : formData.numberOfNights} 
                {bookingType === 'flight' ? ' guest(s)' : ' night(s)'})
              </span>
              <span>PKR- {totalPrice}</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <strong>Total Amount</strong>
              <strong className="text-primary">PKR- {totalPrice}</strong>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="mb-4">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="agreeToTerms"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
                required
              />
              <label className="form-check-label" htmlFor="agreeToTerms">
                I agree to the <a href="#" className="text-primary">Terms and Conditions</a> and 
                <a href="#" className="text-primary"> Privacy Policy</a> <span className="text-danger">*</span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-primary btn-lg py-3"
              disabled={loading || !formData.agreeToTerms}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Processing Booking...
                </>
              ) : (
                <>
                  <i className="bi bi-check-circle me-2"></i>
                  Confirm Booking - PKR- {totalPrice}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;