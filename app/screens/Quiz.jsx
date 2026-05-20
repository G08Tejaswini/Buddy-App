import { useRef } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from "react-native";
import BuddyAvatar from "../components/BuddyAvatar";
import { QUIZ_QUESTIONS, useTheme } from "../../constants";

export default function Quiz({ quizStep, onAnswer }) { 
  const theme = useTheme();
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  const question = QUIZ_QUESTIONS[quizStep];

  const handleAnswer = (key) => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: -30,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onAnswer(key);
      slideAnim.setValue(30);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    });
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.bg }]}>
      <View style={styles.container}>
        {/* Progress dots */}
        <View style={styles.dots}>
          {QUIZ_QUESTIONS.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                { backgroundColor: theme.progressTrack },
                i === quizStep && { backgroundColor: theme.accent, width: 24 },
                i < quizStep && { backgroundColor: theme.accentLight },
              ]}
            />
          ))}
        </View>

        {/* Buddy */}
        <View style={styles.buddyWrap}>
          <BuddyAvatar
            skin="#FDDBB4"
            hair="shortA"
            hairColor="#3E2723"
            outfit="#8B7AA8"
            size={110}
            mood="happy"
            personality="chill"
          />
        </View>

        {/* Question */}
        <Animated.View
          style={[
            styles.questionWrap,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          <Text style={[styles.stepLabel, { color: theme.textSecondary }]}>
            Question {quizStep + 1} of {QUIZ_QUESTIONS.length}
          </Text>
          <Text style={[styles.question, { color: theme.text }]}>{question.q}</Text>

          <View style={styles.options}>
            {question.options.map(([label, key]) => (
              <TouchableOpacity
                key={key}
                style={[styles.option, { backgroundColor: theme.chipBg, borderColor: theme.chipBorder }]}
                onPress={() => handleAnswer(key)}
                activeOpacity={0.75}
              >
                <Text style={[styles.optionText, { color: theme.text }]}>{label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    alignItems: "center",
  },
  dots: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 32,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  buddyWrap: {
    marginBottom: 32,
  },
  questionWrap: {
    width: "100%",
    alignItems: "center",
  },
  stepLabel: {
    fontSize: 12,
    letterSpacing: 1,
    textTransform: "uppercase",
    marginBottom: 12,
  },
  question: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 30,
  },
  options: {
    width: "100%",
    gap: 12,
  },
  option: {
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  optionText: {
    fontSize: 16,
    fontWeight: "500",
  },
});