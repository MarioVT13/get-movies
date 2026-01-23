import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { rateApp } from "../utils/RateAppUtil";
import { horizontalScale, verticalScale } from "../utils/ScalingUtil";
import { colors, customFonts, helloMessage } from "../GlobalConsts";

interface RateButtonProps {
  onPress: () => void;
}

const RatePopup = ({ onPress }: RateButtonProps) => {
  const handleRatePress = () => {
    rateApp();
    onPress();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{helloMessage}</Text>

      <TouchableOpacity onPress={handleRatePress} style={styles.button}>
        <Text style={styles.btnText}>RATE</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: colors.white,
    fontSize: horizontalScale(14),
    fontFamily: customFonts.latoBlack,
    textAlign: "center",
    marginBottom: verticalScale(30),
  },
  button: {
    backgroundColor: colors.yellow,
    paddingVertical: verticalScale(5),
    paddingHorizontal: horizontalScale(20),
    borderRadius: 5,
  },
  btnText: {
    color: colors.rust,
    fontSize: horizontalScale(13),
    fontFamily: customFonts.latoBlack,
  },
});

export default RatePopup;
