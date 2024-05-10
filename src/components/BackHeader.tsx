import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Alert,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { Icon as ElementIcon } from "react-native-elements";
import Icon from "react-native-vector-icons/Feather";
import {
  editBtnAlertMessage,
  lHorizontalScale,
  lVerticalScale,
  urgentBtnAlertMessage,
} from "../GlobalConsts";
import { colors } from "../GlobalConsts";

interface Props {
  title: string;
  isUrgent: boolean;
  created: number;
  style: Partial<ViewStyle>;
}

export default function BackHeader(props: Props) {
  const { title, isUrgent, created, style } = props;
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

      <View style={{ width: "40%" }} />

      <TouchableOpacity
        onPress={() => btnAlert(true)}
        style={styles.rightBtnContainer}
      >
        <Icon name={"edit"} size={lVerticalScale(22)} color={colors.gray} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => btnAlert(false)}
        style={[styles.rightBtnContainer, { marginRight: "4%" }]}
      >
        <Icon
          name={"alert-circle"}
          size={lVerticalScale(24)}
          color={isUrgent ? colors.yellow : colors.gray}
        />
      </TouchableOpacity>
    </View>
  );

  function btnAlert(isEditBtn: boolean) {
    if (isEditBtn) Alert.alert(editBtnAlertMessage);
    else Alert.alert(urgentBtnAlertMessage);
  }
}

const styles = StyleSheet.create({
  parentContainer: {
    width: "100%",
    height: "12%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: colors.green,
  },
  backBtnContainer: {
    height: "100%",
    width: "20%",
    justifyContent: "center",
    marginLeft: "2%",
  },
  rightBtnContainer: {
    height: "100%",
    width: "15%",
    justifyContent: "center",
    alignItems: "center",
  },
});
