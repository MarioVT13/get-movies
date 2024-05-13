import { useState, useEffect } from "react";
import axios from "axios";

const useMoviePosters = () => {
  const apiKey = process.env.EXPO_TMBD_API_KEY;

  const [movDetails, setMovDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${1041613}`,
          {
            params: {
              api_key: apiKey,
            },
          }
        );
        setMovDetails(response.data.results);
      } catch (err: any) {
        setError(err?.message ?? "Unknown");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPopularMovies();
  }, []);

  //   console.log("MOVIES: ", movies);
  //   console.log("isLoading: ", isLoading);
  //   console.log("ERROR: ", error);

  return { movDetails, isLoading, error };
};

export default useMoviePosters;
