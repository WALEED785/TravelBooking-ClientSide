// src/hooks/useHotels.js
import { useState, useCallback, useEffect } from 'react';
import { 
  getHotels, 
  getHotelById, 
  getHotelsByDestination
} from '../services/hotelService';

export const useHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchHotels = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getHotels();
      setHotels(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch hotels');
    } finally {
      setLoading(false);
    }
  }, []);

  return { hotels, loading, error, fetchHotels };
};

export const useHotel = (id) => {
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchHotel = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getHotelById(id);
      setHotel(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchHotel();
    }
  }, [id, fetchHotel]);

  return { hotel, loading, error, fetchHotel };
};

// Mutation hooks removed - only read operations available

export const useHotelsByDestination = (destinationId) => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchHotelsByDestination = useCallback(async (id = destinationId) => {
    // Don't fetch if no valid ID is provided
    if (!id || id === 'undefined' || isNaN(parseInt(id))) {
      console.warn('Invalid destination ID for hotels:', id);
      setHotels([]);
      setLoading(false);
      setError(null);
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      console.log('Fetching hotels for destination:', id);
      const data = await getHotelsByDestination(parseInt(id));
      setHotels(data);
    } catch (err) {
      console.error('Error fetching hotels by destination:', err);
      setError(err.message || 'Failed to fetch hotels by destination');
      setHotels([]);
    } finally {
      setLoading(false);
    }
  }, [destinationId]);

  // Auto-fetch when destinationId changes and is valid
  useEffect(() => {
    if (destinationId && destinationId !== 'undefined' && !isNaN(parseInt(destinationId))) {
      setLoading(true);
      fetchHotelsByDestination(destinationId);
    } else {
      // Reset state if no valid destination ID
      setHotels([]);
      setLoading(false);
      setError(null);
    }
  }, [destinationId, fetchHotelsByDestination]);

  return { hotels, loading, error, fetchHotelsByDestination };
};