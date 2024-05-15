import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
} from "react-native-reanimated";
import { colors, helloMessage } from "../GlobalConsts";
import Icon from "react-native-vector-icons/Ionicons";

export default function BounceButton() {
  const animationTrigger = useSharedValue(0.7); // Start at a reduced scale
  const [contentVisible, setContentVisible] = useState(false); // State to control content visibility
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Initial delay handled here
    const initialDelay = 5 * 1000; // 500 ms initial delay
    setTimeout(() => {
      setContentVisible(true); // Show the content when the animation starts
      animationTrigger.value = withRepeat(
        withSpring(1, {
          damping: 8,
          stiffness: 150,
          mass: 1,
        }),
        -1, // Infinite repeats
        true // Reverse the animation on every second iteration
      );
    }, initialDelay);

    // Cleanup function
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: animationTrigger.value }],
      opacity: contentVisible ? 1 : 0, // Use opacity to hide/show the content
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.helloBtn, animatedStyle]}>
        {contentVisible && (
          <TouchableOpacity
            onPress={() => btnAlert()}
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <Icon name={"happy-outline"} size={50} color={colors.gray} />
          </TouchableOpacity>
        )}
      </Animated.View>
    </View>
  );

  function btnAlert() {
    Alert.alert(helloMessage);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
  },
  helloBtn: {
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});
