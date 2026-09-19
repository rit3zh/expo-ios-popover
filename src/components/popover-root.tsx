import * as React from "react";
import type { FC } from "react";
import { useMemo } from "react";
import {
  ArrowEdge,
  PopoverBackground,
  PopoverTransition,
  TriggerType,
} from "../enums";
import type { IOpenChangeEvent, TPopoverRootProps } from "../interfaces";
import { NativePopoverView } from "../native-view";
import { encodeAnimations, encodeSheetOptions } from "../utils";

const PopoverRoot: FC<TPopoverRootProps> = ({
  children,
  direction = ArrowEdge.Any,
  trigger = TriggerType.Tap,
  transition = PopoverTransition.Default,
  background = PopoverBackground.Default,
  animated = true,
  sheet,
  animation,
  onVisibilityChange,
}: TPopoverRootProps): React.ReactElement & React.ReactNode => {
  const handleOpenChange = useMemo(() => {
    if (!onVisibilityChange) return undefined;
    return (event: IOpenChangeEvent) =>
      onVisibilityChange(event.nativeEvent.isOpen);
  }, [onVisibilityChange]);

  const nativeSheet = useMemo(() => encodeSheetOptions(sheet), [sheet]);
  const nativeAnimation = useMemo(
    () => encodeAnimations(animation),
    [animation],
  );

  return (
    <NativePopoverView
      arrowDirection={direction}
      triggerType={trigger}
      transition={transition}
      background={background}
      sheet={nativeSheet}
      animation={nativeAnimation}
      animated={animated}
      onOpenChange={handleOpenChange}
    >
      {children}
    </NativePopoverView>
  );
};

PopoverRoot.displayName = "Popover";

export { PopoverRoot };
