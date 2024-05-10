import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { gestureHandlerRootHOC } from "react-native-gesture-handler";

function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

export default gestureHandlerRootHOC(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
