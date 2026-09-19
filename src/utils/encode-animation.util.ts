import type {
  INativeAnimation,
  INativeAnimations,
  IPopoverAnimations,
  TPopoverAnimation,
} from "../interfaces";

function encodeAnimation<T extends TPopoverAnimation>(
  animation: T,
): INativeAnimation {
  switch (animation.type) {
    case "spring": {
      if ("stiffness" in animation) {
        return {
          type: "spring",
          stiffness: animation.stiffness,
          damping: animation.damping,
          mass: animation.mass,
          velocity: animation.velocity,
        };
      }

      return {
        type: "spring",
        duration: toSeconds<number>(animation.duration),
        bounce: animation.bounce,
        velocity: animation.velocity,
      };
    }

    case "timing": {
      const { easing } = animation;
      return {
        type: "timing",
        duration: toSeconds<number>(animation.duration),
        ...(Array.isArray(easing) ? { controlPoints: easing } : { easing }),
      };
    }

    default:
      return { type: animation.type };
  }
}

function toSeconds<T extends number | undefined>(
  milliseconds?: T,
): T | undefined {
  return milliseconds === undefined ? undefined : ((milliseconds / 1000) as T);
}

function isSingleAnimation<T extends TPopoverAnimation>(
  value: T | IPopoverAnimations,
): value is T {
  return "type" in value;
}

function encodeAnimations<T extends TPopoverAnimation | IPopoverAnimations>(
  animation?: T,
): INativeAnimations | undefined {
  if (!animation) return undefined;

  if (isSingleAnimation<TPopoverAnimation>(animation)) {
    const encoded = encodeAnimation<TPopoverAnimation>(animation);
    return { present: encoded, dismiss: encoded, resize: encoded };
  }

  const encoded: INativeAnimations = {};
  if (animation.present)
    encoded.present = encodeAnimation<TPopoverAnimation>(animation.present);
  if (animation.dismiss)
    encoded.dismiss = encodeAnimation<TPopoverAnimation>(animation.dismiss);
  if (animation.resize)
    encoded.resize = encodeAnimation<TPopoverAnimation>(animation.resize);
  return encoded;
}

export { encodeAnimation, encodeAnimations };
