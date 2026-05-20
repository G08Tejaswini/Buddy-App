import { createContext, useContext } from "react";

export const HAIR_STYLES = {
  bald: { label: "Bald", path: "bald" },
  bobCut: { label: "Bob Cut", path: "bobCut" },
  ponytail: { label: "Ponytail", path: "ponytail" },
  twoBuns: { label: "Two Buns", path: "twoBuns" },
  twinTails: { label: "Twin Tails", path: "twinTails" },
  undercut: { label: "Undercut", path: "undercut" },
  singleBun: { label: "Single Bun", path: "singleBun" },
  bowlCut: { label: "Bowl Cut", path: "bowlCut" },
  sideSweep: { label: "Side Sweep", path: "sideSweep" },
  cap: { label: "Cap", path: "cap" },
};

export const HAIR_COLORS = [
  "#2C1810", "#4A3728", "#7B5B3A", "#B8956A",
  "#D4B896", "#E8D5C4", "#F2A7C3", "#C4A6E8",
  "#7EC8E3", "#A8D8B9", "#F5F5F5", "#E8C547",
];

export const SKIN_TONES = [
  "#FFDFC4", "#FDDCB2", "#F5C49A", "#E8A87C",
  "#C68642", "#8D5524", "#5C3317", "#3B1F0B",
];

export const OUTFIT_COLORS = [
  "#A371F7", "#E84393", "#2ECC71", "#E74C3C",
  "#3498DB", "#F39C12", "#1ABC9C", "#F5F5F5",
  "#2C2C2C", "#F9E79F",
];

export const PERSONALITIES = {
  hype: {
    label: "Hype Beast",
    emoji: "🔥",
    greet: "YO BESTIE let's GET IT today!! 🔥",
    encourage: [
      "YOU ARE UNSTOPPABLE!!",
      "NOTHING CAN STOP YOU!!",
      "ABSOLUTE LEGEND BEHAVIOR 🏆",
      "WE ARE SO BACK!!",
    ],
    miss: [
      "nooo babe come back 😭",
      "we need you out here!!",
      "tomorrow we go AGAIN 💪",
    ],
    milestone: "YOOO WE ARE EATING GOOD TODAY!!",
  },
  chill: {
    label: "Chill Vibes",
    emoji: "🌿",
    greet: "hey :) hope your day's been good~",
    encourage: [
      "you're doing great, no rush",
      "one step at a time, you've got this",
      "proud of you, genuinely",
    ],
    miss: [
      "it's okay, rest days are valid",
      "tomorrow's a fresh start 🌱",
      "be kind to yourself",
    ],
    milestone: "look how far you've come ✨",
  },
  sassy: {
    label: "Sassy",
    emoji: "💅",
    greet: "Oh you're finally here. Love the commitment.",
    encourage: [
      "Not bad. I've seen worse.",
      "OK fine, that was actually impressive 💅",
      "You're growing on me.",
    ],
    miss: [
      "bold of you to skip. bold.",
      "I'm not mad. I'm just... disappointed.",
      "don't @ me until you're back on track",
    ],
    milestone: "I'll admit it. You did that. 👑",
  },
  cozy: {
    label: "Cozy Mom",
    emoji: "🫶",
    greet: "Hi sweetie! I made tea 🍵 Ready when you are!",
    encourage: [
      "I'm so proud of you honey!",
      "You're doing amazing, keep going 💛",
      "This is your sign — you've got this!",
    ],
    miss: [
      "Rest is important too, dear 🌙",
      "Don't be too hard on yourself!",
      "We start fresh tomorrow, okay? 🫶",
    ],
    milestone: "Oh honey, look how far you've come!! 🥹",
  },
};

export const QUIZ_QUESTIONS = [
  {
    q: "When you fail, you want your buddy to:",
    options: [
      ["hype you back up 🔥", "hype"],
      ["give you a gentle hug 🫶", "cozy"],
      ["be real with you 💅", "sassy"],
      ["be cool about it 🌿", "chill"],
    ],
  },
  {
    q: "Your ideal vibe is:",
    options: [
      ["chaotic good energy", "hype"],
      ["soft and warm", "cozy"],
      ["unbothered queen", "sassy"],
      ["peacefully focused", "chill"],
    ],
  },
  {
    q: "Your buddy's texts should feel like:",
    options: [
      ["a hype group chat", "hype"],
      ["texts from your mum", "cozy"],
      ["a witty bestie", "sassy"],
      ["a mindfulness app", "chill"],
    ],
  },
]; 

export const CONFETTI_COLORS = [
  "#F2A7C3", "#C4A6E8", "#7EC8E3", 
  "#A8D8B9", "#E8C547", "#FF8A80",
];

const light = {
  bg: "#FCFAF8",               // warm white-cream (like fresh linen)
  card: "#F5F1ED",             // soft beige, slightly darker than bg
  cardBorder: "#E2DBD3",       // warm stone grey
  accent: "#C88E67",           // same terracotta-amber as dark (strong enough for light)
  accentLight: "#E5C8B1",      // soft peach-beige highlight
  text: "#3E352F",             // dark espresso brown (not black)
  textSecondary: "rgba(100, 85, 75, 0.7)", // muted warm taupe
  tabBar: "#FCFAF8",           // seamless with bg
  tabBarBorder: "#E2DBD3",
  modalOverlay: "rgba(0,0,0,0.35)",
  progressTrack: "#E2DBD3",
  frozenBg: "#EFF3F4",         // barely-there cool slate (matches dark frozen)
  frozenBorder: "#D0D8DC",
  doneBg: "#F5F6F1",           // pale warm olive
  doneBorder: "#DDE0D3",
  headerBg: "#FCFAF8",
  inputBg: "#F5F1ED",
  inputBorder: "#E2DBD3",
  chipBg: "#F5F1ED",
  chipBorder: "#E2DBD3",
  iconBtnBg: "#F0ECE7",        // slightly deeper than card for subtle depth
  iconBtnBorder: "#E2DBD3",
};

const dark = {
  bg: "#1B1815",          // deep warm brown-black (like dark roast coffee)
  card: "#24211D",        // slightly lifted, same warm family
  cardBorder: "#2E2A25",  // subtle, never stark
  accent: "#C88E67",      // muted warm terracotta/amber
  accentLight: "#DDB899", // softer, desaturated highlight
  text: "#F6F1EA",        // warm off-white cream
  textSecondary: "rgba(210,190,170,0.6)", // warm taupe transparency
  tabBar: "#1B1815",      // same as bg for a seamless, minimal look
  tabBarBorder: "#2E2A25",
  modalOverlay: "rgba(0,0,0,0.6)", // keep, works universally
  progressTrack: "#2E2A25",        // consistent with borders
  frozenBg: "#1E2122",    // soft dark slate (cool but muted)
  frozenBorder: "#2E383B",
  doneBg: "#22221D",      // deep warm olive
  doneBorder: "#363A2E",
  headerBg: "#24211D",    // unified with card; or use card itself
  inputBg: "#24211D",
  inputBorder: "#2E2A25",
  chipBg: "#24211D",
  chipBorder: "#2E2A25",
  iconBtnBg: "#1E1C19",   // slightly deeper than card for depth
  iconBtnBorder: "#2E2A25",
};

export const themes = { light, dark };

// 1. Create the Theme Umbrella (defaults to light)
export const ThemeContext = createContext(light);

// 2. The new hook that listens to the umbrella instead of the phone system
export function useTheme() {
  return useContext(ThemeContext);
}