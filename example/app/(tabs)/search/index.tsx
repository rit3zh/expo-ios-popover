import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

export default function Search() {
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
          headerSearchBarOptions: {},
        }}
      />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#000000",
        }}
      >
        <Text style={{ color: "#ffffff" }}>Settings</Text>
      </View>
    </>
  );
}
