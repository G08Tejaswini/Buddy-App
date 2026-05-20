import { useEffect, useRef } from "react";
import { Animated, StyleSheet } from "react-native";
import { CONFETTI_COLORS, useTheme } from "../../constants";

export default function ConfettiPiece({ x, delay = 0 }) {
  const translateY = useRef(new Animated.Value(-20)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;
  const rotate = useRef(new Animated.Value(0)).current;

  const color =
    CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
  const size = Math.random() * 8 + 6;
  const isCircle = Math.random() > 0.5;
  const drift = (Math.random() - 0.5) * 80;
  const duration = Math.random() * 600 + 1000;
 
  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 400,
        duration,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(translateX, {
        toValue: drift,
        duration,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: duration * 0.6,
        delay: delay + duration * 0.4,
        useNativeDriver: true,
      }),
      Animated.timing(rotate, {
        toValue: 1,
        duration,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const spin = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", `${Math.random() > 0.5 ? 360 : -360}deg`],
  });

  return (
    <Animated.View
      style={[
        styles.piece,
        {
          left: x,
          width: size,
          height: isCircle ? size : size * 1.6,
          borderRadius: isCircle ? size / 2 : 2,
          backgroundColor: color,
          transform: [{ translateY }, { translateX }, { rotate: spin }],
          opacity,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  piece: {
    position: "absolute",
    top: 0,
  },
});