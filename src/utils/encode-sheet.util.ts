import type {
  INativeSheetOptions,
  ISheetOptions,
  TSheetDetent,
} from "../interfaces";

function encodeDetent<T extends TSheetDetent>(detent: T): string | null {
  if (typeof detent === "string") return detent;
  if (typeof detent === "object" && detent !== null) {
    if ("fraction" in detent && Number.isFinite(detent.fraction)) {
      return `fraction:${detent.fraction}`;
    }
    if ("height" in detent && Number.isFinite(detent.height)) {
      return `height:${detent.height}`;
    }
  }

  return null;
}

function isDefined<T>(value: T | undefined): value is T {
  return value !== undefined;
}

function encodeSheetOptions<T extends ISheetOptions>(
  options?: T,
): INativeSheetOptions | undefined {
  if (!options) return undefined;

  const encoded: INativeSheetOptions = {};

  if (options.detents) {
    const detents = options.detents
      .map(encodeDetent)
      .filter((detent): detent is string => detent !== null);
    if (detents.length > 0) encoded.detents = detents;
  }

  if (isDefined(options.grabber)) encoded.grabber = options.grabber;
  if (isDefined(options.cornerRadius))
    encoded.cornerRadius = options.cornerRadius;
  if (isDefined(options.dismissible)) encoded.dismissible = options.dismissible;
  if (isDefined(options.expandsWhenScrolledToEdge)) {
    encoded.expandsWhenScrolledToEdge = options.expandsWhenScrolledToEdge;
  }

  if (options.largestUndimmedDetent) {
    const detent = encodeDetent(options.largestUndimmedDetent);
    if (detent !== null) encoded.largestUndimmedDetent = detent;
  }
  return encoded;
}

export { encodeDetent, encodeSheetOptions };
