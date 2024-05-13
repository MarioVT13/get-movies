import { useState, useEffect } from "react";
import axios from "axios";

const usePopularMovies = () => {
  const apiKey = process.env.EXPO_TMBD_API_KEY;

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPopularMovies = async () => {
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
        setMovies(response.data.results);
      } catch (err: unknown) {
        setError(err?.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPopularMovies();
  }, []);

  console.log("MOVIES: ", movies);
  console.log("isLoading: ", isLoading);
  console.log("ERROR: ", error);

  return { movies, isLoading, error };
};

export default usePopularMovies;
