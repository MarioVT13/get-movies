import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { Icon as ElementIcon } from "react-native-elements";
import Icon from "react-native-vector-icons/Feather";
import { lHorizontalScale, lVerticalScale } from "../GlobalConsts";
import { colors } from "../GlobalConsts";

interface Props {
  title: string;
  style: Partial<ViewStyle>;
}

export default function BackHeader(props: Props) {
  const { title, style } = props;
  const { goBack } = useNavigation();

  return (
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
      <Text style={styles.titleText}>{title}</Text>
    </View>
  );

  // function btnAlert(isEditBtn: boolean) {
  //   if (isEditBtn) Alert.alert(editBtnAlertMessage);
  //   else Alert.alert(urgentBtnAlertMessage);
  // }
}

const styles = StyleSheet.create({
  parentContainer: {
    width: "100%",
    height: "12%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: colors.antiqueBronze,
  },
  backBtnContainer: {
    height: "100%",
    width: "20%",
    justifyContent: "center",
  },
  titleText: {
    width: "60%",
    color: colors.white,
    fontSize: lHorizontalScale(20),
    fontFamily: "serifLight",
    textAlign: "center",
    marginRight: "20%",
  },
});
