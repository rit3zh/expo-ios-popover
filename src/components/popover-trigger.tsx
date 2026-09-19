import * as React from "react";
import { memo, type FC } from "react";

import type { TPopoverTriggerProps } from "../interfaces";
import { NativePopoverTrigger } from "../native-view";

const PopoverTrigger: FC<TPopoverTriggerProps> = memo(
  ({
    children,
    style,
  }: TPopoverTriggerProps): React.ReactElement & React.ReactNode => (
    <NativePopoverTrigger style={style}>{children}</NativePopoverTrigger>
  ),
);

PopoverTrigger.displayName = "Popover.Trigger";

export { PopoverTrigger };
