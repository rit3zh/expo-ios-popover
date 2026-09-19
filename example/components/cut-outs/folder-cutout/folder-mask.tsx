import React from "react";
import Svg, { Path } from "react-native-svg";
import { FOLDER_PATH, FOLDER_VIEWBOX } from "../../../constants";
import type { IFolderShapeProps } from "../../../interfaces";

export const FolderMask: React.FC<IFolderShapeProps> = ({ width, height }) => {
  return (
    <Svg width={width} height={height} viewBox={FOLDER_VIEWBOX}>
      <Path d={FOLDER_PATH} fill="black" />
    </Svg>
  );
};
