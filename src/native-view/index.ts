import { requireNativeViewManager } from "expo-modules-core";
import { NativeView } from "../constants";

const NativePopoverView = requireNativeViewManager(
  NativeView.Module,
  NativeView.Root,
);
const NativePopoverTrigger = requireNativeViewManager(
  NativeView.Module,
  NativeView.Trigger,
);
const NativePopoverContent = requireNativeViewManager(
  NativeView.Module,
  NativeView.Content,
);
const NativePopoverPressable = requireNativeViewManager(
  NativeView.Module,
  NativeView.Pressable,
);

export {
  NativePopoverView,
  NativePopoverTrigger,
  NativePopoverContent,
  NativePopoverPressable,
};
