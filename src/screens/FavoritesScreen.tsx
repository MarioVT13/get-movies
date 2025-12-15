import React, { useState } from "react";
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useMovieStore } from "../store/movieStore";
import { MovieItemDataType } from "../types/DataTypes";
import { colors, customFonts } from "../GlobalConsts";
import { verticalScale, horizontalScale } from "../utils/ScalingUtil";
import FavoriteMovieItem from "../components/FavoriteMovieItem"; // Import the new component

export default function FavoritesScreen({
  onPress,
}: {
  onPress: (item: MovieItemDataType) => void;
}) {
  const favMovies = useMovieStore((state) => state.favMovies);
  const [showDeleteOption, setShowDeleteOption] = useState(false); // New state for delete option visibility

  const toggleDeleteOption = () => {
    setShowDeleteOption((prev) => !prev);
  };

  const renderFavItem = ({
    item,
    index,
  }: {
    item: MovieItemDataType;
    index: number;
  }) => {
    // Destructure index from FlatList renderItem prop
    // Render the new FavoriteMovieItem component
    return (
      <FavoriteMovieItem
        item={item}
        onPress={onPress}
        onLongPress={toggleDeleteOption}
        showDeleteOption={showDeleteOption}
        index={index} // Pass index to the FavoriteMovieItem
      />
    );
  };

  return (
    <ImageBackground
      source={require("../../assets/get-movies-bg-red.png")}
      style={styles.parentContainer}
    >
      <FlatList
        data={favMovies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderFavItem}
        numColumns={3}
        contentContainerStyle={styles.flatListContent}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No favorites yet!</Text>
          </View>
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
  flatListContent: {
    paddingVertical: verticalScale(20),
    paddingHorizontal: horizontalScale(5),
  },
  columnWrapper: {
    justifyContent: "space-around",
    gap: 5,
  },
  emptyContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  emptyText: {
    color: colors.lightGray,
    fontFamily: customFonts.lato,
    fontSize: horizontalScale(16),
  },
});
