import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PERSONALITIES } from "../constants";
import useSound from "./useSound";
import * as Haptics from 'expo-haptics';

// Accept the uid as a parameter
export default function useStreaks(uid) {
  const [screen, setScreen] = useState("quiz");
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [buddy, setBuddy] = useState({
    skin: "#FDDBB4",
    hair: "shortA",
    hairColor: "#1a1a1a",
    outfit: "#522588",
    personality: null,
    name: "Buddy",
  }); 
  const [streaks, setStreaks] = useState([
    { name: "Daily Exercise", count: 0, goal: 7, lastChecked: null, frozen: false },
    { name: "Read 30 min", count: 0, goal: 14, lastChecked: null, frozen: false },
  ]);
  const [newStreak, setNewStreak] = useState({ name: "", goal: 7 });
  const [celebratingIdx, setCelebratingIdx] = useState(-1);
  const [confetti, setConfetti] = useState(false);
  const [buddyMessage, setBuddyMessage] = useState("");
  const [buddyMood, setBuddyMood] = useState("happy");
  const [buddyBounce, setBuddyBounce] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const { play, recentSound } = useSound();

  // NEW: Settings state lifted into the main hook
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [hapticsEnabled, setHapticsEnabled] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const personality = PERSONALITIES[buddy.personality] || PERSONALITIES.chill;

  useEffect(() => {
    const load = async () => {
      if (!uid){
        setLoaded(true);
        return;
       } 

      try {
        // Use BACKTICKS to dynamically inject the user ID
        const saved = await AsyncStorage.getItem(`streakbuddy_${uid}`);
        if (saved) {
          const data = JSON.parse(saved);
          if (data.buddy) setBuddy(data.buddy);
          if (data.streaks) setStreaks(data.streaks);
          if (data.settings) {
            setSoundEnabled(data.settings.soundEnabled ?? true);
            setHapticsEnabled(data.settings.hapticsEnabled ?? true);
            setIsDarkMode(data.settings.isDarkMode ?? false);
            setNotificationsEnabled(data.settings.notificationsEnabled ?? true);
          }
          if (data.buddy?.personality) setScreen("home");
        } else {
          // If no save exists for THIS user, wipe the slate clean to defaults
          setScreen("quiz");
          setQuizStep(0);
          setBuddy({
            skin: "#FDDBB4",
            hair: "shortA",
            hairColor: "#1a1a1a",
            outfit: "#522588",
            personality: null,
            name: "Buddy",
          });
          setStreaks([
            { name: "Daily Exercise", count: 0, goal: 7, lastChecked: null, frozen: false },
            { name: "Read 30 min", count: 0, goal: 14, lastChecked: null, frozen: false },
          ]);
        }
      } catch (e) {
        console.log("Load error:", e);
      } finally {
        setLoaded(true);
      }
    };
    load();
  }, [uid]); // Re-run whenever the user ID changes

  useEffect(() => {
    const save = async () => {
      if (!uid) return;
      try {
        if (buddy.personality) {
          // Use BACKTICKS to save specifically to this user
          await AsyncStorage.setItem(
            `streakbuddy_${uid}`,
            JSON.stringify({ 
              buddy, 
              streaks, 
              settings: { soundEnabled, hapticsEnabled, isDarkMode, notificationsEnabled } 
            })
          );
        }
      } catch (e) {
        console.log("Save error:", e);
      }
    };
    save();
  }, [uid, buddy, streaks, soundEnabled, hapticsEnabled, isDarkMode, notificationsEnabled]);

  const getRandomMsg = (arr) => arr[Math.floor(Math.random() * arr.length)];

  const handleQuizAnswer = (key) => {
    const newAnswers = { ...quizAnswers, [quizStep]: key };
    setQuizAnswers(newAnswers);
    if (quizStep < 2) {
      setQuizStep(quizStep + 1);
    } else {
      const counts = {};
      Object.values(newAnswers).forEach((v) => {
        counts[v] = (counts[v] || 0) + 1;
      });
      const top = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
      setBuddy((b) => ({ ...b, personality: top }));
      setScreen("customize");
    }
  };

  const checkIn = (idx) => {
    const today = new Date().toDateString();
    const streak = streaks[idx];

    /*
    if (streak.lastChecked === today) {
      setBuddyMessage("Already checked in today! Come back tomorrow 🌙");
      setBuddyMood("happy");
      setBuddyBounce(true);
      if (hapticsEnabled) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setTimeout(() => setBuddyBounce(false), 600);
      return;
    }
      */
    if (streak.frozen) {
      setBuddyMessage("This streak is frozen — enjoy your day off! ❄️");
      return;
    }
    const updated = [...streaks];
    updated[idx] = { ...streak, count: streak.count + 1, lastChecked: today };
    setStreaks(updated);
    setCelebratingIdx(idx);
    setBuddyMood("excited");
    setBuddyBounce(true);

    const newCount = streak.count + 1;
    if (newCount >= streak.goal) {
      setBuddyMessage(personality.milestone + ` ${newCount} days!!! 🎉`);
      setConfetti(true);
      if (soundEnabled) play("celebrate");
      if (hapticsEnabled) Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setTimeout(() => setConfetti(false), 2000);
    } else {
      setBuddyMessage(getRandomMsg(personality.encourage));
      if (soundEnabled) play("checkin");
      console.log("Haptics state is:", hapticsEnabled);
      if (hapticsEnabled) Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    }

    setTimeout(() => {
      setCelebratingIdx(-1);
      setBuddyMood("happy");
      setBuddyBounce(false);
    }, 1200);
  };

  const freezeStreak = (idx) => {
    const updated = [...streaks];
    updated[idx] = { ...updated[idx], frozen: !updated[idx].frozen };
    setStreaks(updated);
    if (soundEnabled) play("freeze"); 
    if (hapticsEnabled) Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    if (!streaks[idx].frozen) {
      setBuddyMessage("Streak frozen! Rest up 🧊");
    } else {
      setBuddyMessage("Back in action! Let's go! 💪");
    }
  };

  const addStreak = () => {
    if (!newStreak.name.trim()) return;
    setStreaks((prev) => [
      ...prev,
      { name: newStreak.name, count: 0, goal: newStreak.goal, lastChecked: null, frozen: false },
    ]);
    setNewStreak({ name: "", goal: 7 });
  };

  const deleteStreak = (idx) => {
    setStreaks((prev) => prev.filter((_, i) => i !== idx));
  };

  const completedToday = (streak) => streak.lastChecked === new Date().toDateString();

  const totalStreaksCreated = streaks.length;
  const activeStreaks = streaks.filter(s => !s.frozen).length;
  const longestStreak = streaks.length > 0 ? Math.max(...streaks.map(s => s.count)) : 0;
  const totalCheckIns = streaks.reduce((sum, s) => sum + s.count, 0);
  const freezesUsed = streaks.filter(s => s.frozen).length;

  const badges = [
    { earned: totalStreaksCreated >= 1, emoji: "🌱", label: "First Streak" },
    { earned: streaks.some(s => s.count >= 7), emoji: "🔥", label: "7-Day Wonder" },
    { earned: streaks.some(s => s.count >= 30), emoji: "⭐", label: "Monthly Hero" },
    { earned: freezesUsed >= 1, emoji: "❄️", label: "Frosty" },
    { earned: totalStreaksCreated >= 5, emoji: "🚀", label: "Streak Machine" },
    { earned: streaks.some(s => s.count >= 100), emoji: "💯", label: "Centurion" },
  ];

  return {
    screen, setScreen, quizStep, loaded, buddy, setBuddy, streaks,
    newStreak, setNewStreak, celebratingIdx, confetti, buddyMessage,
    buddyMood, buddyBounce, personality, handleQuizAnswer, checkIn,
    freezeStreak, addStreak, deleteStreak, completedToday, totalStreaksCreated,
    activeStreaks, longestStreak, totalCheckIns, freezesUsed, badges, recentSound,
    // Export the new settings
    soundEnabled, setSoundEnabled, hapticsEnabled, setHapticsEnabled,
    isDarkMode, setIsDarkMode, notificationsEnabled, setNotificationsEnabled
  };
}