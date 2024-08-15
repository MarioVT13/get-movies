import React, { useEffect, useState } from "react";
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

interface FloatingSearchBarProps {
  onResults: (movies: MovieItemDataType[]) => void;
}

const FloatingSearchBar: React.FC<FloatingSearchBarProps> = ({ onResults }) => {
  const [query, setQuery] = useState("");
  const { movies, searchMovieByTitle, error, loading } = useMovieSearch();

  useEffect(() => {
    onResults(movies);
  }, [movies]);

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

  return (
    <View style={styles.searchBar}>
      <>
        <TextInput
          style={styles.inputField}
          value={query}
          onChangeText={setQuery}
          autoCorrect={false}
        />
        {loading && (
          <ActivityIndicator
            style={styles.indicator}
            color={colors.lightGray}
            size="small"
          />
        )}
      </>
      <TouchableOpacity style={styles.searchButtonContainer}>
        <Text style={styles.searchButton} onPress={() => handleSearch()}>
          Search
        </Text>
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
    paddingHorizontal: 5,
  },
  searchButton: {
    fontSize: horizontalScale(16),
    color: colors.lightGray,
    fontFamily: customFonts.lato,
  },
  clearButton: {
    paddingHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  indicator: {
    position: "absolute",
    alignSelf: "center",
    left: "55%",
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
