import { SymbolView } from "expo-symbols";
import React from "react";
import { StyleSheet, View } from "react-native";
import { FILE_BADGE_DEFAULTS } from "../../../constants";
import type { IFileBadgeProps } from "../../../interfaces";

export const FileBadge: React.FC<IFileBadgeProps> = ({
  icon,
  size = FILE_BADGE_DEFAULTS.size,
  iconColor = FILE_BADGE_DEFAULTS.iconColor,
  backgroundColor,
  style,
}) => {
  const iconSize = backgroundColor ? size * 0.55 : size;

  return (
    <View
      style={[
        styles.badge,
        { width: size, height: size, borderRadius: size / 2, backgroundColor },
        style,
      ]}
    >
      <SymbolView
        name={icon}
        size={iconSize}
        tintColor={iconColor}
        weight="bold"
        style={{ width: iconSize, height: iconSize }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    alignItems: "center",
    justifyContent: "center",
  },
});
