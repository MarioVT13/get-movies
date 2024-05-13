import React, { useRef, useState } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import Screen, {
  lHorizontalScale,
  lVerticalScale,
  plusBtnAlertMessage,
  colors,
} from "../GlobalConsts";
import Icon from "react-native-vector-icons/Feather";
import { RootStackNavigationProp } from "../navigation/stacks/RootStack";
import usePopularMovies from "../hooks/usePopularMovies";
import { FlatList } from "react-native-gesture-handler";

export default function MainScreen() {
  const { movies, isLoading, error } = usePopularMovies();
  const { navigate } = useNavigation<RootStackNavigationProp>();

  const isIOS = Platform.OS == "ios";
  const parentAnim = useRef<any>(null);
  const tasksAnim = useRef<any>(null);

  // useFocusEffect(
  //   React.useCallback(() => {
  //     parentAnim?.current && parentAnim?.current?.fadeInUpBig(400);
  //     tasksAnim?.current && tasksAnim?.current?.fadeInUpBig(900);
  //   }, [])
  // );

  // return (
  //   <View style={styles.parentContainer}>
  //     {/* <View style={[styles.listContainer, shadowViewStyle]}></View> */}
  //     <TouchableOpacity
  //       // onPress={() => navigate("Details", { data: {} })}
  //       onPress={() => navigate("Details", { data: {} })}
  //       style={{ width: 50, height: 50, backgroundColor: "red" }}
  //     >
  //       <Icon
  //         name={"chevron-right"}
  //         size={30}
  //         color={colors.blue}
  //         style={{ opacity: 0.5 }}
  //       />
  //     </TouchableOpacity>
  //   </View>
  // );

  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  if (error || movies?.length == 0) {
    // if (true) {
    return <Text>Error: {error ?? "No movies to show"}</Text>;
  }

  return (
    <View style={styles.parentContainer}>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigate("Details", { data: {} })}>
            <Text>{item?.title ?? "error *"}</Text>
          </TouchableOpacity> // Displaying the title of each movie
        )}
        initialNumToRender={20}
        showsVerticalScrollIndicator={false}
        style={{}}
        contentContainerStyle={{
          width: "100%",
          // height: "80%",
          paddingTop: "10%",
          paddingBottom: "20%",
          paddingHorizontal: "8%",
          backgroundColor: "orange",
        }}
      />
    </View>
  );

  function btnAlert() {
    isIOS
      ? Alert.alert(plusBtnAlertMessage)
      : Alert.alert("", plusBtnAlertMessage);
  }
}

const shadowViewStyle: ViewStyle = {
  width: "100%",
  height: "100%",
  elevation: 0,
  alignItems: "flex-end",
  justifyContent: "flex-end",
  borderTopLeftRadius: 0,
};

const styles = StyleSheet.create({
  parentContainer: {
    flex: 1,
    backgroundColor: colors.lightYellow,
    paddingTop: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
  listContainer: {
    width: "90%",
    height: "90%",
    borderTopLeftRadius: Screen.screenWidth * 0.25,
    overflow: "hidden",
    shadowColor: colors.black,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  titleContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: colors.purple,
    justifyContent: "flex-end",
  },
  titleTextContainer: {
    flexDirection: "row",
    width: "100%",
    height: "10%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  plusBtnContainer: {
    height: "100%",
    width: "20%",
    marginLeft: "18%",
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    color: colors.white,
    fontSize: lHorizontalScale(18),
  },
  contentContainer: {
    width: "100%",
    height: "90%",
    borderTopLeftRadius: Screen.screenWidth * 0.25,
    backgroundColor: colors.white,
  },
});
