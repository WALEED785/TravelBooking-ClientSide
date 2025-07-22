// src/services/bookingService.js
import axios from 'axios';

// Configure axios instance for booking API
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

export const getBookings = async (config = {}) => {
  try {
    const response = await api.get('/bookings', config);
    if (!Array.isArray(response)) {
      throw new Error('Expected array of bookings');
    }
    return response;
  } catch (error) {
    handleServiceError(error, 'Failed to fetch bookings');
  }
};

export const getBookingById = async (id, config = {}) => {
  try {
    const response = await api.get(`/bookings/${id}`, config);
    if (!response?.bookingId) {
      throw new Error('Invalid booking data');
    }
    return response;
  } catch (error) {
    handleServiceError(error, `Failed to fetch booking ${id}`);
  }
};

export const createBooking = async (bookingData, config = {}) => {
  try {
    // Validate required fields
    if (!bookingData.userId) {
      throw new Error('User ID is required');
    }
    if (!bookingData.flightId && !bookingData.hotelId) {
      throw new Error('Either flight ID or hotel ID is required');
    }
    if (!bookingData.bookingDate) {
      throw new Error('Booking date is required');
    }
    if (!bookingData.totalAmount || bookingData.totalAmount <= 0) {
      throw new Error('Total amount must be greater than 0');
    }

    const response = await api.post('/bookings', bookingData, config);
    return response;
  } catch (error) {
    handleServiceError(error, 'Failed to create booking');
  }
};

export const cancelBooking = async (id, config = {}) => {
  try {
    const response = await api.put(`/bookings/${id}/cancel`, {}, config);
    return response;
  } catch (error) {
    handleServiceError(error, `Failed to cancel booking ${id}`);
  }
};

export const getUserBookings = async (userId, config = {}) => {
  try {
    const response = await api.get(`/bookings/user/${userId}`, config);
    if (!Array.isArray(response)) {
      throw new Error('Expected array of bookings');
    }
    return response;
  } catch (error) {
    handleServiceError(error, `Failed to fetch user bookings for ${userId}`);
  }
};

export default api;