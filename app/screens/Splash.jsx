import { useEffect, useRef } from "react";
import { SafeAreaView, View, Text, Animated, StyleSheet } from "react-native";
import BuddyAvatar from "../components/BuddyAvatar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../../constants";

export default function Splash({ onFinish }) {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const fadeIn = useRef(new Animated.Value(0)).current;
  const buddySlide = useRef(new Animated.Value(60)).current;
  const textFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([ 
      Animated.parallel([
        Animated.timing(fadeIn, { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.spring(buddySlide, { toValue: 0, friction: 6, tension: 80, useNativeDriver: true }),
      ]),
      Animated.timing(textFade, { toValue: 1, duration: 400, delay: 200, useNativeDriver: true }),
    ]).start(() => {
      setTimeout(onFinish, 900);
    });
  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.bg }]}>
      <Animated.View style={[styles.buddyWrap, { opacity: fadeIn, transform: [{ translateY: buddySlide }] }]}>
        <BuddyAvatar
          skin="#FDDBB4"
          hair="sideSweep"
          hairColor="#000000"
          outfit="#8B7AA8"
          size={140}
          mood="excited"
          celebrating
          personality="hype"
        />
      </Animated.View>
      <Animated.View style={{ opacity: textFade, alignItems: "center" }}>
        <Text style={[styles.title, { color: theme.text }]}>StreakBuddy</Text>
        <Text style={[styles.sub, { color: theme.textSecondary }]}>your personal hype squad 🔥</Text>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
  },
  buddyWrap: {
    alignItems: "center",
  },
  title: {
    fontSize: 36,
    fontWeight: "800",
    letterSpacing: -0.5,
  },
  sub: {
    fontSize: 16,
    marginTop: 6,
  },
});