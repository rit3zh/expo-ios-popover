import {
  ArrowEdge,
  Popover,
  PopoverBackground,
  PopoverTransition,
} from "expo-ios-popover";
import React from "react";
import { FOLDER_POPOVER_SHEET } from "../../../constants";
import type { IFolderPopoverProps } from "../../../interfaces";
import { FolderMenu } from "./menu";
import { FolderDetails } from "./sheet";

export const FolderPopover: React.FC<IFolderPopoverProps> = ({
  folder,
  variant = "sheet",
  children,
  triggerStyle,
}) => {
  if (variant === "classic") {
    return (
      <Popover direction={ArrowEdge.Any} background={PopoverBackground.Glass}>
        <Popover.Trigger style={triggerStyle}>{children}</Popover.Trigger>
        <FolderMenu folder={folder} />
      </Popover>
    );
  }

  return (
    <Popover transition={PopoverTransition.Matched} sheet={FOLDER_POPOVER_SHEET}>
      <Popover.Trigger style={triggerStyle}>{children}</Popover.Trigger>
      <FolderDetails folder={folder} />
    </Popover>
  );
};
