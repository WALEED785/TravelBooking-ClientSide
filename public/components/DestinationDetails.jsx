// src/components/DestinationDetails.jsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDestination } from '../../src/hooks/useDestinations';
import { useFlightsByDestination } from '../../src/hooks/useFlights';
import { useHotelsByDestination } from '../../src/hooks/useHotels';
import HotelCard from './HotelCard';
import FlightCard from './FlightCard';

const DestinationDetails = ({ destinationId }) => {
  // Fetch destination details
  const { destination, loading: destLoading, error: destError } = useDestination(destinationId);
  
  // Fetch flights for this destination
  const { 
    flights, 
    loading: flightsLoading, 
    error: flightsError, 
    fetchFlightsByDestination 
  } = useFlightsByDestination(destinationId);
  
  // Fetch hotels for this destination
  const { 
    hotels, 
    loading: hotelsLoading, 
    error: hotelsError, 
    fetchHotelsByDestination 
  } = useHotelsByDestination(destinationId);

  // Note: No need for manual useEffect here since hooks auto-fetch when destinationId changes

  // Loading state
  if (destLoading) {
    return (
      <div className="container my-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading destination...</span>
          </div>
          <p className="mt-2">Loading destination details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (destError) {
    return (
      <div className="container my-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error Loading Destination</h4>
          <p>{destError.message || 'Failed to load destination details.'}</p>
          <Link to="/plaintrip" className="btn btn-outline-primary">
            Back to Destinations
          </Link>
        </div>
      </div>
    );
  }

  // No destination found
  if (!destination) {
    return (
      <div className="container my-5">
        <div className="alert alert-warning" role="alert">
          <h4 className="alert-heading">Destination Not Found</h4>
          <p>The requested destination could not be found.</p>
          <Link to="/plaintrip" className="btn btn-outline-primary">
            Back to Destinations
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container my-5">
      {/* Destination Header */}
      <div className="row mb-5">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h1 className="display-4">{destination.name}, {destination.country}</h1>
            <Link to="/plaintrip" className="btn btn-outline-secondary">
              ← Back to Destinations
            </Link>
          </div>
          {destination.description && (
            <p className="lead text-muted">{destination.description}</p>
          )}
          <hr className="my-4" />
        </div>
      </div>

      {/* Hotels Section */}
      <div className="row mb-5">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="h3">
              <i className="bi bi-building me-2"></i>
              Hotels in {destination.name}
            </h2>
            {!hotelsLoading && hotels && hotels.length > 0 && (
              <span className="badge bg-primary">{hotels.length} hotels found</span>
            )}
          </div>

          {hotelsLoading ? (
            <div className="text-center p-4">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading hotels...</span>
              </div>
              <p className="mt-2">Loading hotels...</p>
            </div>
          ) : hotelsError ? (
            <div className="alert alert-warning" role="alert">
              <i className="bi bi-exclamation-triangle me-2"></i>
              Failed to load hotels: {hotelsError.message || hotelsError}
            </div>
          ) : !hotels || hotels.length === 0 ? (
            <div className="alert alert-info" role="alert">
              <i className="bi bi-info-circle me-2"></i>
              No hotels found for this destination.
            </div>
          ) : (
            <div className="row">
              {hotels.map((hotel) => (
                <div key={hotel.hotelId} className="col-lg-4 col-md-6 mb-4">
                  <HotelCard hotel={hotel} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Flights Section */}
      <div className="row mb-5">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="h3">
              <i className="bi bi-airplane me-2"></i>
              Flights to/from {destination.name}
            </h2>
            {!flightsLoading && flights && flights.length > 0 && (
              <span className="badge bg-success">{flights.length} flights found</span>
            )}
          </div>

          {flightsLoading ? (
            <div className="text-center p-4">
              <div className="spinner-border text-success" role="status">
                <span className="visually-hidden">Loading flights...</span>
              </div>
              <p className="mt-2">Loading flights...</p>
            </div>
          ) : flightsError ? (
            <div className="alert alert-warning" role="alert">
              <i className="bi bi-exclamation-triangle me-2"></i>
              Failed to load flights: {flightsError.message || flightsError}
            </div>
          ) : !flights || flights.length === 0 ? (
            <div className="alert alert-info" role="alert">
              <i className="bi bi-info-circle me-2"></i>
              No flights found for this destination.
            </div>
          ) : (
            <div className="row">
              {flights.map((flight) => (
                <div key={flight.flightId} className="col-lg-6 col-md-12 mb-4">
                  <FlightCard flight={flight} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DestinationDetails;