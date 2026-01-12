# ✏️ Popover

A **native iOS Popover** for React Native + Expo.

https://github.com/user-attachments/assets/1eedbd6b-1991-4588-862f-eb6e2175997d

## ⚡ Features

- 🔥 **Native iOS popover style**
- 🎨 **Customizable width, height & background**
- 💎 **Simple API:** `Popover`, `Popover.Trigger`, `Popover.Content`
- ✨ **Easy to integrate** into any Expo project

---

## 🧩 Usage

```tsx
import React from "react";
import { View, Text, Pressable } from "react-native";
import { Popover } from "expo-ios-popover";

export default function App() {
  return (
    <Popover>
      <Popover.Trigger>
        <Text
          style={{
            color: "#fff",
          }}
        >
          Tap me to see a hidden message
        </Text>
      </Popover.Trigger>
      <Popover.Content>
        <View>
          <Text
            style={{
              padding: 20,
              color: "#fff",
            }}
          >
            You are an amazing developer!
          </Text>
        </View>
      </Popover.Content>
    </Popover>
  );
}
```

---

### `Popover.Trigger` & `Popover.Content`

- 🔘 **Trigger:** pressable element to open popover
- 🎯 **Content:** popover panel; width & height default to `200`

---

## 🚀 Installation

```bash
bun install expo-ios-popover
```

---

## 🎨 License

MIT © 2026
