import type { FC, ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";

enum ArrowEdge {
  Top = "down",
  Bottom = "up",
  Leading = "right",
  Trailing = "left",
  Any = "any",
  None = "none",
}

interface PopoverProps {
  children: ReactNode;
  arrowDirection?: ArrowEdge;
  onOpenChange?: (isOpen: boolean) => void;
}

interface PopoverTriggerProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

interface PopoverComponent extends FC<PopoverProps> {
  Trigger: FC<PopoverTriggerProps>;
  Content: FC<PopoverContentProps>;
}

interface PopoverContentProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  onDismiss?: () => void;
}

export {
  PopoverProps,
  PopoverTriggerProps,
  PopoverContentProps,
  PopoverComponent,
};

export { ArrowEdge };
