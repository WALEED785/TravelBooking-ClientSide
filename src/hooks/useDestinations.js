// src/hooks/useDestinations.js
import { useState, useCallback, useEffect, useRef } from 'react';
import { 
  getDestinations, 
  getDestinationById
} from '../services/destinationService';

export const useDestinations = (autoFetch = true) => {
  const [state, setState] = useState({
    data: [],
    loading: autoFetch,
    error: null,
    status: autoFetch ? 'loading' : 'idle'
  });
  
  const abortControllerRef = useRef(null);

  const fetchDestinations = useCallback(async (config = {}) => {
    try {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      
      const controller = new AbortController();
      abortControllerRef.current = controller;
      
      setState(prev => ({
        ...prev,
        loading: true,
        error: null,
        status: 'loading'
      }));
      
      const data = await getDestinations({
        ...config,
        signal: controller.signal
      });
      
      setState({
        data,
        loading: false,
        error: null,
        status: 'success'
      });
      
      return data;
    } catch (error) {
      if (!error.isCanceled) {
        setState(prev => ({
          ...prev,
          data: [],
          loading: false,
          error,
          status: 'error'
        }));
      }
      throw error;
    }
  }, []);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  useEffect(() => {
    if (autoFetch) {
      fetchDestinations().catch(() => {});
    }
  }, [autoFetch, fetchDestinations]);

  return { 
    destinations: state.data,
    loading: state.loading,
    error: state.error,
    status: state.status,
    fetchDestinations,
    reset: () => setState({
      data: [],
      loading: false,
      error: null,
      status: 'idle'
    })
  };
};

export const useDestination = (id) => {
  const [state, setState] = useState({
    data: null,
    loading: !!id,
    error: null,
    status: id ? 'loading' : 'idle'
  });
  
  const abortControllerRef = useRef(null);

  const fetchDestination = useCallback(async (destinationId, config = {}) => {
    try {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      
      const controller = new AbortController();
      abortControllerRef.current = controller;
      
      setState(prev => ({
        ...prev,
        loading: true,
        error: null,
        status: 'loading'
      }));
      
      const data = await getDestinationById(destinationId, {
        ...config,
        signal: controller.signal
      });
      
      setState({
        data,
        loading: false,
        error: null,
        status: 'success'
      });
      
      return data;
    } catch (error) {
      if (!error.isCanceled) {
        setState(prev => ({
          ...prev,
          data: null,
          loading: false,
          error,
          status: 'error'
        }));
      }
      throw error;
    }
  }, []);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  useEffect(() => {
    if (id) {
      fetchDestination(id).catch(() => {});
    }
  }, [id, fetchDestination]);

  return { 
    destination: state.data,
    loading: state.loading,
    error: state.error,
    status: state.status,
    fetchDestination,
    reset: () => setState({
      data: null,
      loading: false,
      error: null,
      status: 'idle'
    })
  };
};