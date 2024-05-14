import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MoviesDataType } from "../types/DataTypes";
import { RootStackNavigationProp } from "../navigation/stacks/RootStack";
import { useNavigation } from "@react-navigation/native";
import { colors, lHorizontalScale, lVerticalScale } from "../GlobalConsts";
import { useMemo } from "react";

interface MovieItem {
  item: MoviesDataType;
  index: number;
}

export default function MovieListItem(props: MovieItem) {
  const { item, index } = props;
  const { title, poster_path, backdrop_path } = item;
  const { navigate } = useNavigation<RootStackNavigationProp>();
  const imageUri =
    typeof poster_path === "string" && poster_path.length > 0
      ? poster_path
      : backdrop_path === "string" && backdrop_path.length > 0
      ? backdrop_path
      : null;
  const isIOS = Platform.OS == "ios";

  const listItem = useMemo(() => {
    return (
      <TouchableOpacity
        style={[
          styles.parentContainer,
          isIOS ? {} : styles.shadowStyle,
          { marginRight: index % 2 == 0 ? "4%" : 0 },
        ]}
        onPress={() => navigate("Details", { data: item })}
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
        <Text style={styles.title}>{title ?? "Unknown title"}</Text>
      </TouchableOpacity>
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
    marginBottom: lVerticalScale(20),
    width: "48%", // 48% + 48% + 4% = 100%
    // we need the 4% to add some margin between the 2 items per row
    borderColor: colors.lightGray,
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: lVerticalScale(170),
    backgroundColor: colors.yellow,
  },
  title: {
    marginVertical: 5,
    marginHorizontal: 10,
    fontSize: lVerticalScale(12),
    color: colors.lightGray,
    backgroundColor: colors.black,
    textAlign: "center",
    height: "auto",
  },
  shadowStyle: {
    shadowColor: colors.black,
    shadowOffset: { width: 2, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 4,
  },
});
