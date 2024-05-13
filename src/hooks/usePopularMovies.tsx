import { useState, useEffect } from "react";
import axios from "axios";
import Constants from "expo-constants";

const usePopularMovies = () => {
  console.log("Constants: ", Constants);

  const apiKey =
    Constants?.manifest2?.extra?.expoClient?.extra?.TMDB_API_KEY ?? "";
  console.log("apiKey: ", apiKey);
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
  }, []); // Empty dependency array ensures this effect runs only once after the initial render

  console.log("MOVIES: ", movies);
  console.log("isLoading: ", isLoading);
  console.log("ERROR: ", error);

  return { movies, isLoading, error };
};

export default usePopularMovies;
