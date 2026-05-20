import { createContext, useContext } from "react";

const light = {
  bg: "#FAF8F5",
  card: "#F0EDE8",
  cardBorder: "#E8E3DC",
  accent: "#8B7AA8",
  accentLight: "#AFA0C8",
  text: "#2C2A2A",
  textSecondary: "#8A8580",
  tabBar: "#FFFFFF",
  tabBarBorder: "#E8E3DC",
  modalOverlay: "rgba(0,0,0,0.4)",
  progressTrack: "#E0DCD6",
  frozenBg: "#F0F4FF",
  frozenBorder: "#C5D0E6",
  doneBg: "#EDF7F0",
  doneBorder: "#B8D8C4",
  headerBg: "#FAF8F5",
  inputBg: "#EDE8E2",
  inputBorder: "#D5D0C8",
  chipBg: "#EDE8E2",
  chipBorder: "#D5D0C8",
  iconBtnBg: "#EDE8E2",
  iconBtnBorder: "#D5D0C8",
};

const dark = {
  bg: "#1E1B1A",
  card: "#2A2624",
  cardBorder: "#2E2A28",
  accent: "#B8A5D6",
  accentLight: "#D4C8EA",
  text: "#F5F2ED",
  textSecondary: "#8A8580",
  tabBar: "#181514",
  tabBarBorder: "#2E2A28",
  modalOverlay: "rgba(0,0,0,0.6)",
  progressTrack: "#2E2A28",
  frozenBg: "#151E2A",
  frozenBorder: "#1E3A5F",
  doneBg: "#0D1F17",
  doneBorder: "#1A3A2A",
  headerBg: "#1E1B1A",
  inputBg: "#1A1A1A",
  inputBorder: "#2E2E2E",
  chipBg: "#1A1A1A",
  chipBorder: "#2E2E2E",
  iconBtnBg: "#1A1A1A",
  iconBtnBorder: "#2E2E2E",
};

export const themes = { light, dark };

// 1. Create the Theme Umbrella (defaults to light)
export const ThemeContext = createContext(light);

// 2. Any component that calls useTheme() will now listen to our Umbrella!
export function useTheme() {
  return useContext(ThemeContext);
}