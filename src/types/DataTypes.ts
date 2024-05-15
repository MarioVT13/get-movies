export type MovieItemDataType = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
};

export type MovieItemDetailsDataType = {
  title: string;
  overview: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
  tagline: string;
};
