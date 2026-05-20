import { useRef, useState, useEffect } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Animated,
  StyleSheet,
  Dimensions,
  Platform,
  Keyboard,
} from "react-native";
import BuddyAvatar from "../components/BuddyAvatar";
import ConfettiPiece from "../components/ConfettiPiece";
import Section from "../components/Section";
import { useTheme } from "../../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");
const CONFETTI_COUNT = 20;

export default function Home({
  setScreen,
  buddy,
  streaks,
  newStreak,
  setNewStreak,
  celebratingIdx,
  confetti,
  buddyMessage,
  buddyMood,
  buddyBounce,
  personality,
  checkIn,
  freezeStreak,
  addStreak,
  deleteStreak,
  completedToday,
  totalStreaksCreated,
  activeStreaks,
  longestStreak,
  totalCheckIns,
  freezesUsed,
  badges,
  recentSound,
}) {
  const theme = useTheme();
  const buddyScale = useRef(new Animated.Value(1)).current;
  const [currentTab, setCurrentTab] = useState('streaks');
  const [showAddModal, setShowAddModal] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const showSub = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (e) => setKeyboardHeight(e.endCoordinates.height)
    );
    const hideSub = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => setKeyboardHeight(0)
    );
    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  useEffect(() => {
    if (buddyBounce) {
      Animated.sequence([
        Animated.spring(buddyScale, { toValue: 1.15, friction: 4, useNativeDriver: true }),
        Animated.spring(buddyScale, { toValue: 1, friction: 5, useNativeDriver: true }),
      ]).start();
    }
  }, [buddyBounce]);  

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.bg }]}>
      {/* Confetti */}
      {confetti ? (
        <View style={styles.confettiContainer} pointerEvents="none">
          {Array.from({ length: CONFETTI_COUNT }).map((_, i) => (
            <ConfettiPiece key={i} x={Math.random() * width} delay={i * 60} />
          ))}
        </View>
      ) : null}



      {/* Buddy header */}
      <View style={[styles.header, { borderBottomColor: theme.cardBorder, justifyContent: "space-between" }]}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 14, flex: 1 }}>
        <TouchableOpacity onPress={() => setScreen('buddyCustomize')} activeOpacity={0.7}>
          <Animated.View style={{ transform: [{ scale: buddyScale }] }}>
            <BuddyAvatar
              skin={buddy.skin}
              hair={buddy.hair}
              hairColor={buddy.hairColor}
              outfit={buddy.outfit}
              size={90}
              mood={buddyMood}
              celebrating={celebratingIdx !== -1}
              personality={buddy.personality}
            />
          </Animated.View>
        </TouchableOpacity>
        <View style={styles.headerText}>
          <Text style={[styles.buddyName, { color: theme.text }]}>{buddy.name} {personality.emoji}</Text>
          <Text style={[styles.buddyMsg, { color: theme.textSecondary }]} numberOfLines={2}>
            {buddyMessage || personality.greet}
          </Text>
        </View>
      </View>
      {/* THE NEW SETTINGS BUTTON */}
        <TouchableOpacity 
          onPress={() => setScreen("account")} 
          style={{ padding: 8 }}
        >
          <Text style={{ fontSize: 24 }}>⚙️</Text>
        </TouchableOpacity>

      </View>

      {/* FIXED: recentSound will no longer crash if it's an empty string */}
      {recentSound ? (
        <Text style={{ fontSize: 12, color: theme.accent, marginTop: 2, fontWeight: '600' }}>
          {recentSound === "checkin" ? "✓" : ""}
          {recentSound === "celebrate" ? "🎉" : ""}
          {recentSound === "freeze" ? "❄️" : ""}
        </Text>
      ) : null}

      {/* Content */}
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {currentTab === "streaks" && (
          <Section>
            {streaks.length === 0 && (
              <View style={styles.emptyState}>
                <Text style={styles.emptyEmoji}>🌱</Text>
                <Text style={[styles.emptyText, { color: theme.text }]}>no streaks yet!</Text>
                <Text style={[styles.emptySub, { color: theme.textSecondary }]}>tap ＋ New to add one</Text>
              </View>
            )}
            {streaks.map((streak, idx) => {
              const done = completedToday(streak);
              const progress = Math.min(streak.count / streak.goal, 1);
              const isCelebrating = celebratingIdx === idx;
              return (
                <Animated.View
                  key={idx}
                  style={[
                    styles.card,
                    { backgroundColor: theme.card, borderColor: theme.cardBorder },
                    streak.frozen && { backgroundColor: theme.frozenBg, borderColor: theme.frozenBorder },
                    done && { backgroundColor: theme.doneBg, borderColor: theme.doneBorder },
                    isCelebrating && { borderColor: theme.accent },
                  ]}
                >
                  <View style={styles.cardTop}>
                    <View style={styles.cardTitleRow}>
                      <Text style={[styles.cardName, { color: theme.text }]}>{streak.name}</Text>
                      {streak.frozen && (
                        <View style={[styles.frozenBadge, { backgroundColor: theme.frozenBg, borderColor: theme.frozenBorder }]}>
                          <Text style={[styles.frozenBadgeText, { color: theme.accent }]}>❄️ frozen</Text>
                        </View>
                      )}
                      {done && !streak.frozen && (
                        <View style={[styles.doneBadge, { backgroundColor: theme.doneBg, borderColor: theme.doneBorder }]}>
                          <Text style={styles.doneBadgeText}>✓ done</Text>
                        </View>
                      )}
                    </View>
                    <Text style={[styles.cardCount, { color: theme.text }]}>
                      🔥 {streak.count}
                      <Text style={{ color: theme.textSecondary }}> / {streak.goal} days</Text>
                    </Text>
                  </View>
                  <View style={[styles.progressTrack, { backgroundColor: theme.progressTrack }]}>
                    <View style={[styles.progressFill, {
                      width: `${progress * 100}%`,
                      backgroundColor: streak.frozen ? theme.accent : progress >= 1 ? "#22c55e" : theme.accent,
                    }]} />
                  </View>
                  <View style={styles.cardActions}>
                    <TouchableOpacity
                      style={[styles.checkInBtn, { backgroundColor: theme.accent }, (done || streak.frozen) && styles.checkInBtnDisabled]}
                      onPress={() => checkIn(idx)}
                      activeOpacity={0.8}
                    >
                      <Text style={[styles.checkInText, { color: theme.text }]}>
                        {done ? "✓ checked in" : "check in"}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.iconBtn, { backgroundColor: theme.iconBtnBg, borderColor: theme.iconBtnBorder }]} onPress={() => freezeStreak(idx)} activeOpacity={0.8}>
                      <Text style={styles.iconBtnText}>{streak.frozen ? "🔥" : "❄️"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.iconBtn, { backgroundColor: theme.iconBtnBg, borderColor: theme.iconBtnBorder }]} onPress={() => deleteStreak(idx)} activeOpacity={0.8}>
                      <Text style={styles.iconBtnText}>🗑️</Text>
                    </TouchableOpacity>
                  </View>
                </Animated.View>
              );
            })}
          </Section>
        )}
        {currentTab === "stats" && (
          <View style={styles.statsContainer}>
            <View style={styles.statRow}>
              <View style={[styles.statCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
                <Text style={styles.statNumber}>{totalStreaksCreated}</Text>
                <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Streaks</Text>
              </View>
              <View style={[styles.statCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
                <Text style={styles.statNumber}>{activeStreaks}</Text>
                <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Active</Text>
              </View>
            </View>
            <View style={styles.statRow}>
              <View style={[styles.statCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
                <Text style={styles.statNumber}>{longestStreak}</Text>
                <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Best 🔥</Text>
              </View>
              <View style={[styles.statCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
                <Text style={styles.statNumber}>{totalCheckIns}</Text>
                <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Check-ins</Text>
              </View>
            </View>
            <View style={styles.statRow}>
              <View style={[styles.statCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
                <Text style={styles.statNumber}>{freezesUsed}</Text>
                <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Freezes ❄️</Text>
              </View>
              <View style={[styles.statCard, { backgroundColor: theme.card, borderColor: theme.cardBorder }]}>
                <Text style={styles.statNumber}>{badges.filter(b => b.earned).length}</Text>
                <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Badges 🏅</Text>
              </View>
            </View>
            <Text style={[styles.sectionTitle, { color: theme.textSecondary, marginTop: 12 }]}>BADGES</Text>
            <View style={styles.badgeGrid}>
              {badges.map((badge, i) => (
                <View
                  key={i}
                  style={[
                    styles.badgeCard,
                    { backgroundColor: badge.earned ? theme.accentLight : theme.chipBg, borderColor: badge.earned ? theme.accent : theme.chipBorder },
                  ]}
                >
                  <Text style={styles.badgeEmoji}>{badge.earned ? badge.emoji : "🔒"}</Text>
                  <Text style={[styles.badgeLabel, { color: badge.earned ? theme.text : theme.textSecondary }]}>
                    {badge.label}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>

      {/* Bottom Tab Bar */}
      <View style={[styles.tabBarContainer, { backgroundColor: theme.tabBar, borderTopColor: theme.tabBarBorder }]}>
        <View style={styles.tabLeft}>
          <TouchableOpacity style={styles.tabItem} onPress={() => setCurrentTab('streaks')} activeOpacity={0.7}>
            <Text style={{fontSize:20}}>🔥</Text>
            <Text style={[styles.tabText, { color: currentTab === 'streaks' ? theme.accent : theme.textSecondary }]}>Streaks</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.tabRight}>
          <TouchableOpacity style={styles.tabItem} onPress={() => setCurrentTab('stats')} activeOpacity={0.7}>
            <Text style={{fontSize:20}}>🏆</Text>
            <Text style={[styles.tabText, { color: currentTab === 'stats' ? theme.accent : theme.textSecondary }]}>Stats</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.plusButtonWrapper}>
          <TouchableOpacity style={[styles.plusButton, { backgroundColor: theme.accent, borderColor: theme.tabBar }]} onPress={() => setShowAddModal(true)} activeOpacity={0.8}>
            <Text style={styles.plusButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Add Modal */}
      {showAddModal && (
        <View style={styles.modalContainer}>
          <TouchableOpacity style={[styles.modalOverlay, { backgroundColor: theme.modalOverlay }]} activeOpacity={1} onPress={() => setShowAddModal(false)} />
          <Animated.View style={[styles.addModalCard, { backgroundColor: theme.card, borderColor: theme.cardBorder, marginBottom: keyboardHeight }]}>
            <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>New habit</Text>
            <TextInput
              style={[styles.input, { backgroundColor: theme.inputBg, borderColor: theme.inputBorder, color: theme.text }]}
              value={newStreak.name}
              onChangeText={(val) => setNewStreak((prev) => ({ ...prev, name: val }))}
              placeholder="e.g. Read 30 min"
              placeholderTextColor={theme.textSecondary}
              maxLength={32}
              autoFocus
            />
            <Text style={[styles.inputLabel, { color: theme.textSecondary }]}>Goal: {newStreak.goal} days</Text>
            <View style={styles.goalRow}>
              {[7, 14, 21, 30, 60, 100].map((g) => (
                <TouchableOpacity
                  key={g}
                  style={[styles.goalChip, { backgroundColor: theme.inputBg, borderColor: theme.inputBorder }, newStreak.goal === g && { backgroundColor: theme.accentLight, borderColor: theme.accent }]}
                  onPress={() => setNewStreak((p) => ({ ...p, goal: g }))}
                  activeOpacity={0.8}
                >
                  {/* FIXED: g.toString() is called correctly */}
                  <Text style={[{ color: theme.textSecondary }, newStreak.goal === g && { color: theme.accent }]}>{g.toString()}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              style={[styles.addBtn, { backgroundColor: theme.accent }, !newStreak.name.trim() && { backgroundColor: theme.chipBg }]}
              onPress={() => { addStreak(); setShowAddModal(false); }}
              disabled={!newStreak.name.trim()}
            >
              <Text style={[styles.addBtnText, { color: theme.text }]}>add streak 🚀</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  confettiContainer: { position: "absolute", top: 0, left: 0, right: 0, height: 500, zIndex: 99 },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 20, paddingVertical: 16, gap: 14, borderBottomWidth: 1 },
  headerText: { flex: 1 },
  buddyName: { fontSize: 17, fontWeight: "700", marginBottom: 4 },
  buddyMsg: { fontSize: 13, lineHeight: 18 },
  tabBarContainer: { height: 65, borderTopWidth: 1, position: 'relative', justifyContent: 'center' },
  tabLeft: { position: 'absolute', left: 30, top: 0, bottom: 0, justifyContent: 'center' },
  tabRight: { position: 'absolute', right: 30, top: 0, bottom: 0, justifyContent: 'center' },
  tabItem: { alignItems: 'center' },
  plusButtonWrapper: { position: 'absolute', left: 0, right: 0, top: -20, alignItems: 'center' },
  plusButton: { width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', borderWidth: 3 },
  plusButtonText: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  scroll: { flex: 1 },
  scrollContent: { padding: 20, paddingBottom: 40 },
  emptyState: { alignItems: "center", paddingVertical: 60, gap: 8 },
  emptyEmoji: { fontSize: 48, marginBottom: 8 },
  emptyText: { fontSize: 18, fontWeight: "700" },
  emptySub: { fontSize: 14 },
  statsPlaceholder: { alignItems: "center", paddingVertical: 80, gap: 12 },
  statsEmoji: { fontSize: 56, marginBottom: 16 },
  statsTitle: { fontSize: 22, fontWeight: "800" },
  statsSub: { fontSize: 14 },
  card: { borderRadius: 20, padding: 18, marginBottom: 14, borderWidth: 1, gap: 12 },
  cardTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" },
  cardTitleRow: { flex: 1, flexDirection: "row", alignItems: "center", gap: 8, flexWrap: "wrap" },
  cardName: { fontSize: 16, fontWeight: "700" },
  cardCount: { fontSize: 16, fontWeight: "700" },
  frozenBadge: { borderWidth: 1, borderRadius: 10, paddingHorizontal: 8, paddingVertical: 2 },
  frozenBadgeText: { fontSize: 11, fontWeight: "600" },
  doneBadge: { borderWidth: 1, borderRadius: 10, paddingHorizontal: 8, paddingVertical: 2 },
  doneBadgeText: { fontSize: 11, color: "#22c55e", fontWeight: "600" },
  progressTrack: { height: 6, borderRadius: 3, overflow: "hidden" },
  progressFill: { height: 6, borderRadius: 3 },
  cardActions: { flexDirection: "row", alignItems: "center", gap: 10 },
  checkInBtn: { flex: 1, borderRadius: 14, paddingVertical: 12, alignItems: "center" },
  checkInBtnDisabled: { opacity: 0.4 },
  checkInText: { fontWeight: "700", fontSize: 14 },
  iconBtn: { width: 44, height: 44, borderRadius: 14, borderWidth: 1, alignItems: "center", justifyContent: "center" },
  iconBtnText: { fontSize: 18 },
  modalContainer: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'flex-end' },
  modalOverlay: { ...StyleSheet.absoluteFillObject },
  addModalCard: { borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, paddingBottom: 40, borderWidth: 1, gap: 16 },
  inputLabel: { fontSize: 12, fontWeight: "700", letterSpacing: 1, textTransform: "uppercase" },
  input: { borderWidth: 1, borderRadius: 14, paddingHorizontal: 16, paddingVertical: 14, fontSize: 16 },
  goalRow: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  goalChip: { paddingHorizontal: 18, paddingVertical: 10, borderRadius: 20, borderWidth: 1 },
  addBtn: { borderRadius: 16, paddingVertical: 16, alignItems: "center", marginTop: 4 },
  addBtnText: { fontWeight: "700", fontSize: 16 },
  statsContainer: { gap: 12 },
  statRow: { flexDirection: 'row', gap: 12 },
  statCard: { flex: 1, borderRadius: 16, padding: 16, borderWidth: 1, alignItems: 'center', gap: 4 },
  statNumber: { fontSize: 28, fontWeight: '800', color: '#C88E67' },
  statLabel: { fontSize: 12, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5 },
  sectionTitle: { fontSize: 12, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 },
  badgeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  badgeCard: { width: '30%', borderRadius: 14, padding: 14, borderWidth: 1, alignItems: 'center', gap: 6 },
  badgeEmoji: { fontSize: 28 },
  badgeLabel: { fontSize: 11, fontWeight: '600', textAlign: 'center' },
});