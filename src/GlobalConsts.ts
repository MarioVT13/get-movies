import { Dimensions } from "react-native";

const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

const Screen = {
  ////
  get screenWidth() {
    return Dimensions.get("window").width;
  },
  ////
  get screenHeight() {
    return Dimensions.get("window").height;
  },
  ////
};

export const lVerticalScale = (size: number) =>
  (Screen.screenHeight / guidelineBaseHeight) * size;
export const lHorizontalScale = (size: number) =>
  (Screen.screenWidth / guidelineBaseWidth) * size;

export default Screen;

// COLORS
export const colors = {
  white: "#fff",
  lightYellow: "#FFFFE0",
  yellow: "#FFD992",
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
  semiTransparent: "rgba(0,0,0,0.3)",
};

export const customFonts = {
  anton: "Anton_400Regular",
  bangers: "Bangers_400Regular",
  latoBoldItalic: "Lato_700Bold_Italic",
};

export const errorLoadingMovieList = "Something went wrong";
export const errorFindingMovies = "No movies to show";
