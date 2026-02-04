import { useState, useEffect } from "react";
import axios from "axios";
import { MovieItemDataType } from "../types/DataTypes";
import { API_KEY, BASE_URL } from "../GlobalConsts";

// Add a 'type' prop to the hook arguments
const useMovieDetails = ({
  id,
  type = "movie",
}: {
  id: number;
  type?: string;
}) => {
  const [movDetails, setMovDetails] = useState<MovieItemDataType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) return;

      setIsLoading(true);
      try {
        // If type is 'tv', use 'tv', otherwise default to 'movie'
        const endpoint = type === "tv" ? "tv" : "movie";

        const response = await axios.get(`${BASE_URL}/${endpoint}/${id}`, {
          params: {
            api_key: API_KEY,
            append_to_response: "credits", // needed param for actors info
          },
        });

        const fullCast = response.data.credits?.cast || [];
        const top3Actors = fullCast.slice(0, 3);

        const cleanedData = {
          ...response.data,
          title: response.data.title || response.data.name,
          release_date:
            response.data.release_date || response.data.first_air_date,
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
  }, [id, type]);

  return { movDetails, isLoading, error };
};

export default useMovieDetails;
