import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { MovieItemDataType } from "../types/DataTypes";
import { isValidMovieData } from "../utils/ServiceDataUtil";
import { API_KEY, BASE_URL } from "../GlobalConsts";

const usePopularMovies = () => {
  const [movies, setMovies] = useState<MovieItemDataType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Track the current page
  const [page, setPage] = useState(1);
  // Track if we have reached the end of the DB
  const [hasMore, setHasMore] = useState(true);

  // 1. Helper function to fetch a specific page
  const fetchPage = async (pageNumber: number) => {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      params: {
        api_key: API_KEY,
        page: pageNumber,
      },
    });

    const validMovies = (response.data?.results || []).filter(isValidMovieData);

    return {
      data: validMovies,
      totalPages: response.data.total_pages,
    };
  };

  // 2. LOAD MORE (Used for Infinite Scroll)
  const loadMore = useCallback(async () => {
    // Stop if already loading or no more pages
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const { data, totalPages } = await fetchPage(page);

      // Append new data to existing list
      setMovies((prev) => [...prev, ...data]);

      // Prepare next page number
      setPage((prev) => prev + 1);
      setHasMore(page < totalPages);
    } catch (err: any) {
      setError(err.message ?? "Unknown error");
    } finally {
      setIsLoading(false);
    }
  }, [page, hasMore, isLoading]);

  // 3. REFRESH (Used for Pull-to-Refresh)
  const refresh = useCallback(async () => {
    setIsLoading(true);
    try {
      // Force fetch Page 1
      const { data, totalPages } = await fetchPage(1);

      // REPLACE the list (don't append)
      setMovies(data);

      // Reset page counter to 2 (since we just grabbed 1)
      setPage(2);
      setHasMore(1 < totalPages);
      setError(null);
    } catch (err: any) {
      console.log("❌ REFRESH FAILED:", err);
      setError(err.message ?? "Unknown error");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 4. Initial Load
  useEffect(() => {
    loadMore();
  }, []);

  return {
    movies,
    isLoading,
    error,
    loadMore, // Connect this to onEndReached
    refresh, // Connect this to RefreshControl onRefresh
  };
};

export default usePopularMovies;
