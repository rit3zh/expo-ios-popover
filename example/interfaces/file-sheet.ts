import type { SFSymbol } from "expo-symbols";
import type { ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";

export type TFileSheetVariant = "paper" | "amber" | "rose" | "mint" | "sky";

export interface IFileSheetTheme {
  top: string;
  bottom: string;
  foldTop: string;
  foldBottom: string;
  stroke: string;
  line: string;
}

export interface IFileSheetProps {
  width?: number;
  variant?: TFileSheetVariant;
  theme?: Partial<IFileSheetTheme>;
  showLines?: boolean;
  badge?: ReactNode;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
}

export interface IFileSheetShapeProps {
  width: number;
  height: number;
  theme: IFileSheetTheme;
  showLines: boolean;
}

export interface IFileBadgeProps {
  icon: SFSymbol;
  size?: number;
  iconColor?: string;
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>;
}
