import type { FC, PropsWithChildren, ReactNode } from "react";
import type { StyleProp, ViewStyle } from "react-native";

import type {
  ArrowEdge,
  PopoverBackground,
  PopoverTransition,
  TriggerType,
} from "../enums";
import type {
  IPopoverAnimations,
  TPopoverAnimation,
} from "./animation.interface";
import type { TCompoundComponent } from "./compound.interface";
import type { ISheetOptions } from "./sheet.interface";

/**
 * Accepts either the enum member or its plain string value, so both
 * `transition={PopoverTransition.Matched}` and `transition="matched"` type
 * check.
 */
type TPopoverTransitionValue = PopoverTransition | `${PopoverTransition}`;

/** Accepts either the enum member or its plain string value. */
type TPopoverBackgroundValue = PopoverBackground | `${PopoverBackground}`;

/** Props for `<Popover>` / `<Popover.Root>`. */
interface IPopover {
  children: ReactNode;
  /** Which edge the arrow may point from. Defaults to `ArrowEdge.Any`. */
  direction?: ArrowEdge;
  /** Gesture that opens the popover. Defaults to `TriggerType.Tap`. */
  trigger?: TriggerType;
  /** Animate presentation and dismissal. Defaults to `true`. */
  animated?: boolean;
  /**
   * How the content is presented. Defaults to `PopoverTransition.Default`.
   *
   * `PopoverTransition.Matched` presents a sheet that the trigger morphs into,
   * rather than a popover. Anything that cannot run it falls back to the
   * standard popover, so it is always safe to pass.
   */
  transition?: TPopoverTransitionValue;
  /**
   * The material behind the content. Defaults to `PopoverBackground.Default`.
   *
   * With a material, a `backgroundColor` on the content tints it rather than
   * covering it.
   */
  background?: TPopoverBackgroundValue;
  /**
   * Sheet behavior, used only when `transition` is
   * `PopoverTransition.Matched` and the OS can present the sheet.
   */
  sheet?: ISheetOptions;
  /**
   * Custom spring or timing animations. Pass one animation for everything, or
   * `{ present, dismiss, resize }` to set each separately. Anything left out
   * keeps the system animation.
   *
   * A matched sheet always opens and closes with the system zoom, so only
   * `resize` applies to it. Ignored when `animated` is `false`.
   *
   * @example
   * animation={{ type: "spring", duration: 400, bounce: 0.25 }}
   *
   * @example
   * animation={{
   *   present: { type: "spring", stiffness: 260, damping: 20 },
   *   dismiss: { type: "timing", duration: 180, easing: "easeIn" },
   * }}
   */
  animation?: TPopoverAnimation | IPopoverAnimations;
  /** Called whenever the popover opens or closes. */
  onVisibilityChange?: <T extends boolean>(visible: T) => void;
}

/** Props for `<Popover.Trigger>`. */
interface IPopoverTrigger {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

/** Props for `<Popover.Content>`. */
interface IPopoverContent {
  children?: ReactNode;
  /**
   * Style for the popover body. A `backgroundColor` here is forwarded to the
   * native popover chrome so the arrow matches.
   */
  style?: StyleProp<ViewStyle>;
  onDismiss?: () => void;
}

/** Props for `<Popover.Pressable>`. */
interface IPopoverPressable {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  /**
   * Close the popover or sheet when tapped, after `onPress` runs. Use it for a
   * close button or any action that should finish the interaction. Defaults
   * to `false`.
   */
  dismissOnPress?: boolean;
}

type TPopoverRootProps = PropsWithChildren<Partial<IPopover>>;

type TPopoverTriggerProps = PropsWithChildren<Partial<IPopoverTrigger>>;

type TPopoverContentProps = PropsWithChildren<Partial<IPopoverContent>>;

type TPopoverPressableProps = PropsWithChildren<Partial<IPopoverPressable>>;

/** The assembled `Popover` component, with its sub-components attached. */
type TPopoverComponent = TCompoundComponent<
  IPopover,
  FC<TPopoverTriggerProps>,
  FC<TPopoverContentProps>,
  FC<TPopoverPressableProps>
>;

export type {
  TPopoverTransitionValue,
  TPopoverBackgroundValue,
  IPopover,
  IPopoverTrigger,
  IPopoverContent,
  IPopoverPressable,
  TPopoverRootProps,
  TPopoverTriggerProps,
  TPopoverContentProps,
  TPopoverPressableProps,
  TPopoverComponent,
};
