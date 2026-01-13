import React, { useContext, useEffect, useRef, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring,
} from "react-native-reanimated";
import { colors, helloMessage } from "../GlobalConsts";
import Icon from "react-native-vector-icons/Ionicons";
import { Context } from "../Context";
import { horizontalScale } from "../utils/ScalingUtil";

export default function BounceButton() {
  const { helloMessageSeen, setHelloMessageSeen } = useContext(Context);
  const animationTrigger = useSharedValue(0.7); // Start at a reduced scale
  const [contentVisible, setContentVisible] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    // Initial delay handled here
    const initialDelay = 3 * 1000;
    timeoutRef.current = setTimeout(() => {
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
    }, initialDelay) as unknown as number;

    // Cleanup function
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: animationTrigger.value }],
      opacity: contentVisible ? 1 : 0, // Use opacity to hide/show the content
    };
  });

  if (helloMessageSeen) return;

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.helloBtn, animatedStyle]}>
        {contentVisible && (
          <TouchableOpacity
            onPress={() => btnAlert()}
            style={{ alignItems: "center", justifyContent: "center" }}
          >
            <Icon name={"happy-outline"} size={40} color={colors.gray} />
          </TouchableOpacity>
        )}
      </Animated.View>
    </View>
  );

  function btnAlert() {
    Alert.alert(helloMessage);
    setHelloMessageSeen(true);
  }
}

const styles = StyleSheet.create({
  container: {
    width: horizontalScale(30),
    justifyContent: "center",
    alignItems: "center",
  },
  helloBtn: {
    alignItems: "center",
    justifyContent: "center",
  },
});
