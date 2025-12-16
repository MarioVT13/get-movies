import React, { useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  cancelAnimation,
  Easing,
} from "react-native-reanimated";
import { MovieItemDataType } from "../types/DataTypes";
import { colors, customFonts, errorMovieTitle } from "../GlobalConsts";
import { verticalScale, horizontalScale } from "../utils/ScalingUtil";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

interface FavoriteMovieItemProps {
  item: MovieItemDataType;
  onPress: (item: MovieItemDataType) => void;
  onLongPress: () => void;
  showDeleteOption: boolean;
  index: number;
  onDelete: (id: number) => void;
}

export default function FavoriteMovieItem({
  item,
  onPress,
  onLongPress,
  showDeleteOption,
  index,
  onDelete,
}: FavoriteMovieItemProps) {
  const { title, poster_path, backdrop_path } = item;
  const imageUri = poster_path ?? backdrop_path ?? null;

  const shakeOffset = useSharedValue(0);

  // Define the animated style for shaking
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: shakeOffset.value }],
    };
  });

  useEffect(() => {
    if (showDeleteOption) {
      const direction = index % 2 === 0 ? 1 : -1; // Determine direction based on index
      // Start gentle shivering animation when delete option is visible
      shakeOffset.value = withRepeat(
        withTiming(horizontalScale(1.2) * direction, {
          duration: 100,
          easing: Easing.inOut(Easing.ease),
        }),
        -1, // Loop indefinitely
        true // Reverse animation direction on each repeat
      );
    } else {
      // Stop animation and reset position when delete option is hidden
      cancelAnimation(shakeOffset);
      shakeOffset.value = withTiming(0, { duration: 100 });
    }
  }, [showDeleteOption, shakeOffset, index]); // Add index to dependencies

  return (
    <Animated.View style={[styles.itemContainer, animatedStyle]}>
      <TouchableOpacity
        onPress={() => !showDeleteOption && onPress(item)}
        onLongPress={onLongPress}
        activeOpacity={0.7}
        style={styles.touchableWrapper} // Ensure touchable area covers the whole card
      >
        <View style={styles.imageContainer}>
          <Image
            source={
              imageUri
                ? { uri: `https://image.tmdb.org/t/p/w500${imageUri}` }
                : require("../../assets/missing-poster.jpg")
            }
            style={[styles.image, { opacity: showDeleteOption ? 0.6 : 1 }]}
            resizeMode="cover"
          />
        </View>
        <Text style={styles.title} numberOfLines={2}>
          {title.length !== 0 ? title?.toUpperCase() : errorMovieTitle}
        </Text>

        {showDeleteOption && (
          <TouchableOpacity
            onPress={() => onDelete(item?.id)}
            style={styles.deleteIconOverlay}
          >
            <MaterialCommunityIcons
              name="delete-outline"
              size={horizontalScale(24)}
              color={colors.red}
            />
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    width: "30%",
    backgroundColor: colors.black,
    borderTopRightRadius: 30,
    borderBottomLeftRadius: 10,
    overflow: "hidden",
    marginBottom: verticalScale(15),
    borderColor: colors.lightGray,
    borderWidth: 0.5,
    position: "relative",
    shadowColor: colors.black,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
  },
  touchableWrapper: {
    flex: 1, // Ensure TouchableOpacity takes full space within Animated.View
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
  deleteIconOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: verticalScale(30),
    backgroundColor: "rgba(0,0,0,0.7)",
    borderBottomLeftRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
