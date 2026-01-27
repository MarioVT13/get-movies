import { useState, useEffect } from "react";
import axios from "axios";
import { MovieItemDataType } from "../types/DataTypes";
import { API_KEY, BASE_URL } from "../GlobalConsts";

const useMovieDetails = ({ id }: { id: number }) => {
  const [movDetails, setMovDetails] = useState<MovieItemDataType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/movie/${id}`, {
          params: {
            api_key: API_KEY,
            append_to_response: "credits", // needed param for actors info
          },
        });

        const fullCast = response.data.credits?.cast || [];
        // keep only the top 3 actors and get rid of the massive data dump
        const top3Actors = fullCast.slice(0, 3);

        const cleanedData = {
          ...response.data,
          credits: {
            cast: top3Actors,
          },
        };

        setMovDetails(cleanedData);
      } catch (err: any) {
        setError(err?.message ?? "Unknown");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  return { movDetails, isLoading, error };
};

export default useMovieDetails;
