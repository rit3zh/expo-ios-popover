import MaskedView from "@react-native-masked-view/masked-view";
import { isLiquidGlassAvailable } from "expo-glass-effect";
import React from "react";
import { StyleSheet, View } from "react-native";
import { FOLDER_ASPECT_RATIO, FOLDER_DEFAULTS } from "../../../constants";
import type { IFolderCutoutProps } from "../../../interfaces";
import { FolderMask } from "./folder-mask";
import { FolderMaterial } from "./folder-material";
import { FolderSheen } from "./folder-sheen";

export const FolderCutout: React.FC<IFolderCutoutProps> = ({
  width = FOLDER_DEFAULTS.width,
  material = FOLDER_DEFAULTS.material,
  glassEffectStyle = FOLDER_DEFAULTS.glassEffectStyle,
  tintColor,
  colorScheme,
  isInteractive = FOLDER_DEFAULTS.isInteractive,
  blurIntensity = FOLDER_DEFAULTS.blurIntensity,
  blurTint = FOLDER_DEFAULTS.blurTint,
  showSheen = FOLDER_DEFAULTS.showSheen,
  style,
  children,
}) => {
  const height = width * FOLDER_ASPECT_RATIO;
  const useGlass = material === "glass" && isLiquidGlassAvailable();

  return (
    <View style={[{ width, height }, style]}>
      <MaskedView
        style={StyleSheet.absoluteFill}
        maskElement={<FolderMask width={width} height={height} />}
      >
        <FolderMaterial
          useGlass={useGlass}
          glassEffectStyle={glassEffectStyle}
          tintColor={tintColor}
          colorScheme={colorScheme}
          isInteractive={isInteractive}
          blurIntensity={blurIntensity}
          blurTint={blurTint}
        />
      </MaskedView>

      {showSheen && <FolderSheen width={width} height={height} />}

      {children ? (
        <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
          {children}
        </View>
      ) : null}
    </View>
  );
};
