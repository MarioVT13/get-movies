import { Linking, Platform } from "react-native";
import * as Application from "expo-application";
import * as StoreReview from "expo-store-review";

// TODO: Replace with the actual App ID (get this from App Store Connect later)
const IOS_APP_ID = "123456789";

export const rateApp = async () => {
  // A. Try the native In-App Review first (The cleanest way)
  // Note: In dev/TestFlight, this might not always appear, but it's safe to call.
  const isAvailable = await StoreReview.hasAction();

  if (isAvailable) {
    try {
      await StoreReview.requestReview();
      return; // If successful, stop here.
    } catch (e) {
      console.log("In-App review failed, falling back to store link");
    }
  }

  // ========================================================

  // B. Fallback: Open the Store Page manually
  const packageName = Application.applicationId; // e.g., com.yourapp.movie
  let url = "";

  if (Platform.OS === "android") {
    // Opens the Play Store App directly
    url = `market://details?id=${packageName}`;
  } else if (Platform.OS === "ios") {
    // Opens the App Store Review page
    url = `itms-apps://itunes.apple.com/app/id${IOS_APP_ID}?action=write-review`;
  }

  // C. Open the URL
  try {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.warn("Cannot open store URL:", url);
      // Optional: For testing ONLY, you can uncomment this to see if the button works
      // Linking.openURL("https://www.google.com");
    }
  } catch (error) {
    console.error("An error occurred", error);
  }
};
