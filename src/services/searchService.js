// src/services/searchService.js
import axios from 'axios';

// Configure axios instance for search API
const api = axios.create({
  baseURL: 'https://localhost:7060/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor for adding auth tokens
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling common response patterns
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const searchService = {
  // Search destinations
  async searchDestinations(query, page = 1, pageSize = 10) {
    try {
      const response = await api.get('/Search/destinations', {
        params: {
          query: query.trim(),
          page,
          pageSize
        }
      });
      return {
        success: true,
        data: response
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to search destinations'
      };
    }
  },

  // Search flights
  async searchFlights(query, page = 1, pageSize = 10) {
    try {
      const response = await api.get('/Search/flights', {
        params: {
          query: query.trim(),
          page,
          pageSize
        }
      });
      return {
        success: true,
        data: response
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to search flights'
      };
    }
  },

  // Search hotels
  async searchHotels(query, page = 1, pageSize = 10) {
    try {
      const response = await api.get('/Search/hotels', {
        params: {
          query: query.trim(),
          page,
          pageSize
        }
      });
      return {
        success: true,
        data: response
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to search hotels'
      };
    }
  },

  // Autocomplete search
  async autocomplete(query) {
    try {
      if (!query || query.trim().length < 2) {
        return {
          success: true,
          data: { query: query.trim(), suggestions: [] }
        };
      }

      const response = await api.get('/Search/autocomplete', {
        params: {
          query: query.trim()
        }
      });
      return {
        success: true,
        data: response
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to get autocomplete suggestions'
      };
    }
  },

  // Initialize Elasticsearch indices (admin function)
  async initializeIndices() {
    try {
      const response = await api.post('/Search/initialize');
      return {
        success: true,
        data: response
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Failed to initialize search indices'
      };
    }
  },

  // Health check for search service
  async healthCheck() {
    try {
      const response = await api.get('/Search/health');
      return {
        success: true,
        data: response
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || error.message || 'Search service is unavailable'
      };
    }
  },

  // Validate search query
  validateSearchQuery(query) {
    const errors = {};

    if (!query || !query.trim()) {
      errors.query = 'Search query is required';
    } else if (query.trim().length < 2) {
      errors.query = 'Search query must be at least 2 characters long';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  },

  // Format search results for UI consumption
  formatSearchResults(results, searchType) {
    if (!results || !results.results) {
      return {
        results: [],
        total: 0,
        page: 1,
        pageSize: 10,
        totalPages: 0
      };
    }

    return {
      results: results.results,
      total: results.total,
      page: results.page,
      pageSize: results.pageSize,
      totalPages: Math.ceil(results.total / results.pageSize)
    };
  },

  // Sort search results
  sortResults(results, sortBy, sortDescending = false) {
    if (!results || !results.length || !sortBy) {
      return results;
    }

    const sorted = [...results].sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      // Handle different data types
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) return sortDescending ? 1 : -1;
      if (aValue > bValue) return sortDescending ? -1 : 1;
      return 0;
    });

    return sorted;
  }
};

export default api;