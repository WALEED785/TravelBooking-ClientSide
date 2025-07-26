// hooks/useSearch.js
import { useState, useEffect, useCallback, useRef } from 'react';
import apiService from '../services/apiService';

// Main search hook
export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('destinations');
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('');
  const [sortDescending, setSortDescending] = useState(false);
  const [filters, setFilters] = useState([]);

  // Search function
  const search = useCallback(async (page = 1, customQuery = null, customType = null) => {
    const query = customQuery !== null ? customQuery : searchQuery;
    const type = customType !== null ? customType : searchType;
    
    if (!query.trim()) {
      setError('Search query is required');
      return;
    }

    setLoading(true);
    setError(null);
    setCurrentPage(page);

    try {
      const searchParams = {
        query,
        page,
        pageSize: 10,
        sortBy,
        sortDescending,
        filters
      };

      const results = await apiService.search(type, searchParams);
      setSearchResults(results);
    } catch (err) {
      setError(err.message || 'Search failed');
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, searchType, sortBy, sortDescending, filters]);

  // Reset search results when search type changes
  useEffect(() => {
    if (searchResults) {
      setSearchResults(null);
      setCurrentPage(1);
    }
  }, [searchType]);

  // Auto-search when sort options change
  useEffect(() => {
    if (searchResults && searchQuery.trim()) {
      search(1);
    }
  }, [sortBy, sortDescending]);

  const clearResults = useCallback(() => {
    setSearchResults(null);
    setCurrentPage(1);
    setError(null);
  }, []);

  const resetSearch = useCallback(() => {
    setSearchQuery('');
    setSearchResults(null);
    setCurrentPage(1);
    setSortBy('');
    setSortDescending(false);
    setFilters([]);
    setError(null);
  }, []);

  return {
    // State
    searchQuery,
    searchType,
    searchResults,
    loading,
    error,
    currentPage,
    sortBy,
    sortDescending,
    filters,
    
    // Actions
    setSearchQuery,
    setSearchType,
    setSortBy,
    setSortDescending,
    setFilters,
    search,
    clearResults,
    resetSearch,
    
    // Computed values
    hasResults: searchResults && searchResults.results && searchResults.results.length > 0,
    totalResults: searchResults ? searchResults.total : 0,
    totalPages: searchResults ? Math.ceil(searchResults.total / 10) : 0
  };
};

// Autocomplete hook with debouncing
export const useAutocomplete = (delay = 300) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState(null);
  const timeoutRef = useRef(null);

  // Debounced search function
  const debouncedSearch = useCallback(async (searchQuery) => {
    if (!searchQuery || searchQuery.length < 2) {
      setResults([]);
      setShowResults(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const autocompleteResults = await apiService.getAutocomplete(searchQuery);
      setResults(autocompleteResults || []);
      setShowResults(true);
    } catch (err) {
      setError(err.message || 'Autocomplete failed');
      setResults([]);
      setShowResults(false);
      console.error('Autocomplete error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Effect for debouncing
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      debouncedSearch(query);
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [query, delay, debouncedSearch]);

  const selectResult = useCallback((result) => {
    setQuery(result.text);
    setShowResults(false);
    return result;
  }, []);

  const clearAutocomplete = useCallback(() => {
    setQuery('');
    setResults([]);
    setShowResults(false);
    setError(null);
  }, []);

  const hideResults = useCallback(() => {
    setShowResults(false);
  }, []);

  return {
    // State
    query,
    results,
    loading,
    showResults,
    error,
    
    // Actions
    setQuery,
    selectResult,
    clearAutocomplete,
    hideResults,
    showResults: () => setShowResults(true),
    
    // Computed values
    hasResults: results.length > 0
  };
};

// Hook for managing search filters
export const useSearchFilters = (initialFilters = {}) => {
  const [filters, setFilters] = useState(initialFilters);
  const [activeFilters, setActiveFilters] = useState([]);

  const addFilter = useCallback((key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  const removeFilter = useCallback((key) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
  }, []);

  const clearAllFilters = useCallback(() => {
    setFilters({});
    setActiveFilters([]);
  }, []);

  const toggleFilter = useCallback((key, value) => {
    setFilters(prev => {
      if (prev[key] === value) {
        const newFilters = { ...prev };
        delete newFilters[key];
        return newFilters;
      } else {
        return { ...prev, [key]: value };
      }
    });
  }, []);

  // Update active filters array when filters object changes
  useEffect(() => {
    const active = Object.entries(filters).map(([key, value]) => ({ key, value }));
    setActiveFilters(active);
  }, [filters]);

  return {
    filters,
    activeFilters,
    addFilter,
    removeFilter,
    clearAllFilters,
    toggleFilter,
    hasFilters: Object.keys(filters).length > 0
  };
};

// Hook for managing pagination
export const usePagination = (totalItems, itemsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  const goToPage = useCallback((page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  }, [totalPages]);

  const nextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  }, [currentPage, totalPages]);

  const prevPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  }, [currentPage]);

  const reset = useCallback(() => {
    setCurrentPage(1);
  }, []);

  // Generate page numbers for pagination UI
  const getPageNumbers = useCallback((maxVisible = 5) => {
    const pages = [];
    const halfVisible = Math.floor(maxVisible / 2);
    
    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);
    
    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  }, [currentPage, totalPages]);

  return {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    goToPage,
    nextPage,
    prevPage,
    reset,
    getPageNumbers,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
    isFirstPage: currentPage === 1,
    isLastPage: currentPage === totalPages
  };
};

// Hook for handling outside clicks (useful for dropdowns)
export const useOutsideClick = (callback) => {
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [callback]);

  return ref;
};

// Hook for managing localStorage with fallback
export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  const removeValue = useCallback(() => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.warn(`Error removing localStorage key "${key}":`, error);
    }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
};