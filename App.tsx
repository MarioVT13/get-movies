import { Anton_400Regular } from "@expo-google-fonts/anton";
import { Bangers_400Regular, useFonts } from "@expo-google-fonts/bangers";
import { Lato_400Regular, Lato_900Black } from "@expo-google-fonts/lato";
import { PortalProvider } from "@gorhom/portal";
import { NavigationContainer } from "@react-navigation/native";
import * as NavigationBar from "expo-navigation-bar";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useCallback, useEffect } from "react";
import { Platform, StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import RootStack from "./src/navigation/stacks/RootStack";

// 1. Keep the Splash Screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

function App() {
  const [fontsLoaded] = useFonts({
    Anton_400Regular,
    Bangers_400Regular,
    Lato_400Regular,
    Lato_900Black,
  });

  // 2. Configure System UI immediately on mount (Independent of fonts)
  useEffect(() => {
    async function configureBar() {
      if (Platform.OS === "android") {
        try {
          // Setting transparent entails the content drawing behind the nav bar
          await NavigationBar.setPositionAsync("absolute");
          await NavigationBar.setBackgroundColorAsync("transparent");
          await NavigationBar.setButtonStyleAsync("dark");
        } catch (e) {
          // Catch "Activity no longer available" errors during Hot Reload
          console.log(
            "Navigation Bar configuration skipped:",
            (e as Error).message
          );
        }
      }
    }
    configureBar();
  }, []);

  // 3. Define the onLayout callback to hide splash screen only when view is ready
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // 4. While fonts load, you can return null to keep the Splash Screen up,
  // or return your custom ActivityIndicator.
  if (!fontsLoaded) {
    // If you prefer the native Splash Screen to persist until ready, return null here.
    // If you specifically want your custom spinner, we need to hide the Splash Screen first.
    // Assuming you want the seamless Splash -> App transition:
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
  indicator: {
    alignSelf: "center",
    position: "absolute",
    top: "50%",
  },
});
