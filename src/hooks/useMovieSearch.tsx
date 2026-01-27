import { useState, useCallback } from "react";
import axios from "axios";
import { API_KEY, BASE_URL } from "../GlobalConsts";
import { MovieItemDataType } from "../types/DataTypes";
import { isValidMovieData } from "../utils/ServiceDataUtil";

interface MovieSearchResponse {
  page: number;
  results: MovieItemDataType[];
  total_results: number;
  total_pages: number;
}

export const useMovieSearch = () => {
  const [movies, setMovies] = useState<MovieItemDataType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const searchMovieByTitle = useCallback(async (title: string) => {
    if (!title.trim()) {
      setMovies([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get<MovieSearchResponse>(
        `${BASE_URL}/search/movie`,
        {
          params: {
            api_key: API_KEY,
            query: title,
          },
        },
      );

      const rawResults = response.data?.results || [];
      const validMovies = rawResults.filter(isValidMovieData);

      setMovies(validMovies);
    } catch (err: any) {
      setError(err.message || "Error searching for movie");
      console.error("Error searching for movie:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { movies, searchMovieByTitle, error, loading };
};
