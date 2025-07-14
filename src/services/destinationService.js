// src/services/destinationService.js
import axios from 'axios';

// Configure axios instance for your Swagger API
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
    const token = localStorage.getItem('authToken');
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
      localStorage.removeItem('authToken');
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

export const getDestinations = async (config = {}) => {
  try {
    const response = await api.get('/destinations', config);
    if (!Array.isArray(response)) {
      throw new Error('Expected array of destinations');
    }
    return response;
  } catch (error) {
    return handleServiceError(error, 'Failed to fetch destinations');
  }
};

export const getDestinationById = async (id, config = {}) => {
  try {
    const response = await api.get(`/destinations/${id}`, config);
    if (!response?.destinationId) {
      throw new Error('Invalid destination data');
    }
    return response;
  } catch (error) {
    handleServiceError(error, `Failed to fetch destination ${id}`);
  }
};

export const createDestination = async (destinationData, config = {}) => {
  try {
    if (!destinationData?.name?.trim()) {
      throw new Error('Name is required');
    }
    if (!destinationData?.country?.trim()) {
      throw new Error('Country is required');
    }
    return await api.post('/destinations', destinationData, config);
  } catch (error) {
    handleServiceError(error, 'Failed to create destination');
  }
};

export const updateDestination = async (id, destinationData, config = {}) => {
  try {
    if (!destinationData?.name?.trim()) {
      throw new Error('Name is required');
    }
    return await api.put(`/destinations/${id}`, destinationData, config);
  } catch (error) {
    handleServiceError(error, `Failed to update destination ${id}`);
  }
};

export const deleteDestination = async (id, config = {}) => {
  try {
    await api.delete(`/destinations/${id}`, config);
    return true;
  } catch (error) {
    handleServiceError(error, `Failed to delete destination ${id}`);
  }
};

export default api;