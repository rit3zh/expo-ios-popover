import * as React from "react";
import { memo, type FC } from "react";

import type { TPopoverPressableProps } from "../interfaces";
import { NativePopoverPressable } from "../native-view";

/**
 * A pressable for use inside `<Popover.Content>`.
 * @deprecated Use `<Pressable>` from `react-native` instead. This component is only needed for the native side to attach the gesture recognizer, but it can be replaced with a standard pressable.
 */
const PopoverPressable: FC<TPopoverPressableProps> = memo(
  ({
    children,
    style,
    onPress,
    dismissOnPress = false,
  }: TPopoverPressableProps): (React.ReactElement & React.ReactNode) | null => (
    <NativePopoverPressable
      style={style}
      onTapOut={onPress}
      dismissOnPress={dismissOnPress}
    >
      {children}
    </NativePopoverPressable>
  ),
);

PopoverPressable.displayName = "Popover.Pressable";

export { PopoverPressable };
