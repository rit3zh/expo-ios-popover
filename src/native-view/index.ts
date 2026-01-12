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


export {
  NativePopoverView,
  NativePopoverTrigger,
  NativePopoverContent,
}