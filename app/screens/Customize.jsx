import { useRef } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Animated,
  StyleSheet,
} from "react-native";
import BuddyAvatar from "../components/BuddyAvatar";
import {
  SKIN_TONES,
  HAIR_COLORS,
  HAIR_STYLES, 
  OUTFIT_COLORS,
  PERSONALITIES,
  useTheme,
} from "../../constants";


export default function Customize({ buddy, setBuddy, onFinish }) {
  const bounceAnim = useRef(new Animated.Value(1)).current;

  const personality = PERSONALITIES[buddy.personality] || PERSONALITIES.chill;
  const theme = useTheme();
  

  const bounceBuddy = () => {
    Animated.sequence([
      Animated.spring(bounceAnim, {
        toValue: 1.12,
        friction: 4,
        useNativeDriver: true,
      }),
      Animated.spring(bounceAnim, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const update = (key, value) => {
    setBuddy((prev) => ({ ...prev, [key]: value }));
    bounceBuddy();
  };

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Text style={styles.heading}>meet your buddy ✨</Text>
        <Text style={styles.sub}>make them yours</Text>

        {/* Buddy preview */}
        <Animated.View
          style={[
            styles.buddyWrap,
            { transform: [{ scale: bounceAnim }] },
          ]}
        >
          <BuddyAvatar
            skin={buddy.skin}
            hair={buddy.hair}
            hairColor={buddy.hairColor}
            outfit={buddy.outfit}
            size={140}
            mood="happy"
          />
          <View style={styles.personalityBadge}>
            <Text style={styles.personalityBadgeText}>
              {personality.emoji} {personality.label}
            </Text>
          </View>
        </Animated.View>

        {/* Name input */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Name your buddy</Text>
          <TextInput
            style={styles.input}
            value={buddy.name}
            onChangeText={(val) => update("name", val)}
            placeholder="Buddy"
            placeholderTextColor="#555"
            maxLength={16}
          />
        </View>

        {/* Skin tones */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skin tone</Text>
          <View style={styles.swatchRow}>
            {SKIN_TONES.map((color) => (
              <TouchableOpacity
                key={color}
                onPress={() => update("skin", color)}
                style={[
                  styles.swatch,
                  { backgroundColor: color },
                  buddy.skin === color && styles.swatchSelected,
                ]}
                activeOpacity={0.8}
              />
            ))}
          </View>
        </View>

        {/* Hair style */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hair style</Text>
          <View style={styles.chipRow}>
            {Object.entries(HAIR_STYLES).map(([key, val]) => (
              <TouchableOpacity
                key={key}
                onPress={() => update("hair", key)}
                style={[
                  styles.chip,
                  buddy.hair === key && styles.chipSelected,
                ]}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.chipText,
                    buddy.hair === key && styles.chipTextSelected,
                  ]}
                >
                  {val.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Hair color */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hair color</Text>
          <View style={styles.swatchRow}>
            {HAIR_COLORS.map((color) => (
              <TouchableOpacity
                key={color}
                onPress={() => update("hairColor", color)}
                style={[
                  styles.swatch,
                  { backgroundColor: color },
                  buddy.hairColor === color && styles.swatchSelected,
                ]}
                activeOpacity={0.8}
              />
            ))}
          </View>
        </View>

        {/* Outfit color */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Outfit color</Text>
          <View style={styles.swatchRow}>
            {OUTFIT_COLORS.map((color) => (
              <TouchableOpacity
                key={color}
                onPress={() => update("outfit", color)}
                style={[
                  styles.swatch,
                  { backgroundColor: color },
                  buddy.outfit === color && styles.swatchSelected,
                ]}
                activeOpacity={0.8}
              />
            ))}
          </View>
        </View>

        {/* CTA */}
        <TouchableOpacity
          style={styles.button}
          onPress={onFinish}
          activeOpacity={0.85}
        >
          <Text style={styles.buttonText}>let's go! 🚀</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#0d0d0d",
  },
  container: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 48,
    alignItems: "center",
  },
  heading: {
    fontSize: 28,
    fontWeight: "800",
    color: "#fff",
    marginBottom: 4,
  },
  sub: {
    fontSize: 15,
    color: "#777",
    marginBottom: 28,
  },
  buddyWrap: {
    alignItems: "center",
    marginBottom: 32,
  },
  personalityBadge: {
    marginTop: 12,
    backgroundColor: "#1e1229",
    borderWidth: 1,
    borderColor: "#3d2060",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  personalityBadgeText: {
    color: "#c084fc",
    fontSize: 13,
    fontWeight: "600",
  },
  section: {
    width: "100%",
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#666",
    letterSpacing: 1.1,
    textTransform: "uppercase",
    marginBottom: 12,
  },
  swatchRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  swatch: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 2,
    borderColor: "transparent",
  },
  swatchSelected: {
    borderColor: "#fff",
    transform: [{ scale: 1.15 }],
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#1a1a1a",
    borderWidth: 1,
    borderColor: "#2e2e2e",
  },
  chipSelected: {
    backgroundColor: "#2a1245",
    borderColor: "#7c3aed",
  },
  chipText: {
    color: "#888",
    fontSize: 14,
    fontWeight: "500",
  },
  chipTextSelected: {
    color: "#c084fc",
  },
  input: {
    backgroundColor: "#1a1a1a",
    borderWidth: 1,
    borderColor: "#2e2e2e",
    borderRadius: 14,
    paddingHorizontal: 18,
    paddingVertical: 14,
    fontSize: 16,
    color: "#fff",
    width: "100%",
  },
  button: {
    marginTop: 12,
    backgroundColor: "#522588",
    borderRadius: 20,
    paddingVertical: 18,
    paddingHorizontal: 48,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "700",
  },
});