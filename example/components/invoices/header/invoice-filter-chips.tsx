import React from "react";
import { StyleSheet, View, type ViewStyle } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import { INVOICE_FILTERS, INVOICE_HEADER } from "../../../constants";
import type { IInvoiceFilterChipsProps } from "../../../interfaces";
import { GlassChip } from "../../ui";

export const InvoiceFilterChips: React.FC<IInvoiceFilterChipsProps> = ({
  value,
  onChange,
  progress,
  collapsed,
}) => {
  const chipsStyle = useAnimatedStyle<Pick<ViewStyle, "transform">>(() => ({
    transform: [
      { translateY: interpolate(progress.value, [0, 1], [0, -10]) },
      {
        translateX: interpolate(progress.value, [0, 1], [0, -10]),
      },
      { scale: interpolate(progress.value, [0, 1], [1, 0.94]) },
    ],
  }));

  return (
    <View
      style={styles.container}
      pointerEvents={collapsed ? "none" : "box-none"}
    >
      <Animated.View style={[styles.row, chipsStyle]}>
        {INVOICE_FILTERS.map((option) => (
          <GlassChip
            key={option.value}
            label={option.label}
            active={option.value === value}
            // hidden={collapsed}
            onPress={() => onChange(option.value)}
          />
        ))}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: INVOICE_HEADER.chipsHeight,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
});
