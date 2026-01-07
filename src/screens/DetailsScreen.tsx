import { useRoute } from "@react-navigation/native";
import dayjs from "dayjs";
import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Animated, {
  FadeInDown,
  SlideInRight,
  ZoomIn,
} from "react-native-reanimated";
import {
  colors,
  customFonts,
  errorLoadingMovieList,
  errorMovieDetails,
} from "../GlobalConsts";
import Screen, { horizontalScale, verticalScale } from "../utils/ScalingUtil";
import BackHeader from "../components/BackHeader";
import BounceButton from "../components/BounceButton";
import useMovieDetails from "../hooks/useMovieDetails";
import { MovieItemDataType } from "../types/DataTypes";
import { getMovieGenres } from "../utils/MapDataUtil";
import { Context } from "../Context";
import { PlusButton } from "../components/PlusButton";
import ShareButton from "../components/ShareButton";
import { useMovieStore } from "../store/movieStore";
import ConfirmationText from "../components/ConfirmationText";

export default function DetailsScreen() {
  const { params } = useRoute();
  const navParams = params as { data: MovieItemDataType };
  const {
    id,
    title,
    overview,
    vote_average,
    release_date,
    poster_path,
    backdrop_path,
  } = navParams?.data || {};

  const addMovie = useMovieStore((state) => state.addMovie);
  const isFavoriteMovie = useMovieStore((state) => state.isFavorite);
  const favMovies = useMovieStore((state) => state.favMovies);

  const { helloMessageSeen } = useContext(Context);
  const [showConfirmMsg, setShowConfirmMsg] = useState(false);

  const { movDetails, isLoading, error } = useMovieDetails({ id });
  const description = (overview?.length && overview) || errorMovieDetails;
  const imageUri = poster_path ?? backdrop_path ?? null;
  // Use a local fallback image when there's no poster/backdrop path
  const imageSource = imageUri
    ? { uri: `https://image.tmdb.org/t/p/original${imageUri}` }
    : require("../../assets/get-movies-bg.jpg");
  const tagline = movDetails?.tagline ?? "";
  const movieGenres = getMovieGenres(movDetails?.genres || []);

  const dateTime = release_date?.length
    ? dayjs(release_date).format("YYYY")
    : null;

  useEffect(() => {
    // Trigger refresh (render) when favorite movies change
    isFavoriteMovie(id);
  }, [favMovies]);

  if (isLoading) {
    return (
      <View style={styles.parentContainer}>
        <ActivityIndicator color={colors.rust} size="large" />
      </View>
    );
  }

  if (error) {
    console.log("ERROR in Details Screen: ", error);

    return (
      <View style={styles.parentContainer}>
        <BackHeader
          title={title}
          genres={movieGenres}
          rating={vote_average}
          style={{ height: "12%" }}
        />
        <Text style={styles.errorText}>{errorLoadingMovieList}:</Text>
        <Text style={styles.errorText}>{error ?? errorMovieDetails}</Text>
      </View>
    );
  }

  const handlePlusButtonPress = () => {
    addMovie(navParams.data);
    setShowConfirmMsg(true);
  };

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
          source={imageSource}
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
            genres={movieGenres}
            rating={vote_average}
            style={{ height: "12%" }}
          />
          {dateTime && (
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
          )}

          {helloMessageSeen && !!!isFavoriteMovie(id) ? (
            <PlusButton onPress={handlePlusButtonPress} />
          ) : (
            <BounceButton />
          )}
          <ShareButton />

          {showConfirmMsg && (
            <ConfirmationText
              onAnimationEnd={() => showConfirmMsg && setShowConfirmMsg(false)}
              style={{ marginBottom: verticalScale(50) }}
            />
          )}
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
    fontSize: horizontalScale(18),
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
    fontSize: horizontalScale(11),
  },
  scrollView: {
    paddingHorizontal: "8%",
    paddingTop: "40%",
    paddingBottom: "10%",
  },
  descriptionText: {
    color: colors.white,
    fontSize: horizontalScale(15),
    lineHeight: horizontalScale(24),
    fontFamily: customFonts.lato,
  },
  thematicBreak: {
    height: 1,
    backgroundColor: "#ddd",
    width: "100%",
    marginBottom: "5%",
  },
});
