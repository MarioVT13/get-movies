import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MoviesDataType } from "../types/DataTypes";
import { RootStackNavigationProp } from "../navigation/stacks/RootStack";
import { useNavigation } from "@react-navigation/native";
import { lHorizontalScale, lVerticalScale } from "../GlobalConsts";
import { useMemo } from "react";

interface MovieItem {
  item: MoviesDataType;
  index: number;
}

export default function MovieListItem(props: MovieItem) {
  const { item, index } = props;
  const { id, title, poster_path } = item;
  const { navigate } = useNavigation<RootStackNavigationProp>();

  const listItem = useMemo(() => {
    return (
      <TouchableOpacity
        style={[
          styles.parentContainer,
          { marginRight: index % 2 == 0 ? "4%" : 0 },
        ]}
        onPress={() => navigate("Details", { data: props.item })}
      >
        <Image
          source={{
            uri: `https://api.themoviedb.org/3/movie/${id}${poster_path}`,
          }}
          style={styles.placeHolder}
        />
        <Text style={styles.title}>{title ?? "Unknown title"}</Text>
      </TouchableOpacity>
    );
  }, [title, poster_path, id]);

  return listItem;
}

const styles = StyleSheet.create({
  parentContainer: {
    backgroundColor: "lightgreen",
    flexDirection: "column",
    marginBottom: lVerticalScale(20),
    width: "48%", // 48% + 48% + 4% = 100%
    // we need the 4% to add some margin between the 2 items per row
  },
  placeHolder: {
    // width: lHorizontalScale(120),
    width: "100%",
    height: lVerticalScale(170),
    backgroundColor: "lightblue",
  },
  title: {
    backgroundColor: "yellow",
    textAlign: "center",
  },
});
