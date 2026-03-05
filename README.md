# expo-ios-popover

A native iOS popover component for React Native + Expo — built on `UIPopoverPresentationController` for that authentic platform feel.

https://github.com/user-attachments/assets/f005323c-eef0-42d8-8431-ec5056044452


## Features

- Native `UIPopoverPresentationController` under the hood
- Compound component API — `Popover`, `Popover.Trigger`, `Popover.Content`, `Popover.Pressable`
- Configurable arrow direction, trigger type, background color, and animation
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

| Prop                 | Type                         | Default | Description                             |
| -------------------- | ---------------------------- | ------- | --------------------------------------- |
| `direction`          | `ArrowEdge`                  | `"any"` | Permitted arrow direction               |
| `trigger`            | `TriggerType`                | `"tap"` | Gesture that opens the popover          |
| `animated`           | `boolean`                    | `true`  | Animate presentation and dismissal      |
| `onVisibilityChange` | `(visible: boolean) => void` | —       | Called when the popover opens or closes |

### `<Popover.Trigger>`

Wrap any element to make it the anchor for the popover. Accepts an optional `style` prop.

### `<Popover.Content>`

The popover body. Sizes itself automatically to fit its children.

| Prop        | Type         | Default | Description                                                                                        |
| ----------- | ------------ | ------- | -------------------------------------------------------------------------------------------------- |
| `style`     | `ViewStyle`  | —       | Style applied to the inner container. `backgroundColor` is forwarded to the native popover chrome. |
| `onDismiss` | `() => void` | —       | Called when the popover is dismissed                                                               |

### `<Popover.Pressable>`

A pressable view for use inside the popover content. Useful for action buttons that need touch feedback.

| Prop      | Type         | Description     |
| --------- | ------------ | --------------- |
| `style`   | `ViewStyle`  | Container style |
| `onPress` | `() => void` | Press handler   |

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

## Background Color

Pass `backgroundColor` through the `style` prop on `Popover.Content` — it's automatically forwarded to the native popover chrome (the arrow and outer container). Supports hex values (`#1c1c1e`, `#FF000080`) and named colors (`red`, `black`, `transparent`, etc.).

## Requirements

- iOS only — this module uses `UIPopoverPresentationController`, an iOS-specific API
- Expo SDK with a [development build](https://docs.expo.dev/develop/development-builds/introduction/) or bare workflow (Expo Go is **not** supported)
- React Native 0.74+

## License

MIT © 2026
