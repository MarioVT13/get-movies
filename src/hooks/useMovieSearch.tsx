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
        }
      );

      let validMovies = response.data?.results;
      if (Array.isArray(validMovies)) {
        validMovies = validMovies.filter(isValidMovieData);
      } else {
        validMovies = [];
      }

      //   setMovies(validMovies);
      setMovies(response.data?.results);
    } catch (err) {
      setError("Error searching for movie");
      console.error("Error searching for movie:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { movies, searchMovieByTitle, error, loading };
};
