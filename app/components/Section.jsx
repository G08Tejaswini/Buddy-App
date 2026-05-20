import { View, Text, StyleSheet } from "react-native";

export default function Section({ title, children, style }) {
  return (
    <View style={[styles.section, style]}>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      {children}
    </View>
  );
} 

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  title: {
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    color: "#888",
    marginBottom: 10,
    paddingHorizontal: 2,
  },
});