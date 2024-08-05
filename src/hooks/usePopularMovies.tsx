import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { MovieItemDataType } from "../types/DataTypes";
import { isValidMovieData } from "../utils/ServiceDataUtil";
import { API_KEY, BASE_URL } from "../GlobalConsts";

const usePopularMovies = () => {
  const [movies, setMovies] = useState<MovieItemDataType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchPopularMovies = useCallback(async () => {
    if (!hasMore || isLoading) return; // Prevent duplicate calls
    setIsLoading(true);

    try {
      const response = await axios.get(`${BASE_URL}/movie/popular`, {
        params: {
          api_key: API_KEY,
          page,
        },
      });
      let validMovies = response.data?.results;
      if (Array.isArray(validMovies)) {
        validMovies = validMovies.filter(isValidMovieData);
      } else {
        validMovies = [];
      }
      setMovies((prevMovies) => [...prevMovies, ...validMovies]);
      setPage((prevPage) => prevPage + 1);
      setHasMore(response.data.page < response.data.total_pages);
      // console.log("Get pop movies: ", validMovies);
      // console.log(`Data for page ${page} fetched`); // Debug data fetch
    } catch (err: any) {
      setError(err.response?.data?.message ?? "Unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  }, [API_KEY, page, hasMore, isLoading]);

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  return { movies, isLoading, error, refreshMovies: fetchPopularMovies };
};

export default usePopularMovies;
