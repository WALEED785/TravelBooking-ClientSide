// src/components/UserBookings.jsx
import React from 'react';
import BookingCard from './BookingCard';

const UserBookings = ({ bookings, loading, error, onRefresh }) => {
  // Loading state
  if (loading) {
    return (
      <div className="card shadow-sm">
        <div className="card-body p-4">
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading bookings...</span>
            </div>
            <p className="mt-2">Loading your bookings...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="card shadow-sm">
        <div className="card-body p-4">
          <div className="alert alert-danger" role="alert">
            <h5 className="alert-heading">Error Loading Bookings</h5>
            <p>{error}</p>
            <button 
              className="btn btn-outline-danger"
              onClick={onRefresh}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // No bookings found
  if (!bookings || bookings.length === 0) {
    return (
      <div className="card shadow-sm">
        <div className="card-body p-4 text-center">
          <div className="mb-4">
            <i className="bi bi-calendar-x text-muted" style={{ fontSize: '4rem' }}></i>
          </div>
          <h4 className="mb-3">No Bookings Yet</h4>
          <p className="text-muted mb-4">
            You haven't made any bookings yet. Start exploring destinations and make your first booking!
          </p>
          <div className="d-flex gap-2 justify-content-center">
            <a href="/plaintrip" className="btn btn-primary">
              <i className="bi bi-compass me-2"></i>
              Explore Destinations
            </a>
            <button 
              className="btn btn-outline-secondary"
              onClick={onRefresh}
            >
              <i className="bi bi-arrow-clockwise me-2"></i>
              Refresh
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Group bookings by status
  const groupedBookings = bookings.reduce((acc, booking) => {
    const status = booking.status || 'Confirmed';
    if (!acc[status]) {
      acc[status] = [];
    }
    acc[status].push(booking);
    return acc;
  }, {});

  const statusOrder = ['Confirmed', 'Pending', 'Cancelled'];
  const sortedStatuses = statusOrder.filter(status => groupedBookings[status]);

  return (
    <div className="card shadow-sm">
      <div className="card-body p-4">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h4 className="mb-1">My Bookings</h4>
            <p className="text-muted mb-0">{bookings.length} total booking{bookings.length !== 1 ? 's' : ''}</p>
          </div>
          <button 
            className="btn btn-outline-primary btn-sm"
            onClick={onRefresh}
          >
            <i className="bi bi-arrow-clockwise me-2"></i>
            Refresh
          </button>
        </div>

        {/* Bookings by Status */}
        {sortedStatuses.map((status) => (
          <div key={status} className="mb-4">
            <h5 className="mb-3">
              <span className={`badge me-2 ${
                status === 'Confirmed' ? 'bg-success' :
                status === 'Pending' ? 'bg-warning' :
                'bg-danger'
              }`}>
                {status}
              </span>
              {groupedBookings[status].length} booking{groupedBookings[status].length !== 1 ? 's' : ''}
            </h5>
            
            <div className="row">
              {groupedBookings[status].map((booking) => (
                <div key={booking.bookingId} className="col-lg-6 col-xl-4 mb-3">
                  <BookingCard booking={booking} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserBookings;