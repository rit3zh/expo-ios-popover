import type { StyleProp, ViewStyle } from "react-native";

export type TSignatureGradient = readonly [string, string];

export interface ISignatureProps {
  width?: number;
  color?: string;
  gradient?: TSignatureGradient;
  opacity?: number;
  strokeColor?: string;
  strokeWidth?: number;
  rotation?: number;
  style?: StyleProp<ViewStyle>;
}
