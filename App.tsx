import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";
import RootStack from "./src/navigation/stacks/RootStack";
import { Bangers_400Regular, useFonts } from "@expo-google-fonts/bangers";
import { ActivityIndicator, StyleSheet } from "react-native";
import { colors } from "./src/GlobalConsts";
import { Anton_400Regular } from "@expo-google-fonts/anton";
import { Lato_400Regular, Lato_900Black } from "@expo-google-fonts/lato";

function App() {
  const [fontsLoaded] = useFonts({
    Anton_400Regular,
    Bangers_400Regular,
    Lato_400Regular,
    Lato_900Black,
  });

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        // We can put here more async tasks (if needed), before hiding the splash screen.
      } catch (e) {
        console.warn("Failed to load resources: ", e);
      } finally {
        if (fontsLoaded) {
          await SplashScreen.hideAsync();
        }
      }
    }

    if (fontsLoaded) {
      prepare();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return (
      <ActivityIndicator
        color={colors.rust}
        style={styles.indicator}
        size="large"
      />
    ); // Render a loading indicator while fonts are loading
  }

  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <RootStack />
    </NavigationContainer>
  );
}

export default gestureHandlerRootHOC(App);

const styles = StyleSheet.create({
  indicator: {
    alignSelf: "center",
    position: "absolute",
    top: "50%",
  },
});
