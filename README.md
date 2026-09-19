# expo-ios-popover

A native iOS popover component for React Native + Expo — built on `UIPopoverPresentationController` for that authentic platform feel.

https://github.com/user-attachments/assets/f005323c-eef0-42d8-8431-ec5056044452


## Features

- Native `UIPopoverPresentationController` under the hood
- Compound component API — `Popover`, `Popover.Trigger`, `Popover.Content`, `Popover.Pressable`
- Configurable arrow direction, trigger type, background color, and animation
- Optional matched transition that morphs the trigger into a sheet on iOS 18+
- Sheet detents, grabber, corner radius and dimming, as on any bottom sheet
- Blur and iOS 26 Liquid Glass backgrounds, with a blur fallback
- Custom spring and timing animations for present, dismiss and resize
- Auto-sizing popover based on content
- Visibility and dismiss callbacks

## Installation

```bash
bun install expo-ios-popover
```

This module includes native iOS code, so you need to prebuild and run on a real device or simulator — Expo Go is not supported.

```bash
bunx expo prebuild --platform ios
bunx expo run:ios
```

> If you've already prebuilt your project, just re-run `expo run:ios` after installing.

## Usage

Named import (compound component style):

```tsx
import { Popover } from "expo-ios-popover";

<Popover>
  <Popover.Trigger>…</Popover.Trigger>
  <Popover.Content>…</Popover.Content>
</Popover>;
```

Namespace import:

```tsx
import * as Popover from "expo-ios-popover";

<Popover.Root>
  <Popover.Trigger>…</Popover.Trigger>
  <Popover.Content>…</Popover.Content>
</Popover.Root>;
```

## Quick Start

```tsx
import { Popover } from "expo-ios-popover";
import { Text, View } from "react-native";

export default function App() {
  return (
    <Popover>
      <Popover.Trigger>
        <Text style={{ color: "#fff" }}>Tap me</Text>
      </Popover.Trigger>
      <Popover.Content style={{ backgroundColor: "#1c1c1e" }}>
        <View style={{ padding: 20 }}>
          <Text style={{ color: "#fff" }}>Hello from the popover!</Text>
        </View>
      </Popover.Content>
    </Popover>
  );
}
```

## API

### `<Popover>` / `<Popover.Root>`

The root wrapper. Manages trigger gestures and popover presentation.

