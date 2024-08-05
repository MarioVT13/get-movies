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
  genres: string;
  rating: number;
  style: Partial<ViewStyle>;
}

export default function BackHeader(props: Props) {
  const { title, genres, rating, style } = props;
  const { goBack } = useNavigation();

  const overSizedTitle = title?.length > 20;
  const titleTextSize = overSizedTitle ? 18 : 22;

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
      <View style={styles.titleContainer}>
        <Animated.Text
          entering={StretchInY.duration(500).mass(1).damping(30).delay(300)}
          style={[
            styles.titleText,
            { fontSize: horizontalScale(titleTextSize) },
          ]}
        >
          {title.toUpperCase()}
        </Animated.Text>
        <Animated.Text
          entering={StretchInY.duration(500).mass(1).damping(30).delay(300)}
          style={styles.genres}
        >
          {genres}
        </Animated.Text>
      </View>
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
  titleContainer: {
    // backgroundColor: "purple",
    height: "100%",
    width: "60%",
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    width: "100%",
    color: colors.white,
    textAlign: "center",
    fontFamily: customFonts.bangers,
  },
  ratingComponentContainer: {
    width: "20%",
  },
  genres: {
    position: "absolute",
    bottom: "5%",
    color: colors.gray,
    fontSize: horizontalScale(11),
    textAlign: "center",
    fontFamily: customFonts.lato,
  },
});
