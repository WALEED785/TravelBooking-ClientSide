// src/hooks/useUser.js
import { useState, useEffect, useCallback } from 'react';
import { userService } from '../services/userService';

export const useUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get current user profile
  const getCurrentUser = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await userService.getCurrentUser();
      
      if (result.success) {
        setUser(result.data);
        return { success: true, data: result.data };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errorMessage = 'Failed to fetch user profile';
      setError(errorMessage);
      console.error('Error fetching user profile:', err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  // Get user by ID
  const getUserById = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await userService.getUserById(id);
      
      if (result.success) {
        return { success: true, data: result.data };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errorMessage = 'Failed to fetch user';
      setError(errorMessage);
      console.error('Error fetching user:', err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  // Update user profile
  const updateProfile = useCallback(async (id, userData) => {
    setLoading(true);
    setError(null);
    
    try {
      // Validate user data
      const validation = userService.validateUserData(userData, true);
      if (!validation.isValid) {
        const errorMessage = Object.values(validation.errors).join(', ');
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }

      const result = await userService.updateProfile(id, userData);
      
      if (result.success) {
        // Update local user state
        setUser(prev => ({ ...prev, ...userData }));
        
        // Update localStorage
        const storedUser = localStorage.getItem('auth_user');
        if (storedUser) {
          const userObj = JSON.parse(storedUser);
          localStorage.setItem('user', JSON.stringify({ ...userObj, ...userData }));
        }
        
        return { success: true, message: result.message };
      } else {
        setError(result.error);
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errorMessage = 'Failed to update profile';
      setError(errorMessage);
      console.error('Error updating profile:', err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  // Get stored user from localStorage
  const getStoredUser = useCallback(() => {
    try {
      const storedUser = localStorage.getItem('auth_user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        return userData;
      }
      return null;
    } catch (err) {
      console.error('Error reading stored user:', err);
      return null;
    }
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Initialize user from localStorage on mount
  useEffect(() => {
    getStoredUser();
  }, [getStoredUser]);

  return {
    user,
    loading,
    error,
    getCurrentUser,
    getUserById,
    updateProfile,
    getStoredUser,
    clearError,
    setUser
  };
};