import React, { useId } from "react";
import { StyleSheet } from "react-native";
import Svg, { Defs, LinearGradient, Path, Rect, Stop } from "react-native-svg";
import {
  FILE_SHEET_BODY_PATH,
  FILE_SHEET_FOLD_PATH,
  FILE_SHEET_LINE_HEIGHT,
  FILE_SHEET_LINE_X,
  FILE_SHEET_LINES,
  FILE_SHEET_SHADOW,
  FILE_SHEET_VIEWBOX,
} from "../../../constants";
import type { IFileSheetShapeProps } from "../../../interfaces";

export const FileSheetShape: React.FC<IFileSheetShapeProps> = ({
  width,
  height,
  theme,
  showLines,
}) => {
  const id = useId().replace(/:/g, "");
  const bodyGradientId = `fileSheetBody${id}`;
  const foldGradientId = `fileSheetFold${id}`;

  return (
    <Svg
      style={StyleSheet.absoluteFill}
      width={width}
      height={height}
      viewBox={FILE_SHEET_VIEWBOX}
    >
      <Defs>
        <LinearGradient id={bodyGradientId} x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor={theme.top} />
          <Stop offset="1" stopColor={theme.bottom} />
        </LinearGradient>
        <LinearGradient id={foldGradientId} x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor={theme.foldTop} />
          <Stop offset="1" stopColor={theme.foldBottom} />
        </LinearGradient>
      </Defs>

      <Path
        d={FILE_SHEET_BODY_PATH}
        fill={FILE_SHEET_SHADOW.color}
        translateY={FILE_SHEET_SHADOW.offset}
      />

      <Path
        d={FILE_SHEET_BODY_PATH}
        fill={`url(#${bodyGradientId})`}
        stroke={theme.stroke}
        strokeWidth={0.5}
      />

      {showLines &&
        FILE_SHEET_LINES.map((line) => (
          <Rect
            key={line.y}
            x={FILE_SHEET_LINE_X}
            y={line.y}
            width={line.width}
            height={FILE_SHEET_LINE_HEIGHT}
            rx={FILE_SHEET_LINE_HEIGHT / 2}
            fill={theme.line}
          />
        ))}

      <Path
        d={FILE_SHEET_FOLD_PATH}
        fill={`url(#${foldGradientId})`}
        stroke={theme.stroke}
        strokeWidth={0.5}
        strokeLinejoin="round"
      />
    </Svg>
  );
};
