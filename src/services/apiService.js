// services/apiService.js
class ApiService {
  constructor(baseURL = 'http://localhost:7060/api/elasticsearch') {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: this.defaultHeaders,
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed for ${endpoint}:`, error);
      throw error;
    }
  }

  // GET request helper
  async get(endpoint, params = {}) {
    debugger
    const queryString = new URLSearchParams(params).toString();
    const fullEndpoint = queryString ? `${endpoint}?${queryString}` : endpoint;
    
    return this.request(fullEndpoint, {
      method: 'GET',
    });
  }

  // POST request helper
  async post(endpoint, data = null) {
    return this.request(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : null,
    });
  }

  // DELETE request helper
  async delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE',
    });
  }

  // Initialize Elasticsearch indices
  async initializeIndices() {
    return this.post('/initialize');
  }

  // Autocomplete search
  async getAutocomplete(query) {
    debugger
    if (!query || query.length < 2) {
      return [];
    }
    return this.get('/autocomplete', { query });
  }

  // Search destinations
  async searchDestinations(searchParams) {
    const {
      query,
      page = 1,
      pageSize = 10,
      sortBy = '',
      sortDescending = false,
      filters = []
    } = searchParams;

    const params = {
      query,
      page: page.toString(),
      pageSize: pageSize.toString(),
    };

    if (sortBy) {
      params.sortBy = sortBy;
    }

    if (sortDescending) {
      params.sortDescending = 'true';
    }

    if (filters && filters.length > 0) {
      params.filters = filters;
    }

    return this.get('/search/destinations', params);
  }

  // Search flights
  async searchFlights(searchParams) {
    const {
      query,
      page = 1,
      pageSize = 10,
      sortBy = '',
      sortDescending = false,
      filters = []
    } = searchParams;

    const params = {
      query,
      page: page.toString(),
      pageSize: pageSize.toString(),
    };

    if (sortBy) {
      params.sortBy = sortBy;
    }

    if (sortDescending) {
      params.sortDescending = 'true';
    }

    if (filters && filters.length > 0) {
      params.filters = filters;
    }

    return this.get('/search/flights', params);
  }

  // Search hotels
  async searchHotels(searchParams) {
    const {
      query,
      page = 1,
      pageSize = 10,
      sortBy = '',
      sortDescending = false,
      filters = []
    } = searchParams;

    const params = {
      query,
      page: page.toString(),
      pageSize: pageSize.toString(),
    };

    if (sortBy) {
      params.sortBy = sortBy;
    }

    if (sortDescending) {
      params.sortDescending = 'true';
    }

    if (filters && filters.length > 0) {
      params.filters = filters;
    }

    return this.get('/search/hotels', params);
  }

  // Index operations
  async indexDestination(destination) {
    return this.post('/index/destination', destination);
  }

  async indexFlight(flight) {
    return this.post('/index/flight', flight);
  }

  async indexHotel(hotel) {
    return this.post('/index/hotel', hotel);
  }

  // Bulk index operations
  async bulkIndexDestinations(destinations) {
    return this.post('/bulk/destinations', destinations);
  }

  async bulkIndexFlights(flights) {
    return this.post('/bulk/flights', flights);
  }

  async bulkIndexHotels(hotels) {
    return this.post('/bulk/hotels', hotels);
  }

  // Delete operations
  async deleteDestination(id) {
    return this.delete(`/destination/${id}`);
  }

  async deleteFlight(id) {
    return this.delete(`/flight/${id}`);
  }

  async deleteHotel(id) {
    return this.delete(`/hotel/${id}`);
  }

  // Generic search method that routes to specific search methods
  async search(searchType, searchParams) {
    switch (searchType) {
      case 'destinations':
        return this.searchDestinations(searchParams);
      case 'flights':
        return this.searchFlights(searchParams);
      case 'hotels':
        return this.searchHotels(searchParams);
      default:
        throw new Error(`Unknown search type: ${searchType}`);
    }
  }
}

// Create and export a singleton instance
const apiService = new ApiService();
export default apiService;