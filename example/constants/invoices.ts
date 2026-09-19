import type {
  IInvoiceFileBadgeConfig,
  IInvoiceFilterOption,
  IInvoiceFolder,
  IInvoiceItemStatusConfig,
  TInvoiceFileBadge,
  TInvoiceItemStatus,
} from "../interfaces";

export const INVOICES_TITLE = "Invoices";

// Resolves to SF Pro Rounded on iOS.
export const INVOICE_FONTS = {
  rounded: "ui-rounded",
} as const;

export const INVOICE_COLORS = {
  background: "#FFFFFF",
  text: "#0B0B0F",
  secondaryText: "#A1A1A8",
  chip: "#F0F0F2",
  countBackground: "#F0F0F2",
  separator: "#E4E4E8",
  active: "#0B0B0F",
  activeText: "#FFFFFF",
  signatureBlue: "#2C5BD8",
  signatureGray: "#A3A3AD",
} as const;

export const INVOICE_LAYOUT = {
  screenPadding: 20,
  gridGap: 16,
  rowGap: 28,
  listFolderWidth: 76,
  contentBottomPadding: 32,
} as const;

export const INVOICE_FILTERS: IInvoiceFilterOption[] = [
  { value: "all", label: "All" },
  { value: "paid", label: "Paid" },
  { value: "unpaid", label: "Unpaid" },
];

export const INVOICE_FILE_BADGES: Record<
  TInvoiceFileBadge,
  IInvoiceFileBadgeConfig
> = {
  paid: { icon: "checkmark", iconColor: "#FFFFFF", backgroundColor: "#34C759" },
  pending: {
    icon: "checkmark",
    iconColor: "#FFFFFF",
    backgroundColor: "#C9A43A",
  },
  overdue: { icon: "exclamationmark.triangle.fill", iconColor: "#E5484D" },
  draft: { icon: "chevron.left", iconColor: "#A3A3AD" },
};

export const INVOICE_ITEM_STATUSES: Record<
  TInvoiceItemStatus,
  IInvoiceItemStatusConfig
> = {
  paid: {
    label: "Paid",
    fileVariant: "paper",
    color: "#1F9D55",
    background: "#E6F6EC",
  },
  pending: {
    label: "Pending",
    fileVariant: "amber",
    color: "#A47D12",
    background: "#FBF3DC",
  },
  overdue: {
    label: "Overdue",
    fileVariant: "rose",
    color: "#D93B40",
    background: "#FCE8E8",
  },
};

