import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { colors, lHorizontalScale } from "../GlobalConsts";

const RatingComponent = ({ rating }: { rating: number }) => {
  return (
    <View style={styles.container}>
      <View style={styles.star}>
        <View style={[styles.line, styles.line1]} />
        <View style={[styles.line, styles.line2]} />
        <View style={[styles.line, styles.line3]} />
        <View style={[styles.line, styles.line4]} />
        <View style={[styles.line, styles.line5]} />
      </View>
      <Text style={styles.rating}>{rating.toFixed(1)}</Text>
    </View>
  );
};

export default RatingComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  star: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "green",
    transform: [{ rotate: "45deg" }],
  },
  line: {
    position: "absolute",
    width: 0,
    height: 0,
    borderStyle: "solid",
  },
  line1: {
    borderBottomWidth: 30,
    borderBottomColor: colors.yellow,
    borderLeftWidth: 25,
    borderLeftColor: "transparent",
    borderRightWidth: 25,
    borderRightColor: "transparent",
    transform: [{ rotate: "0deg" }],
  },
  line2: {
    borderBottomWidth: 30,
    borderBottomColor: colors.yellow,
    borderLeftWidth: 25,
    borderLeftColor: "transparent",
    borderRightWidth: 25,
    borderRightColor: "transparent",
    transform: [{ rotate: "72deg" }],
  },
  line3: {
    borderBottomWidth: 30,
    borderBottomColor: colors.yellow,
    borderLeftWidth: 25,
    borderLeftColor: "transparent",
    borderRightWidth: 25,
    borderRightColor: "transparent",
    transform: [{ rotate: "144deg" }],
  },
  line4: {
    borderBottomWidth: 30,
    borderBottomColor: colors.yellow,
    borderLeftWidth: 25,
    borderLeftColor: "transparent",
    borderRightWidth: 25,
    borderRightColor: "transparent",
    transform: [{ rotate: "216deg" }],
  },
  line5: {
    borderBottomWidth: 30,
    borderBottomColor: colors.yellow,
    borderLeftWidth: 25,
    borderLeftColor: "transparent",
    borderRightWidth: 25,
    borderRightColor: "transparent",
    transform: [{ rotate: "288deg" }],
  },

  rating: {
    fontSize: lHorizontalScale(14),
    color: colors.deepGray,
    position: "absolute",
    fontWeight: "bold",
  },
});
