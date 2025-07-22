// src/hooks/useFlights.js
import { useState, useCallback, useEffect } from 'react';
import {
  getFlights,
  searchFlights as searchFlightsService,
  getFlightById,
  getFlightsByDestination as getFlightsByDestinationService
} from '../services/flightService';

/* ----------------------------------------------------------
 *  Shared helpers
 * -------------------------------------------------------- */
const buildError = (err, fallback) => ({
  message: err?.message || fallback,
  status: err?.status,
  details: err?.details,
  isNetworkError: err?.networkError || !err?.response
});

/* ----------------------------------------------------------
 *  1️⃣  Hook: useFlights — list or search
 * -------------------------------------------------------- */
export const useFlights = (autoFetch = true) => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(autoFetch);
  const [error, setError] = useState(null);

  const fetchFlights = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getFlights();
      if (!Array.isArray(data)) throw new Error('Invalid data format');
      setFlights(data);
    } catch (err) {
      setError(buildError(err, 'Failed to load flights'));
      setFlights([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const searchFlights = useCallback(async (departureId, arrivalId, date) => {
    try {
      setLoading(true);
      setError(null);
      const data = await searchFlightsService(departureId, arrivalId, date);
      if (!Array.isArray(data)) throw new Error('Invalid data format');
      setFlights(data);
    } catch (err) {
      setError(buildError(err, 'Failed to search flights'));
      setFlights([]);
    } finally {
      setLoading(false);
    }
  }, []);

  /* initial fetch */
  useEffect(() => {
    if (autoFetch) fetchFlights();
  }, [autoFetch, fetchFlights]);

  return {
    flights,
    loading,
    error,
    fetchFlights,
    searchFlights,
    isEmpty: !loading && flights.length === 0
  };
};

/* ----------------------------------------------------------
 *  2️⃣  Hook: useFlightsByDestination — list by destination
 * -------------------------------------------------------- */
export const useFlightsByDestination = (destinationId) => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchFlightsByDestination = useCallback(async (id = destinationId) => {
    // Don't fetch if no valid ID is provided
    if (!id || id === 'undefined' || isNaN(parseInt(id))) {
      console.warn('Invalid destination ID for flights:', id);
      setFlights([]);
      setLoading(false);
      setError(null);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      console.log('Fetching flights for destination:', id);
      const data = await getFlightsByDestinationService(parseInt(id));
      if (!Array.isArray(data)) throw new Error('Invalid data format');
      setFlights(data);
    } catch (err) {
      console.error('Error fetching flights by destination:', err);
      setError(buildError(err, `Failed to load flights for destination ${id}`));
      setFlights([]);
    } finally {
      setLoading(false);
    }
  }, [destinationId]);

  // Auto-fetch when destinationId changes and is valid
  useEffect(() => {
    if (destinationId && destinationId !== 'undefined' && !isNaN(parseInt(destinationId))) {
      setLoading(true);
      fetchFlightsByDestination(destinationId);
    } else {
      // Reset state if no valid destination ID
      setFlights([]);
      setLoading(false);
      setError(null);
    }
  }, [destinationId, fetchFlightsByDestination]);

  return {
    flights,
    loading,
    error,
    fetchFlightsByDestination,
    isEmpty: !loading && flights.length === 0
  };
};

/* ----------------------------------------------------------
 *  3️⃣  Hook: useFlight — single flight
 * -------------------------------------------------------- */
export const useFlight = (id) => {
  const [flight, setFlight] = useState(null);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState(null);

  const fetchFlight = useCallback(async (flightId) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getFlightById(flightId);
      if (!data?.flightId) throw new Error('Invalid flight data');
      setFlight(data);
    } catch (err) {
      setError(buildError(err, `Failed to load flight ${flightId}`));
      setFlight(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (id) fetchFlight(id);
  }, [id, fetchFlight]);

  return {
    flight,
    loading,
    error,
    fetchFlight,
    reset: () => {
      setFlight(null);
      setError(null);
    }
  };
};

/* ----------------------------------------------------------
 *  Mutation hooks removed - only read operations available
 * -------------------------------------------------------- */