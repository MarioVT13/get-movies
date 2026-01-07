import React from "react";
import { TouchableOpacity, StyleSheet, ViewStyle } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { colors } from "../GlobalConsts";

interface PlusButtonProps {
  onPress: () => void;
  style?: ViewStyle;
}

export const PlusButton: React.FC<PlusButtonProps> = ({ onPress, style }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, style]}
      activeOpacity={0.7}
    >
      <Icon name="add" size={35} color={colors.lightGray} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
