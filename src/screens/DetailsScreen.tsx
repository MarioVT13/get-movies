import { useRoute } from "@react-navigation/native";
import dayjs from "dayjs";
import React from "react";
import {
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Animated, { ZoomIn } from "react-native-reanimated";
import Screen, { colors, customFonts, lHorizontalScale } from "../GlobalConsts";
import BackHeader from "../components/BackHeader";
import { fonts } from "react-native-elements/dist/config";

export default function DetailsScreen() {
  const navParams: Partial<object> | any = useRoute().params;
  const { id, original_language, title, overview, vote_average, release_date } =
    navParams?.data;

  const dateTime = dayjs(release_date).format("MMM-DD-YYYY");
  const isIOS = Platform.OS == "ios";

  return (
    <ImageBackground
      source={require("../../assets/get-movies-bg.jpg")}
      style={styles.parentContainer}
    >
      <Animated.View
        style={styles.shadowStyle}
        entering={ZoomIn.duration(400).mass(2).damping(20).delay(100)}
      >
        <View style={styles.contentContainer}>
          <BackHeader title={title} rating={vote_average} style={{}} />
          <ScrollView
            contentContainerStyle={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.descriptionText}>{overview}</Text>
          </ScrollView>
          <View style={styles.dateTextContainer}>
            <Text style={[styles.dateText]}>{dateTime}</Text>
          </View>
        </View>
      </Animated.View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    width: "90%",
    height: "100%",
    backgroundColor: colors.white,
    alignItems: "flex-end",
    justifyContent: "center",
    borderTopRightRadius: Screen.screenWidth * 0.1,
    borderBottomLeftRadius: Screen.screenWidth * 0.05,
    overflow: "hidden",
  },

  dateTextContainer: {
    backgroundColor: colors.semiTransparent,
    position: "absolute",
    top: "15%",
    right: 0,
    padding: 3,
  },
  dateText: {
    color: colors.white,
    fontSize: lHorizontalScale(11),
  },
  scrollView: {
    paddingHorizontal: "8%",
    paddingVertical: "20%",
  },
  descriptionText: {
    color: colors.deepGray,
    fontSize: lHorizontalScale(16),
    lineHeight: lHorizontalScale(24),
    fontFamily: customFonts.latoBoldItalic,
  },
  shadowStyle: {
    height: "85%",
    borderTopRightRadius: Screen.screenWidth * 0.1,
    borderBottomLeftRadius: Screen.screenWidth * 0.05,
    shadowColor: colors.black,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
  },
});
