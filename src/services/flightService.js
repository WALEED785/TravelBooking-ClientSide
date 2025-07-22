// src/services/flightService.js
import axios from 'axios';

// Configure axios instance for flight API
const api = axios.create({
  baseURL: 'https://localhost:7060/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor for adding auth tokens if needed
api.interceptors.request.use(
  (config) => {
    // Add auth token if available
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
    // Extract data from response based on your API structure
    return response.data;
  },
  (error) => {
    // Handle common HTTP errors
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

const handleServiceError = (error, defaultMessage) => {
  if (axios.isCancel(error)) {
    const cancelError = new Error('Request was canceled');
    cancelError.isCanceled = true;
    throw cancelError;
  }

  if (error.response) {
    const errorData = error.response.data || {};
    const serviceError = new Error(errorData.message || defaultMessage);
    serviceError.status = error.response.status;
    serviceError.details = errorData.errors || errorData.details;
    serviceError.responseData = errorData;
    throw serviceError;
  } else if (error.request) {
    const networkError = new Error(
      error.code === 'ECONNABORTED' ? 'Request timed out' : 'Network error'
    );
    networkError.isNetworkError = true;
    networkError.code = error.code;
    throw networkError;
  } else {
    const clientError = new Error(error.message || defaultMessage);
    clientError.isClientError = true;
    throw clientError;
  }
};

export const getFlights = async (config = {}) => {
  try {
    console.log('Fetching flights...');
    const response = await api.get('/flights', config);
    console.log('Flights response:', response);
    if (!Array.isArray(response)) {
      throw new Error('Expected array of flights');
    }
    return response;
  } catch (error) {
    handleServiceError(error, 'Failed to fetch flights');
  }
};

export const searchFlights = async (departureId, arrivalId, date, config = {}) => {
  try {
    console.log(`Searching flights from ${departureId} to ${arrivalId} on ${date}`);
    const params = {
      departureId,
      arrivalId,
      date: date ? date.toISOString() : undefined
    };
    const response = await api.get('/flights/search', { ...config, params });
    console.log('Flights search response:', response);
    if (!Array.isArray(response)) {
      throw new Error('Expected array of flights');
    }
    return response;
  } catch (error) {
    handleServiceError(error, 'Failed to search flights');
  }
};

export const getFlightById = async (id, config = {}) => {
  try {
    console.log(`Fetching flight with ID: ${id}`);
    const response = await api.get(`/flights/${id}`, config);
    console.log('Flight response:', response);
    if (!response?.flightId) {
      throw new Error('Invalid flight data');
    }
    return response;
  } catch (error) {
    handleServiceError(error, `Failed to fetch flight with ID ${id}`);
  }
};

// Create, Update, and Delete operations removed - only read operations available

export const getFlightsByDestination = async (destinationId, config = {}) => {
  try {
    const response = await api.get(`/flights/destination/${destinationId}`, config);
    if (!Array.isArray(response)) {
      throw new Error('Expected array of flights');
    }
    return response;
  } catch (error) {
    handleServiceError(error, `Failed to fetch flights for destination ${destinationId}`);
  }
};

export default api;