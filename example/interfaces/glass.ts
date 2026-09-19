import type {
  GlassColorScheme,
  GlassEffectStyleConfig,
  GlassStyle,
} from "expo-glass-effect";
import type { SFSymbol } from "expo-symbols";
import type { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";

export interface IGlassSurfaceProps {
  glassEffectStyle?: GlassStyle | GlassEffectStyleConfig;
  tintColor?: string;
  colorScheme?: GlassColorScheme;
  isInteractive?: boolean;
  fallbackColor?: string;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
}

export interface IGlassChipProps {
  label: string;
  active?: boolean;
  hidden?: boolean;
  onPress?: () => void;
}

export interface IGlassIconButtonProps {
  icon: SFSymbol;
  size?: number;
  iconColor?: string;
  badgeColor?: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}
