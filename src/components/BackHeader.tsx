import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";
import { Icon as ElementIcon } from "react-native-elements";
import Animated, { StretchInY } from "react-native-reanimated";
import { colors, customFonts } from "../GlobalConsts";
import { horizontalScale } from "../utils/ScalingUtil";
import RatingComponent from "./RatingComponent";

interface Props {
  title: string;
  rating: number;
  style: Partial<ViewStyle>;
}

export default function BackHeader(props: Props) {
  const { title, rating, style } = props;
  const { goBack } = useNavigation();

  return (
    <View style={[styles.parentContainer, style]}>
      <TouchableOpacity
        onPress={() => goBack()}
        style={styles.backBtnContainer}
      >
        <ElementIcon
          name={"arrow-back"}
          size={30}
          color={colors.white}
          style={{}}
        />
      </TouchableOpacity>
      <Animated.Text
        entering={StretchInY.duration(500).mass(1).damping(30).delay(300)}
        style={styles.titleText}
      >
        {title.toUpperCase()}
      </Animated.Text>
      <View style={styles.ratingComponentContainer}>
        <RatingComponent rating={rating} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  parentContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.semiTransparentLight,
    position: "absolute",
    top: 0,
  },
  backBtnContainer: {
    height: "100%",
    width: "20%",
    justifyContent: "center",
  },
  titleText: {
    width: "60%",
    color: colors.white,
    fontSize: horizontalScale(22),
    textAlign: "center",
    fontFamily: customFonts.bangers,
  },
  ratingComponentContainer: {
    width: "20%",
  },
});
