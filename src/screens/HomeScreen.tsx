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
import usePopularTV from "../hooks/usePopularTV";
import { MovieItemDataType } from "../types/DataTypes";
import { colors, errorLoadingMovieList } from "../GlobalConsts";
import FloatingSearchBar from "../components/FloatingSearchBar";
import Icon from "react-native-vector-icons/Ionicons";
import { horizontalScale } from "../utils/ScalingUtil";

export default function HomeScreen() {
  // 1. Load BOTH hooks
  const {
    movies,
    isLoading: isLoadingMovies,
    error: errorMovies,
    loadMore: loadMoreMovies,
    refresh: refreshMovies,
  } = usePopularMovies();

  const {
    tvShows,
    isLoading: isLoadingTV,
    error: errorTV,
    loadMore: loadMoreTV,
    refresh: refreshTV,
  } = usePopularTV();

  const [refreshing, setRefreshing] = useState(false);
  const [filteredMovies, setFilteredMovies] = useState<MovieItemDataType[]>([]);

  // 2. Track Active Tab ("MOVIES" or "TV")
  const [activeTab, setActiveTab] = useState("MOVIES");

  const flatListRef = useRef<FlatList>(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const [showScrollButton, setShowScrollButton] = useState(false);

  // 3. Dynamic Helpers based on Tab
  const isMoviesTab = activeTab === "MOVIES";
  const currentError = isMoviesTab ? errorMovies : errorTV;
  const currentLoading = isMoviesTab ? isLoadingMovies : isLoadingTV;

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    const refreshAction = isMoviesTab ? refreshMovies : refreshTV;

    refreshAction()
      .then(() => setRefreshing(false))
      .catch(() => setRefreshing(false));
  }, [refreshMovies, refreshTV, isMoviesTab]);

  const loadMoreData = () => {
    if (isMoviesTab) {
      loadMoreMovies();
    } else {
      loadMoreTV();
    }
  };

  const resetScrollPos = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({ offset: 0, animated: true });
    }
  };

  const handleSearchResults = (results: MovieItemDataType[]) => {
    setFilteredMovies(results);
    resetScrollPos();
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    resetScrollPos();
  };

  const renderItem = useCallback(
    ({ item, index }: { item: MovieItemDataType; index: number }) => (
      <MovieListItem item={item} index={index} />
    ),
    [],
  );

  const renderFooter = useCallback(() => {
    // Only show loader if we are fetching more pages
    if (!currentLoading || filteredMovies?.length > 0) return null;
    return <ActivityIndicator color={colors.rust} size="large" />;
  }, [currentLoading, filteredMovies]);

  const errorMessage = useMemo(() => {
    return (
      <View style={styles.parentContainer}>
        <Text style={styles.errorText}>{errorLoadingMovieList}!</Text>
        {currentError && <Text style={styles.errorText}>{currentError}</Text>}
      </View>
    );
  }, [currentError]);

  if (currentError) return errorMessage;

  // 4. Determine Data Source
  const displayedData = useMemo(() => {
    // If we have search results, they take priority
    if (filteredMovies.length > 0) return filteredMovies;

    return isMoviesTab ? movies : tvShows;
  }, [filteredMovies, movies, tvShows, isMoviesTab]);

  const handleScroll = useCallback(
    Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
      listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        setShowScrollButton(offsetY > 100);
      },
      useNativeDriver: false, // The native drivers don't support scroll animations
    }),
    [],
  );

  return (
    <ImageBackground
      source={require("../../assets/get-movies-bg.jpg")}
      style={styles.parentContainer}
    >
      <FlatList
        ref={flatListRef}
        data={displayedData}
        keyExtractor={(item: MovieItemDataType, index: number) =>
          `${item.id}_${item.media_type}_${index}`
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
        onEndReached={loadMoreData}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />

      <FloatingSearchBar
        onResults={handleSearchResults}
        onTabChange={handleTabChange}
        hideTabs={showScrollButton || !!filteredMovies?.length}
      />

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
    minWidth: "100%",
    paddingVertical: "25%",
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
