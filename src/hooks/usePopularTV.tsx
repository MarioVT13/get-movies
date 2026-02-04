import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { MovieItemDataType } from "../types/DataTypes";
import { isValidMovieData } from "../utils/ServiceDataUtil";
import { API_KEY, BASE_URL } from "../GlobalConsts";

const usePopularTV = () => {
  const [tvShows, setTvShows] = useState<MovieItemDataType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchPage = async (pageNumber: number) => {
    const response = await axios.get(`${BASE_URL}/tv/popular`, {
      params: {
        api_key: API_KEY,
        page: pageNumber,
      },
    });

    const rawResults = response.data?.results || [];

    // NORMALIZE: Convert TV data structure to match Movie structure
    const validShows = rawResults
      .map((item: any) => ({
        ...item,
        title: item.name,
        original_title: item.original_name,
        release_date: item.first_air_date,
        media_type: "tv",
      }))
      .filter(isValidMovieData);

    return {
      data: validShows,
      totalPages: response.data.total_pages,
    };
  };

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);
    try {
      const { data, totalPages } = await fetchPage(page);

      setTvShows((prev) => [...prev, ...data]);
      setPage((prev) => prev + 1);
      setHasMore(page < totalPages);
    } catch (err: any) {
      setError(err.message ?? "Unknown error");
    } finally {
      setIsLoading(false);
    }
  }, [page, hasMore, isLoading]);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, totalPages } = await fetchPage(1);
      setTvShows(data);
      setPage(2);
      setHasMore(1 < totalPages);
      setError(null);
    } catch (err: any) {
      setError(err.message ?? "Unknown error");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMore();
  }, []);

  return {
    tvShows,
    isLoading,
    error,
    loadMore,
    refresh,
  };
};

export default usePopularTV;
