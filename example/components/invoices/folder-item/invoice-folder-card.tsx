import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FOLDER_CORNER_RATIO, INVOICE_COLORS } from "../../../constants";
import type { IInvoiceFolderItemProps } from "../../../interfaces";
import { FolderPopover } from "../folder-popover";
import { FolderStack } from "../folder-stack";
import { InvoiceCountBadge } from "./invoice-count-badge";

export const InvoiceFolderCard: React.FC<IInvoiceFolderItemProps> = React.memo(
  ({ folder, width }) => {
    return (
      <FolderPopover
        folder={folder}
        triggerStyle={{ width, borderRadius: width * FOLDER_CORNER_RATIO }}
      >
        <FolderStack folder={folder} width={width} />
        <View style={styles.label}>
          <Text style={styles.name} numberOfLines={1}>
            {folder.name}
          </Text>
          <InvoiceCountBadge count={folder.count} />
        </View>
      </FolderPopover>
    );
  },
);

const styles = StyleSheet.create({
  label: {
    marginTop: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  name: {
    fontSize: 17,
    fontWeight: "500",
    color: INVOICE_COLORS.text,
  },
});
