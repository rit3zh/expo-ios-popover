import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import {
  INVOICE_COLORS,
  INVOICE_HEADER,
  INVOICE_HEADER_HEIGHT,
  INVOICE_LAYOUT,
  INVOICES_TITLE,
} from "../../../constants";
import { useCollapsibleHeader, useInvoiceFolders } from "../../../hooks";
import type { IInvoicesScreenProps } from "../../../interfaces";
import { InvoiceCollection } from "../collection";
import { InvoicesHeader, InvoicesHeaderGradient } from "../header";

export const InvoicesScreen: React.FC<IInvoicesScreenProps> = ({
  viewMode,
}) => {
  const { folders, filter, setFilter } = useInvoiceFolders();
  const { scrollRef, onScroll, progress, collapsed, scrollToTop, top } =
    useCollapsibleHeader();

  const gradientHeight =
    top +
    INVOICE_HEADER.paddingTop +
    INVOICE_HEADER.titleRowHeight +
    INVOICE_HEADER.gradientFade;

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />
      <InvoiceCollection
        folders={folders}
        viewMode={viewMode}
        scrollRef={scrollRef}
        onScroll={onScroll}
        contentPaddingTop={INVOICE_HEADER_HEIGHT}
      />
      <InvoicesHeaderGradient progress={progress} height={gradientHeight} />
      <View style={[styles.header, { top }]} pointerEvents="box-none">
        <InvoicesHeader
          title={INVOICES_TITLE}
          filter={filter}
          onFilterChange={setFilter}
          progress={progress}
          collapsed={collapsed}
          onTitlePress={scrollToTop}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: INVOICE_COLORS.background,
  },
  header: {
    position: "absolute",
    left: INVOICE_LAYOUT.screenPadding,
    right: INVOICE_LAYOUT.screenPadding,
  },
});
