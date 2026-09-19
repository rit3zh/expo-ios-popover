import { SymbolView } from "expo-symbols";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { INVOICE_COLORS, INVOICE_LAYOUT } from "../../../constants";
import type { IInvoiceFolderItemProps } from "../../../interfaces";
import { FolderPopover } from "../folder-popover";
import { FolderStack } from "../folder-stack";
import { InvoiceCountBadge } from "./invoice-count-badge";

export const InvoiceFolderRow: React.FC<IInvoiceFolderItemProps> = React.memo(({
  folder,
  width,
}) => {
  return (
    <FolderPopover
      folder={folder}
      variant="classic"
      triggerStyle={[styles.row, { width }]}
    >
      <FolderStack folder={folder} width={INVOICE_LAYOUT.listFolderWidth} />
      <View style={styles.content}>
        <View style={styles.title}>
          <Text style={styles.name} numberOfLines={1}>
            {folder.name}
          </Text>
          <InvoiceCountBadge count={folder.count} />
        </View>
        <Text style={styles.status}>
          {folder.status === "paid" ? "All paid" : "Awaiting payment"}
        </Text>
      </View>
      <SymbolView
        name="chevron.right"
        size={14}
        tintColor={INVOICE_COLORS.secondaryText}
        weight="semibold"
        style={styles.chevron}
      />
    </FolderPopover>
  );
});

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: INVOICE_COLORS.separator,
  },
  content: {
    flex: 1,
    gap: 4,
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  name: {
    fontSize: 17,
    fontWeight: "600",
    color: INVOICE_COLORS.text,
  },
  status: {
    fontSize: 14,
    color: INVOICE_COLORS.secondaryText,
  },
  chevron: {
    width: 14,
    height: 14,
  },
});
