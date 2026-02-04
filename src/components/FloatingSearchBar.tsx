import React, { useCallback, useEffect, useState, useMemo } from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  FadeIn,
  FadeOut,
} from "react-native-reanimated";
import Icon from "react-native-vector-icons/Ionicons";
import { colors, customFonts } from "../GlobalConsts";
import { useMovieSearch } from "../hooks/useMovieSearch";
import { MovieItemDataType } from "../types/DataTypes";
import { horizontalScale, verticalScale } from "../utils/ScalingUtil";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import PortalPopup from "./PortalPopup";
import FavoritesScreen from "../screens/FavoritesScreen";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "../navigation/stacks/RootStack";
import { useMovieStore } from "../store/movieStore";

interface FloatingSearchBarProps {
  onResults: (movies: MovieItemDataType[]) => void;
  onTabChange?: (tab: string) => void;
}

const FloatingSearchBar: React.FC<FloatingSearchBarProps> = ({
  onResults,
  onTabChange,
}) => {
  const [query, setQuery] = useState("");
  const { movies, searchMovieByTitle, error, loading } = useMovieSearch();
  const [nothingFound, setNothingFound] = useState<boolean>(false);
  const bounceValue = useSharedValue(0);

  const [isVisiblePopup, setIsVisiblePopup] = useState(false);
  const [showTabs, setShowTabs] = useState(true);
  const tabs = ["MOVIES", "TV"];
  const [selectedTab, setSelectedTab] = useState<string>(tabs[0]);

  const { navigate } = useNavigation<RootStackNavigationProp>();
  const deleteFavMovie = useMovieStore((state) => state.removeMovie);

  const onPressFavBtn = () => {
    setIsVisiblePopup(true);
  };

  const onSelectFavMov = (item: MovieItemDataType) => {
    navigate("Details", { data: item });
    setIsVisiblePopup(false);
  };

  const onDeleteFavMovie = (id: number) => {
    deleteFavMovie(id);
  };

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
    if (!query.length) {
      onResults([]);
      setShowTabs(true);
    }
  }, [query]);

  const clearText = () => {
    setQuery("");
    onResults([]); // on clear text, clear search results too
    setShowTabs(true);
  };

  const handleSearch = async () => {
    // do not initiate a search on an empty string, as it triggers the loader needlessly
    if (query.length) {
      await searchMovieByTitle(query);
      setShowTabs(false);
    }
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

  useEffect(() => {
    if (onTabChange) {
      onTabChange(selectedTab);
    }
  }, [selectedTab]);

  const TabButtons = useMemo(() => {
    return tabs.map((tab) => (
      <TouchableOpacity
        key={tab}
        onPress={() => {
          setSelectedTab(tab);
        }}
        style={styles.tabButton}
      >
        <Text
          style={[styles.tabText, selectedTab === tab && styles.tabSelected]}
        >
          {tab}
        </Text>
      </TouchableOpacity>
    ));
  }, [selectedTab]);

  return (
    <View style={styles.parentContainer}>
      <TouchableOpacity
        style={styles.heartIconContainer}
        onPress={onPressFavBtn}
      >
        <MaterialCommunityIcons
          name="heart-outline"
          size={verticalScale(22)}
          color={colors.lightGray}
          style={styles.heartIcon}
        />
      </TouchableOpacity>

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

      {showTabs && (
        <Animated.View
          style={styles.tabsContainer}
          entering={FadeIn.duration(800)}
          exiting={FadeOut.duration(500)}
        >
          {TabButtons}
        </Animated.View>
      )}

      <PortalPopup
        visible={isVisiblePopup}
        onClose={() => setIsVisiblePopup(false)}
        contentStyle={styles.portalPopupContainer}
      >
        <MaterialCommunityIcons
          name="heart"
          size={verticalScale(25)}
          color={colors.antiqueBronze}
          style={styles.popupHeartIcon}
        />
        <FavoritesScreen onPress={onSelectFavMov} onDelete={onDeleteFavMovie} />
        <TouchableOpacity
          style={styles.popupCloseButton}
          onPress={() => setIsVisiblePopup(false)}
        >
          <Icon
            name="close"
            size={horizontalScale(25)}
            color={colors.semiTransparentLight}
          />
        </TouchableOpacity>
      </PortalPopup>
    </View>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    position: "absolute",
    width: "85%",
    height: verticalScale(38),
    top: verticalScale(55),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heartIconContainer: {
    alignSelf: "center",
    backgroundColor: colors.semiTransparentDark,
    borderRadius: 30,
    padding: 10,
  },
  heartIcon: {
    alignItems: "center",
    justifyContent: "center",
  },
  searchBar: {
    flexDirection: "row",
    width: "84%",
    height: "100%",
    backgroundColor: colors.semiTransparentDark,
    borderRadius: 25,
    padding: 10,
  },
  inputField: {
    flex: 1,
    borderColor: colors.lightGray,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
    color: colors.lightGray,
    fontSize: horizontalScale(14),
    fontFamily: customFonts.lato,
    paddingLeft: 10,
  },
  searchButtonContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 5,
    width: "25%",
  },
  searchButton: {
    fontSize: horizontalScale(15),
    fontFamily: customFonts.lato,
    flexShrink: 1,
    textAlign: "center",
  },
  clearButton: {
    paddingHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  tabsContainer: {
    width: "100%",
    paddingHorizontal: horizontalScale(50),
    position: "absolute",
    flexDirection: "row",
    top: verticalScale(45),
    justifyContent: "space-around",
    alignItems: "center",
  },
  tabText: {
    fontSize: horizontalScale(14),
    fontFamily: customFonts.lato,
    color: colors.copper,
  },
  tabButton: {
    padding: verticalScale(5),
    borderRadius: 20,
  },
  tabSelected: {
    color: colors.antiqueBronze,
    textDecorationLine: "underline",
    textDecorationColor: colors.copper,
    textDecorationStyle: "dotted",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: horizontalScale(12),
    textShadowColor: colors.antiqueBronze,
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
  popupHeartIcon: {
    alignSelf: "center",
    marginBottom: verticalScale(10),
  },
  popupCloseButton: {
    alignSelf: "center",
    transform: [{ translateY: verticalScale(5) }],
    width: horizontalScale(100),
    paddingVertical: verticalScale(3),
    alignItems: "center",
    justifyContent: "center",
  },
  portalPopupContainer: {
    borderRadius: horizontalScale(10),
    borderWidth: 0.5,
    borderColor: colors.red,
    backgroundColor: colors.rust,
    padding: horizontalScale(10),
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
});

export default FloatingSearchBar;
