import React, { useState, useCallback, useMemo, useRef } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  FlatList,
  TouchableOpacity,
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from "react-native";
import MovieListItem from "../components/MovieListItem";
import usePopularMovies from "../hooks/usePopularMovies";
import { MovieItemDataType } from "../types/DataTypes";
import { colors, errorLoadingMovieList } from "../GlobalConsts";
import FloatingSearchBar from "../components/FloatingSearchBar";
import Icon from "react-native-vector-icons/Ionicons";
import { horizontalScale } from "../utils/ScalingUtil";

export default function HomeScreen() {
  const { movies, isLoading, error, refreshMovies } = usePopularMovies();
  const [refreshing, setRefreshing] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState<MovieItemDataType[]>([]);

  const flatListRef = useRef<FlatList>(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [showScrollButton, setShowScrollButton] = useState(false);

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

  const handleScroll = useCallback(
    Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
      listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        setShowScrollButton(offsetY > 250);
      },
      useNativeDriver: false, // The native drivers don't support scroll animations
    }),
    []
  );

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
        onScroll={handleScroll}
        onEndReached={refreshMovies}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
      <FloatingSearchBar onResults={handleSearchResults} />
      {showScrollButton && (
        <TouchableOpacity
          onPress={() => resetScrollPos()}
          style={styles.scrollToTopButton}
        >
          <Icon
            name={"arrow-up-circle"}
            size={horizontalScale(30)}
            color={colors.gray}
          />
        </TouchableOpacity>
      )}
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
    minWidth: "100%", // minWidth is needed here to avoid a bug when there is only 1 item in the list
    paddingVertical: "20%",
    paddingHorizontal: "8%",
  },
  errorText: {
    color: colors.purple,
    fontSize: 16,
    paddingHorizontal: "10%",
    textAlign: "center",
  },
  scrollToTopButton: {
    width: horizontalScale(40),
    height: horizontalScale(40),
    backgroundColor: colors.semiTransparentDark,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    alignSelf: "center",
    bottom: "5%",
    borderRadius: horizontalScale(20),
    borderWidth: 1,
    borderColor: colors.lightGray,
    opacity: 0.8,
  },
});
