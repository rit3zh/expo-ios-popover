import { Popover } from "expo-ios-popover";
import { SymbolView } from "expo-symbols";
import React from "react";
import { StyleSheet, Text } from "react-native";
import {
  FOLDER_ACTION_COLORS,
  FOLDER_MENU_LAYOUT,
  INVOICE_COLORS,
} from "../../../../constants";
import type { IFolderMenuItemProps } from "../../../../interfaces";

export const FolderMenuItem: React.FC<IFolderMenuItemProps> = ({
  item,
  active = false,
  onPress,
}) => {
  const color = item.destructive
    ? FOLDER_ACTION_COLORS.destructive
    : active
      ? FOLDER_ACTION_COLORS.settled
      : INVOICE_COLORS.text;
  const icon = active && item.activeIcon ? item.activeIcon : item.icon;
  const label = active && item.activeLabel ? item.activeLabel : item.label;

  return (
    <Popover.Pressable style={styles.item} onPress={() => onPress(item)}>
      <Text style={[styles.label, { color }]}>{label}</Text>
      <SymbolView
        name={icon}
        size={18}
        weight="medium"
        tintColor={color}
        style={styles.icon}
      />
    </Popover.Pressable>
  );
};

const styles = StyleSheet.create({
  item: {
    height: FOLDER_MENU_LAYOUT.itemHeight,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
  },
  icon: {
    width: 20,
    height: 20,
  },
});
