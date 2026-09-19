import type { ISheetOptions } from "expo-ios-popover";
import type {
  IFolderDetailFieldConfig,
  IFolderMenuItemConfig,
} from "../interfaces";

export const FOLDER_POPOVER_SHEET: ISheetOptions = {
  detents: ["fitted"],
  grabber: false,
};

// The native sheet already adds room above the content and, below it, a fixed
// inset plus the home indicator's safe area. The content adds no vertical
// padding of its own, so nothing is counted twice.
export const FOLDER_DETAILS_LAYOUT = {
  padding: 24,
  folderWidth: 170,
  headerButtonSize: 40,
  iconSize: 17,
} as const;

export const FOLDER_MENU_LAYOUT = {
  width: 264,
  stickerWidth: 30,
  itemHeight: 46,
} as const;

export const FOLDER_DETAIL_FIELDS: IFolderDetailFieldConfig[] = [
  { id: "inbox", label: "Connected Inbox", icon: "tray.fill" },
  { id: "paymentMethod", label: "Payment Method", icon: "creditcard.fill" },
  { id: "billingCycle", label: "Billing Cycle", icon: "calendar.badge.clock" },
  { id: "currency", label: "Currency", icon: "dollarsign.circle.fill" },
  { id: "lastInvoice", label: "Last Invoice", icon: "doc.text.fill" },
  {
    id: "reminder",
    label: "Reminder",
    icon: "bell.and.waves.left.and.right.fill",
    navigable: true,
  },
];

export const FOLDER_MENU_ITEMS: IFolderMenuItemConfig[] = [
  { id: "share", label: "Share folder", icon: "square.and.arrow.up" },
  { id: "download", label: "Download PDFs", icon: "arrow.down.doc" },
  {
    id: "pin",
    label: "Pin folder",
    icon: "pin",
    activeIcon: "pin.fill",
    activeLabel: "Pinned",
  },
  {
    id: "paid",
    label: "Mark as paid",
    icon: "checkmark.circle",
    activeIcon: "checkmark.circle.fill",
    activeLabel: "Marked as paid",
  },
  { id: "archive", label: "Archive", icon: "archivebox", destructive: true },
];

export const FOLDER_ACTION_COLORS = {
  settled: "#1F9D55",
  destructive: "#D93B40",
} as const;
