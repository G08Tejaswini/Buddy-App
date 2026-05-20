import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../constants";


export default function Welcome({ signIn, loading }) {
  const theme = useTheme();

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.bg }]}>
      <View style={styles.container}>
        <Text style={styles.emoji}>🧸</Text>
        <Text style={[styles.title, { color: theme.text }]}>StreakBuddy</Text>
        <Text style={[styles.sub, { color: theme.textSecondary }]}>
          your personal hype squad 🔥
        </Text>

        <TouchableOpacity
          style={[styles.btn, { backgroundColor: theme.accent }]}
          onPress={signIn}
          disabled={loading}
          activeOpacity={0.8}
        >
        <Text style={styles.btnText}>
        {loading ? "Loading..." : Platform.OS === "web" ? "Sign in with Google" : "Start your journey 🚀"}
        </Text>
        </TouchableOpacity>

        <Text style={[styles.finePrint, { color: theme.textSecondary }]}>
          We only use your name and email to save your streaks safely in the cloud ☁️
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    gap: 16,
  },
  emoji: { fontSize: 64, marginBottom: 8 },
  title: { fontSize: 32, fontWeight: "800", letterSpacing: -0.5 },
  sub: { fontSize: 16, textAlign: "center" },
  btn: {
    marginTop: 32,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 16,
    width: "100%",
    alignItems: "center",
  },
  btnText: { color: "#fff", fontSize: 17, fontWeight: "700" },
  finePrint: { fontSize: 12, textAlign: "center", marginTop: 16, paddingHorizontal: 20 },
});