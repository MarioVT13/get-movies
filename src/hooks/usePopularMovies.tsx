import { useState, useEffect } from "react";
import axios from "axios";

const usePopularMovies = () => {
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
              api_key: "9832af988b9228550b81b98fee2efec8",
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
