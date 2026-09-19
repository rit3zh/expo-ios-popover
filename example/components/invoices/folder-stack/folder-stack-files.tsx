import React from "react";
import { StyleSheet } from "react-native";
import { FOLDER_STACK_FILE_FAN, INVOICE_FILE_BADGES } from "../../../constants";
import type { IFolderStackFilesProps } from "../../../interfaces";
import { FileBadge, FileSheet } from "../../cut-outs";

export const FolderStackFiles: React.FC<IFolderStackFilesProps> = ({
  files,
  layout,
}) => {
  return (
    <>
      {files.slice(0, FOLDER_STACK_FILE_FAN.length).map((file, index) => {
        const fan = FOLDER_STACK_FILE_FAN[index];
        const badge = INVOICE_FILE_BADGES[file.badge];

        return (
          <FileSheet
            key={file.id}
            width={layout.fileWidth}
            variant={file.variant}
            style={[
              styles.file,
              {
                left: layout.folderWidth * fan.left,
                top: layout.folderWidth * fan.top,
                transform: [{ rotate: `${fan.rotation}deg` }],
              },
            ]}
            badge={
              <FileBadge
                icon={badge.icon}
                size={layout.badgeSize}
                iconColor={badge.iconColor}
                backgroundColor={badge.backgroundColor}
              />
            }
          />
        );
      })}
    </>
  );
};

const styles = StyleSheet.create({
  file: {
    position: "absolute",
  },
});
