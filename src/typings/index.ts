import type { FC, PropsWithChildren, ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";
import type { TCompoundComponent } from "./compound";

enum ArrowEdge {
  Top = "down",
  Bottom = "up",
  Leading = "right",
  Trailing = "left",
  Any = "any",
  None = "none",
}

enum TriggerType {
  Tap = "tap",
  LongPress = "longpress",
  DoubleTap = "doubletap",
}

interface IPopover {
  children: ReactNode;
  direction?: ArrowEdge;
  onVisibilityChange?: <T extends boolean>(visible: T) => void;
  trigger?: TriggerType;
  animated?: boolean;
}

interface IPopoverTrigger {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

interface IPopoverPressable {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

interface IPopoverContent {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  onDismiss?: () => void;
}

type TPopoverComponent = TCompoundComponent<
  IPopover,
  FC<PropsWithChildren<Partial<IPopoverTrigger>>>,
  FC<PropsWithChildren<Partial<IPopoverContent>>>,
  FC<PropsWithChildren<Partial<IPopoverPressable>>>
>;

export type {
  IPopover,
  IPopoverTrigger,
  IPopoverContent,
  IPopoverPressable,
  TPopoverComponent,
};

export { ArrowEdge, TriggerType };
