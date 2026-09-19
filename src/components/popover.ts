import type { TPopoverComponent } from "../interfaces";
import { PopoverContent } from "./popover-content";
import { PopoverPressable } from "./popover-pressable";
import { PopoverRoot } from "./popover-root";
import { PopoverTrigger } from "./popover-trigger";

const Popover = PopoverRoot as TPopoverComponent;

Popover.Trigger = PopoverTrigger;
Popover.Content = PopoverContent;
Popover.Pressable = PopoverPressable;

export { Popover };
