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
  gray: "#D3D3D3",
  deepGray: "#666666",
  black: "#000",
  semiTransparent: "rgba(0,0,0,0.3)",
};

export const plusBtnAlertMessage =
  "Yes, this would be the place to add a new ToDo task, if the app is completed :)";
export const editBtnAlertMessage = "It will edit the existing task. ";
export const urgentBtnAlertMessage =
  'It will toggle the "urgent" status of the task.';
export const taskDeletedAlertMessage = "Task deleted!";
