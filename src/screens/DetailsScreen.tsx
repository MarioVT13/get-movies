import { useRoute } from "@react-navigation/native";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import {
  Alert,
  Animated,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import BackHeader from "../components/BackHeader";
import Screen, { lHorizontalScale, colors } from "../GlobalConsts";

export default function DetailsScreen() {
  const navParams: Partial<object> | any = useRoute().params;
  const { title, is_urgent, description, created_at, id } = navParams?.data;

  const dateTime = dayjs(created_at).format("MMM-DD HH:mm");
  const dateTimeDetailed = dayjs(created_at).format("YYYY MMMM-DD (HH:mm)");
  const isIOS = Platform.OS == "ios";
  const animation = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: isIOS ? 200 : 800,
      useNativeDriver: false,
    }).start();
  }, []);

  const colorInterpolation = animation.interpolate({
    inputRange: [0, 1],
    // Converted hex colors to rgb, because of interpolate requirment
    outputRange: ["rgb(255, 255, 224)", "rgb(255, 217, 146)"],
  });
  const animatedStyle = {
    backgroundColor: colorInterpolation,
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.contentContainer}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={{
            paddingHorizontal: "10%",
            paddingVertical: "20%",
          }}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.descriptionText}>{description}</Text>
        </ScrollView>
        <TouchableOpacity
          onPress={() => btnAlert()}
          hitSlop={{ top: 30, left: 30, bottom: 30, right: 30 }}
          style={styles.dateTextContainer}
        >
          <Text style={[styles.dateText]}>{dateTime}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );

  function btnAlert() {
    Alert.alert("Created on: " + dateTimeDetailed);
  }
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: colors.yellow,
  },
  parentContainer: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingTop: 30,
  },
  listContainer: {
    width: "90%",
    height: "90%",
    shadowColor: colors.black,
    shadowOffset: {
      width: 1,
      height: 0.5,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  titleText: {
    color: colors.deepGray,
    fontSize: lHorizontalScale(18),
    marginBottom: "10%",
    fontFamily: "serifLight",
  },
  contentContainer: {
    width: "100%",
    height: "90%",
    backgroundColor: colors.white,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  dateTextContainer: {
    backgroundColor: colors.semiTransparent,
    position: "absolute",
    top: 20,
    right: 0,
    padding: 3,
  },
  dateText: {
    color: colors.white,
    fontFamily: "arlrdbd",
    fontSize: lHorizontalScale(11),
  },
  scrollView: {},
  descriptionText: {
    color: colors.deepGray,
    fontSize: lHorizontalScale(14),
    lineHeight: lHorizontalScale(24),
    fontFamily: "serifLight",
  },
});
