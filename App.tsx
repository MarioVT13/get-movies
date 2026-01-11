import { Anton_400Regular } from "@expo-google-fonts/anton";
import { Bangers_400Regular, useFonts } from "@expo-google-fonts/bangers";
import { Lato_400Regular, Lato_900Black } from "@expo-google-fonts/lato";
import { PortalProvider } from "@gorhom/portal";
import { NavigationContainer } from "@react-navigation/native";
import * as NavigationBar from "expo-navigation-bar";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect } from "react";
import { Platform, StyleSheet, AppState } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import RootStack from "./src/navigation/stacks/RootStack";

SplashScreen.preventAutoHideAsync();

function App() {
  const [fontsLoaded] = useFonts({
    Anton_400Regular,
    Bangers_400Regular,
    Lato_400Regular,
    Lato_900Black,
  });

  // ============================================================
  //  ANDROID IMMERSIVE MODE CONFIGURATION
  // ============================================================
  useEffect(() => {
    if (Platform.OS !== "android") return;

    const hideNavBar = async () => {
      try {
        // 1. Hide the bottom navigation bar completely
        await NavigationBar.setVisibilityAsync("hidden");

        // 2. Define swipe behavior:
        // 'overlay-swipe' means swiping up reveals the bar ON TOP of your content
        // This prevents your layout from "jumping" or resizing when the bar appears.
        await NavigationBar.setBehaviorAsync("overlay-swipe");

        // 3. Fallbacks (in case it temporarily appears)
        // We still set these so if the bar DOES pop up, it looks nice.
        await NavigationBar.setPositionAsync("absolute");
        await NavigationBar.setBackgroundColorAsync("transparent");
      } catch (e) {
        console.log("NavBar Error:", e);
      }
    };

    // Apply immediately on mount
    hideNavBar();

    // Re-apply whenever the app comes back to the foreground
    // (Android loves to reset this when you switch apps)
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState === "active") {
        hideNavBar();
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);
  // ============================================================

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView
      style={styles.parentContainer}
      onLayout={onLayoutRootView}
    >
      <NavigationContainer>
        <PortalProvider>
          <StatusBar style="light" />
          <RootStack />
        </PortalProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
  },
});
