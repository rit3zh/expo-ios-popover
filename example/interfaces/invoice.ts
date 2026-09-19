import type { ImageSource } from "expo-image";
import type Animated from "react-native-reanimated";
import type {
  AnimatedRef,
  ScrollHandlerProcessed,
  SharedValue,
} from "react-native-reanimated";
import type { ReactNode } from "react";
import type { SFSymbol } from "expo-symbols";
import type { ImageStyle, StyleProp, ViewStyle } from "react-native";
import type { TFileSheetVariant } from "./file-sheet";

export type TInvoiceStatus = "paid" | "unpaid";

export type TInvoiceFilter = "all" | TInvoiceStatus;

export type TInvoiceViewMode = "grid" | "list";

export type TInvoiceFileBadge = "paid" | "pending" | "overdue" | "draft";

export type TInvoiceItemStatus = "paid" | "pending" | "overdue";

export type TFolderPopoverVariant = "sheet" | "classic";

export type TStickerName =
  | "figma"
  | "mobbin"
  | "framer"
  | "expo"
  | "chatGpt"
  | "pinterest";

export interface IInvoiceFile {
  id: string;
  variant: TFileSheetVariant;
  badge: TInvoiceFileBadge;
}

export interface IInvoiceItem {
  id: string;
  number: string;
  date: string;
  amount: number;
  status: TInvoiceItemStatus;
}

export interface IInvoiceFolder {
  id: string;
  name: string;
  count: number;
  status: TInvoiceStatus;
  sticker: TStickerName;
  stickerRotation: number;
  signatureColor: string;
  files: IInvoiceFile[];
  invoices: IInvoiceItem[];
  details: Omit<Record<TFolderDetailField, IFolderDetailValue>, "lastInvoice">;
}

export interface IInvoiceFileBadgeConfig {
  icon: SFSymbol;
  iconColor: string;
  backgroundColor?: string;
}

export interface IInvoiceItemStatusConfig {
  label: string;
  fileVariant: TFileSheetVariant;
  color: string;
  background: string;
}

export interface IInvoiceFilterOption {
  value: TInvoiceFilter;
  label: string;
}

export interface IFolderStackLayout {
  folderWidth: number;
  folderHeight: number;
  peek: number;
  stageHeight: number;
  fileWidth: number;
  fileHeight: number;
  badgeSize: number;
  signatureWidth: number;
  stickerWidth: number;
  stickerHeight: number;
  inset: number;
}

export interface IFolderStackProps {
  folder: IInvoiceFolder;
  width: number;
  style?: StyleProp<ViewStyle>;
}

export interface IFolderStackFilesProps {
  files: IInvoiceFile[];
  layout: IFolderStackLayout;
}

export interface IFolderStickerProps {
  source: ImageSource;
  width: number;
  height: number;
  rotation?: number;
  style?: StyleProp<ImageStyle>;
}

export interface IInvoiceFolderItemProps {
  folder: IInvoiceFolder;
  width: number;
}

export interface IFolderPopoverProps {
  folder: IInvoiceFolder;
  variant?: TFolderPopoverVariant;
  children: ReactNode;
  triggerStyle?: StyleProp<ViewStyle>;
}

export interface IFolderDetailsProps {
  folder: IInvoiceFolder;
}

export type TFolderDetailField =
  | "inbox"
  | "paymentMethod"
  | "billingCycle"
  | "currency"
  | "lastInvoice"
  | "reminder";

export interface IFolderDetailValue {
  value: string;
  caption?: string;
}

export interface IFolderDetailFieldConfig {
  id: TFolderDetailField;
  label: string;
  icon: SFSymbol;
  /** Shows a chevron after the value. */
  navigable?: boolean;
}

export interface IFolderDetailRowProps {
  field: IFolderDetailFieldConfig;
  detail: IFolderDetailValue;
}

export interface IFolderMenuItemConfig {
  id: string;
  label: string;
  icon: SFSymbol;
  activeIcon?: SFSymbol;
  activeLabel?: string;
  destructive?: boolean;
}

export interface IFolderMenuProps {
  folder: IInvoiceFolder;
}

export interface IFolderMenuItemProps {
  item: IFolderMenuItemConfig;
  active?: boolean;
  onPress: (item: IFolderMenuItemConfig) => void;
}

export interface IInvoiceCountBadgeProps {
  count: number;
}

export interface IInvoicesHeaderProps {
  title: string;
  filter: TInvoiceFilter;
  onFilterChange: (filter: TInvoiceFilter) => void;
  progress: SharedValue<number>;
  collapsed: boolean;
  onTitlePress?: () => void;
}

export interface IInvoiceFilterChipsProps {
  value: TInvoiceFilter;
  onChange: (filter: TInvoiceFilter) => void;
  progress: SharedValue<number>;
  collapsed: boolean;
}

export interface IInvoicesHeaderGradientProps {
  progress: SharedValue<number>;
  height: number;
}

export interface IInvoiceCollectionProps {
  folders: IInvoiceFolder[];
  viewMode: TInvoiceViewMode;
  scrollRef: AnimatedRef<Animated.ScrollView>;
  onScroll: ScrollHandlerProcessed<Record<string, unknown>>;
  contentPaddingTop: number;
}

export interface IInvoicesScreenProps {
  viewMode: TInvoiceViewMode;
}

export interface IInvoiceAlerts {
  overdue: number;
  pending: number;
}
