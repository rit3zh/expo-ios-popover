import { Dimensions } from "react-native";

export enum Popover {
  Module = "ExpoiOSPopoverModule",
  View = "ExpoPopoverView",
  Trigger = "ExpoPopoverTriggerView",
  Content = "ExpoPopoverContentView",
}

export const SCREEN_HEIGHT = Dimensions.get("window").height;
