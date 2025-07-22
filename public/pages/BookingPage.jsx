// src/pages/BookingPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BookingForm from '../components/BookingForm';
import { useUser } from '../../src/hooks/useUser';
import { useBookingMutation } from '../../src/hooks/useBooking';
import { toast } from 'react-toastify';

const BookingPage = () => {
  const { type, id } = useParams(); // type: 'flight' or 'hotel', id: item id
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUser();
  const { createNewBooking, loading, error } = useBookingMutation();
  
  // Get item details from location state (passed from flight/hotel cards)
  const [itemDetails, setItemDetails] = useState(location.state?.itemDetails || null);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('auth_user');
    if (!storedUser) {
      toast.error('Please log in to make a booking');
      navigate('/login');
      return;
    }

    // If no item details in state, we might need to fetch them
    if (!itemDetails) {
      toast.warning('No item details found. Please select an item to book.');
      navigate('/plaintrip');
    }
  }, [itemDetails, navigate]);

  const handleBookingSubmit = async (bookingData) => {
    if (!user?.userId) {
      toast.error('User information not found. Please log in again.');
      navigate('/login');
      return;
    }

    // Prepare booking data
    const finalBookingData = {
      userId: user.userId,
      flightId: type === 'flight' ? parseInt(id) : null,
      hotelId: type === 'hotel' ? parseInt(id) : null,
      bookingDate: new Date().toISOString(),
      totalAmount: itemDetails?.price || itemDetails?.pricePerNight || 0,
      status: 'Confirmed',
      ...bookingData
    };

    const result = await createNewBooking(finalBookingData);
    
    if (result.success) {
      toast.success('Booking created successfully!');
      navigate('/profile', { 
        state: { 
          message: 'Booking created successfully!',
          bookingId: result.data?.bookingId 
        }
      });
    } else {
      toast.error(result.error || 'Failed to create booking');
    }
  };

  // Loading state
  if (!itemDetails) {
    return (
      <>
        <Navbar />
        <div className="container my-5">
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading booking details...</p>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container my-5">
        {/* Page Header */}
        <div className="row mb-4">
          <div className="col-12">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/plaintrip">Destinations</a>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Book {type === 'flight' ? 'Flight' : 'Hotel'}
                </li>
              </ol>
            </nav>
            <h1 className="display-5 fw-bold">Complete Your Booking</h1>
            <p className="lead text-muted">
              Review your selection and provide booking details
            </p>
          </div>
        </div>

        <div className="row">
          {/* Booking Summary */}
          <div className="col-lg-4 mb-4">
            <div className="card shadow-sm sticky-top" style={{ top: '2rem' }}>
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">
                  <i className={`bi ${type === 'flight' ? 'bi-airplane' : 'bi-building'} me-2`}></i>
                  Booking Summary
                </h5>
              </div>
              <div className="card-body">
                {type === 'flight' ? (
                  /* Flight Summary */
                  <div>
                    <h6 className="fw-bold">{itemDetails.airline}</h6>
                    <p className="small text-muted mb-2">
                      Flight FL{itemDetails.flightId?.toString().padStart(4, '0')}
                    </p>
                    
                    <div className="mb-3">
                      <div className="d-flex justify-content-between">
                        <span>{itemDetails.departureDestination || `Dest ${itemDetails.departureDestinationId}`}</span>
                        <span>→</span>
                        <span>{itemDetails.arrivalDestination || `Dest ${itemDetails.arrivalDestinationId}`}</span>
                      </div>
                      <small className="text-muted">
                        {new Date(itemDetails.departureTime).toLocaleDateString()} • 
                        {new Date(itemDetails.departureTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })} - 
                        {new Date(itemDetails.arrivalTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                      </small>
                    </div>
                  </div>
                ) : (
                  /* Hotel Summary */
                  <div>
                    <h6 className="fw-bold">{itemDetails.name}</h6>
                    {itemDetails.rating && (
                      <div className="mb-2">
                        {'★'.repeat(Math.floor(itemDetails.rating))}
                        <span className="text-muted"> ({itemDetails.rating})</span>
                      </div>
                    )}
                    {itemDetails.amenities && (
                      <div className="mb-3">
                        <small className="text-muted">Amenities:</small>
                        <div className="mt-1">
                          {itemDetails.amenities.split(',').slice(0, 3).map((amenity, index) => (
                            <span key={index} className="badge bg-light text-dark me-1 mb-1">
                              {amenity.trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <hr />
                
                {/* Price */}
                <div className="d-flex justify-content-between align-items-center">
                  <span className="fw-semibold">Total Amount</span>
                  <span className="h5 text-primary mb-0">
                    ${type === 'flight' ? itemDetails.price : itemDetails.pricePerNight}
                    {type === 'hotel' && <small className="text-muted"> /night</small>}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="col-lg-8">
            <BookingForm
              bookingType={type}
              itemDetails={itemDetails}
              user={user}
              onSubmit={handleBookingSubmit}
              loading={loading}
              error={error}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BookingPage;