import React from "react";
import { TouchableOpacity, StyleSheet, ViewStyle } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { colors } from "../GlobalConsts";
import { horizontalScale, verticalScale } from "../utils/ScalingUtil";

interface Props {
  onPress?: () => void;
  style?: ViewStyle;
}

export default function ShareButton({ onPress, style }: Props) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Feather
        name="share-2"
        size={horizontalScale(20)}
        color={colors.lightGray}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: verticalScale(5),
    right: horizontalScale(20),
    padding: horizontalScale(5),
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
});
