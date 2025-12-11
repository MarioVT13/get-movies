import React from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useMovieStore } from "../store/movieStore";
import { MovieItemDataType } from "../types/DataTypes";
import { colors, customFonts, errorMovieTitle } from "../GlobalConsts";
import { verticalScale, horizontalScale } from "../utils/ScalingUtil";

export default function FavoritesScreen({
  onPress,
}: {
  onPress: (item: MovieItemDataType) => void;
}) {
  const favMovies = useMovieStore((state) => state.favMovies);

  const renderFavItem = ({ item }: { item: MovieItemDataType }) => {
    const { title, poster_path, backdrop_path } = item;
    const imageUri = poster_path ?? backdrop_path ?? null;

    return (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => onPress(item)}
        activeOpacity={0.7}
      >
        <View style={styles.imageContainer}>
          <Image
            source={
              imageUri
                ? { uri: `https://image.tmdb.org/t/p/w500${imageUri}` }
                : require("../../assets/missing-poster.jpg")
            }
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <Text style={styles.title} numberOfLines={2}>
          {title.length !== 0 ? title?.toUpperCase() : errorMovieTitle}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground
      source={require("../../assets/get-movies-bg-red.jpg")}
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
  itemContainer: {
    width: "30%",
    backgroundColor: colors.black,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 10,
    overflow: "hidden",
    marginBottom: verticalScale(15),
    borderColor: colors.lightGray,
    borderWidth: 0.5,
    // Shadows
    shadowColor: colors.black,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
  },
  imageContainer: {
    width: "100%",
    height: verticalScale(90),
    backgroundColor: colors.semiTransparentDark,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    marginVertical: 4,
    marginHorizontal: 4,
    fontSize: verticalScale(9),
    color: colors.lightGray,
    textAlign: "center",
    fontFamily: customFonts.anton,
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
