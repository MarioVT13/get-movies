import { useState, useEffect } from "react";
import axios from "axios";
import { MovieItemDataType } from "../types/DataTypes";
import { isValidMovieData } from "../utils/ServiceDataUtil";

const useMovieDetails = ({ id }: { id: number }) => {
  const apiKey = process.env.EXPO_TMBD_API_KEY;

  const [movDetails, setMovDetails] = useState<MovieItemDataType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}`,
          {
            params: {
              api_key: apiKey,
            },
          }
        );

        if (isValidMovieData(response.data)) {
          setMovDetails(response.data);
        }
      } catch (err: any) {
        setError(err?.message ?? "Unknown");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPopularMovies();
  }, []);

  return { movDetails, isLoading, error };
};

export default useMovieDetails;
