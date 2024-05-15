import { useRoute } from "@react-navigation/native";
import dayjs from "dayjs";
import React from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  BounceIn,
  FadeInDown,
  SlideInRight,
  ZoomIn,
} from "react-native-reanimated";
import Screen, {
  colors,
  customFonts,
  errorLoadingMovieList,
  errorMovieDetails,
  helloMessage,
  lHorizontalScale,
} from "../GlobalConsts";
import BackHeader from "../components/BackHeader";
import useMovieDetails from "../hooks/useMovieDetails";
import Icon from "react-native-vector-icons/Ionicons";
import BounceButton from "../components/BounceButton";

export default function DetailsScreen() {
  const navParams: Partial<object> | any = useRoute().params;
  const {
    id,
    title,
    overview,
    vote_average,
    release_date,
    poster_path,
    backdrop_path,
  } = navParams?.data;

  const { movDetails, isLoading, error } = useMovieDetails({ id });
  const tagline = movDetails ? movDetails.tagline : "";
  const description =
    typeof overview === "string" && overview?.length > 0
      ? overview
      : errorMovieDetails;
  const imageUri =
    typeof poster_path === "string" && poster_path.length > 0
      ? poster_path
      : backdrop_path === "string" && backdrop_path.length > 0
      ? backdrop_path
      : null;

  const dateTime = dayjs(release_date).format("MMM-DD-YYYY");

  if (isLoading) {
    return (
      <View style={styles.parentContainer}>
        <ActivityIndicator color={colors.rust} size="large" />
      </View>
    );
  }

  if (error || !movDetails) {
    return (
      <View style={styles.parentContainer}>
        <Text style={styles.errorText}>{errorLoadingMovieList}:</Text>
        <Text style={styles.errorText}>{error ?? errorMovieDetails}</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("../../assets/get-movies-bg.jpg")}
      style={styles.parentContainer}
    >
      <Animated.View
        style={styles.contentContainer}
        entering={ZoomIn.duration(400).mass(2).damping(20).delay(100)}
      >
        <ImageBackground
          source={{ uri: `https://image.tmdb.org/t/p/original${imageUri}` }}
          style={styles.ImageBackgroundContainer}
          resizeMode="cover"
        >
          <View style={styles.overlay} />
          <Animated.ScrollView
            contentContainerStyle={styles.scrollView}
            showsVerticalScrollIndicator={false}
            entering={FadeInDown.duration(400).mass(2).damping(20).delay(400)}
          >
            <Text
              style={[
                styles.descriptionText,
                { fontFamily: customFonts.latoBlack, marginBottom: "2%" },
              ]}
            >
              {tagline}
            </Text>
            <View style={styles.thematicBreak} />
            <Text style={styles.descriptionText}>{description}</Text>
          </Animated.ScrollView>
          <BackHeader
            title={title}
            rating={vote_average}
            style={{ height: "12%" }}
          />
          <Animated.View
            style={styles.dateTextContainer}
            entering={SlideInRight.duration(700)
              .springify()
              .mass(2)
              .damping(30)
              .delay(500)}
          >
            <Text style={[styles.dateText]}>{dateTime}</Text>
          </Animated.View>
          <BounceButton />
        </ImageBackground>
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
    height: "80%",
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius: Screen.screenWidth * 0.1,
    borderBottomLeftRadius: Screen.screenWidth * 0.05,
    overflow: "hidden",
    borderColor: colors.lightGray,
    borderWidth: 0.5,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: "100%",
    backgroundColor: colors.semiTransparentDark,
  },
  ImageBackgroundContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  errorText: {
    color: colors.purple,
    fontSize: lHorizontalScale(18),
    paddingHorizontal: "10%",
    textAlign: "center",
  },
  dateTextContainer: {
    backgroundColor: colors.semiTransparentDark,
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
    paddingTop: "40%",
    paddingBottom: "10%",
  },
  descriptionText: {
    color: colors.white,
    fontSize: lHorizontalScale(15),
    lineHeight: lHorizontalScale(24),
    fontFamily: customFonts.lato,
  },
  thematicBreak: {
    height: 1,
    backgroundColor: "#ddd",
    width: "100%",
    marginBottom: "5%",
  },
  shadowStyle: {
    height: "70%",
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
