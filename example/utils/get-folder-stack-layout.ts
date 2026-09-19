import {
  FILE_SHEET_ASPECT_RATIO,
  FOLDER_ASPECT_RATIO,
  FOLDER_STACK_RATIOS,
  STICKER_ASPECT_RATIO,
} from "../constants";
import type { IFolderStackLayout } from "../interfaces";

export const getFolderStackLayout = (width: number): IFolderStackLayout => {
  const folderHeight = width * FOLDER_ASPECT_RATIO;
  const peek = width * FOLDER_STACK_RATIOS.peek;
  const fileWidth = width * FOLDER_STACK_RATIOS.fileWidth;
  const stickerWidth = width * FOLDER_STACK_RATIOS.sticker;

  return {
    folderWidth: width,
    folderHeight,
    peek,
    stageHeight: folderHeight + peek,
    fileWidth,
    fileHeight: fileWidth * FILE_SHEET_ASPECT_RATIO,
    badgeSize: width * FOLDER_STACK_RATIOS.badge,
    signatureWidth: width * FOLDER_STACK_RATIOS.signature,
    stickerWidth,
    stickerHeight: stickerWidth * STICKER_ASPECT_RATIO,
    inset: width * FOLDER_STACK_RATIOS.inset,
  };
};
