import React, { memo } from "react";
import type {
  FC,
  ReactElement,
  ReactNode,
  JSX,
  FunctionComponent,
} from "react";
import { View, type ViewStyle } from "react-native";
import {
  NativePopoverContent,
  NativePopoverTrigger,
  NativePopoverView,
} from "../native-view/index";
import {
  type PopoverTriggerProps,
  type PopoverContentProps,
  type PopoverComponent,
  type PopoverProps,
  ArrowEdge,
} from "../typings/index";
import { SCREEN_HEIGHT } from "../constants/index";

const Popover: PopoverComponent = ({
  children,
  arrowDirection = ArrowEdge.Any,
  onOpenChange,
}: PopoverProps): ReactNode & JSX.Element & ReactElement => {
  return (
    <NativePopoverView
      arrowDirection={arrowDirection}
      onOpenChange={
        onOpenChange
          ? (event: { nativeEvent: { isOpen: boolean } }) => {
              onOpenChange(event.nativeEvent.isOpen);
            }
          : undefined
      }
    >
      {children}
    </NativePopoverView>
  );
};

const Trigger: FC<PopoverTriggerProps> &
  FunctionComponent<PopoverTriggerProps> = memo<
  FunctionComponent<PopoverTriggerProps>
>(
  ({
    children,
    style,
  }: PopoverTriggerProps): ReactNode & JSX.Element & ReactElement => {
    return (
      <NativePopoverTrigger style={style}>{children}</NativePopoverTrigger>
    );
  }
);

const Content: FC<PopoverContentProps> &
  FunctionComponent<PopoverContentProps> = memo<FC<PopoverContentProps>>(
  ({
    children,
    style,
    onDismiss,
  }: PopoverContentProps): ReactNode & JSX.Element & ReactElement => {
    const flatStyle = style
      ? Array.isArray(style)
        ? Object.assign({}, ...style)
        : style
      : {};
    const viewStyle = flatStyle as ViewStyle;

    let backgroundColor: string | undefined;
    if (
      viewStyle.backgroundColor &&
      typeof viewStyle.backgroundColor === "string"
    ) {
      backgroundColor = viewStyle.backgroundColor;
    }

    return (
      <NativePopoverContent
        backgroundColor={backgroundColor}
        onDismiss={onDismiss}
        style={{
          position: "absolute",
          transform: [{ translateX: -SCREEN_HEIGHT + -10000000000000000 }],
          pointerEvents: "none",
        }}
      >
        <View style={style}>{children}</View>
      </NativePopoverContent>
    );
  }
);

Popover.Trigger = Trigger;
Popover.Content = Content;

export { Popover };
export default Popover;
