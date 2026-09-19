import type { FC, PropsWithChildren } from "react";

/**
 * A root component with its sub-components attached, so callers can write
 * `<Popover.Trigger>` instead of importing each piece.
 */
type TCompoundComponent<Props, Trigger, Content, Pressable> = FC<
  PropsWithChildren<Props>
> & {
  Trigger: Trigger;
  Content: Content;
  Pressable: Pressable;
};

export type { TCompoundComponent };
