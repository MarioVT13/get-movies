import React, { useState, useCallback, useMemo, useRef } from "react";
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
import FloatingSearchBar from "../components/FloatingSearchBar";

export default function HomeScreen() {
  const { movies, isLoading, error, refreshMovies } = usePopularMovies();
  const [refreshing, setRefreshing] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState<MovieItemDataType[]>([]);
  const flatListRef = useRef<FlatList>(null);

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

  const resetScrollPos = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: 0, animated: true });
    }
  };

  const handleSearchResults = (results: MovieItemDataType[]) => {
    setFilteredMovies(results);
    resetScrollPos();
  };

  const renderItem = useCallback(
    ({ item, index }: { item: MovieItemDataType; index: number }) => (
      <MovieListItem item={item} index={index} />
    ),
    []
  );

  const renderFooter = useCallback(() => {
    if (!isLoading || filteredMovies?.length > 0) return null;
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

  const moviesData = useMemo(() => {
    return filteredMovies.length > 0 ? filteredMovies : movies;
  }, [filteredMovies, movies]);

  return (
    <ImageBackground
      source={require("../../assets/get-movies-bg.jpg")}
      style={styles.parentContainer}
    >
      <FlatList
        ref={flatListRef}
        data={moviesData}
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
      <FloatingSearchBar onResults={handleSearchResults} />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  flatListContainer: {
    marginTop: "20%",
    // ============================
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
