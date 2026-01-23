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
import { horizontalScale } from "../utils/ScalingUtil";
import { useHelloMessageSeen } from "../store/helloMessageStore";

interface BounceButtonProps {
  onPress: () => void;
}

export default function BounceButton({ onPress }: BounceButtonProps) {
  // const isHelloMessageSeen = useHelloMessageSeen(
  //   (state) => state.isHelloMessageSeen,
  // );
  const isHelloMessageSeen = false; // testing
  const setHelloMessageSeen = useHelloMessageSeen(
    (state) => state.setHelloMessageSeen,
  );

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
        true, // Reverse the animation on every second iteration
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
    };
  });

  if (isHelloMessageSeen) return;

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.helloBtn, animatedStyle]}>
        {contentVisible && (
          <TouchableOpacity onPress={() => btnAlert()}>
            <Icon
              name={"happy-outline"}
              size={horizontalScale(30)}
              color={colors.gray}
            />
          </TouchableOpacity>
        )}
      </Animated.View>
    </View>
  );

  function btnAlert() {
    onPress();
    // Alert.alert(helloMessage);
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
