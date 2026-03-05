import { requireNativeViewManager } from "expo-modules-core";
import { Popover } from "../constants";

const NativePopoverView = requireNativeViewManager(
  Popover.Module,
  "ExpoPopoverView"
);
const NativePopoverTrigger = requireNativeViewManager(
  Popover.Module,
  "ExpoPopoverTriggerView"
);
const NativePopoverContent = requireNativeViewManager(
  Popover.Module,
  "ExpoPopoverContentView"
);
const NativePopoverPressable = requireNativeViewManager(
  Popover.Module,
  "ExpoPopoverPressableView"
);

export {
  NativePopoverView,
  NativePopoverTrigger,
  NativePopoverContent,
  NativePopoverPressable,
}