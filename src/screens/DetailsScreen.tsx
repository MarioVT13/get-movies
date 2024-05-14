import { useRoute } from "@react-navigation/native";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import {
  Alert,
  Animated,
  Platform,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import BackHeader from "../components/BackHeader";
import Screen, { lHorizontalScale, colors } from "../GlobalConsts";

export default function DetailsScreen() {
  const navParams: Partial<object> | any = useRoute().params;
  const { id, original_language, title, overview, vote_average, release_date } =
    navParams?.data;

  console.log("NAV_PARAMS: ", navParams);

  const dateTime = dayjs(release_date).format("MMM-DD-YYYY");
  const isIOS = Platform.OS == "ios";
  const animation = new Animated.Value(0);

  return (
    <ImageBackground
      source={require("../../assets/get-movies-bg.jpg")}
      style={styles.parentContainer}
    >
      <View style={styles.shadowStyle}>
        <View style={styles.contentContainer}>
          <BackHeader title={title} style={{}} />
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
      </View>
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
    fontFamily: "arlrdbd",
    fontSize: lHorizontalScale(11),
  },
  scrollView: {
    paddingHorizontal: "10%",
    paddingVertical: "20%",
  },
  descriptionText: {
    color: colors.deepGray,
    fontSize: lHorizontalScale(14),
    lineHeight: lHorizontalScale(24),
    fontFamily: "serifLight",
  },
  shadowStyle: {
    height: "80%",
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
