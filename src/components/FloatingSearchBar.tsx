import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { colors, customFonts } from "../GlobalConsts";
import { useMovieSearch } from "../hooks/useMovieSearch";
import { MovieItemDataType } from "../types/DataTypes";
import { horizontalScale } from "../utils/ScalingUtil";
import Icon from "react-native-vector-icons/Ionicons";
import Animated, {
  BounceIn,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

interface FloatingSearchBarProps {
  onResults: (movies: MovieItemDataType[]) => void;
}

const FloatingSearchBar: React.FC<FloatingSearchBarProps> = ({ onResults }) => {
  const [query, setQuery] = useState("");
  const { movies, searchMovieByTitle, error, loading } = useMovieSearch();
  const [nothingFound, setNothingFound] = useState<boolean>(false);
  const bounceValue = useSharedValue(0);

  useEffect(() => {
    onResults(movies);
    if (query.length) setNothingFound(movies.length == 0);
  }, [movies]);

  useEffect(() => {
    if (nothingFound) {
      bounceValue.value = 1;
      setTimeout(() => {
        setNothingFound(false);
        bounceValue.value = 0;
      }, 1.2 * 1000);
    }
  }, [nothingFound]);

  useEffect(() => {
    // if user clears the text manually, clear the search res as well
    if (!query.length) onResults([]);
  }, [query]);

  const clearText = () => {
    setQuery("");
    onResults([]); // on clear text, clear search results too
  };

  const handleSearch = async () => {
    // do not initiate a search on an empty string, as it triggers the loader needlessly
    if (query.length) await searchMovieByTitle(query);
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withSpring(bounceValue.value ? 1.2 : 1, {
            stiffness: 120, // Lower stiffness for a more elastic effect
            damping: 1, // Lower damping for more bounce
            mass: 0.3, // Adjust mass for bouncier motion
            restSpeedThreshold: 0.01,
          }),
        },
      ],
    };
  });

  const bounceAnim = nothingFound ? animatedStyle : {};

  const searchButtonText = useCallback(() => {
    return nothingFound ? "Failed" : "Search";
  }, [nothingFound]);

  const searchButtonColor = useCallback(() => {
    return nothingFound ? colors.red : colors.lightGray;
  }, [nothingFound]);

  return (
    <View style={styles.searchBar}>
      <TextInput
        style={styles.inputField}
        value={query}
        onChangeText={setQuery}
        autoCorrect={false}
      />
      <TouchableOpacity
        onPress={() => handleSearch()}
        style={styles.searchButtonContainer}
        disabled={nothingFound || loading}
      >
        {loading ? (
          <ActivityIndicator color={colors.lightGray} size="small" />
        ) : (
          <Animated.Text
            style={[
              styles.searchButton,
              bounceAnim,
              { color: searchButtonColor() },
            ]}
            numberOfLines={1}
            ellipsizeMode="clip"
          >
            {searchButtonText()}
          </Animated.Text>
        )}
      </TouchableOpacity>

      {query.length > 0 && (
        <TouchableOpacity onPress={clearText} style={styles.clearButton}>
          <Icon
            name={"close-circle"}
            size={horizontalScale(20)}
            color={colors.gray}
          />
        </TouchableOpacity>
      )}

      {error && <Text style={styles.error}>Error</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    position: "absolute",
    width: "85%",
    top: 50,
    marginTop: "5%",
    flexDirection: "row",
    backgroundColor: colors.semiTransparentDark,
    borderRadius: 25,
    padding: 10,
  },
  inputField: {
    flex: 1,
    height: 40,
    borderColor: colors.lightGray,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
    color: colors.lightGray,
    fontSize: horizontalScale(16),
    fontFamily: customFonts.lato,
    paddingLeft: 10,
  },
  searchButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
    width: "22%",
  },
  searchButton: {
    fontSize: horizontalScale(16),
    fontFamily: customFonts.lato,
    flexShrink: 1,
    textAlign: "center",
  },
  clearButton: {
    paddingHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  shadowStyle: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  error: {
    color: "red",
  },
});

export default FloatingSearchBar;
