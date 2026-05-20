import { StatusBar, useColorScheme } from 'react-native';
import useStreaks from "../../hooks/UseStreaks";
import Splash from "../screens/Splash";
import Quiz from "../screens/Quiz";
import Customize from "../screens/Customize";
import Home from "../screens/Home";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BuddyCustomize from "../screens/BuddyCustomize";
import { useTheme,ThemeContext, themes } from "../../constants";
import useAuth from "../../hooks/useAuth";
import Welcome from "../screens/Welcome";
import Account from "../screens/Account";

export default function App() {
  const theme = useTheme();
  const { user, loading: authLoading, signIn, signOutUser } = useAuth();
  const {
    screen,
    setScreen,
    quizStep,
    loaded,
    buddy,
    setBuddy,
    streaks,
    newStreak,
    setNewStreak,
    celebratingIdx,
    confetti,
    buddyMessage,
    buddyMood,
    buddyBounce,
    personality,
    handleQuizAnswer,
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
    soundEnabled,
    setSoundEnabled,
    hapticsEnabled, 
    setHapticsEnabled,
    isDarkMode, 
    setIsDarkMode,
    notificationsEnabled, 
    setNotificationsEnabled
  } = useStreaks(user?.uid);
  const colorScheme = useColorScheme();
  const activeTheme = isDarkMode ? themes.dark : themes.light;

  // ALL hooks are called above — no conditional hooks

  // Now conditional rendering is safe
  if (authLoading || !loaded) {
    return <Splash />;
  }

  if (!user) {
    return <Welcome signIn={signIn} loading={authLoading} />;
  }

  const renderScreen = () => {
    switch (screen) {
      case "quiz":
        return <Quiz quizStep={quizStep} onAnswer={handleQuizAnswer} />;
      case "buddyCustomize":
        return <BuddyCustomize buddy={buddy} setBuddy={setBuddy} onBack={() => setScreen("home")} />;
      case "customize":
        return <Customize buddy={buddy} setBuddy={setBuddy} onFinish={() => setScreen("home")} />;
      case "account":
        return (
          <Account 
            user={user} 
            signOut={signOutUser} 
            onBack={() => setScreen("home")} 
            setScreen={setScreen}
            soundEnabled={soundEnabled}
            setSoundEnabled={setSoundEnabled}
            hapticsEnabled={hapticsEnabled}
            setHapticsEnabled={setHapticsEnabled}
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
            notificationsEnabled={notificationsEnabled}
            setNotificationsEnabled={setNotificationsEnabled}
          />
        );
      case "home":
        return (
          <Home
            setScreen={setScreen}
            buddy={buddy}
            streaks={streaks}
            newStreak={newStreak}
            setNewStreak={setNewStreak}
            celebratingIdx={celebratingIdx}
            confetti={confetti}
            buddyMessage={buddyMessage}
            buddyMood={buddyMood}
            buddyBounce={buddyBounce}
            personality={personality}
            checkIn={checkIn}
            freezeStreak={freezeStreak}
            addStreak={addStreak}
            deleteStreak={deleteStreak}
            completedToday={completedToday}
            totalStreaksCreated={totalStreaksCreated}
            activeStreaks={activeStreaks}
            longestStreak={longestStreak}
            totalCheckIns={totalCheckIns}
            freezesUsed={freezesUsed}
            badges={badges}
            recentSound={recentSound}
          />
        );
      default:
        return null;
    }
  };

  return (

    <ThemeContext.Provider value={activeTheme}>
      <SafeAreaProvider>
        <StatusBar
          barStyle={isDarkMode ? "light-content" : "dark-content"}
          backgroundColor={activeTheme.bg}
        />
        {renderScreen()}
      </SafeAreaProvider>
    </ThemeContext.Provider>
  );
}