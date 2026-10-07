import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { APP_NAME, type HealthResponse } from "@electrical-hero/shared";

// On a physical device, set EXPO_PUBLIC_API_URL to your machine's LAN IP.
const API_URL = process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3000";

export default function App() {
  const [health, setHealth] = useState("checking...");

  useEffect(() => {
    fetch(`${API_URL}/health`)
      .then((r) => r.json() as Promise<HealthResponse>)
      .then((h) => setHealth(h.status))
      .catch(() => setHealth("server unreachable"));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{APP_NAME}</Text>
      <Text>Server: {health}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  title: { fontSize: 24, fontWeight: "bold" },
});
