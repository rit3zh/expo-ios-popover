import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { FOLDER_STACK_GLASS, STICKERS } from "../../../constants";
import type { IFolderStackProps } from "../../../interfaces";
import { getFolderStackLayout } from "../../../utils";
import { FolderCutout } from "../../cut-outs";
import { Signature } from "../../ui";
import { FolderStackFiles } from "./folder-stack-files";
import { FolderSticker } from "./folder-sticker";

export const FolderStack: React.FC<IFolderStackProps> = React.memo(
  ({ folder, width, style }) => {
    const layout = useMemo(() => getFolderStackLayout(width), [width]);

    const folderBody = (
      <FolderCutout
        width={width}
        tintColor={FOLDER_STACK_GLASS.tintColor}
        colorScheme={FOLDER_STACK_GLASS.colorScheme}
        glassEffectStyle="regular"
      >
        <Signature
          width={layout.signatureWidth}
          color={folder.signatureColor}
          style={[
            styles.signature,
            { left: layout.inset, bottom: layout.inset },
          ]}
        />
        <FolderSticker
          source={STICKERS[folder.sticker]}
          width={layout.stickerWidth}
          height={layout.stickerHeight}
          rotation={folder.stickerRotation}
          style={[
            styles.sticker,
            { right: layout.inset * 0.8, bottom: layout.inset * 0.6 },
          ]}
        />
      </FolderCutout>
    );

    return (
      <View style={[{ width, height: layout.stageHeight }, style]}>
        <FolderStackFiles files={folder.files} layout={layout} />
        <View style={[styles.folder, { top: layout.peek }]}>{folderBody}</View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  folder: {
    position: "absolute",
    left: 0,
  },
  signature: {
    position: "absolute",
  },
  sticker: {
    position: "absolute",
  },
});
