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
      localStorage.setItem('auth_user', JSON.stringify({ userId, username, role, expiry }));

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
  },

  // Get currently logged-in user
  getCurrentUser() {
    const storedUser = localStorage.getItem('auth_user');
    if (!storedUser) return null;

    try {
      return JSON.parse(storedUser);
    } catch {
      return null;
    }
  },

  // Is user authenticated
  isAuthenticated() {
    return !!localStorage.getItem('token');
  },

  // Logout
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('auth_user');
  }
};
