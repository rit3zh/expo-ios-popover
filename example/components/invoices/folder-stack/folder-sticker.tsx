import { Image } from "expo-image";
import React from "react";
import type { IFolderStickerProps } from "../../../interfaces";

export const FolderSticker: React.FC<IFolderStickerProps> = ({
  source,
  width,
  height,
  rotation = 0,
  style,
}) => {
  return (
    <Image
      source={source}
      contentFit="contain"
      transition={150}
      style={[
        { width, height, transform: [{ rotate: `${rotation}deg` }] },
        style,
      ]}
    />
  );
};
