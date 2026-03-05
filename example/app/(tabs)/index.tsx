import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
  Appearance,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Popover from "expo-ios-popover";
import { ArrowEdge } from "expo-ios-popover";

const { width, height } = Dimensions.get("window");

interface Destination {
  id: string;
  name: string;
  image: string;
}

const TravelHomeScreen: React.FC = () => {
  useEffect(() => {
    Appearance.setColorScheme("dark");
  }, []);

  const destinations: Destination[] = [
    {
      id: "1",
      name: "France",
      image: "https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg",
    },
    {
      id: "2",
      name: "Italy",
      image:
        "https://images.travelandleisureasia.com/wp-content/uploads/sites/2/2024/03/18170044/venice.jpeg",
    },
    {
      id: "3",
      name: "England",
      image:
        "https://plus.unsplash.com/premium_photo-1661962726504-fa8f464a1bb8?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZW5nbGFuZHxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: "4",
      name: "Greece",
      image:
        "https://plus.unsplash.com/premium_photo-1661964149725-fbf14eabd38c?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3JlZWNlfGVufDB8fDB8fHww",
    },
  ];

  return (
    <>
      <ScrollView
        contentInsetAdjustmentBehavior="always"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, backgroundColor: "black" }}
        style={{
          backgroundColor: "black",
        }}
      >
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="default" />

          <View
            style={{
              paddingTop: StatusBar.currentHeight
                ? StatusBar.currentHeight + 8
                : 15,
            }}
          />

          <TouchableOpacity style={styles.offerCard} activeOpacity={0.8}>
            <Popover.Root direction={ArrowEdge.Bottom}>
              <Popover.Trigger>
                <View style={styles.offerContent}>
                  <View>
                    <Text style={styles.offerLabel}>Limited Time</Text>
                    <Text style={styles.offerTitle}>Early Bird Special</Text>
                    <Text style={styles.offerDescription}>
                      Save up to 30% on select destinations
                    </Text>
                  </View>
                  <Ionicons name="arrow-forward" size={20} color="#000" />
                </View>
              </Popover.Trigger>
              <Popover.Content
                style={{
                  // padding: 20,
                  paddingHorizontal: 20,
                  borderRadius: 16,
                  paddingTop: 40,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <Ionicons name="airplane" size={28} color="#4cd964" />
                  <View>
                    <Text
                      style={{ fontSize: 16, fontWeight: "700", color: "#fff" }}
                    >
                      Freebird Sale
                    </Text>
                    <Text
                      style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}
                    >
                      Exclusive travel discounts
                    </Text>
                  </View>
                </View>

                <Text
                  style={{
                    fontSize: 14,
                    lineHeight: 20,
                    color: "#e5e5e7",
                    marginTop: 16,
                  }}
                >
                  For a limited time, save up to{" "}
                  <Text
                    style={{ fontWeight: "700", color: "#4cd964" }}
                    onPress={() => alert("e")}
                  >
                    50%
                  </Text>{" "}
                  on flights with Freebird. Book your getaway now and enjoy more
                  for less.
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: 20,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Popover.Pressable onPress={() => console.log("Saved Offer")}>
                    <View style={styles.saveButton}>
                      <Ionicons
                        name="bookmark-outline"
                        size={16}
                        color="#2a88ec"
                      />
                      <Text style={styles.saveText}>Save Offer</Text>
                    </View>
                  </Popover.Pressable>
                  <Popover.Pressable onPress={() => alert("Dismiss Offer")}>
                    <View style={styles.deleteButton}>
                      <Ionicons name="trash" size={16} color="#dc2626" />
                      <Text style={styles.deleteText}>Dismiss Offer</Text>
                    </View>
                  </Popover.Pressable>
                </View>
              </Popover.Content>
            </Popover.Root>
          </TouchableOpacity>

          <View style={styles.exploreSection}>
            <Text style={styles.sectionTitle}>Explore Destinations</Text>
            <View style={styles.destinationsGrid}>
              {destinations.map((destination: Partial<Destination>) => (
                <TouchableOpacity
                  key={destination.id}
                  style={styles.destinationCard}
                  activeOpacity={0.8}
                >
                  <Image
                    source={{ uri: destination.image }}
                    style={styles.destinationImage}
                  />
                  <View style={styles.destinationOverlay} />
                  <Text style={styles.destinationName}>{destination.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 26,
    marginTop: 8,
  },
  logo: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
    letterSpacing: -0.5,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 24,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    color: "#fff",
  },
  recentSection: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 12,
  },
  recentRow: {
    flexDirection: "row",
    gap: 10,
  },
  recentCard: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  recentTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 2,
  },
  recentSubtitle: {
    fontSize: 11,
    color: "rgba(255,255,255,0.5)",
  },
  quickLinks: {
    flexDirection: "row",
    paddingHorizontal: 24,
    gap: 8,
    marginBottom: 16,
  },
  linkButton: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    gap: 4,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  linkText: {
    color: "#fff",
    fontSize: 11,
    fontWeight: "500",
  },
  offerCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 18,

    marginHorizontal: 24,
    marginBottom: 20,
  },
  offerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  offerLabel: {
    fontSize: 10,
    fontWeight: "600",
    color: "rgba(0,0,0,0.5)",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  offerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#000",
    marginBottom: 2,
  },
  offerDescription: {
    fontSize: 13,
    color: "rgba(0,0,0,0.7)",
  },
  exploreSection: {
    flex: 1,
    paddingHorizontal: 24,
  },
  destinationsGrid: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  destinationCard: {
    width: width - 48 - 10,
    height: (height - 480) / 1,
    borderRadius: 14,
    overflow: "hidden",
    minHeight: 120,
    maxHeight: 160,
  },
  destinationImage: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  destinationOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  destinationName: {
    position: "absolute",
    bottom: 12,
    left: 12,
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },
  bottomTabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.08)",
    backgroundColor: "rgba(0,0,0,0.95)",
  },
  tabItem: {
    padding: 8,
  },
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 26,
    paddingVertical: 11,
    marginHorizontal: 6,

    borderRadius: 90,
    backgroundColor: "rgba(220,38,38,0.12)",
  },
  saveButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 26,
    paddingVertical: 11,
    marginHorizontal: 6,
    borderRadius: 90,
    backgroundColor: "rgba(44, 154, 244, 0.15)",
  },
  saveText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#2a88ec",
    letterSpacing: -0.2,
  },

  deleteText: {
    fontSize: 13,
    fontWeight: "500",
    color: "#dc2626",
    letterSpacing: -0.2,
  },
});

export default TravelHomeScreen;
