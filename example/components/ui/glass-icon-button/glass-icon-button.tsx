import { SymbolView } from "expo-symbols";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { INVOICE_COLORS } from "../../../constants";
import type { IGlassIconButtonProps } from "../../../interfaces";
import { GlassSurface } from "../glass-surface";

export const GlassIconButton: React.FC<IGlassIconButtonProps> = ({
  icon,
  size = 44,
  iconColor = INVOICE_COLORS.text,
  badgeColor,
  onPress,
  style,
}) => {
  const iconSize = size * 0.42;
  const badgeSize = size * 0.22;

  const content = (
    <View>
      <GlassSurface
        isInteractive
        style={[
          styles.button,
          { width: size, height: size, borderRadius: size / 2 },
        ]}
      >
        <SymbolView
          name={icon}
          size={iconSize}
          tintColor={iconColor}
          weight="semibold"
          style={{ width: iconSize, height: iconSize }}
        />
      </GlassSurface>
      {badgeColor ? (
        <View
          style={[
            styles.badge,
            {
              width: badgeSize,
              height: badgeSize,
              borderRadius: badgeSize / 2,
              backgroundColor: badgeColor,
            },
          ]}
        />
      ) : null}
    </View>
  );

  if (!onPress) {
    return <View style={style}>{content}</View>;
  }

  return (
    <Pressable onPress={onPress} style={style}>
      {content}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  badge: {
    position: "absolute",
    top: 2,
    right: 2,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
  },
});
