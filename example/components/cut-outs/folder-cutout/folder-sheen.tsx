import React from "react";
import { StyleSheet } from "react-native";
import Svg, { Defs, LinearGradient, Path, Stop } from "react-native-svg";
import {
  FOLDER_PATH,
  FOLDER_SHEEN_GRADIENT_ID,
  FOLDER_VIEWBOX,
} from "../../../constants";
import type { IFolderShapeProps } from "../../../interfaces";

export const FolderSheen: React.FC<IFolderShapeProps> = ({ width, height }) => {
  return (
    <Svg
      pointerEvents="none"
      style={StyleSheet.absoluteFill}
      width={width}
      height={height}
      viewBox={FOLDER_VIEWBOX}
    >
      <Defs>
        <LinearGradient id={FOLDER_SHEEN_GRADIENT_ID} x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#ffffff" stopOpacity={0.35} />
          <Stop offset="1" stopColor="#ffffff" stopOpacity={0.08} />
        </LinearGradient>
      </Defs>
      <Path d={FOLDER_PATH} fill={`url(#${FOLDER_SHEEN_GRADIENT_ID})`} />
    </Svg>
  );
};
