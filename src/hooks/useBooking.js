// src/hooks/useBookings.js
import { useState, useCallback, useEffect } from 'react';
import { 
  getBookings, 
  getBookingById, 
  createBooking, 
  cancelBooking,
  getUserBookings 
} from '../services/bookingService';

export const useBookings = (autoFetch = false) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBookings = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getBookings();
      setBookings(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch bookings');
      setBookings([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (autoFetch) {
      fetchBookings();
    }
  }, [autoFetch, fetchBookings]);

  return { bookings, loading, error, fetchBookings };
};

export const useBooking = (id) => {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBooking = useCallback(async (bookingId = id) => {
    if (!bookingId) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await getBookingById(bookingId);
      setBooking(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch booking');
      setBooking(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchBooking();
    }
  }, [id, fetchBooking]);

  return { booking, loading, error, fetchBooking };
};

export const useBookingMutation = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const resetState = useCallback(() => {
    setError(null);
    setSuccess(false);
  }, []);

  const createNewBooking = useCallback(async (bookingData) => {
    debugger
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      const data = await createBooking(bookingData);
      setSuccess(true);
      return { success: true, data };
    } catch (err) {
      const errorMessage = err.message || 'Failed to create booking';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  const cancelExistingBooking = useCallback(async (id) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      await cancelBooking(id);
      setSuccess(true);
      return { success: true, message: 'Booking cancelled successfully' };
    } catch (err) {
      const errorMessage = err.message || 'Failed to cancel booking';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, []);

  return { 
    loading, 
    error, 
    success, 
    createNewBooking, 
    cancelExistingBooking,
    resetState
  };
};

export const useUserBookings = (userId) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUserBookings = useCallback(async (id = userId) => {
    if (!id) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await getUserBookings(id);
      setBookings(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch user bookings');
      setBookings([]);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchUserBookings();
    }
  }, [userId, fetchUserBookings]);

  return { bookings, loading, error, fetchUserBookings };
};