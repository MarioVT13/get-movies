import React, { useRef, useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Screen, {
  lHorizontalScale,
  lVerticalScale,
  colors,
  errorLoadingMovieList,
} from "../GlobalConsts";
import Icon from "react-native-vector-icons/Feather";
import { RootStackNavigationProp } from "../navigation/stacks/RootStack";
import usePopularMovies from "../hooks/usePopularMovies";
import { FlatList } from "react-native-gesture-handler";
import { MoviesDataType } from "../types/DataTypes";
import MovieListItem from "../components/MovieListItem";

export default function HomeScreen() {
  const { movies, isLoading, error } = usePopularMovies();
  const { navigate } = useNavigation<RootStackNavigationProp>();

  const isIOS = Platform.OS == "ios";
  const parentAnim = useRef<any>(null);
  const tasksAnim = useRef<any>(null);

  //       <Icon
  //         name={"chevron-right"}
  //         size={30}
  //         color={colors.blue}
  //         style={{ opacity: 0.5 }}
  //       />

  if (isLoading) {
    return (
      <View style={styles.parentContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error || movies?.length == 0) {
    return (
      <View style={styles.parentContainer}>
        <Text style={styles.errorText}>{errorLoadingMovieList}:</Text>
        <Text style={styles.errorText}>{error ?? "No movies to show"}</Text>
      </View>
    );
  }

  return (
    <View style={styles.parentContainer}>
      <FlatList
        data={movies}
        keyExtractor={(item: MoviesDataType) => item.id.toString()}
        renderItem={({ item, index }) => {
          return <MovieListItem item={item} index={index} />;
        }}
        initialNumToRender={10}
        showsVerticalScrollIndicator={false}
        numColumns={2} // this sets 2 items per row
        style={{ backgroundColor: "pink" }}
        contentContainerStyle={styles.flatListContainer}
      />
    </View>
  );
}

const shadowViewStyle: ViewStyle = {
  width: "100%",
  height: "100%",
  elevation: 0,
  alignItems: "flex-end",
  justifyContent: "flex-end",
  borderTopLeftRadius: 0,
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: colors.lightYellow,
    justifyContent: "center",
  },
  flatListContainer: {
    width: "100%",
    paddingVertical: "10%",
    paddingHorizontal: "8%",
    backgroundColor: "orange",
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
    overflow: "hidden",
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
