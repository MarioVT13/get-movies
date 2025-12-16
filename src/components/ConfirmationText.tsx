import React, { useEffect } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  runOnJS,
} from "react-native-reanimated";
import { colors, customFonts } from "../GlobalConsts";
import { horizontalScale, verticalScale } from "../utils/ScalingUtil";

interface ConfirmationTextProps {
  text?: string;
  duration?: number;
  style?: ViewStyle;
  onAnimationEnd?: () => void;
}

export default function ConfirmationText({
  text = "Saved",
  duration = 2.5 * 1000,
  style = {},
  onAnimationEnd,
}: ConfirmationTextProps) {
  const opacity = useSharedValue(1);
  const translateY = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(0, {
      duration: duration,
      easing: Easing.out(Easing.ease),
    });
    translateY.value = withTiming(
      verticalScale(15),
      {
        duration: duration,
        easing: Easing.out(Easing.ease),
      },
      (finished) => {
        if (finished && onAnimationEnd) {
          runOnJS(onAnimationEnd)(); // Wrap onAnimationEnd with runOnJS thread bridge
        }
      }
    );
  }, [duration, opacity, translateY, onAnimationEnd]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
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
