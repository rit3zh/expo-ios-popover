import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { StyleSheet } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { INVOICE_COLORS } from "../../../constants";
import type { IInvoicesHeaderGradientProps } from "../../../interfaces";

const TRANSPARENT = "rgba(255, 255, 255, 0)";

export const InvoicesHeaderGradient: React.FC<IInvoicesHeaderGradientProps> = ({
  progress,
  height,
}) => {
  const style = useAnimatedStyle(() => ({ opacity: progress.value }));

  return (
    <Animated.View
      pointerEvents="none"
      style={[styles.container, { height }, style]}
    >
      <LinearGradient
        colors={[
          INVOICE_COLORS.background,
          INVOICE_COLORS.background,
          "rgba(255, 255, 255, 0.85)",
          TRANSPARENT,
        ]}
        locations={[0, 0.55, 0.78, 1]}
        style={StyleSheet.absoluteFill}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
});
