import React, { useRef } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Screen, {
  colors,
  errorFindingMovies,
  errorLoadingMovieList,
  lHorizontalScale,
} from "../GlobalConsts";
import MovieListItem from "../components/MovieListItem";
import usePopularMovies from "../hooks/usePopularMovies";
import { MovieItemDataType } from "../types/DataTypes";
import { FlatList } from "react-native-gesture-handler";

export default function HomeScreen() {
  const { movies, isLoading, error } = usePopularMovies();

  const isIOS = Platform.OS == "ios";
  const parentAnim = useRef<any>(null);

  if (isLoading) {
    return (
      <View style={styles.parentContainer}>
        <ActivityIndicator color={colors.rust} size="large" />
      </View>
    );
  }

  if (error || movies?.length == 0) {
    return (
      <View style={styles.parentContainer}>
        <Text style={styles.errorText}>{errorLoadingMovieList}:</Text>
        <Text style={styles.errorText}>{error ?? errorFindingMovies}</Text>
      </View>
    );
  }

  return (
    <ImageBackground
      source={require("../../assets/get-movies-bg.jpg")}
      style={styles.parentContainer}
    >
      <FlatList
        data={movies}
        keyExtractor={(item: MovieItemDataType) => item?.id.toString()}
        renderItem={({ item, index }) => {
          return <MovieListItem item={item} index={index} />;
        }}
        initialNumToRender={10}
        showsVerticalScrollIndicator={false}
        numColumns={2} // this sets 2 items per row
        contentContainerStyle={styles.flatListContainer}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    justifyContent: "center",
  },
  flatListContainer: {
    width: "100%",
    paddingVertical: "20%",
    paddingHorizontal: "8%",
  },
  errorText: {
    color: colors.purple,
    fontSize: lHorizontalScale(18),
    paddingHorizontal: "10%",
    textAlign: "center",
  },

  listContainer: {
    width: "90%",
    height: "90%",
    borderTopLeftRadius: Screen.screenWidth * 0.25,
    // overflow: "hidden",
    shadowColor: colors.black,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  titleContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: colors.purple,
    justifyContent: "flex-end",
  },
  contentContainer: {
    width: "100%",
    height: "90%",
    borderTopLeftRadius: Screen.screenWidth * 0.25,
    backgroundColor: colors.white,
  },
});
