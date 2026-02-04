import { useState, useCallback } from "react";
import axios from "axios";
import { API_KEY, BASE_URL } from "../GlobalConsts";
import { MovieItemDataType } from "../types/DataTypes";
import { isValidMovieData } from "../utils/ServiceDataUtil";

interface MovieSearchResponse {
  page: number;
  results: any[]; // 'any' because the API returns mixed shapes (Movie vs Person vs TV)
  total_results: number;
  total_pages: number;
}

export const useMovieSearch = () => {
  const [movies, setMovies] = useState<MovieItemDataType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const searchMovieByTitle = useCallback(async (query: string) => {
    if (!query.trim()) {
      setMovies([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 1. CHANGE: Switch to /search/multi to get Movies AND TV Shows
      const response = await axios.get<MovieSearchResponse>(
        `${BASE_URL}/search/multi`,
        {
          params: {
            api_key: API_KEY,
            query: query,
          },
        },
      );

      const rawResults = response.data?.results || [];

      // 2. NORMALIZE: Map TV-specific fields to the Movie fields your UI expects
      const normalizedResults: MovieItemDataType[] = rawResults.map((item) => ({
        ...item,
        // If 'title' is missing (because it's a TV show), use 'name'
        title: item.title || item.name,
        original_title: item.original_title || item.original_name,
        // If 'release_date' is missing, use 'first_air_date'
        release_date: item.release_date || item.first_air_date,
        // Ensure we explicitly track the type ('movie' or 'tv')
        media_type: item.media_type || "movie",
      }));

      // 3. FILTER: Remove People and invalid entries
      const validMovies = normalizedResults.filter((item) => {
        // We only want visual content, not actors/directors profiles
        if (item.media_type === "person") return false;
        return isValidMovieData(item);
      });

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
