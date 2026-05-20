import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Switch, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../constants";

export default function Account({ 
  user, signOut, onBack, setScreen,
  soundEnabled, setSoundEnabled,
  hapticsEnabled, setHapticsEnabled,
  isDarkMode, setIsDarkMode,
  notificationsEnabled, setNotificationsEnabled 
}) {
  const theme = useTheme();

  // The local useState lines have been removed here since the parent hook now controls them!

  const handleDeleteAccount = () => {
    Alert.alert(
      "Delete Account 🚨",
      "Are you absolutely sure? This will permanently delete your profile and erase all your current streaks. This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete Everything", 
          style: "destructive", 
          onPress: () => {
            alert("Account data deleted successfully.");
            signOut();
          } 
        }
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.bg }]}>
      {/* Header */}
      <View style={[styles.header, { borderBottomColor: theme.cardBorder }]}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={[styles.backText, { color: theme.textSecondary }]}>← Back</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.text }]}>Settings & Profile</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Profile Card Section */}
        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
          {user?.photo ? (
            <Image source={{ uri: user.photo }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatarPlaceholder, { backgroundColor: theme.chipBg }]}>
              <Text style={{ fontSize: 32 }}>🧸</Text>
            </View>
          )}
          <Text style={[styles.name, { color: theme.text }]}>{user?.name || "Streak Buddy"}</Text>
          <Text style={[styles.email, { color: theme.textSecondary }]}>{user?.email}</Text>
        </View>

        {/* Preferences Section */}
        <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>PREFERENCES</Text>
        <View style={[styles.settingGroup, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
          
          <View style={styles.settingRow}>
            <Text style={[styles.settingLabel, { color: theme.text }]}>Sound Effects 🔊</Text>
            <Switch value={soundEnabled} onValueChange={setSoundEnabled} trackColor={{ true: theme.accent }} />
          </View>

          <View style={[styles.divider, { backgroundColor: theme.cardBorder }]} />

          <View style={styles.settingRow}>
            <Text style={[styles.settingLabel, { color: theme.text }]}>Haptic Feedback 📳</Text>
            <Switch value={hapticsEnabled} onValueChange={setHapticsEnabled} trackColor={{ true: theme.accent }} />
          </View>

          <View style={[styles.divider, { backgroundColor: theme.cardBorder }]} />

          <View style={styles.settingRow}>
            <Text style={[styles.settingLabel, { color: theme.text }]}>Dark Appearance 🌙</Text>
            <Switch value={isDarkMode} onValueChange={setIsDarkMode} trackColor={{ true: theme.accent }} />
          </View>

          <View style={[styles.divider, { backgroundColor: theme.cardBorder }]} />

          <View style={styles.settingRow}>
            <Text style={[styles.settingLabel, { color: theme.text }]}>Streak Reminders ⏰</Text>
            <Switch value={notificationsEnabled} onValueChange={setNotificationsEnabled} trackColor={{ true: theme.accent }} />
          </View>
        </View>

        {/* Data & System Section */}
        <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>DATA</Text>
        <View style={[styles.settingGroup, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
          <TouchableOpacity style={styles.settingRow} onPress={() => alert("Exported streaks data backup format!")}>
            <Text style={[styles.settingLabel, { color: theme.text }]}>Export Streak Backup (.json) 💾</Text>
            <Text style={{ color: theme.textSecondary }}>▀</Text>
          </TouchableOpacity>
        </View>

        {/* Account Lifecycle Management */}
        <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>ACCOUNT SESSIONS</Text>
        <View style={styles.actionContainer}>
          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: theme.chipBg }]} onPress={signOut}>
            <Text style={[styles.actionBtnText, { color: theme.text }]}>Switch Google Account 🔄</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: "#ef4444" }]} onPress={signOut}>
            <Text style={[styles.actionBtnText, { color: "#fff" }]}>Sign Out 👋</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.actionBtn, { backgroundColor: "rgba(239, 68, 68, 0.1)", borderWidth: 1, borderColor: "#ef4444" }]} onPress={handleDeleteAccount}>
            <Text style={[styles.actionBtnText, { color: "#ef4444" }]}>Delete App Account 🚨</Text>
          </TouchableOpacity>
        </View>

        {/* Credits footer */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: theme.textSecondary }]}>StreakBuddy v1.0.0</Text>
          <Text style={[styles.footerText, { color: theme.textSecondary, fontSize: 11 }]}>Made with 🔥 for the hype squad</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 1 },
  backBtn: { width: 60 },
  backText: { fontSize: 16, fontWeight: "600" },
  title: { fontSize: 18, fontWeight: "700" },
  scrollContent: { padding: 20, paddingBottom: 40 },
  card: { alignItems: "center", padding: 24, borderRadius: 20, borderWidth: 1, gap: 4, marginBottom: 24 },
  avatar: { width: 80, height: 80, borderRadius: 40, marginBottom: 8 },
  avatarPlaceholder: { width: 80, height: 80, borderRadius: 40, alignItems: "center", justifyContent: "center", marginBottom: 8 },
  name: { fontSize: 20, fontWeight: "700" },
  email: { fontSize: 14 },
  sectionTitle: { fontSize: 11, fontWeight: "700", letterSpacing: 1, textTransform: "uppercase", marginBottom: 10, paddingLeft: 4 },
  settingGroup: { borderRadius: 20, borderWidth: 1, overflow: "hidden", marginBottom: 24 },
  settingRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 16, paddingVertical: 14 },
  settingLabel: { fontSize: 15, fontWeight: "600" },
  divider: { height: 1 },
  actionContainer: { gap: 12, marginBottom: 32 },
  actionBtn: { paddingVertical: 16, borderRadius: 16, alignItems: "center", justifyContent: "center" },
  actionBtnText: { fontSize: 16, fontWeight: "700" },
  footer: { alignItems: "center", gap: 4, marginTop: 16 },
  footerText: { fontSize: 13, fontWeight: "600" }
});