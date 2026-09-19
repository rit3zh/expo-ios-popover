import { Popover } from "expo-ios-popover";
import { SymbolView } from "expo-symbols";
import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import {
  FOLDER_DETAIL_FIELDS,
  FOLDER_DETAILS_LAYOUT,
  INVOICE_COLORS,
} from "../../../../constants";
import type {
  IFolderDetailValue,
  IFolderDetailsProps,
  IInvoiceFolder,
  TFolderDetailField,
} from "../../../../interfaces";
import { GlassIconButton } from "../../../ui";
import { FolderStack } from "../../folder-stack";
import { FolderDetailRow } from "./folder-detail-row";

const getDetail = (
  folder: IInvoiceFolder,
  field: TFolderDetailField,
): IFolderDetailValue =>
  field === "lastInvoice"
    ? { value: folder.invoices[0]?.date ?? "—" }
    : folder.details[field];

export const FolderDetails: React.FC<IFolderDetailsProps> = React.memo(
  ({ folder }) => {
    const { width } = useWindowDimensions();

    return (
      <Popover.Content style={[styles.content, { width }]}>
        <View style={styles.hero}>
          <View style={styles.toolbar}>
            <Pressable>
              <GlassIconButton
                icon="square.and.arrow.up"
                size={FOLDER_DETAILS_LAYOUT.headerButtonSize}
              />
            </Pressable>
            <Popover.Pressable dismissOnPress>
              <GlassIconButton
                icon="xmark"
                size={FOLDER_DETAILS_LAYOUT.headerButtonSize}
                iconColor={INVOICE_COLORS.secondaryText}
              />
            </Popover.Pressable>
          </View>
          <FolderStack
            folder={folder}
            width={FOLDER_DETAILS_LAYOUT.folderWidth}
          />
        </View>

        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={1}>
            {folder.name}
          </Text>
          <SymbolView
            name="square.and.pencil"
            size={22}
            tintColor={INVOICE_COLORS.secondaryText}
            style={styles.editIcon}
          />
        </View>

        <View style={styles.details}>
          {FOLDER_DETAIL_FIELDS.map((field, index) => (
            <React.Fragment key={field.id}>
              {index > 0 ? (
                <View style={styles.separator}>
                  <View style={styles.separatorLine} />
                </View>
              ) : null}
              <FolderDetailRow
                field={field}
                detail={getDetail(folder, field.id)}
              />
            </React.Fragment>
          ))}
        </View>
      </Popover.Content>
    );
  },
);

const styles = StyleSheet.create({
  content: {
    backgroundColor: INVOICE_COLORS.background,
    paddingHorizontal: FOLDER_DETAILS_LAYOUT.padding,
  },
  hero: {
    alignItems: "center",
  },
  toolbar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 1,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 20,
    marginBottom: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    letterSpacing: -0.6,
    color: INVOICE_COLORS.text,
  },
  editIcon: {
    width: 24,
    height: 24,
  },
  // The last row's own padding is enough room above the sheet's bottom edge,
  // which the native side already clears the home indicator for.
  details: {
    marginBottom: -8,
  },
  // A one-sided dotted border draws unreliably on iOS, so a fully bordered
  // box is clipped down to its top edge.
  separator: {
    height: 1,
    overflow: "hidden",
  },
  separatorLine: {
    height: 3,
    borderWidth: 1,
    borderStyle: "dotted",
    borderColor: INVOICE_COLORS.separator,
  },
});
