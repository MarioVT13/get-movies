import React from "react";
import {
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  FlatList,
} from "react-native";
import MovieListItem from "../components/MovieListItem";
import usePopularMovies from "../hooks/usePopularMovies";
import { MovieItemDataType } from "../types/DataTypes";
import {
  colors,
  errorFindingMovies,
  errorLoadingMovieList,
} from "../GlobalConsts";

export default function HomeScreen() {
  const { movies, isLoading, error, refreshMovies } = usePopularMovies();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    refreshMovies()
      .then(() => {
        setRefreshing(false); // Reset refreshing state once data is fetched
      })
      .catch(() => {
        setRefreshing(false); // Ensure to reset refreshing even if there's an error
      });
  }, [refreshMovies]);

  if (isLoading && !refreshing) {
    // Show ActivityIndicator only on initial load, not on refresh
    return (
      <View style={styles.parentContainer}>
        <ActivityIndicator color={colors.rust} size="large" />
      </View>
    );
  }

  if (error || movies?.length === 0) {
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
        keyExtractor={(item: MovieItemDataType) => item.id.toString()}
        renderItem={({ item, index }) => (
          <MovieListItem item={item} index={index} />
        )}
        initialNumToRender={10}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        contentContainerStyle={styles.flatListContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.rust} // custom color for the refresh indicator
          />
        }
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
    fontSize: 16,
    paddingHorizontal: "10%",
    textAlign: "center",
  },
});
