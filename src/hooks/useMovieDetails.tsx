import { useState, useEffect } from "react";
import axios from "axios";
import { MovieItemDetailsDataType } from "../types/DataTypes";

const useMovieDetails = ({ id }: { id: number }) => {
  const apiKey = process.env.EXPO_TMBD_API_KEY;

  const [movDetails, setMovDetails] = useState<MovieItemDetailsDataType | null>(
    null
  );
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
        setMovDetails(response.data);
      } catch (err: any) {
        setError(err?.message ?? "Unknown");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPopularMovies();
  }, []);

  // console.log("movDETAILS: ", movDetails);
  // console.log("isLoading: ", isLoading);
  // console.log("ERROR: ", error);

  return { movDetails, isLoading, error };
};

export default useMovieDetails;
