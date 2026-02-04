import { useNavigation } from "@react-navigation/native";
import { useMemo } from "react";
import {
  Image,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import Animated, { StretchInX } from "react-native-reanimated";
import { colors, customFonts, errorMovieTitle } from "../GlobalConsts";
import { verticalScale } from "../utils/ScalingUtil";
import { RootStackNavigationProp } from "../navigation/stacks/RootStack";
import { MovieItemDataType } from "../types/DataTypes";

interface MovieItem {
  item: MovieItemDataType;
  index: number;
}

export default function MovieListItem(props: MovieItem) {
  const { item, index } = props;
  const { title, poster_path, backdrop_path } = item;
  const { navigate } = useNavigation<RootStackNavigationProp>();

  const middleSpaceBetweenItems = index % 2 == 0 ? "4%" : 0;
  const imageUri = poster_path ?? backdrop_path ?? null;
  const isIOS = Platform.OS == "ios";

  const listItem = useMemo(() => {
    return (
      <Animated.View
        style={[
          styles.parentContainer,
          isIOS ? {} : styles.shadowStyle,
          { marginRight: middleSpaceBetweenItems },
        ]}
        entering={
          index <= 9
            ? StretchInX.duration(500)
                .springify()
                .mass(0.5)
                .damping(9)
                .delay((index + 1) * 80)
            : undefined
        }
      >
        <TouchableOpacity
          style={[{ width: "100%" }]}
          onPress={() => navigate("Details", { data: item })}
        >
          <ImageBackground
            source={require("../../assets/missing-poster.jpg")}
            style={styles.image}
          >
            <Image
              source={
                imageUri
                  ? {
                      uri: `https://image.tmdb.org/t/p/original${imageUri}`,
                    }
                  : require("../../assets/missing-poster.jpg")
              }
              style={styles.image}
            />
          </ImageBackground>
          <Text style={styles.title}>
            {title.length !== 0 ? title?.toUpperCase() : errorMovieTitle}
          </Text>
        </TouchableOpacity>
      </Animated.View>
    );
  }, [title, poster_path, backdrop_path]);

  return listItem;
}

const styles = StyleSheet.create({
  parentContainer: {
    backgroundColor: colors.black,
    flexDirection: "column",
    borderTopRightRadius: 60,
    borderBottomLeftRadius: 20,
    overflow: "hidden",
    marginBottom: verticalScale(20),
    width: "48%", // 48% + 48% + 4% = 100%
    // we need the 4% to add some margin between the 2 items per row
    borderColor: colors.lightGray,
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: verticalScale(170),
  },
  title: {
    marginVertical: 5,
    marginHorizontal: 10,
    fontSize: verticalScale(12),
    color: colors.lightGray,
    textAlign: "center",
    height: "auto",
    fontFamily: customFonts.anton,
  },
  indicator: {
    alignSelf: "center",
    position: "absolute",
    top: "40%",
  },
  shadowStyle: {
    shadowColor: colors.black,
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
  },
});
