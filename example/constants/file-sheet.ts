import type { IFileSheetTheme, TFileSheetVariant } from "../interfaces";

export const FILE_SHEET_VIEWBOX_WIDTH = 60;
export const FILE_SHEET_VIEWBOX_HEIGHT = 76;
export const FILE_SHEET_ASPECT_RATIO =
  FILE_SHEET_VIEWBOX_HEIGHT / FILE_SHEET_VIEWBOX_WIDTH;
export const FILE_SHEET_VIEWBOX = `0 0 ${FILE_SHEET_VIEWBOX_WIDTH} ${FILE_SHEET_VIEWBOX_HEIGHT}`;

export const FILE_SHEET_BODY_PATH =
  "M10 0H44L60 16V66C60 71.5228 55.5228 76 50 76H10C4.47715 76 0 71.5228 0 66V10C0 4.47715 4.47715 0 10 0Z";

export const FILE_SHEET_FOLD_PATH =
  "M44 0V10C44 13.3137 46.6863 16 50 16H60L44 0Z";

export const FILE_SHEET_LINES = [
  { y: 30, width: 40 },
  { y: 37, width: 32 },
  { y: 44, width: 36 },
  { y: 51, width: 24 },
] as const;

export const FILE_SHEET_SHADOW = {
  color: "#0000000F",
  offset: 1.5,
} as const;

export const FILE_SHEET_LINE_X = 8;
export const FILE_SHEET_LINE_HEIGHT = 3;

export const FILE_SHEET_THEMES: Record<TFileSheetVariant, IFileSheetTheme> = {
  paper: {
    top: "#FFFFFF",
    bottom: "#E9E9EE",
    foldTop: "#F4F4F7",
    foldBottom: "#D4D4DB",
    stroke: "#D8D8DE",
    line: "#DCDCE2",
  },
  amber: {
    top: "#FBE7A6",
    bottom: "#EDC75E",
    foldTop: "#F6DC8C",
    foldBottom: "#D3A93E",
    stroke: "#DDB654",
    line: "#E2BC58",
  },
  rose: {
    top: "#FBD9D4",
    bottom: "#F2ADA4",
    foldTop: "#F7C7C0",
    foldBottom: "#DF8C82",
    stroke: "#EBA79E",
    line: "#EFB2AA",
  },
  mint: {
    top: "#D9F5E4",
    bottom: "#A8E3C1",
    foldTop: "#C8EED7",
    foldBottom: "#86CFA5",
    stroke: "#96D8B2",
    line: "#9BD9B5",
  },
  sky: {
    top: "#DCEBFF",
    bottom: "#A9CBFA",
    foldTop: "#CADFFD",
    foldBottom: "#86B2EE",
    stroke: "#98BEF4",
    line: "#9EC2F5",
  },
};

export const FILE_SHEET_DEFAULTS = {
  width: 150,
  variant: "paper",
  showLines: true,
} as const;

export const FILE_BADGE_DEFAULTS = {
  size: 22,
  iconColor: "#FFFFFF",
} as const;
