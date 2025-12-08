import React, { useEffect } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { colors, customFonts } from "../GlobalConsts";
import { horizontalScale } from "../utils/ScalingUtil";

interface ConfirmationTextProps {
  text?: string;
  duration?: number;
  style?: ViewStyle;
}

export default function ConfirmationText({
  text = "Saved",
  duration = 2.5 * 1000,
  style = {},
}: ConfirmationTextProps) {
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withTiming(0, { duration: duration });
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <Animated.Text style={[styles.savedText, animatedStyle, style]}>
      {text}
    </Animated.Text>
  );
}

const styles = StyleSheet.create({
  savedText: {
    color: colors.white,
    fontSize: horizontalScale(15),
    fontFamily: customFonts.lato,
    textAlign: "center",
  },
});
