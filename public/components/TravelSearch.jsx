import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Plane, Hotel, Calendar, Users, Filter, Star, Clock, DollarSign, ChevronDown, Sparkles, Globe, ArrowRight } from 'lucide-react';
import "../style/TravelSearch.css";

const TravelSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('destinations');
  const [autocompleteResults, setAutocompleteResults] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('');
  const [sortDescending, setSortDescending] = useState(false);
  const autocompleteRef = useRef(null);

  const API_BASE_URL = 'http://localhost:5000/api/elasticsearch';

  // Debounced autocomplete
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.length >= 2) {
        fetchAutocomplete();
      } else {
        setAutocompleteResults([]);
        setShowAutocomplete(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Close autocomplete when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (autocompleteRef.current && !autocompleteRef.current.contains(event.target)) {
        setShowAutocomplete(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const fetchAutocomplete = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/autocomplete?query=${encodeURIComponent(searchQuery)}`);
      if (response.ok) {
        const data = await response.json();
        setAutocompleteResults(data);
        setShowAutocomplete(true);
      }
    } catch (error) {
      console.error('Autocomplete error:', error);
    }
  };

  const handleSearch = async (page = 1) => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setCurrentPage(page);

    try {
      const params = new URLSearchParams({
        query: searchQuery,
        page: page.toString(),
        pageSize: '10',
        ...(sortBy && { sortBy }),
        ...(sortDescending && { sortDescending: 'true' })
      });

      const response = await fetch(`${API_BASE_URL}/search/${searchType}?${params}`);
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
      } else {
        console.error('Search failed:', response.statusText);
      }
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAutocompleteSelect = (result) => {
    setSearchQuery(result.text);
    setSearchType(result.type === 'destination' ? 'destinations' : 'hotels');
    setShowAutocomplete(false);
    setTimeout(() => handleSearch(), 100);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setShowAutocomplete(false);
      handleSearch();
    }
  };

  const renderSearchResults = () => {
    if (!searchResults) return null;

    return (
      <div className="results-container">
        {/* Results header */}
        <div className="results-header">
          <div className="results-header-info">
            <h2>{searchResults.total.toLocaleString()} results</h2>
            <p>for "{searchQuery}"</p>
          </div>
          <div className="results-header-controls">
            <div className="sort-select-wrapper">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="">Sort by relevance</option>
                <option value="name">Name</option>
                {searchType === 'destinations' && <option value="country">Country</option>}
                {searchType === 'flights' && (
                  <>
                    <option value="price">Price</option>
                    <option value="departureTime">Departure Time</option>
                  </>
                )}
                {searchType === 'hotels' && (
                  <>
                    <option value="rating">Rating</option>
                    <option value="pricePerNight">Price</option>
                  </>
                )}
              </select>
              <ChevronDown className="sort-select-icon" />
            </div>
            <button
              onClick={() => setSortDescending(!sortDescending)}
              className="sort-direction-button"
            >
              {sortDescending ? '↓' : '↑'}
            </button>
          </div>
        </div>

        {/* Results grid */}
        <div className="results-grid">
          {searchResults.results.map((result, index) => (
            <div 
              key={result.id} 
              className="card"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {searchType === 'destinations' && (
                <DestinationCard destination={result} />
              )}
              {searchType === 'flights' && (
                <FlightCard flight={result} />
              )}
              {searchType === 'hotels' && (
                <HotelCard hotel={result} />
              )}
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="pagination">
          <div className="pagination-buttons">
            {Array.from({ length: Math.ceil(searchResults.total / 10) }, (_, i) => i + 1)
              .slice(Math.max(0, currentPage - 3), currentPage + 2)
              .map((page) => (
                <button
                  key={page}
                  onClick={() => handleSearch(page)}
                  className={`pagination-button ${page === currentPage ? 'active' : ''}`}
                >
                  {page}
                </button>
              ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="travel-search">
      {/* Hero Header */}
      <div className="hero-header">
        <div className="hero-overlay"></div>
        <div className="hero-background">
          <div className="hero-blob-1"></div>
          <div className="hero-blob-2"></div>
        </div>
        
        <div className="hero-content">
          <div className="hero-icon-container">
            <div className="hero-icon-wrapper">
              <Globe className="hero-icon" />
            </div>
          </div>
          <h1 className="hero-title">
            Discover Your Next
            <span className="hero-title-highlight">Adventure</span>
          </h1>
          <p className="hero-subtitle">
            Search through millions of destinations, flights, and hotels to plan your perfect journey
          </p>
        </div>
      </div>

      {/* Search Section */}
      <div className="search-section">
        <div className="search-container">
          <div className="search-form">
            {/* Search Type Selector */}
            <div className="search-type-selector">
              <button
                onClick={() => setSearchType('destinations')}
                className={`search-type-button ${searchType === 'destinations' ? 'active' : ''}`}
              >
                <MapPin className="search-type-icon" />
                Destinations
              </button>
              <button
                onClick={() => setSearchType('flights')}
                className={`search-type-button ${searchType === 'flights' ? 'active' : ''}`}
              >
                <Plane className="search-type-icon" />
                Flights
              </button>
              <button
                onClick={() => setSearchType('hotels')}
                className={`search-type-button ${searchType === 'hotels' ? 'active' : ''}`}
              >
                <Hotel className="search-type-icon" />
                Hotels
              </button>
            </div>

            {/* Search Input */}
            <div className="search-input-container" ref={autocompleteRef}>
              <div className="search-input-wrapper">
                <Search className="search-input-icon" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={`Search ${searchType}...`}
                  className="search-input"
                />
              </div>

              {/* Autocomplete Dropdown */}
              {showAutocomplete && autocompleteResults.length > 0 && (
                <div className="autocomplete-dropdown">
                  {autocompleteResults.map((result, index) => (
                    <button
                      key={index}
                      onClick={() => handleAutocompleteSelect(result)}
                      className="autocomplete-item"
                    >
                      <div className={`autocomplete-item-icon ${result.type === 'destination' ? 'destination' : 'hotel'}`}>
                        {result.type === 'destination' ? (
                          <MapPin className="autocomplete-item-icon-svg destination" />
                        ) : (
                          <Hotel className="autocomplete-item-icon-svg hotel" />
                        )}
                      </div>
                      <span className="autocomplete-item-text">{result.text}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search Button */}
            <button
              onClick={() => handleSearch()}
              disabled={loading || !searchQuery.trim()}
              className="search-button"
            >
              {loading ? (
                <>
                  <div className="search-button-spinner"></div>
                  Searching
                </>
              ) : (
                <>
                  Search
                  <ArrowRight className="search-button-icon" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results */}
        {renderSearchResults()}
      </div>
    </div>
  );
};

// Enhanced Destination Card Component
const DestinationCard = ({ destination }) => (
  <div className="card-content">
    <div className="card-header">
      <div>
        <h3 className="card-title">{destination.name}</h3>
        <p className="card-location">
          <div className="card-location-icon destination">
            <MapPin />
          </div>
          {destination.country}
        </p>
      </div>
      <div className="card-price">
        <div className="hero-icon-wrapper">
          <Sparkles className="hero-icon" style={{width: '20px', height: '20px'}} />
        </div>
      </div>
    </div>
    
    <p className="card-description">{destination.description}</p>
    
    {destination.tags && destination.tags.length > 0 && (
      <div className="card-tags">
        {destination.tags.slice(0, 3).map((tag, index) => (
          <span key={index} className="card-tag destination">
            {tag}
          </span>
        ))}
      </div>
    )}
    
    <button className="card-button destination">
      View Details
      <ArrowRight className="card-button-icon" />
    </button>
  </div>
);

// Enhanced Flight Card Component
const FlightCard = ({ flight }) => (
  <div className="card-content">
    <div className="card-header">
      <div>
        <h3 className="card-title">{flight.airline}</h3>
        <p className="card-location">
          <div className="card-location-icon flight">
            <Plane />
          </div>
          {flight.departureDestination} → {flight.arrivalDestination}
        </p>
      </div>
      <div className="card-price">
        <p className="card-price-amount flight">${flight.price}</p>
        <p className="card-price-label">total</p>
      </div>
    </div>
    
    <div className="flight-details">
      <div className="flight-time-info">
        <Clock className="flight-time-icon departure" />
        <div>
          <p className="flight-time-label">Departure</p>
          <p className="flight-time-value">{new Date(flight.departureTime).toLocaleString()}</p>
        </div>
      </div>
      <div className="flight-time-info">
        <Clock className="flight-time-icon arrival" />
        <div>
          <p className="flight-time-label">Arrival</p>
          <p className="flight-time-value">{new Date(flight.arrivalTime).toLocaleString()}</p>
        </div>
      </div>
      <div className="flight-duration">
        <span>Duration: {flight.duration}</span>
      </div>
    </div>
    
    <button className="card-button flight">
      Book Flight
      <ArrowRight className="card-button-icon" />
    </button>
  </div>
);

// Enhanced Hotel Card Component
const HotelCard = ({ hotel }) => (
  <div className="card-content">
    <div className="card-header">
      <div>
        <h3 className="card-title">{hotel.name}</h3>
        <p className="card-location">
          <div className="card-location-icon hotel">
            <MapPin />
          </div>
          {hotel.destination}
        </p>
      </div>
      <div className="card-price">
        <p className="card-price-amount hotel">${hotel.pricePerNight}</p>
        <p className="card-price-label">per night</p>
      </div>
    </div>
    
    <div className="hotel-rating">
      <div className="hotel-rating-stars">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`hotel-star ${i < hotel.rating ? 'filled' : 'empty'}`}
          />
        ))}
        <span className="hotel-rating-value">({hotel.rating})</span>
      </div>
    </div>
    
    <p className="card-description">{hotel.description}</p>
    
    {hotel.amenities && hotel.amenities.length > 0 && (
      <div className="card-tags">
        {hotel.amenities.slice(0, 3).map((amenity, index) => (
          <span key={index} className="card-tag hotel">
            {amenity}
          </span>
        ))}
      </div>
    )}
    
    <button className="card-button hotel">
      Book Hotel
      <ArrowRight className="card-button-icon" />
    </button>
  </div>
);

export default TravelSearch;