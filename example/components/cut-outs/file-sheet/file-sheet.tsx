import React from "react";
import { StyleSheet, View } from "react-native";
import {
  FILE_SHEET_ASPECT_RATIO,
  FILE_SHEET_DEFAULTS,
  FILE_SHEET_THEMES,
} from "../../../constants";
import type { IFileSheetProps } from "../../../interfaces";
import { FileSheetShape } from "./file-sheet-shape";

export const FileSheet: React.FC<IFileSheetProps> = ({
  width = FILE_SHEET_DEFAULTS.width,
  variant = FILE_SHEET_DEFAULTS.variant,
  theme,
  showLines = FILE_SHEET_DEFAULTS.showLines,
  badge,
  style,
  children,
}) => {
  const height = width * FILE_SHEET_ASPECT_RATIO;
  const resolvedTheme = { ...FILE_SHEET_THEMES[variant], ...theme };
  const inset = width * 0.1;

  return (
    <View style={[{ width, height }, style]}>
      <FileSheetShape
        width={width}
        height={height}
        theme={resolvedTheme}
        showLines={showLines}
      />

      {badge ? (
        <View style={[styles.badge, { top: inset, left: inset }]}>{badge}</View>
      ) : null}

      {children ? (
        <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
          {children}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    position: "absolute",
  },
});
