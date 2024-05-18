import React, { useState, useCallback, useMemo } from "react";
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
import { colors, errorLoadingMovieList } from "../GlobalConsts";

export default function HomeScreen() {
  const { movies, isLoading, error, refreshMovies } = usePopularMovies();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    refreshMovies()
      .then(() => {
        setRefreshing(false);
      })
      .catch(() => {
        setRefreshing(false);
      });
  }, [refreshMovies]);

  const renderItem = useCallback(
    ({ item, index }: { item: MovieItemDataType; index: number }) => (
      <MovieListItem item={item} index={index} />
    ),
    []
  );

  const renderFooter = useCallback(() => {
    if (!isLoading) return null;
    return <ActivityIndicator color={colors.rust} size="large" />;
  }, [isLoading]);

  const errorMessage = useMemo(() => {
    return (
      <View style={styles.parentContainer}>
        <Text style={styles.errorText}>{errorLoadingMovieList}:</Text>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }, [error]);

  if (error) return errorMessage;

  return (
    <ImageBackground
      source={require("../../assets/get-movies-bg.jpg")}
      style={styles.parentContainer}
    >
      <FlatList
        data={movies}
        keyExtractor={(item: MovieItemDataType, index: number) =>
          `${item.id}_${index}`
        }
        renderItem={({ item, index }) => renderItem({ item, index })}
        initialNumToRender={10}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        contentContainerStyle={styles.flatListContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.rust}
          />
        }
        onEndReached={refreshMovies}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
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
