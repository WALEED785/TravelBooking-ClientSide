import React, { useRef, useEffect } from 'react';
import { Search, MapPin, Plane, Hotel, Calendar, Users, Filter, Star, Clock, DollarSign, ChevronDown, Sparkles, Globe, ArrowRight } from 'lucide-react';
import { useSearch, useAutocomplete, usePagination } from '../../src/hooks/useSearch';
import "../style/TravelSearch.css";

const TravelSearch = () => {
  // Use the search hook
  const {
    searchQuery,
    setSearchQuery,
    searchType,
    setSearchType,
    searchResults,
    loading,
    error,
    currentPage,
    sortBy,
    setSortBy,
    sortDescending,
    setSortDescending,
    search,
    hasResults,
    totalPages,
    clearError
  } = useSearch();

  // Use the autocomplete hook
  const {
    query: autocompleteQuery,
    setQuery: setAutocompleteQuery,
    results: autocompleteResults,
    loading: autocompleteLoading,
    showResults: showAutocomplete,
    setShowResults: setShowAutocomplete,
    selectResult,
    hideResults,
    hasResults: hasAutocompleteResults
  } = useAutocomplete();

  // Use the pagination hook
  const {
    currentPage: paginationPage,
    goToPage,
    nextPage,
    prevPage,
    getPageNumbers
  } = usePagination(searchResults?.total || 0, 10);

  const autocompleteRef = useRef(null);

  // Sync search query with autocomplete query
  const handleQueryChange = (value) => {
    setSearchQuery(value);
    setAutocompleteQuery(value);
    // Clear any existing errors when user starts typing
    if (error) {
      clearError();
    }
  };

  // Handle autocomplete selection
  const handleAutocompleteSelect = async (result) => {
    const selected = selectResult(result);
    setSearchQuery(selected.text);
    
    // Determine search type based on result type
    const newSearchType = selected.type === 'destination' ? 'destinations' : 'hotels';
    setSearchType(newSearchType);
    
    // Perform search with selected result
    setTimeout(() => {
      search(1, selected.text, newSearchType);
    }, 100);
  };

  // Handle search with pagination
  const handleSearch = async (page = 1) => {
    if (!searchQuery.trim()) {
      return;
    }
    
    const result = await search(page);
    if (result.success) {
      goToPage(page);
    }
  };

  // Handle enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      hideResults();
      handleSearch();
    }
  };

  // Handle click outside autocomplete to hide results
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (autocompleteRef.current && !autocompleteRef.current.contains(event.target)) {
        hideResults();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [hideResults]);

  // Handle sort change - re-search with new sort
  const handleSortChange = async (newSortBy) => {
    setSortBy(newSortBy);
    if (hasResults && searchQuery.trim()) {
      // Re-search with new sorting
      await search(currentPage);
    }
  };

  // Handle sort direction change
  const handleSortDirectionChange = async () => {
    setSortDescending(!sortDescending);
    if (hasResults && searchQuery.trim()) {
      // Re-search with new sort direction
      await search(currentPage);
    }
  };

  const renderSearchResults = () => {
    if (!hasResults) return null;

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
                onChange={(e) => handleSortChange(e.target.value)}
                className="sort-select"
              >
                <option value="">Sort by relevance</option>
                <option value="name">Name</option>
                {searchType === 'destinations' && <option value="country">Country</option>}
                {searchType === 'flights' && (
                  <>
                    <option value="price">Price</option>
                    <option value="departureTime">Departure Time</option>
                    <option value="airline">Airline</option>
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
              onClick={handleSortDirectionChange}
              className="sort-direction-button"
              title={sortDescending ? 'Sort Ascending' : 'Sort Descending'}
            >
              {sortDescending ? '↓' : '↑'}
            </button>
          </div>
        </div>

        {/* Results grid */}
        <div className="results-grid">
          {searchResults.results.map((result, index) => (
            <div 
              key={result.id || index} 
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
        {totalPages > 1 && (
          <div className="pagination">
            <div className="pagination-buttons">
              {currentPage > 1 && (
                <button
                  onClick={() => handleSearch(currentPage - 1)}
                  className="pagination-button"
                >
                  Previous
                </button>
              )}
              
              {getPageNumbers(5).map((page) => (
                <button
                  key={page}
                  onClick={() => handleSearch(page)}
                  className={`pagination-button ${page === currentPage ? 'active' : ''}`}
                >
                  {page}
                </button>
              ))}
              
              {currentPage < totalPages && (
                <button
                  onClick={() => handleSearch(currentPage + 1)}
                  className="pagination-button"
                >
                  Next
                </button>
              )}
            </div>
            <div className="pagination-info">
              Page {currentPage} of {totalPages}
            </div>
          </div>
        )}
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
                  onChange={(e) => handleQueryChange(e.target.value)}
                  onKeyPress={handleKeyPress}
                  onFocus={() => {
                    if (hasAutocompleteResults) {
                      setShowAutocomplete(true);
                    }
                  }}
                  placeholder={`Search ${searchType}...`}
                  className="search-input"
                />
                {autocompleteLoading && (
                  <div className="search-input-loading">
                    <div className="search-button-spinner"></div>
                  </div>
                )}
              </div>

              {/* Autocomplete Dropdown */}
              {showAutocomplete && hasAutocompleteResults && (
                <div className="autocomplete-dropdown">
                  {autocompleteResults.map((result, index) => (
                    <button
                      key={`${result.id}-${index}`}
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

          {/* Error Display */}
          {error && (
            <div className="error-message">
              <p>{error}</p>
              <button onClick={clearError} className="error-dismiss">
                ×
              </button>
            </div>
          )}
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

    {destination.averageHotelPrice > 0 && (
      <div className="card-meta">
        <span className="card-meta-item">
          <DollarSign size={14} />
          Avg Hotel: PKR {destination.averageHotelPrice.toFixed(0)}
        </span>
      </div>
    )}
    
    <button className="card-button destination">
      View Details
      <ArrowRight className="card-button-icon" />
    </button>
  </div>
);

// Enhanced Flight Card Component
const FlightCard = ({ flight }) => {
  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
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
          <p className="card-price-amount flight">PKR {flight.price}</p>
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
        {flight.durationMinutes && (
          <div className="flight-duration">
            <span>Duration: {formatDuration(flight.durationMinutes)}</span>
          </div>
        )}
      </div>

      {flight.amenities && flight.amenities.length > 0 && (
        <div className="card-tags">
          {flight.amenities.slice(0, 3).map((amenity, index) => (
            <span key={index} className="card-tag flight">
              {amenity}
            </span>
          ))}
        </div>
      )}
      
      <button className="card-button flight">
        Book Flight
        <ArrowRight className="card-button-icon" />
      </button>
    </div>
  );
};

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
        <p className="card-price-amount hotel">PKR {hotel.pricePerNight}</p>
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
    
    {hotel.description && (
      <p className="card-description">{hotel.description}</p>
    )}
    
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