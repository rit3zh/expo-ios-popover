import { SymbolView } from "expo-symbols";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";
import {
  INVOICE_COLORS,
  INVOICE_FONTS,
  INVOICE_HEADER,
} from "../../../constants";
import type { IInvoicesHeaderProps } from "../../../interfaces";
import { GlassIconButton } from "../../ui";
import { InvoiceFilterChips } from "./invoice-filter-chips";
import { NotificationTooltip } from "./notification-tooltip";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const InvoicesHeader: React.FC<IInvoicesHeaderProps> = ({
  title,
  filter,
  onFilterChange,
  progress,
  collapsed,
  onTitlePress,
}) => {
  // The whole glyph turns 180°, cross-fading chevron.down into arrow.down,
  // so it lands as an up arrow ("scroll to top").
  const iconStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${interpolate(progress.value, [0, 1], [0, 180])}deg` },
    ],
  }));
  const titleStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(
          progress.value,
          [0, 1],
          [1, INVOICE_HEADER.collapsedTitleScale],
        ),
      },
    ],
  }));
  const chevronStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 0.6], [1, 0], "clamp"),
  }));
  const arrowStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0.4, 1], [0, 1], "clamp"),
  }));

  return (
    <View style={styles.container} pointerEvents="box-none">
      <View style={styles.titleRow} pointerEvents="box-none">
        <AnimatedPressable
          style={[styles.title, titleStyle]}
          onPress={onTitlePress}
          disabled={!collapsed}
        >
          <Text style={styles.titleText}>{title}</Text>
          <Animated.View style={[styles.icon, iconStyle]}>
            <Animated.View style={[styles.glyph, chevronStyle]}>
              <SymbolView
                name="chevron.down"
                size={18}
                weight="semibold"
                tintColor={INVOICE_COLORS.secondaryText}
                style={styles.symbol}
              />
            </Animated.View>
            <Animated.View style={[styles.glyph, arrowStyle]}>
              <SymbolView
                name="arrow.down"
                size={18}
                weight="semibold"
                tintColor={INVOICE_COLORS.secondaryText}
                style={styles.symbol}
              />
            </Animated.View>
          </Animated.View>
        </AnimatedPressable>
        <View style={styles.actions}>
          <NotificationTooltip />
          <GlassIconButton icon="rectangle.split.1x2" size={50} />
        </View>
      </View>
      <InvoiceFilterChips
        value={filter}
        onChange={onFilterChange}
        progress={progress}
        collapsed={collapsed}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: INVOICE_HEADER.gap,
    paddingTop: INVOICE_HEADER.paddingTop,
    paddingBottom: INVOICE_HEADER.paddingBottom,
  },
  titleRow: {
    height: INVOICE_HEADER.titleRowHeight,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    transformOrigin: "left center",
  },
  titleText: {
    fontFamily: INVOICE_FONTS.rounded,
    fontSize: 38,
    fontWeight: "700",
    letterSpacing: -0.8,
    color: INVOICE_COLORS.text,
  },
  icon: {
    width: 18,
    height: 18,
    marginTop: 6,
  },
  glyph: {
    ...StyleSheet.absoluteFillObject,
  },
  symbol: {
    width: 18,
    height: 18,
  },
});
