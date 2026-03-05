import * as React from "react";
import {
  ComponentProps,
  FunctionComponent,
  JSX,
  memo,
  ReactElement,
  ReactNode,
  type FC,
  type PropsWithChildren,
} from "react";
import { View, StyleSheet, type ViewStyle } from "react-native";
import {
  NativePopoverContent,
  NativePopoverTrigger,
  NativePopoverView,
  NativePopoverPressable,
} from "../native-view";
import {
  type IPopover,
  type IPopoverTrigger,
  type IPopoverContent,
  type IPopoverPressable,
  type TPopoverComponent,
  ArrowEdge,
  TriggerType,
} from "../typings";

const Root: FC<PropsWithChildren<Partial<IPopover>>> &
  FunctionComponent<PropsWithChildren<Partial<IPopover>>> = ({
  children,
  direction = ArrowEdge.Any,
  animated = true,
  trigger = TriggerType.Tap,
  onVisibilityChange,
}: Partial<IPopover> & ComponentProps<typeof Root>):
  | (ReactNode & ReactElement & JSX.Element)
  | null => {
  return (
    <NativePopoverView
      arrowDirection={direction}
      animated={animated}
      triggerType={trigger}
      onOpenChange={
        onVisibilityChange
          ? (e: { nativeEvent: { isOpen: boolean } }) =>
              onVisibilityChange(e.nativeEvent.isOpen)
          : undefined
      }
    >
      {children}
    </NativePopoverView>
  );
};

const Trigger: FC<PropsWithChildren<IPopoverTrigger>> &
  FunctionComponent<PropsWithChildren<IPopoverTrigger>> = memo<
  Partial<IPopoverTrigger> & ComponentProps<typeof Trigger>
>(
  ({
    children,
    style,
  }: Partial<IPopoverTrigger> & ComponentProps<typeof Trigger>):
    | (JSX.Element & ReactNode & ReactElement)
    | null => {
    return (
      <NativePopoverTrigger style={style}>{children}</NativePopoverTrigger>
    );
  },
);

const Content: FC<PropsWithChildren<IPopoverContent>> &
  FunctionComponent<PropsWithChildren<IPopoverContent>> = memo<
  Partial<IPopoverContent> & ComponentProps<typeof Content>
>(
  ({
    children,
    style,
    onDismiss,
  }: Partial<IPopoverContent> & ComponentProps<typeof Content>):
    | (JSX.Element & ReactNode & ReactElement)
    | null => {
    const flat = StyleSheet.flatten(style) as ViewStyle | undefined;

    const backgroundColor =
      typeof flat?.backgroundColor === "string"
        ? flat.backgroundColor
        : undefined;

    return (
      <NativePopoverContent
        backgroundColor={backgroundColor}
        onDismiss={onDismiss}
        style={stylez.stable_hiddenViewContainer}
      >
        <View style={style}>{children}</View>
      </NativePopoverContent>
    );
  },
);

const Pressable: FC<PropsWithChildren<IPopoverPressable>> &
  FunctionComponent<PropsWithChildren<IPopoverPressable>> = memo<
  Partial<IPopoverPressable> & ComponentProps<typeof Pressable>
>(
  ({
    children,
    style,
    onPress,
  }: ComponentProps<typeof Pressable>):
    | (ReactNode & JSX.Element & ReactElement)
    | null => {
    return (
      <NativePopoverPressable style={style} onTapOut={onPress}>
        {children}
      </NativePopoverPressable>
    );
  },
);

export const Popover = Root as TPopoverComponent;
export const RootPopover = Root;

Popover.Trigger = Trigger;
Popover.Content = Content;
Popover.Pressable = Pressable;

export { Trigger, Content, Pressable };

const stylez = StyleSheet.create({
  stable_hiddenViewContainer: {
    position: "absolute",
    top: -9999,
    left: -9999,
  },
});
