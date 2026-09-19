import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { INVOICE_COLORS } from "../../../constants";
import type { IInvoiceCountBadgeProps } from "../../../interfaces";

export const InvoiceCountBadge: React.FC<IInvoiceCountBadgeProps> = ({
  count,
}) => {
  return (
    <View style={styles.badge}>
      <Text style={styles.count}>{count}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    minWidth: 24,
    height: 24,
    paddingHorizontal: 7,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: INVOICE_COLORS.countBackground,
  },
  count: {
    fontSize: 13,
    fontWeight: "600",
    color: INVOICE_COLORS.text,
    fontVariant: ["tabular-nums"],
  },
});
