import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const usePopularMovies = () => {
  const apiKey = process.env.EXPO_TMBD_API_KEY;
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPopularMovies = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/popular",
        {
          params: {
            api_key: apiKey,
          },
        }
      );
      setMovies(response.data?.results);
      setError(null); // Clear any errors on successful fetch
    } catch (err: any) {
      setError(err?.response?.data?.message ?? "Unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  }, [apiKey]);

  useEffect(() => {
    fetchPopularMovies();
  }, [fetchPopularMovies]);

  return { movies, isLoading, error, refreshMovies: fetchPopularMovies };
};

export default usePopularMovies;
