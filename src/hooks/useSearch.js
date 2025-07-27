// src/hooks/useSearch.js
import { useState, useCallback, useRef } from 'react';
import { searchService } from '../services/searchService';

export const useSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState('destinations');
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('');
  const [sortDescending, setSortDescending] = useState(false);

  // Search function
  const search = useCallback(async (page = 1, query = searchQuery, type = searchType) => {
    // Validate query
    const validation = searchService.validateSearchQuery(query);
    if (!validation.isValid) {
      setError(Object.values(validation.errors).join(', '));
      return { success: false, error: Object.values(validation.errors).join(', ') };
    }

    setLoading(true);
    setError(null);
    
    try {
      let result;
      
      switch (type) {
        case 'destinations':
          result = await searchService.searchDestinations(query, page);
          break;
        case 'flights':
          result = await searchService.searchFlights(query, page);
          break;
        case 'hotels':
          result = await searchService.searchHotels(query, page);
          break;
        default:
          throw new Error('Invalid search type');
      }

      if (result.success) {
        let formattedResults = searchService.formatSearchResults(result.data, type);
        
        // Apply sorting if specified
        if (sortBy) {
          formattedResults.results = searchService.sortResults(
            formattedResults.results, 
            sortBy, 
            sortDescending
          );
        }
        
        setSearchResults(formattedResults);
        setCurrentPage(page);
        return { success: true, data: formattedResults };
      } else {
        setError(result.error);
        setSearchResults(null);
        return { success: false, error: result.error };
      }
    } catch (err) {
      const errorMessage = 'Failed to perform search';
      setError(errorMessage);
      setSearchResults(null);
      console.error('Search error:', err);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  }, [searchQuery, searchType, sortBy, sortDescending]);

  // Clear search results
  const clearResults = useCallback(() => {
    setSearchResults(null);
    setError(null);
    setCurrentPage(1);
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Reset search state
  const resetSearch = useCallback(() => {
    setSearchQuery('');
    setSearchResults(null);
    setError(null);
    setCurrentPage(1);
    setSortBy('');
    setSortDescending(false);
  }, []);

  const hasResults = searchResults && searchResults.results && searchResults.results.length > 0;
  const totalPages = searchResults ? searchResults.totalPages : 0;

  return {
    searchQuery,
    setSearchQuery,
    searchType,
    setSearchType,
    searchResults,
    loading,
    error,
    currentPage,
    setCurrentPage,
    sortBy,
    setSortBy,
    sortDescending,
    setSortDescending,
    search,
    clearResults,
    clearError,
    resetSearch,
    hasResults,
    totalPages
  };
};

export const useAutocomplete = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const debounceTimeoutRef = useRef(null);

  // Fetch autocomplete suggestions with debouncing
  const fetchSuggestions = useCallback(async (searchQuery) => {
    if (!searchQuery || searchQuery.trim().length < 2) {
      setResults([]);
      setShowResults(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await searchService.autocomplete(searchQuery);
      
      if (result.success) {
        setResults(result.data.suggestions || []);
        setShowResults(true);
      } else {
        setError(result.error);
        setResults([]);
        setShowResults(false);
      }
    } catch (err) {
      const errorMessage = 'Failed to fetch suggestions';
      setError(errorMessage);
      setResults([]);
      setShowResults(false);
      console.error('Autocomplete error:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Set query with debounced autocomplete
  const setQueryWithDebounce = useCallback((newQuery) => {
    setQuery(newQuery);

    // Clear existing timeout
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    // Set new timeout for debounced search
    debounceTimeoutRef.current = setTimeout(() => {
      fetchSuggestions(newQuery);
    }, 300);
  }, [fetchSuggestions]);

  // Select a result from autocomplete
  const selectResult = useCallback((result) => {
    setQuery(result.text);
    setShowResults(false);
    return result;
  }, []);

  // Hide results
  const hideResults = useCallback(() => {
    setShowResults(false);
  }, []);

  // Clear autocomplete state
  const clearAutocomplete = useCallback(() => {
    setQuery('');
    setResults([]);
    setError(null);
    setShowResults(false);
    
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
  }, []);

  const hasResults = results && results.length > 0;

  return {
    query,
    setQuery: setQueryWithDebounce,
    results,
    loading,
    error,
    showResults,
    setShowResults,
    selectResult,
    hideResults,
    clearAutocomplete,
    hasResults
  };
};

export const usePagination = (totalItems, itemsPerPage) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const goToPage = useCallback((page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  }, [totalPages]);

  const nextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, totalPages]);

  const prevPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage]);

  const getPageNumbers = useCallback((maxVisible = 5) => {
    const pages = [];
    const half = Math.floor(maxVisible / 2);
    
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, currentPage + half);
    
    // Adjust if we're near the beginning or end
    if (end - start + 1 < maxVisible) {
      if (start === 1) {
        end = Math.min(totalPages, start + maxVisible - 1);
      } else if (end === totalPages) {
        start = Math.max(1, end - maxVisible + 1);
      }
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  }, [currentPage, totalPages]);

  const canGoNext = currentPage < totalPages;
  const canGoPrev = currentPage > 1;

  return {
    currentPage,
    totalPages,
    goToPage,
    nextPage,
    prevPage,
    getPageNumbers,
    canGoNext,
    canGoPrev,
    setCurrentPage
  };
};