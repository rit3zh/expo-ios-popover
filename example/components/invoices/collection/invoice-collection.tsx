import React from "react";
import { StyleSheet, useWindowDimensions, View } from "react-native";
import Animated from "react-native-reanimated";
import { INVOICE_LAYOUT } from "../../../constants";
import type { IInvoiceCollectionProps } from "../../../interfaces";
import { InvoiceFolderCard, InvoiceFolderRow } from "../folder-item";

export const InvoiceCollection: React.FC<IInvoiceCollectionProps> = ({
  folders,
  viewMode,
  scrollRef,
  onScroll,
  contentPaddingTop,
}) => {
  const { width: screenWidth } = useWindowDimensions();
  const isGrid = viewMode === "grid";
  const contentWidth = screenWidth - INVOICE_LAYOUT.screenPadding * 2;
  const itemWidth = isGrid
    ? (contentWidth - INVOICE_LAYOUT.gridGap) / 2
    : contentWidth;

  return (
    <Animated.ScrollView
      ref={scrollRef}
      onScroll={onScroll}
      scrollEventThrottle={16}
      contentContainerStyle={[
        styles.content,
        { paddingTop: contentPaddingTop },
      ]}
      contentInsetAdjustmentBehavior="automatic"
      showsVerticalScrollIndicator={false}
    >
      <View style={isGrid ? styles.grid : styles.list}>
        {folders.map((folder) =>
          isGrid ? (
            <InvoiceFolderCard
              key={folder.id}
              folder={folder}
              width={itemWidth}
            />
          ) : (
            <InvoiceFolderRow key={folder.id} folder={folder} width={itemWidth} />
          ),
        )}
      </View>
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: INVOICE_LAYOUT.screenPadding,
    paddingBottom: INVOICE_LAYOUT.contentBottomPadding,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: INVOICE_LAYOUT.gridGap,
    rowGap: INVOICE_LAYOUT.rowGap,
  },
  list: {
    rowGap: 4,
  },
});
