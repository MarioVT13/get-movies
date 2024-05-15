import { useState, useEffect } from "react";
import axios from "axios";

const usePopularMovies = () => {
  const apiKey = process.env.EXPO_TMBD_API_KEY;

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
      } catch (err: any) {
        setError(err?.message ?? "Unknown");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPopularMovies();
  }, []);

  return { movies, isLoading, error };
};

export default usePopularMovies;
