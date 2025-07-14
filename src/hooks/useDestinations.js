// src/hooks/useDestinations.js
import { useState, useCallback, useEffect, useRef } from 'react';
import { 
  getDestinations, 
  getDestinationById,
  createDestination,
  updateDestination,
  deleteDestination
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

export const useDestinationMutation = () => {
  const [state, setState] = useState({
    loading: false,
    error: null,
    data: null,
    status: 'idle'
  });

  const executeMutation = useCallback(async (mutationFn, ...args) => {
    try {
      setState({
        loading: true,
        error: null,
        data: null,
        status: 'loading'
      });
      
      const result = await mutationFn(...args);
      
      setState({
        loading: false,
        error: null,
        data: result,
        status: 'success'
      });
      
      return result;
    } catch (error) {
      setState({
        loading: false,
        error,
        data: null,
        status: 'error'
      });
      throw error;
    }
  }, []);

  const create = useCallback((data) => 
    executeMutation(createDestination, data), 
    [executeMutation]
  );

  const update = useCallback((id, data) => 
    executeMutation(updateDestination, id, data), 
    [executeMutation]
  );

  const remove = useCallback((id) => 
    executeMutation(deleteDestination, id), 
    [executeMutation]
  );

  return {
    ...state,
    createDestination: create,
    updateDestination: update,
    deleteDestination: remove,
    isIdle: state.status === 'idle',
    isLoading: state.status === 'loading',
    isError: state.status === 'error',
    isSuccess: state.status === 'success'
  };
};