| Prop                 | Type                                       | Default                     | Description                                                          |
| -------------------- | ------------------------------------------ | --------------------------- | -------------------------------------------------------------------- |
| `direction`          | `ArrowEdge`                                | `ArrowEdge.Any`             | Permitted arrow direction                                            |
| `trigger`            | `TriggerType`                              | `TriggerType.Tap`           | Gesture that opens the popover                                       |
| `animated`           | `boolean`                                  | `true`                      | Animate presentation and dismissal                                   |
| `transition`         | `PopoverTransition`                        | `PopoverTransition.Default` | How the content is presented. See [Matched Transition](#matched-transition) |
| `background`         | `PopoverBackground`                        | `PopoverBackground.Default` | Material drawn behind the content. See [Backgrounds](#backgrounds)   |
| `sheet`              | `ISheetOptions`                            | —                           | Sheet behavior for the matched transition. See [Sheet options](#sheet-options) |
| `animation`          | `TPopoverAnimation \| IPopoverAnimations` | system                      | Custom animations. See [Custom Animations](#custom-animations)       |
| `onVisibilityChange` | `(visible: boolean) => void`               | —                           | Called when the popover opens or closes                              |

`transition` and `background` also accept the enum's plain string value, so
`transition="matched"` and `background="glass"` type check too.

### `<Popover.Trigger>`

Wrap any element to make it the anchor for the popover. Accepts an optional `style` prop.

### `<Popover.Content>`

The popover body. Sizes itself automatically to fit its children.

| Prop        | Type         | Default | Description                                                                                        |
| ----------- | ------------ | ------- | -------------------------------------------------------------------------------------------------- |
| `style`     | `ViewStyle`  | —       | Style applied to the inner container. `backgroundColor` is forwarded to the native popover chrome. |
| `onDismiss` | `() => void` | —       | Called when the popover is dismissed                                                               |

### `<Popover.Pressable>`

A pressable view for use inside the popover content. React Native's own
`Pressable`, `TouchableOpacity` and touch handlers also work inside
`<Popover.Content>`, in both the popover and the sheet, and are preferred for
ordinary presses. Reach for this one when a tap should close the popover.

| Prop             | Type         | Description                                                                 |
| ---------------- | ------------ | --------------------------------------------------------------------------- |
| `style`          | `ViewStyle`  | Container style                                                             |
| `onPress`        | `() => void` | Press handler                                                               |
| `dismissOnPress` | `boolean`    | Close the popover or sheet when tapped, after `onPress` runs. Defaults to `false`. |

```tsx
<Popover.Pressable dismissOnPress onPress={save}>
  <Text>Save</Text>
</Popover.Pressable>
```

## Enums

### `ArrowEdge`

Controls which direction the popover arrow is allowed to point.

| Value                | Native direction                          |
| -------------------- | ----------------------------------------- |
| `ArrowEdge.Top`      | Arrow points down (popover above trigger) |
| `ArrowEdge.Bottom`   | Arrow points up (popover below trigger)   |
| `ArrowEdge.Leading`  | Arrow points right (popover to the left)  |
| `ArrowEdge.Trailing` | Arrow points left (popover to the right)  |
| `ArrowEdge.Any`      | System decides (default)                  |
| `ArrowEdge.None`     | No arrow                                  |

### `TriggerType`

| Value                   | Gesture              |
| ----------------------- | -------------------- |
| `TriggerType.Tap`       | Single tap (default) |
| `TriggerType.LongPress` | Long press           |
| `TriggerType.DoubleTap` | Double tap           |

### `PopoverTransition`

| Value                       | Presentation                                 |
| --------------------------- | -------------------------------------------- |
| `PopoverTransition.Default` | Popover anchored to the trigger (default)    |
| `PopoverTransition.Matched` | Sheet that the trigger morphs into (iOS 18+) |

### `PopoverBackground`

| Value                          | Material                                           |
| ------------------------------ | -------------------------------------------------- |
| `PopoverBackground.Default`    | Plain, filled with the content's `backgroundColor` |
| `PopoverBackground.Blur`       | Standard blur                                      |
| `PopoverBackground.Glass`      | Liquid Glass, regular style (iOS 26+)              |
| `PopoverBackground.ClearGlass` | Liquid Glass, clear style (iOS 26+)                |

## Matched Transition

By default the content is presented as a popover with the system popover
animation. Pass `transition` to morph the trigger into the content instead:

```tsx
import { Popover, PopoverTransition } from "expo-ios-popover";

<Popover transition={PopoverTransition.Matched}>
  <Popover.Trigger>…</Popover.Trigger>
  <Popover.Content>…</Popover.Content>
</Popover>;
```

Two things are worth knowing before you reach for it.

**It is a sheet, not a popover.** UIKit runs its zoom transition for sheet, full
screen and custom presentations, but not for popovers. Matching the trigger to
the content therefore means giving up the popover and its arrow, so `direction`
has no effect in this mode. The content is presented as a page sheet sized to
fit, with a grabber.

**It degrades on its own.** The zoom transition arrived in iOS 18. On anything
older, `PopoverTransition.Matched` presents the ordinary popover, so the prop is
always safe to pass and needs no version check of your own.

Everything else is unchanged. A `<Popover>` without a `transition` prop behaves
exactly as it always has.

### Sheet options

`sheet` configures the sheet the same way you would any bottom sheet. It is
ignored when the content is presented as a popover.

| Option                      | Type             | Default      | Description                                                     |
| --------------------------- | ---------------- | ------------ | --------------------------------------------------------------- |
| `detents`                   | `TSheetDetent[]` | `["fitted"]` | Heights the sheet may rest at, shortest first. Opens at the first |
| `grabber`                   | `boolean`        | `true`       | Draw the drag indicator                                         |
| `cornerRadius`              | `number`         | system       | Corner radius override                                          |
| `dismissible`               | `boolean`        | `true`       | Allow swipe down and tap outside to close                       |
| `expandsWhenScrolledToEdge` | `boolean`        | `true`       | Drags move the sheet, not a list inside, until it is fully open |
| `largestUndimmedDetent`     | `TSheetDetent`   | —            | Tallest detent that leaves the app behind undimmed and usable   |

A `TSheetDetent` is `"fitted"`, `"medium"`, `"large"`, a percentage like `"50%"`,
`{ fraction }` from 0 to 1, or `{ height }` in points.

```tsx
<Popover
  transition={PopoverTransition.Matched}
  sheet={{
    detents: ["50%", "80%", "100%"],
    cornerRadius: 28,
  }}
>
```

List detents shortest first. Each swipe moves the sheet one detent, up or down,
however fast it is, and a swipe down only closes the sheet once it is at the
shortest. Out of order, that stepping breaks.

With a scroll view inside, the sheet gets the drag first. Below the tallest
detent the list stays put and every swipe moves the sheet, so the example above
goes 50% → 80% → 100%. Only at 100% does the list scroll, and once it is back at
its top, pulling down moves the sheet again: 100% → 80% → 50%. Set
`expandsWhenScrolledToEdge: false` to let the list scroll at every detent.

### Sizing, and scroll views

Which way the sizing runs depends on the detents.

**With `fitted`, the content leads.** The sheet takes its height from whatever
the content measures, and follows it as that changes. Give the content a size
and the sheet matches it.

**With any other detent, the sheet leads.** It has a height of its own, so the
content is stretched to fill it, and any `width` or `height` in the content's
own style is overridden. This is what gives a scroll view a bound to scroll
within, so the usual layout just works:

```tsx
<Popover.Content style={{ paddingHorizontal: 24 }}>
  <Text>Itinerary</Text>
  <ScrollView style={{ flex: 1 }}>…</ScrollView>
</Popover.Content>
```

React Native lays the content out before the sheet exists, so it cannot know
that size in advance. The sheet reports it once it has one, and the content
re-lays out to match. On the very first open you may see the content settle into
place; after that the size is already known.

Measurement also stops at a scroll view rather than descending into its content.
Without that, a `fitted` sheet would grow to fit everything you meant to scroll.

## Backgrounds

### Color

Pass `backgroundColor` through the `style` prop on `Popover.Content` and it is
forwarded to the native chrome, meaning the arrow and the outer container.
Supports hex values (`#1c1c1e`, `#FF000080`) and named colors (`red`, `black`,
`transparent`).

### Material

`background` picks the material behind the content, from the values of
[`PopoverBackground`](#popoverbackground). It works for both the popover and the
matched sheet.

Liquid Glass needs iOS 26. On anything older both glass values fall back to a
blur, so the content keeps a legible backdrop instead of losing its background.

With any material, a `backgroundColor` on the content tints the glass rather
than covering it. Leave the color off for plain glass.

```tsx
<Popover
  transition={PopoverTransition.Matched}
  background={PopoverBackground.Glass}
>
```

## Custom Animations

By default the popover uses the system animations. Pass `animation` to replace
them with a spring or a timing curve. Durations are in milliseconds.

One animation applies to everything:

```tsx
<Popover animation={{ type: "spring", duration: 400, bounce: 0.25 }}>
```

Or set each change separately. Anything left out keeps the system animation.

```tsx
<Popover
  animation={{
    present: { type: "spring", stiffness: 260, damping: 20 },
    dismiss: { type: "timing", duration: 180, easing: "easeIn" },
    resize: { type: "spring", duration: 300, bounce: 0 },
  }}
>
```

| Key       | What it animates                                                   |
| --------- | ------------------------------------------------------------------ |
| `present` | The popover growing out of its trigger                             |
| `dismiss` | The popover shrinking back into its trigger                        |
| `resize`  | The popover, or a `fitted` sheet, following its content's size     |

### Animation types

| Type                       | Options                                                                                         |
| -------------------------- | ----------------------------------------------------------------------------------------------- |
| `{ type: "spring" }`       | `duration` (default `350`), `bounce` from `0` to `1` (default `0.15`), `velocity` (default `0`) |
| `{ type: "spring" }`       | `stiffness`, `damping`, `mass` (default `1`), `velocity`. Physics based, so no `duration`       |
| `{ type: "timing" }`       | `duration` (default `250`), `easing` (default `"easeInOut"`)                                    |
| `{ type: "system" }`       | Whatever iOS does by default                                                                    |
| `{ type: "none" }`         | No animation                                                                                    |

`easing` is `"linear"`, `"easeIn"`, `"easeOut"`, `"easeInOut"`, or cubic bezier
control points `[x1, y1, x2, y2]`, the same numbers CSS `cubic-bezier()` takes.

A matched sheet always opens and closes with the system zoom, which cannot be
retimed, so only `resize` applies to it. `animation` is ignored when `animated`
is `false`.

## TypeScript

Every prop type is exported alongside the components:

```ts
import type {
  IPopover, // <Popover> props
  IPopoverContent,
  IPopoverTrigger,
  IPopoverPressable,
  ISheetOptions,
  TSheetDetent,
  TPopoverAnimation,
  IPopoverAnimations,
  TPopoverEasing,
} from "expo-ios-popover";
```

## Full Example

```tsx
import * as Popover from "expo-ios-popover";
import { ArrowEdge, TriggerType } from "expo-ios-popover";
import { Text, View } from "react-native";

export default function App() {
  return (
    <Popover.Root
      direction={ArrowEdge.Top}
      trigger={TriggerType.LongPress}
      onVisibilityChange={(visible) => console.log("open:", visible)}
    >
      <Popover.Trigger>
        <View style={{ padding: 16, backgroundColor: "#333", borderRadius: 8 }}>
          <Text style={{ color: "#fff" }}>Long press me</Text>
        </View>
      </Popover.Trigger>

      <Popover.Content
        style={{ borderRadius: 12, padding: 16 }}
        onDismiss={() => console.log("dismissed")}
      >
        <Text style={{ color: "#fff", fontSize: 16 }}>
          You are an awesome developer!
        </Text>
      </Popover.Content>
    </Popover.Root>
  );
}
```

## Requirements

- iOS 15.1+ — this module uses `UIPopoverPresentationController`, an iOS-specific API
  - `PopoverTransition.Matched` needs iOS 18+ and falls back to the popover below that
  - Liquid Glass backgrounds need iOS 26+ and fall back to a blur below that
- Expo SDK with a [development build](https://docs.expo.dev/develop/development-builds/introduction/) or bare workflow (Expo Go is **not** supported)
- React Native 0.74+

## License

MIT © 2026
