import { Popover } from "expo-ios-popover";
import React, { useCallback, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  FOLDER_MENU_ITEMS,
  FOLDER_MENU_LAYOUT,
  INVOICE_COLORS,
  STICKER_ASPECT_RATIO,
  STICKERS,
} from "../../../../constants";
import type {
  IFolderMenuItemConfig,
  IFolderMenuProps,
} from "../../../../interfaces";
import { FolderSticker } from "../../folder-stack";
import { FolderMenuItem } from "./folder-menu-item";

export const FolderMenu: React.FC<IFolderMenuProps> = React.memo(
  ({ folder }) => {
    const [active, setActive] = useState<Record<string, boolean>>({
      paid: folder.status === "paid",
    });

    const handlePress = useCallback((item: IFolderMenuItemConfig) => {
      if (!item.activeLabel) return;
      setActive((current) => ({ ...current, [item.id]: !current[item.id] }));
    }, []);

    return (
      <Popover.Content style={styles.content}>
        <View style={styles.header}>
          <FolderSticker
            source={STICKERS[folder.sticker]}
            width={FOLDER_MENU_LAYOUT.stickerWidth}
            height={FOLDER_MENU_LAYOUT.stickerWidth * STICKER_ASPECT_RATIO}
            rotation={folder.stickerRotation}
          />
          <View style={styles.headerText}>
            <Text style={styles.title}>{folder.name}</Text>
            <Text style={styles.subtitle}>{folder.count} invoices</Text>
          </View>
        </View>

        {FOLDER_MENU_ITEMS.map((item) => (
          <View key={item.id}>
            {item.destructive ? <View style={styles.groupSeparator} /> : null}
            <FolderMenuItem
              item={item}
              active={Boolean(active[item.id])}
              onPress={handlePress}
            />
          </View>
        ))}
      </Popover.Content>
    );
  },
);

const styles = StyleSheet.create({
  content: {
    width: FOLDER_MENU_LAYOUT.width,
    paddingVertical: 6,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 4,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: INVOICE_COLORS.separator,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: INVOICE_COLORS.text,
  },
  subtitle: {
    fontSize: 13,
    color: INVOICE_COLORS.secondaryText,
  },
  groupSeparator: {
    height: 6,
    marginVertical: 4,
    backgroundColor: "#0000000A",
  },
});
