import { BlurView } from "expo-blur";
import { GlassView } from "expo-glass-effect";
import React from "react";
import { StyleSheet } from "react-native";
import type { IFolderMaterialProps } from "../../../interfaces";

export const FolderMaterial: React.FC<IFolderMaterialProps> = ({
  useGlass,
  glassEffectStyle,
  tintColor,
  colorScheme,
  isInteractive,
  blurIntensity,
  blurTint,
}) => {
  if (useGlass) {
    return (
      <GlassView
        style={StyleSheet.absoluteFill}
        glassEffectStyle={glassEffectStyle}
        tintColor={tintColor}
        colorScheme={colorScheme}
        isInteractive={isInteractive}
      />
    );
  }

  return (
    <BlurView
      style={StyleSheet.absoluteFill}
      intensity={blurIntensity}
      tint={blurTint}
    />
  );
};
