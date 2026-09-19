import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { INVOICE_COLORS } from "../../../constants";
import type { IGlassChipProps } from "../../../interfaces";
import { GlassSurface } from "../glass-surface";

const GLASS_CHIP_ANIMATION_DURATION = 0.35;

export const GlassChip: React.FC<IGlassChipProps> = ({
  label,
  active = false,
  hidden = false,
  onPress,
}) => {
  return (
    <Pressable onPress={onPress}>
      <GlassSurface
        glassEffectStyle={{
          style: hidden ? "none" : "clear",
          animate: true,
          animationDuration: GLASS_CHIP_ANIMATION_DURATION,
        }}
        isInteractive
        tintColor={active ? INVOICE_COLORS.active : "transparent"}
        style={styles.chip}
      >
        <Text style={[styles.label, active && styles.labelActive]}>
          {label}
        </Text>
      </GlassSurface>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  chip: {
    height: 40,
    paddingHorizontal: 18,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: INVOICE_COLORS.text,
  },
  labelActive: {
    color: INVOICE_COLORS.activeText,
  },
});
