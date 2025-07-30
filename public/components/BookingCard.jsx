// src/components/BookingCard.jsx
import React, { useState } from 'react';
import { useBookingMutation } from '../../src/hooks/useBooking';
import { toast } from 'react-toastify';

const BookingCard = ({ booking }) => {
  const { cancelExistingBooking, loading } = useBookingMutation();
  const [showDetails, setShowDetails] = useState(false);

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Format time
  const formatTime = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  // Get booking type icon
  const getBookingIcon = () => {
    if (booking.flightId && booking.hotelId) return '🎫'; // Package
    if (booking.flightId) return '✈️'; // Flight
    if (booking.hotelId) return '🏨'; // Hotel
    return '📋'; // Generic
  };

  // Get status badge class
  const getStatusBadgeClass = () => {
    switch (booking.status?.toLowerCase()) {
      case 'confirmed': return 'bg-success';
      case 'pending': return 'bg-warning';
      case 'cancelled': return 'bg-danger';
      default: return 'bg-secondary';
    }
  };

  // Handle cancel booking
  const handleCancel = async () => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    const result = await cancelExistingBooking(booking.bookingId);
    if (result.success) {
      toast.success('Booking cancelled successfully');
      // Optionally refresh the bookings list
      window.location.reload();
    } else {
      toast.error(result.error || 'Failed to cancel booking');
    }
  };

  // Check if booking can be cancelled
  const canCancel = () => {
    return booking.status?.toLowerCase() === 'confirmed' || booking.status?.toLowerCase() === 'pending';
  };

  return (
    <div className="card h-100 shadow-sm border-0" style={{ borderRadius: '12px' }}>
      <div className="card-body p-3">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-start mb-3">
          <div className="d-flex align-items-center">
            <span className="me-2" style={{ fontSize: '1.5rem' }}>{getBookingIcon()}</span>
            <div>
              <h6 className="mb-0 fw-bold">Booking #{booking.bookingId}</h6>
              <small className="text-muted">
                Booked on {formatDate(booking.bookingDate)}
              </small>
            </div>
          </div>
          <span className={`badge ${getStatusBadgeClass()}`}>
            {booking.status || 'Confirmed'}
          </span>
        </div>

        {/* Booking Details */}
        <div className="mb-3">
          {/* Flight Info */}
          {booking.flightId && (
            <div className="mb-2">
              <small className="text-muted d-block">Flight</small>
              <div className="fw-semibold">
                Flight ID: {booking.flightId}
              </div>
              {booking.flight && (
                <div className="small text-muted">
                  {booking.flight.airline} • {formatTime(booking.flight.departureTime)} - {formatTime(booking.flight.arrivalTime)}
                </div>
              )}
            </div>
          )}

          {/* Hotel Info */}
          {booking.hotelId && (
            <div className="mb-2">
              <small className="text-muted d-block">Hotel</small>
              <div className="fw-semibold">
                Hotel ID: {booking.hotelId}
              </div>
              {booking.hotel && (
                <div className="small text-muted">
                  {booking.hotel.name} • PKR{booking.hotel.pricePerNight}/night
                </div>
              )}
            </div>
          )}

          {/* Check-in/Check-out dates */}
          {(booking.checkInDate || booking.checkOutDate) && (
            <div className="mb-2">
              <small className="text-muted d-block">Stay Duration</small>
              <div className="fw-semibold">
                {formatDate(booking.checkInDate)} - {formatDate(booking.checkOutDate)}
              </div>
            </div>
          )}
        </div>

        {/* Price */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="text-muted">Total Amount</span>
          <span className="h5 text-primary mb-0">PKR-{booking.totalPrice}</span>
        </div>

        {/* Action Buttons */}
        <div className="d-grid gap-2">
          <button 
            className="btn btn-outline-primary btn-sm"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? 'Hide Details' : 'View Details'}
          </button>
          
          {canCancel() && (
            <button 
              className="btn btn-outline-danger btn-sm"
              onClick={handleCancel}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Cancelling...
                </>
              ) : (
                'Cancel Booking'
              )}
            </button>
          )}
        </div>

        {/* Expandable Details */}
        {showDetails && (
          <div className="mt-3 pt-3 border-top">
            <h6 className="mb-2">Booking Details</h6>
            <div className="small">
              <div className="row">
                <div className="col-6">
                  <strong>Booking ID:</strong><br />
                  {booking.bookingId}
                </div>
                <div className="col-6">
                  <strong>Status:</strong><br />
                  {booking.status || 'Confirmed'}
                </div>
                <div className="col-6 mt-2">
                  <strong>Booking Date:</strong><br />
                  {formatDate(booking.bookingDate)}
                </div>
                <div className="col-6 mt-2">
                  <strong>Total Amount:</strong><br />
                  PKR-{booking.totalPrice}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingCard;