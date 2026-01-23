// API
export const API_KEY = process.env.EXPO_TMBD_API_KEY;
export const BASE_URL = "https://api.themoviedb.org/3";
// API - end

// COLORS
export const colors = {
  white: "#fff",
  lightYellow: "#FFFFE0",
  yellow: "#FFD992",
  red: "#ff597b",
  purple: "#c795c3",
  green: "#7CA4AB",
  blue: "#00a0e3",
  lightGray: "#F2F2F2",
  antiqueBronze: "#8B4000",
  rust: "#B7410E",
  copper: "#AD6F69",
  gray: "#D3D3D3",
  deepGray: "#666666",
  black: "#000",
  semiTransparentLight: "rgba(0,0,0,0.3)",
  semiTransparentDark: "rgba(0,0,0,0.7)",
};
// COLORS - end

// FONTS
export const customFonts = {
  anton: "Anton_400Regular",
  bangers: "Bangers_400Regular",
  lato: "Lato_400Regular",
  latoBlack: "Lato_900Black",
};
// FONTS - end

// ERRORS
export const errorLoadingMovieList = "Something went wrong";
export const errorFindingMovies = "No movies to show";
export const errorMovieDetails = "No info available :(";
export const errorMovieTitle = "Unknown title";
export const helloMessage = "Hello, I hope you like my app :)";
// ERRORS - end
