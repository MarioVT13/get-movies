export type Genres = {
  id: number;
  name: string;
};

export type MovieItemDataType = {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
  tagline?: string;
  genres?: Genres[];
  credits?: {
    cast: {
      id: number;
      name: string;
      character: string;
      profile_path: string | null;
    }[];
  };
};
