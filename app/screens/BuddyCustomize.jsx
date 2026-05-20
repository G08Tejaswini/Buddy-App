import React, { useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Animated,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BuddyAvatar from '../components/BuddyAvatar';
import Constants from 'expo-constants';
import {
  SKIN_TONES,
  HAIR_COLORS,
  HAIR_STYLES,
  OUTFIT_COLORS,
  useTheme
} from '../../constants';

export default function BuddyCustomize({ buddy, setBuddy, onBack }) {
  const theme = useTheme();
  const statusBarHeight = Constants.statusBarHeight;
  const bounceAnim = useRef(new Animated.Value(1)).current;

  const bounceBuddy = () => {
    Animated.sequence([
      Animated.spring(bounceAnim, { toValue: 1.12, friction: 4, useNativeDriver: true }),
      Animated.spring(bounceAnim, { toValue: 1, friction: 5, useNativeDriver: true }),
    ]).start();
  };

  const update = (key, value) => {
    setBuddy((prev) => ({ ...prev, [key]: value }));
    bounceBuddy();
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.bg }]} edges={['top', 'bottom']}>
      <TouchableOpacity
        onPress={onBack}
        style={[styles.backBtn, { paddingTop: statusBarHeight + 10 }]}
        activeOpacity={0.7}
      >
        <Text style={[styles.backText, { color: theme.accent }]}>← Back</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        <Text style={[styles.heading, { color: theme.text }]}>Customize {buddy.name}</Text>

        <Animated.View style={[styles.buddyWrap, { transform: [{ scale: bounceAnim }] }]}>
          <BuddyAvatar
            skin={buddy.skin}
            hair={buddy.hair}
            hairColor={buddy.hairColor}
            outfit={buddy.outfit}
            size={180}
            mood="happy"
            personality={buddy.personality}
          />
        </Animated.View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>Name</Text>
          <TextInput
            style={[styles.input, { backgroundColor: theme.inputBg, borderColor: theme.inputBorder, color: theme.text }]}
            value={buddy.name}
            onChangeText={(val) => update('name', val)}
            placeholder="Buddy"
            placeholderTextColor={theme.textSecondary}
            maxLength={16}
          />
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>Skin tone</Text>
          <View style={styles.swatchRow}>
            {SKIN_TONES.map((color) => (
              <TouchableOpacity
                key={color}
                onPress={() => update('skin', color)}
                style={[styles.swatch, { backgroundColor: color }, buddy.skin === color && { borderColor: theme.accent }]}
                activeOpacity={0.8}
              />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>Hair style</Text>
          <View style={styles.chipRow}>
            {Object.entries(HAIR_STYLES).map(([key, val]) => (
              <TouchableOpacity
                key={key}
                onPress={() => update('hair', key)}
                style={[
                  styles.chip,
                  { backgroundColor: theme.inputBg, borderColor: theme.inputBorder },
                  buddy.hair === key && { backgroundColor: theme.accentLight, borderColor: theme.accent },
                ]}
                activeOpacity={0.8}
              >
                <Text style={[
                  { color: theme.textSecondary, fontSize: 14, fontWeight: '500' },
                  buddy.hair === key && { color: theme.accent },
                ]}>{val.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>Hair color</Text>
          <View style={styles.swatchRow}>
            {HAIR_COLORS.map((color) => (
              <TouchableOpacity
                key={color}
                onPress={() => update('hairColor', color)}
                style={[styles.swatch, { backgroundColor: color }, buddy.hairColor === color && { borderColor: theme.accent }]}
                activeOpacity={0.8}
              />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>Outfit color</Text>
          <View style={styles.swatchRow}>
            {OUTFIT_COLORS.map((color) => (
              <TouchableOpacity
                key={color}
                onPress={() => update('outfit', color)}
                style={[styles.swatch, { backgroundColor: color }, buddy.outfit === color && { borderColor: theme.accent }]}
                activeOpacity={0.8}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  backBtn: { paddingHorizontal: 20, paddingBottom: 10 },
  backText: { fontSize: 18 },
  container: { paddingHorizontal: 24, paddingBottom: 48, alignItems: 'center' },
  heading: { fontSize: 24, fontWeight: '800', marginBottom: 20 },
  buddyWrap: { alignItems: 'center', marginBottom: 30 },
  section: { width: '100%', marginBottom: 24 },
  sectionTitle: { fontSize: 12, fontWeight: '700', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 12 },
  swatchRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  swatch: { width: 36, height: 36, borderRadius: 18, borderWidth: 2, borderColor: 'transparent' },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  chip: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, borderWidth: 1 },
  input: { borderWidth: 1, borderRadius: 14, paddingHorizontal: 16, paddingVertical: 14, fontSize: 16, width: '100%' },
});