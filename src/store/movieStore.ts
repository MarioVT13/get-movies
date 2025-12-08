import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MovieItemDataType } from "../types/DataTypes";

interface FavMoviesState {
  favMovies: MovieItemDataType[];
  addMovie: (movie: MovieItemDataType) => void;
  removeMovie: (movieId: number | string) => void;
  clearMovies: () => void;
  isFavorite: (movieId: number | string) => boolean;
}

export const useMovieStore = create<FavMoviesState>()(
  persist(
    (set, get) => ({
      favMovies: [],

      addMovie: (movie) => {
        const { favMovies } = get();
        // Prevent duplicates
        const exists = favMovies.some((m) => m.id === movie.id);
        if (!exists) {
          set({ favMovies: [...favMovies, movie] });
        }
      },

      removeMovie: (movieId) => {
        set((state) => ({
          favMovies: state.favMovies.filter((m) => m.id !== movieId),
        }));
      },

      clearMovies: () => {
        set({ favMovies: [] });
      },

      isFavorite: (movieId) => {
        return get().favMovies.some((m) => m.id === movieId);
      },
    }),
    {
      name: "movie-storage", // unique name for the item in storage
      storage: createJSONStorage(() => AsyncStorage), // usage with React Native
    }
  )
);
