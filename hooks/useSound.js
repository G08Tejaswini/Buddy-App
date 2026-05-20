import { useRef, useState, useCallback, useEffect } from "react";
import { Platform } from "react-native";
import { Audio } from "expo-av";


const SOUND_FILES = {
  checkin: require("../assets/sounds/checkin1.mp3"),     
  celebrate: require("../assets/sounds/celebrate.mp3"), 
  freeze: require("../assets/sounds/freeze.mp3"),       
};

export default function useSound() {
  const lastPlay = useRef({});
  const [recentSound, setRecentSound] = useState(null);
  
  useEffect(() => {
    const setupAudio = async () => {
      try {
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: false,
        });
      } catch (e) {
        console.log("Audio setup failed:", e);
      }
    };
    setupAudio();
  }, []);

  const play = useCallback((name) => {
    const now = Date.now();
    if (lastPlay.current[name] && now - lastPlay.current[name] < 200) return;
    lastPlay.current[name] = now;

    setRecentSound(name);
    setTimeout(() => setRecentSound(null), 400);

    if (SOUND_FILES[name] && Platform.OS !== "web") {
      // For local require() files, you pass the file directly, NOT inside { uri: ... }
      Audio.Sound.createAsync(SOUND_FILES[name], { shouldPlay: true })
        .then(({ sound }) => {
          sound.setOnPlaybackStatusUpdate((status) => {
            if (status.didJustFinish) sound.unloadAsync();
          });
        })
        .catch(error => console.log(`Failed to play ${name}:`, error));
    }
  }, []);

  return { play, recentSound };
}