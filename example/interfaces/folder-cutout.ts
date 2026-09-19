import type { GlassColorScheme, GlassStyle } from "expo-glass-effect";
import type { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";

export type TFolderCutoutMaterial = "glass" | "blur";

export type TFolderCutoutBlurTint = "light" | "dark" | "default" | "systemMaterial";

export interface IFolderCutoutProps {
  width?: number;
  material?: TFolderCutoutMaterial;
  glassEffectStyle?: GlassStyle;
  tintColor?: string;
  colorScheme?: GlassColorScheme;
  isInteractive?: boolean;
  blurIntensity?: number;
  blurTint?: TFolderCutoutBlurTint;
  showSheen?: boolean;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
}

export interface IFolderShapeProps {
  width: number;
  height: number;
}

export interface IFolderMaterialProps {
  useGlass: boolean;
  glassEffectStyle: GlassStyle;
  tintColor?: string;
  colorScheme?: GlassColorScheme;
  isInteractive: boolean;
  blurIntensity: number;
  blurTint: TFolderCutoutBlurTint;
}
