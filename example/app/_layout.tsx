import { NativeTabs } from "expo-router/unstable-native-tabs";
import { Appearance } from "react-native";

Appearance.setColorScheme("dark");

export default function Layout() {
  return (
    <NativeTabs tintColor={"orange"}>
      <NativeTabs.Trigger
        name="index"
        options={{
          title: "Home",
          icon: {
            sf: "house",
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
    </NativeTabs>
  );
}
