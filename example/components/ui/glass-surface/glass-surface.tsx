import { GlassView, isLiquidGlassAvailable } from "expo-glass-effect";
import React from "react";
import { StyleSheet, View } from "react-native";
import type { IGlassSurfaceProps } from "../../../interfaces";

export const GlassSurface: React.FC<IGlassSurfaceProps> = ({
  glassEffectStyle = "regular",
  tintColor,
  colorScheme = "light",
  isInteractive = false,
  fallbackColor = "#FFFFFFE6",
  style,
  children,
}) => {
  if (isLiquidGlassAvailable()) {
    return (
      <GlassView
        glassEffectStyle={glassEffectStyle}
        tintColor={tintColor}
        colorScheme={colorScheme}
        isInteractive={isInteractive}
        style={style}
      >
        {children}
      </GlassView>
    );
  }

  return (
    <View
      style={[
        styles.fallback,
        { backgroundColor: tintColor ?? fallbackColor },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  fallback: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#0000001A",
  },
});
