import { create } from "zustand";
import { MovieItemDataType } from "../types/DataTypes";

interface FavMoviesState {
  favMovies: MovieItemDataType[];
  addMovie: (movie: MovieItemDataType) => void;
  removeMovie: (movieId: number | string) => void;
  clearMovies: () => void;
  // Check if a movie is already favorite
  isFavorite: (movieId: number | string) => boolean;
}

export const useMovieStore = create<FavMoviesState>((set, get) => ({
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
}));
