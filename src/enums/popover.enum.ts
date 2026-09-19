/**
 * Which direction the popover's arrow is allowed to point.
 *
 * The names describe where the popover sits relative to its trigger, while the
 * values are the arrow direction UIKit expects. `ArrowEdge.Top` puts the
 * popover above the trigger, so its arrow points down.
 */
enum ArrowEdge {
  Top = "down",
  Bottom = "up",
  Leading = "right",
  Trailing = "left",
  Any = "any",
  None = "none",
}

/** The gesture on the trigger that opens the popover. */
enum TriggerType {
  Tap = "tap",
  LongPress = "longpress",
  DoubleTap = "doubletap",
}

/** How the content is presented, and how it animates in. */
enum PopoverTransition {
  /** A popover anchored to the trigger, with the system popover animation. */
  Default = "default",
  /**
   * A sheet that the trigger morphs into.
   *
   * UIKit only runs its zoom transition for sheet, full screen and custom
   * presentations, so this cannot stay a popover. The content is presented as a
   * page sheet sized to fit, and `direction` no longer applies because there is
   * no arrow.
   *
   * Needs iOS 18 or newer. Anything older falls back to {@link
   * PopoverTransition.Default}, so this is always safe to pass.
   */
  Matched = "matched",
}

/**
 * The material drawn behind the content.
 *
 * Glass is the iOS 26 Liquid Glass material. On older systems it degrades to a
 * blur rather than disappearing, so the content always keeps a legible
 * backdrop.
 */
enum PopoverBackground {
  /** A plain background, filled with the content's own `backgroundColor`. */
  Default = "default",
  /** A standard blur material. */
  Blur = "blur",
  /** Liquid Glass, regular style. Needs iOS 26. */
  Glass = "glass",
  /** Liquid Glass, clear style, which lets more of the backdrop through. */
  ClearGlass = "clearGlass",
}

export { ArrowEdge, TriggerType, PopoverTransition, PopoverBackground };
