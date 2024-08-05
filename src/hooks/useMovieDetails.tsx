import { useState, useEffect } from "react";
import axios from "axios";
import { MovieItemDataType } from "../types/DataTypes";
import { isValidMovieData } from "../utils/ServiceDataUtil";
import { API_KEY, BASE_URL } from "../GlobalConsts";

const useMovieDetails = ({ id }: { id: number }) => {
  const [movDetails, setMovDetails] = useState<MovieItemDataType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/movie/${id}`, {
          params: {
            api_key: API_KEY,
          },
        });

        setMovDetails(response.data);
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
