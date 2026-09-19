import {
  ArrowEdge,
  Popover,
  PopoverBackground,
  TriggerType,
} from "expo-ios-popover";
import { SymbolView } from "expo-symbols";
import React, { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";
import { INVOICE_FOLDERS, NOTIFICATION_TOOLTIP } from "../../../constants";
import { getInvoiceAlerts } from "../../../utils";
import { GlassIconButton } from "../../ui";

export const NotificationTooltip: React.FC = () => {
  const { overdue, pending } = useMemo(
    () => getInvoiceAlerts(INVOICE_FOLDERS),
    [],
  );
  const total = overdue + pending;
  const hasAlerts = total > 0;

  return (
    <Popover
      direction={ArrowEdge.Bottom}
      background={PopoverBackground.Blur}
      trigger={TriggerType.Tap}
    >
      <Popover.Trigger>
        <GlassIconButton
          icon={hasAlerts ? "bell.badge" : "bell"}
          size={50}
          badgeColor={hasAlerts ? NOTIFICATION_TOOLTIP.badge : undefined}
        />
      </Popover.Trigger>

      <Popover.Content style={styles.content}>
        <View style={styles.row}>
          <SymbolView
            name={
              hasAlerts
                ? "exclamationmark.circle.fill"
                : "checkmark.circle.fill"
            }
            size={18}
            tintColor={
              hasAlerts
                ? NOTIFICATION_TOOLTIP.icon
                : NOTIFICATION_TOOLTIP.success
            }
            style={styles.icon}
          />
          <Text style={styles.title}>
            {hasAlerts
              ? `${total} invoices need attention`
              : "You're all caught up"}
          </Text>
        </View>
        {hasAlerts ? (
          <Text style={styles.subtitle}>
            {overdue} overdue · {pending} pending
          </Text>
        ) : null}
      </Popover.Content>
    </Popover>
  );
};

const styles = StyleSheet.create({
  content: {
    width: NOTIFICATION_TOOLTIP.width,
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 4,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  icon: {
    width: 18,
    height: 18,
  },
  title: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    color: NOTIFICATION_TOOLTIP.text,
  },
  subtitle: {
    fontSize: 13,
    color: NOTIFICATION_TOOLTIP.secondaryText,
    marginLeft: 26,
  },
});
