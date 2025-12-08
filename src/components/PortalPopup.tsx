// src/components/ui/Popup.tsx
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  ViewStyle,
  View,
} from "react-native";
import { Portal } from "@gorhom/portal";
import { horizontalScale } from "../utils/ScalingUtil";
import { colors } from "../GlobalConsts";

type PopupProps = {
  visible: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  dismissible?: boolean;
  backdropOpacity?: number;
  containerStyle?: ViewStyle;
  contentStyle?: ViewStyle;
};

export default function PortalPopup({
  visible,
  onClose,
  children,
  dismissible = true,
  backdropOpacity = 0.5,
  containerStyle,
  contentStyle,
}: PopupProps) {
  const opacity = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.92)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: backdropOpacity,
          duration: 180,
          useNativeDriver: true,
          easing: Easing.out(Easing.cubic),
        }),
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: true,
          friction: 7,
          tension: 90,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 140,
          useNativeDriver: true,
        }),
        Animated.timing(scale, {
          toValue: 0.92,
          duration: 120,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, backdropOpacity, opacity, scale]);

  if (!visible) {
    return null;
  }

  return (
    <Portal>
      <View style={[styles.parentContainer, containerStyle]}>
        {/* Backdrop */}
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={() => dismissible && onClose?.()}
        >
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              { backgroundColor: "#000", opacity },
            ]}
          />
        </Pressable>

        {/* Content */}
        <Animated.View
          style={[styles.card, { transform: [{ scale }] }, contentStyle]}
        >
          {children}
        </Animated.View>
      </View>
    </Portal>
  );
}

const styles = StyleSheet.create({
  parentContainer: {
    width: "100%",
    height: "100%",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    padding: horizontalScale(20),
  },
  card: {
    width: "80%",
    height: "60%",
    borderRadius: 10,
    backgroundColor: colors.rust,
    padding: 5,
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
});
