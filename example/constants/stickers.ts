import type { ImageSource } from "expo-image";
import type { TStickerName } from "../interfaces";

export const STICKER_ASPECT_RATIO = 400 / 320;

export const STICKERS: Record<TStickerName, ImageSource> = {
  figma: require("../assets/folder-stickers/optimized/figma-sticker.png"),
  mobbin: require("../assets/folder-stickers/optimized/mobbin-sticker.png"),
  framer: require("../assets/folder-stickers/optimized/framer-sticker.png"),
  expo: require("../assets/folder-stickers/optimized/expo-sticker.png"),
  chatGpt: require("../assets/folder-stickers/optimized/chat-gpt-sticker.png"),
  pinterest: require("../assets/folder-stickers/optimized/pinterest-sticker.png"),
};
