import { NativeTabs } from "expo-router/unstable-native-tabs";
import { Appearance } from "react-native";

Appearance.setColorScheme("dark");

export default function Layout() {
  return (
    <NativeTabs tintColor={"orange"} minimizeBehavior="onScrollDown">
      <NativeTabs.Trigger
        name="index"
        options={{
          title: "Home",
          icon: {
            sf: "house",
          },
          selectedIcon: {
            sf: "house.fill",
          },
        }}
      />
      <NativeTabs.Trigger
        name="explore"
        options={{
          title: "Explore",
          icon: {
            sf: "square.stack",
          },
          selectedIcon: {
            sf: "square.stack.fill",
          },
        }}
      />
      <NativeTabs.Trigger
        name="settings"
        options={{
          title: "Settings",
          icon: {
            sf: "gear",
          },
        }}
      />

      <NativeTabs.Trigger
        name="search"
        options={{
          title: "Search",
          role: "search",

          icon: {
            sf: "magnifyingglass",
          },
        }}
      />
    </NativeTabs>
  );
}
