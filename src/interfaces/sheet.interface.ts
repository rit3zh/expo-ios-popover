/**
 * A height the sheet can rest at.
 *
 * - `"fitted"` matches the content, and is the default.
 * - `"medium"` and `"large"` are the system half and full height detents.
 * - `"50%"` is a share of the tallest height available.
 * - `{ fraction }` is the same thing written as a number from 0 to 1.
 * - `{ height }` is an exact number of points.
 */
type TSheetDetent =
  | "fitted"
  | "medium"
  | "large"
  | `${number}%`
  | { fraction: number }
  | { height: number };

/**
 * Sheet behavior for `PopoverTransition.Matched`.
 *
 * Ignored when the content is presented as a popover, which happens by default
 * and whenever the OS is too old for the matched transition.
 */
interface ISheetOptions {
  /**
   * Heights the sheet may rest at, shortest first. It opens at the first.
   * Defaults to `["fitted"]`.
   *
   * Each swipe moves the sheet one detent, up or down, however fast it is, and
   * a swipe down only closes the sheet from the shortest. List them out of
   * order and that stepping breaks.
   *
   * A fitted sheet follows its content as that content resizes. Any other
   * detent has a height of its own, and the content is stretched to fill it,
   * which is what gives a scroll view inside a bound to scroll within.
   */
  detents?: TSheetDetent[];
  /** Draw the drag indicator. Defaults to `true`. */
  grabber?: boolean;
  /** Corner radius override. Defaults to the system radius. */
  cornerRadius?: number;
  /** Allow swipe down and tap outside to close. Defaults to `true`. */
  dismissible?: boolean;
  /**
   * Give drags on a scroll view inside to the sheet until it reaches its
   * tallest detent. Below that, dragging the list moves the sheet and the list
   * stays put. At the tallest detent the list scrolls, and pulling it down from
   * its top moves the sheet again. Set `false` to let the list scroll at every
   * detent. Defaults to `true`.
   */
  expandsWhenScrolledToEdge?: boolean;
  /**
   * The tallest detent that leaves whatever is behind the sheet undimmed and
   * still usable. Omit to dim at every detent.
   */
  largestUndimmedDetent?: TSheetDetent;
}

/** The shape the native module expects. Detents flatten to strings. */
interface INativeSheetOptions {
  detents?: string[];
  grabber?: boolean;
  cornerRadius?: number;
  dismissible?: boolean;
  expandsWhenScrolledToEdge?: boolean;
  largestUndimmedDetent?: string;
}

export type { TSheetDetent, ISheetOptions, INativeSheetOptions };
