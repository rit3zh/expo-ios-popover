import { SymbolView } from "expo-symbols";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FOLDER_DETAILS_LAYOUT, INVOICE_COLORS } from "../../../../constants";
import type { IFolderDetailRowProps } from "../../../../interfaces";

export const FolderDetailRow: React.FC<IFolderDetailRowProps> = ({
  field,
  detail,
}) => {
  return (
    <View style={styles.row}>
      <View style={styles.leading}>
        <SymbolView
          name={field.icon}
          size={FOLDER_DETAILS_LAYOUT.iconSize}
          tintColor={INVOICE_COLORS.secondaryText}
          style={styles.icon}
        />
        <Text style={styles.label}>{field.label}</Text>
      </View>
      <View style={styles.trailing}>
        <View style={styles.valueLine}>
          <Text style={styles.value} numberOfLines={1}>
            {detail.value}
          </Text>
          {field.navigable ? (
            <SymbolView
              name="chevron.right"
              size={12}
              weight="semibold"
              tintColor={INVOICE_COLORS.secondaryText}
              style={styles.chevron}
            />
          ) : null}
        </View>
        {detail.caption ? (
          <Text style={styles.caption} numberOfLines={1}>
            {detail.caption}
          </Text>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 16,
    paddingVertical: 18,
  },
  leading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  icon: {
    width: FOLDER_DETAILS_LAYOUT.iconSize + 4,
    height: FOLDER_DETAILS_LAYOUT.iconSize + 4,
  },
  label: {
    fontSize: 16,
    color: INVOICE_COLORS.secondaryText,
  },
  trailing: {
    flexShrink: 1,
    alignItems: "flex-end",
    gap: 3,
  },
  valueLine: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  value: {
    fontSize: 16,
    fontWeight: "500",
    color: INVOICE_COLORS.text,
    fontVariant: ["tabular-nums"],
  },
  chevron: {
    width: 12,
    height: 12,
  },
  caption: {
    fontSize: 15,
    color: INVOICE_COLORS.secondaryText,
  },
});
