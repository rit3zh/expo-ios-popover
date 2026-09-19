import * as React from "react";
import { memo, useCallback, type FC } from "react";
import { useState } from "react";
import { StyleSheet, View, type ViewStyle } from "react-native";
import type {
  IAvailableSize,
  IAvailableSizeEvent,
  TPopoverContentProps,
} from "../interfaces";
import { NativePopoverContent } from "../native-view";

const PopoverContent: FC<TPopoverContentProps> = memo(
  ({
    children,
    style,
    onDismiss,
  }: TPopoverContentProps): (React.ReactElement & React.ReactNode) | null => {
    const [availableSize, setAvailableSize] = useState<IAvailableSize | null>(
      null,
    );

    const handleAvailableSizeChange = useCallback(
      ({ nativeEvent }: IAvailableSizeEvent) => {
        const { width, height } = nativeEvent;

        const next = width > 0 && height > 0 ? { width, height } : null;
        setAvailableSize((current) =>
          current?.width === next?.width && current?.height === next?.height
            ? current
            : next,
        );
      },
      [],
    );
    const flattened = StyleSheet.flatten(style) as ViewStyle | undefined;
    const backgroundColor =
      typeof flattened?.backgroundColor === "string"
        ? flattened.backgroundColor
        : undefined;
    return (
      <NativePopoverContent
        backgroundColor={backgroundColor}
        onDismiss={onDismiss}
        onAvailableSizeChange={handleAvailableSizeChange}
        style={styles.offscreen}
      >
        <View style={[style, availableSize]}>{children}</View>
      </NativePopoverContent>
    );
  },
);

PopoverContent.displayName = "Popover.Content";

const styles = StyleSheet.create({
  offscreen: {
    position: "absolute",
    top: -9999,
    left: -9999,
  },
});
export { PopoverContent };
