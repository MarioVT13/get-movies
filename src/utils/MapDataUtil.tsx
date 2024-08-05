import { Genres } from "../types/DataTypes";

export function getMovieGenres(genres: Genres[]): string {
  const newGenres: Genres[] | null =
    genres?.length > 0 ? genres.slice(0, 3) : null;

  const genreNames = newGenres
    ? newGenres?.map((item) => item.name).join(" / ")
    : "";

  return genreNames;
}
