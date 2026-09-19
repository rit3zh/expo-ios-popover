import React, { useId } from "react";
import { View } from "react-native";
import Svg, { Defs, LinearGradient, Path, Stop } from "react-native-svg";
import {
  SIGNATURE_ASPECT_RATIO,
  SIGNATURE_DEFAULTS,
  SIGNATURE_PATH,
  SIGNATURE_VIEWBOX,
} from "../../../constants";
import type { ISignatureProps } from "../../../interfaces";

export const Signature: React.FC<ISignatureProps> = ({
  width = SIGNATURE_DEFAULTS.width,
  color = SIGNATURE_DEFAULTS.color,
  gradient,
  opacity = SIGNATURE_DEFAULTS.opacity,
  strokeColor,
  strokeWidth = SIGNATURE_DEFAULTS.strokeWidth,
  rotation = SIGNATURE_DEFAULTS.rotation,
  style,
}) => {
  const height = width * SIGNATURE_ASPECT_RATIO;
  const gradientId = `signatureInk${useId().replace(/:/g, "")}`;
  const fill = gradient ? `url(#${gradientId})` : color;

  return (
    <View
      pointerEvents="none"
      style={[
        { width, height, opacity, transform: [{ rotate: `${rotation}deg` }] },
        style,
      ]}
    >
      <Svg width={width} height={height} viewBox={SIGNATURE_VIEWBOX}>
        {gradient ? (
          <Defs>
            <LinearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
              <Stop offset="0" stopColor={gradient[0]} />
              <Stop offset="1" stopColor={gradient[1]} />
            </LinearGradient>
          </Defs>
        ) : null}
        <Path
          d={SIGNATURE_PATH}
          fill={fill}
          fillRule="evenodd"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
        />
      </Svg>
    </View>
  );
};
