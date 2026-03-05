import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        title: "Travel",
        headerTransparent: true,
        headerLargeTitleEnabled: false,
        headerTintColor: "white",
      }}
    >
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
