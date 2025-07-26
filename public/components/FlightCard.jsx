// src/components/FlightCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const FlightCard = ({ flight }) => {
  const navigate = useNavigate();
  // Handle booking navigation
  const handleBooking = () => {
    // Check if user is logged in
    const user = localStorage.getItem('auth_user');
    if (!user) {
      navigate('/login');
      return;
    }

    // Navigate to booking page with flight details
    navigate(`/booking/flight/${flight.flightId}`, {
      state: {
        itemDetails: flight
      }
    });
  };

  // Format date and time
  const formatDateTime = (dateTime) => {
    const date = new Date(dateTime);
    return {
      date: date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric'
      }),
      time: date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      })
    };
  };

  // Calculate flight duration
  const calculateDuration = (departure, arrival) => {
    const depTime = new Date(departure);
    const arrTime = new Date(arrival);
    const diffMs = arrTime - depTime;
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else {
      return `${minutes}m`;
    }
  };

  // Get airline logo/icon (you can expand this mapping)
  const getAirlineIcon = (airline) => {
    const airlineIcons = {
      'emirates': '🇦🇪',
      'lufthansa': '🇩🇪', 
      'american': '🇺🇸',
      'british': '🇬🇧',
      'air india': '🇮🇳',
      'singapore': '🇸🇬',
      'lhr': '✈️',
      'islamabad': '🇵🇰',
      'default': '✈️'
    };
    
    const airlineLower = airline?.toLowerCase() || '';
    for (const [key, icon] of Object.entries(airlineIcons)) {
      if (airlineLower.includes(key)) {
        return icon;
      }
    }
    return airlineIcons.default;
  };

  const departureInfo = formatDateTime(flight.departureTime);
  const arrivalInfo = formatDateTime(flight.arrivalTime);
  const duration = calculateDuration(flight.departureTime, flight.arrivalTime);
  const airlineIcon = getAirlineIcon(flight.airline);

  return (
    <div className="card h-100 shadow-sm border-0" style={{ borderRadius: '12px' }}>
      <div className="card-body p-4">
        {/* Header with Airline and Price */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center">
            <span className="me-3" style={{ fontSize: '1.5rem' }}>{airlineIcon}</span>
            <div>
              <h6 className="mb-0 fw-bold">{flight.airline}</h6>
              <small className="text-muted">Flight FL{flight.flightId.toString().padStart(4, '0')}</small>
            </div>
          </div>
          <span 
            className="badge bg-success px-3 py-2" 
            style={{ fontSize: '1rem', borderRadius: '20px' }}
          >
            PKR- {flight.price}
          </span>
        </div>

        {/* Flight Route */}
        <div className="row mb-4">
          {/* Departure */}
          <div className="col-4">
            <div className="text-center">
              <div className="h4 mb-1 fw-bold text-dark">{departureInfo.time}</div>
              <div className="small text-muted mb-2">{departureInfo.date}</div>
              <div className="fw-semibold text-primary" style={{ fontSize: '0.9rem' }}>
                {flight.departureDestination || `Destination ${flight.departureDestinationId}`}
              </div>
            </div>
          </div>

          {/* Arrow and Duration */}
          <div className="col-4">
            <div className="text-center">
              <div className="mb-2">
                <span className="text-primary" style={{ fontSize: '1.2rem' }}>→</span>
              </div>
              <div 
                className="badge bg-light text-dark px-3 py-1" 
                style={{ fontSize: '0.8rem', borderRadius: '15px' }}
              >
                {duration}
              </div>
            </div>
          </div>

          {/* Arrival */}
          <div className="col-4">
            <div className="text-center">
              <div className="h4 mb-1 fw-bold text-dark">{arrivalInfo.time}</div>
              <div className="small text-muted mb-2">{arrivalInfo.date}</div>
              <div className="fw-semibold text-primary" style={{ fontSize: '0.9rem' }}>
                {flight.arrivalDestination || `Destination ${flight.arrivalDestinationId}`}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="d-grid gap-2">
          <button 
            className="btn btn-primary py-2 fw-semibold" 
            style={{ borderRadius: '8px', fontSize: '0.95rem' }}
            onClick={handleBooking}
          >
            Book Flight - PKR- {flight.price}
          </button>
          <button 
            className="btn btn-outline-secondary btn-sm py-1" 
          style={{ borderRadius: '6px', fontSize: '0.85rem' }}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;