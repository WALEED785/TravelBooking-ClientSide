// src/services/userService.js
import axios from 'axios';

// Configure axios instance for user API
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

export const userService = {
  // Get current user profile
  async getCurrentUser() {
    try {
      const user = localStorage.getItem('auth_user');
      if (user) {
        const userData = JSON.parse(user);
        const response = await api.get(`/User/${userData.userId}`);
        return {
          success: true,
          data: response
        };
      }
      return {
        success: false,
        error: 'No user found in storage'
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.Message || error.message || 'Failed to fetch user profile'
      };
    }
  },

  // Get user by ID
  async getUserById(id) {
    try {
      const response = await api.get(`/User/${id}`);
      return {
        success: true,
        data: response
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.Message || error.message || 'Failed to fetch user'
      };
    }
  },

  // Update user profile
  async updateProfile(id, userData) {
    try {
      const response = await api.put(`/User/${id}`, userData);
      return {
        success: true,
        message: 'Profile updated successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.Message || error.message || 'Failed to update profile'
      };
    }
  },

  // Validate user data
  validateUserData(userData, isUpdate = false) {
    const errors = {};

    // Username validation
    if (!isUpdate && (!userData.username || userData.username.trim().length < 3)) {
      errors.username = 'Username must be at least 3 characters long';
    }

    // Email validation
    if (!userData.email || !userData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(userData.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Password validation (only for create or when password is being changed)
    if (!isUpdate && (!userData.password || userData.password.length < 6)) {
      errors.password = 'Password must be at least 6 characters long';
    } else if (isUpdate && userData.password && userData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }
};

export default api;