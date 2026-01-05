import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { Icon as ElementIcon } from "react-native-elements";
import Animated, { StretchInY } from "react-native-reanimated";
import { colors, customFonts } from "../GlobalConsts";
import { horizontalScale, verticalScale } from "../utils/ScalingUtil";
import RatingComponent from "./RatingComponent";
import PortalPopup from "./PortalPopup";
import FavoritesScreen from "../screens/FavoritesScreen";
import { RootStackNavigationProp } from "../navigation/stacks/RootStack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useMovieStore } from "../store/movieStore";
import { MovieItemDataType } from "../types/DataTypes";

interface Props {
  title: string;
  genres: string;
  rating: number;
  style: Partial<ViewStyle>;
}

export default function BackHeader(props: Props) {
  const { navigate, goBack } = useNavigation<RootStackNavigationProp>();
  const { title, genres, rating, style } = props;
  const [isVisiblePopup, setIsVisiblePopup] = useState(false);

  const deleteFavMovie = useMovieStore((state) => state.removeMovie);

  const overSizedTitle = title?.length > 20;
  const titleTextSize = overSizedTitle ? 18 : 22;

  const onPressFav = () => {
    setIsVisiblePopup(true);
  };

  const onPressFavMov = (item: MovieItemDataType) => {
    navigate("Details", { data: item });
    setIsVisiblePopup(false);
  };

  const onDeleteFavMovie = (id: number) => {
    deleteFavMovie(id);
  };

  return (
    <>
      <View style={[styles.parentContainer, style]}>
        <TouchableOpacity
          onPress={() => goBack()}
          style={styles.backBtnContainer}
        >
          <ElementIcon
            name={"arrow-back"}
            size={30}
            color={colors.white}
            style={{}}
          />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Animated.Text
            entering={StretchInY.duration(500).mass(1).damping(30).delay(300)}
            style={[
              styles.titleText,
              { fontSize: horizontalScale(titleTextSize) },
            ]}
          >
            {title.toUpperCase()}
          </Animated.Text>
          <Animated.Text
            entering={StretchInY.duration(500).mass(1).damping(30).delay(300)}
            style={styles.genres}
          >
            {genres}
          </Animated.Text>
        </View>
        <TouchableOpacity
          onPress={onPressFav}
          style={styles.ratingComponentContainer}
        >
          <RatingComponent rating={rating} />
        </TouchableOpacity>
      </View>

      <PortalPopup
        visible={isVisiblePopup}
        onClose={() => setIsVisiblePopup(false)}
      >
        <MaterialCommunityIcons
          name="heart"
          size={verticalScale(25)}
          color={colors.antiqueBronze}
          style={styles.popupHeartIcon}
        />
        <FavoritesScreen onPress={onPressFavMov} onDelete={onDeleteFavMovie} />
        <TouchableOpacity
          style={styles.popupCloseButton}
          onPress={() => setIsVisiblePopup(false)}
        >
          <Ionicons
            name="close"
            size={horizontalScale(25)}
            color={colors.semiTransparentLight}
          />
        </TouchableOpacity>
      </PortalPopup>
    </>
  );
}

const styles = StyleSheet.create({
  parentContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.semiTransparentLight,
    position: "absolute",
    top: 0,
  },
  backBtnContainer: {
    height: "100%",
    width: "20%",
    justifyContent: "center",
  },
  titleContainer: {
    height: "100%",
    width: "60%",
    alignItems: "center",
    justifyContent: "center",
  },
  titleText: {
    width: "100%",
    color: colors.white,
    textAlign: "center",
    fontFamily: customFonts.bangers,
  },
  ratingComponentContainer: {
    width: "20%",
  },
  genres: {
    position: "absolute",
    bottom: "5%",
    color: colors.gray,
    fontSize: horizontalScale(11),
    textAlign: "center",
    fontFamily: customFonts.lato,
  },
  popupHeartIcon: {
    alignSelf: "center",
    marginBottom: verticalScale(5),
  },
  popupCloseButton: {
    alignSelf: "center",
    transform: [{ translateY: verticalScale(5) }],
    width: horizontalScale(100),
    paddingVertical: verticalScale(3),
    alignItems: "center",
    justifyContent: "center",
  },
});
