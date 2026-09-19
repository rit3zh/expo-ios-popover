/**
 * A named timing curve, or cubic bezier control points as
 * `[x1, y1, x2, y2]`, the same numbers CSS `cubic-bezier()` takes.
 */
type TPopoverEasing =
  | "linear"
  | "easeIn"
  | "easeOut"
  | "easeInOut"
  | [number, number, number, number];

interface IPopoverSpringAnimation {
  type: "spring";
  /** Roughly how long it takes to settle, in milliseconds. Defaults to `350`. */
  duration?: number;
  /** From `0`, no overshoot, towards `1`, very springy. Defaults to `0.15`. */
  bounce?: number;
  /** Starting velocity, relative to the distance travelled. Defaults to `0`. */
  velocity?: number;
}

/**
 * A spring described by its physics, the way Reanimated describes one. It runs
 * for as long as the physics take, so there is no duration.
 */
interface IPopoverPhysicalSpringAnimation {
  type: "spring";
  stiffness: number;
  damping: number;
  /** Defaults to `1`. */
  mass?: number;
  /** Starting velocity, relative to the distance travelled. Defaults to `0`. */
  velocity?: number;
}

/** A fixed length animation along a curve. */
interface IPopoverTimingAnimation {
  type: "timing";
  /** In milliseconds. Defaults to `250`. */
  duration?: number;
  /** Defaults to `"easeInOut"`. */
  easing?: TPopoverEasing;
}

/** How one change animates. */
type TPopoverAnimation =
  | IPopoverSpringAnimation
  | IPopoverPhysicalSpringAnimation
  | IPopoverTimingAnimation
  /** Whatever iOS does by default. */
  | { type: "system" }
  /** No animation at all. */
  | { type: "none" };

/**
 * Separate animations for each kind of change. Anything left out keeps the
 * system animation.
 */
interface IPopoverAnimations {
  /**
   * How a popover appears, growing out of its trigger. A matched sheet always
   * uses the system zoom, which cannot be retimed.
   */
  present?: TPopoverAnimation;
  /** How a popover goes away, shrinking back into its trigger. */
  dismiss?: TPopoverAnimation;
  /**
   * How the popover, or a fitted sheet, follows its content as that content
   * changes size.
   */
  resize?: TPopoverAnimation;
}

/** One animation in the shape the native module expects. */
interface INativeAnimation {
  type: string;
  /** In seconds. */
  duration?: number;
  bounce?: number;
  stiffness?: number;
  damping?: number;
  mass?: number;
  velocity?: number;
  easing?: string;
  controlPoints?: number[];
}

/** The `animation` prop in the shape the native module expects. */
interface INativeAnimations {
  present?: INativeAnimation;
  dismiss?: INativeAnimation;
  resize?: INativeAnimation;
}

export type {
  INativeAnimation,
  INativeAnimations,
  IPopoverAnimations,
  IPopoverPhysicalSpringAnimation,
  IPopoverTimingAnimation,
  TPopoverEasing,
  TPopoverAnimation,
  IPopoverSpringAnimation,
};
