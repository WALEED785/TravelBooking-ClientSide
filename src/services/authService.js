// src/services/authService.js
import axios from 'axios';

const API_BASE_URL = 'https://localhost:7060/api';

// Axios instance
const authAPI = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Login & Register only
export const authService = {
  // Login user
  async login(credentials) {
    try {
      const response = await authAPI.post('/User/login', {
        userId: credentials.userId,
        username: credentials.username || credentials.email,
        password: credentials.password
      });

      const { token, userId, role, username, expiry } = response.data;

      // Save to localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({ userId, username, role, expiry }));

      // Redirect after successful login
      window.location.href = '/';

      return {
        success: true,
        data: {
          token,
          user: { userId, username, role, expiry }
        }
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed'
      };
    }
  },

  // Register user
  async register(userData) {
    try {
      const response = await authAPI.post('/User/register', userData);
      return {
        success: true,
        message: response.data.message || 'User registered successfully'
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Registration failed'
      };
    }
  }
};
