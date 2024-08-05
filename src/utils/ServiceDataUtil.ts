import { MovieItemDataType } from "../types/DataTypes";

// Validate the data types from the response
export const isValidMovieData = (data: any): data is MovieItemDataType => {
  return (
    typeof data.id === "number" &&
    typeof data.title === "string" &&
    typeof data.overview === "string" &&
    typeof data.poster_path === "string" &&
    typeof data.vote_average === "number" &&
    typeof data.release_date === "string"
  );
};
