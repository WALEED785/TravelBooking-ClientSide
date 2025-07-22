// src/components/HotelCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const HotelCard = ({ hotel }) => {
  const navigate = useNavigate();
  // Static hotel images (you can expand this array)
  const hotelImages = [
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
  ];

  // Get image based on hotel ID
  const getHotelImage = () => {
    return hotelImages[hotel.hotelId % hotelImages.length];
  };

  // Handle booking navigation
  const handleBooking = () => {
    // Check if user is logged in
    const user = localStorage.getItem('auth_user');
    if (!user) {
      navigate('/login');
      return;
    }

    // Navigate to booking page with hotel details
    navigate(`/booking/hotel/${hotel.hotelId}`, {
      state: {
        itemDetails: hotel
      }
    });
  };
  const formatAmenities = (amenities) => {
    if (!amenities) return [];
    return amenities.split(',').map(amenity => amenity.trim()).slice(0, 3); // Show only first 3 amenities
  };

  // Format rating stars
  const renderStars = (rating) => {
    if (!rating) return <span className="text-muted small">No rating</span>;
    
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<span key={i} className="text-warning">★</span>);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<span key={i} className="text-warning">☆</span>);
      } else {
        stars.push(<span key={i} className="text-muted">☆</span>);
      }
    }
    
    return (
      <div className="d-flex align-items-center">
        <span className="me-2">{stars}</span>
        <small className="text-muted">({rating.toFixed(1)})</small>
      </div>
    );
  };

  const amenitiesList = formatAmenities(hotel.amenities);

  return (
    <div className="card h-100 shadow-sm border-0" style={{ borderRadius: '12px', overflow: 'hidden' }}>
      <div className="position-relative">
        <img 
          src={getHotelImage()} 
          className="card-img-top" 
          alt={hotel.name}
          style={{ height: '220px', objectFit: 'cover' }}
        />
        <div className="position-absolute top-0 end-0 m-3">
          <span className="badge bg-primary px-3 py-2" style={{ fontSize: '0.9rem', borderRadius: '20px' }}>
            ${hotel.pricePerNight}
            <small className="text-white-50"> /night</small>
          </span>
        </div>
      </div>
      
      <div className="card-body p-4 d-flex flex-column">
        <h5 className="card-title fw-bold mb-2" style={{ fontSize: '1.1rem' }}>{hotel.name}</h5>
        
        {/* Rating */}
        <div className="mb-3">
          {renderStars(hotel.rating)}
        </div>
        
        {/* Amenities */}
        {amenitiesList.length > 0 && (
          <div className="mb-3">
            <small className="text-muted d-block mb-2 fw-semibold">Amenities:</small>
            <div className="d-flex flex-wrap gap-1">
              {amenitiesList.map((amenity, index) => (
                <span 
                  key={index} 
                  className="badge text-dark" 
                  style={{ 
                    backgroundColor: '#f8f9fa', 
                    border: '1px solid #dee2e6',
                    fontSize: '0.75rem',
                    fontWeight: 'normal'
                  }}
                >
                  {amenity}
                </span>
              ))}
              {hotel.amenities && hotel.amenities.split(',').length > 3 && (
                <span 
                  className="badge bg-secondary" 
                  style={{ fontSize: '0.75rem' }}
                >
                  +{hotel.amenities.split(',').length - 3} more
                </span>
              )}
            </div>
          </div>
        )}
        
        {/* Book Button */}
        <div className="mt-auto pt-2">
          <button 
            className="btn btn-primary w-100 py-2 fw-semibold" 
            style={{ borderRadius: '8px', fontSize: '0.95rem' }}
            onClick={handleBooking}
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;