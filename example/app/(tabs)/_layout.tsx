import { NativeTabs } from "expo-router/unstable-native-tabs";
import { Appearance } from "react-native";
import { INVOICE_COLORS } from "../../constants";

Appearance.setColorScheme("light");

export default function Layout() {
  return (
    <NativeTabs tintColor={INVOICE_COLORS.text} minimizeBehavior="onScrollDown">
      <NativeTabs.Trigger
        name="index"
        options={{
          title: "Grid",
          icon: {
            sf: "square.grid.2x2",
          },
          selectedIcon: {
            sf: "square.grid.2x2.fill",
          },
        }}
      />
      <NativeTabs.Trigger
        name="list"
        options={{
          title: "List",
          icon: {
            sf: "rectangle.grid.1x2",
          },
          selectedIcon: {
            sf: "rectangle.grid.1x2.fill",
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