export const INVOICE_FOLDERS: IInvoiceFolder[] = [
  {
    id: "figma",
    name: "Figma",
    count: 4,
    status: "paid",
    sticker: "figma",
    stickerRotation: 4,
    signatureColor: INVOICE_COLORS.signatureGray,
    files: [
      { id: "figma-1", variant: "paper", badge: "paid" },
      { id: "figma-2", variant: "paper", badge: "draft" },
    ],
    details: {
      inbox: { value: "Gmail synced", caption: "billing@figma.studio" },
      paymentMethod: { value: "Visa •••• 4242" },
      billingCycle: { value: "Monthly, every 12th" },
      currency: { value: "USD ($)" },
      reminder: { value: "3 days before due" },
    },
    invoices: [
      {
        id: "figma-inv-2041",
        number: "INV-2041",
        date: "Sep 12, 2026",
        amount: 180,
        status: "paid",
      },
      {
        id: "figma-inv-2016",
        number: "INV-2016",
        date: "Aug 12, 2026",
        amount: 180,
        status: "paid",
      },
      {
        id: "figma-inv-1987",
        number: "INV-1987",
        date: "Jul 12, 2026",
        amount: 144,
        status: "paid",
      },
    ],
  },
  {
    id: "mobbin",
    name: "Mobbin",
    count: 12,
    status: "unpaid",
    sticker: "mobbin",
    stickerRotation: -6,
    signatureColor: INVOICE_COLORS.signatureGray,
    files: [
      { id: "mobbin-1", variant: "rose", badge: "overdue" },
      { id: "mobbin-2", variant: "amber", badge: "pending" },
      { id: "mobbin-3", variant: "paper", badge: "draft" },
    ],
    details: {
      inbox: { value: "Gmail synced", caption: "team@mobbin.studio" },
      paymentMethod: { value: "Mastercard •••• 8810" },
      billingCycle: { value: "Monthly, every 3rd" },
      currency: { value: "USD ($)" },
      reminder: { value: "1 day before due" },
    },
    invoices: [
      {
        id: "mobbin-mb-0912",
        number: "MB-0912",
        date: "Sep 3, 2026",
        amount: 120,
        status: "overdue",
      },
      {
        id: "mobbin-mb-0874",
        number: "MB-0874",
        date: "Aug 3, 2026",
        amount: 120,
        status: "pending",
      },
      {
        id: "mobbin-mb-0833",
        number: "MB-0833",
        date: "Jul 3, 2026",
        amount: 120,
        status: "paid",
      },
    ],
  },
  {
    id: "framer",
    name: "Framer",
    count: 5,
    status: "paid",
    sticker: "framer",
    stickerRotation: -4,
    signatureColor: INVOICE_COLORS.signatureBlue,
    files: [
      { id: "framer-1", variant: "paper", badge: "paid" },
      { id: "framer-2", variant: "amber", badge: "pending" },
    ],
    details: {
      inbox: { value: "Outlook synced", caption: "sites@framer.studio" },
      paymentMethod: { value: "Visa •••• 9132" },
      billingCycle: { value: "Monthly, every 15th" },
      currency: { value: "USD ($)" },
      reminder: { value: "2 days before due" },
    },
    invoices: [
      {
        id: "framer-fr-3310",
        number: "FR-3310",
        date: "Sep 15, 2026",
        amount: 300,
        status: "paid",
      },
      {
        id: "framer-fr-3287",
        number: "FR-3287",
        date: "Aug 15, 2026",
        amount: 300,
        status: "pending",
      },
    ],
  },
  {
    id: "expo",
    name: "Expo",
    count: 2,
    status: "paid",
    sticker: "expo",
    stickerRotation: 6,
    signatureColor: INVOICE_COLORS.signatureBlue,
    files: [{ id: "expo-1", variant: "paper", badge: "paid" }],
    details: {
      inbox: { value: "Gmail synced", caption: "eas@expo.studio" },
      paymentMethod: { value: "Amex •••• 1007" },
      billingCycle: { value: "Monthly, every 1st" },
      currency: { value: "USD ($)" },
      reminder: { value: "On due date" },
    },
    invoices: [
      {
        id: "expo-exp-118",
        number: "EXP-118",
        date: "Sep 1, 2026",
        amount: 99,
        status: "paid",
      },
      {
        id: "expo-exp-102",
        number: "EXP-102",
        date: "Aug 1, 2026",
        amount: 99,
        status: "paid",
      },
    ],
  },
  {
    id: "chat-gpt",
    name: "ChatGPT",
    count: 3,
    status: "unpaid",
    sticker: "chatGpt",
    stickerRotation: -5,
    signatureColor: INVOICE_COLORS.signatureBlue,
    files: [{ id: "chat-gpt-1", variant: "paper", badge: "paid" }],
    details: {
      inbox: { value: "Gmail synced", caption: "plus@openai.studio" },
      paymentMethod: { value: "Apple Pay" },
      billingCycle: { value: "Monthly, every 9th" },
      currency: { value: "USD ($)" },
      reminder: { value: "2 days before due" },
    },
    invoices: [
      {
        id: "chat-gpt-oai-7781",
        number: "OAI-7781",
        date: "Sep 9, 2026",
        amount: 200,
        status: "pending",
      },
      {
        id: "chat-gpt-oai-7650",
        number: "OAI-7650",
        date: "Aug 9, 2026",
        amount: 200,
        status: "paid",
      },
    ],
  },
  {
    id: "pinterest",
    name: "Pinterest",
    count: 7,
    status: "unpaid",
    sticker: "pinterest",
    stickerRotation: 5,
    signatureColor: INVOICE_COLORS.signatureGray,
    files: [
      { id: "pinterest-1", variant: "paper", badge: "paid" },
      { id: "pinterest-2", variant: "amber", badge: "pending" },
    ],
    details: {
      inbox: { value: "iCloud synced", caption: "ads@pinterest.studio" },
      paymentMethod: { value: "Visa •••• 5561" },
      billingCycle: { value: "Monthly, every 18th" },
      currency: { value: "USD ($)" },
      reminder: { value: "1 week before due" },
    },
    invoices: [
      {
        id: "pinterest-pin-5520",
        number: "PIN-5520",
        date: "Sep 18, 2026",
        amount: 450,
        status: "pending",
      },
      {
        id: "pinterest-pin-5401",
        number: "PIN-5401",
        date: "Aug 18, 2026",
        amount: 450,
        status: "paid",
      },
      {
        id: "pinterest-pin-5307",
        number: "PIN-5307",
        date: "Jul 18, 2026",
        amount: 380,
        status: "overdue",
      },
    ],
  },
];

export const NOTIFICATION_TOOLTIP = {
  text: "#0B0B0F",
  secondaryText: "#6E6E78",
  icon: "#E5484D",
  success: "#1F9D55",
  badge: "#E5484D",
  width: 260,
} as const;

export const INVOICE_HEADER = {
  paddingTop: 28,
  paddingBottom: 28,
  titleRowHeight: 50,
  gap: 20,
  chipsHeight: 40,
  collapseThreshold: 24,
  gradientFade: 44,
  chipsBlurIntensity: 40,
  collapsedTitleScale: 0.72,
  duration: 420,
} as const;

export const INVOICE_HEADER_HEIGHT =
  INVOICE_HEADER.paddingTop +
  INVOICE_HEADER.titleRowHeight +
  INVOICE_HEADER.gap +
  INVOICE_HEADER.chipsHeight +
  INVOICE_HEADER.paddingBottom;
