import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, ViewStyle } from 'react-native';

interface TapRippleProps {
  triggerKey: number; // increment to trigger a new ripple
  x: number; // screen X coordinate
  y: number; // screen Y coordinate
  color?: string; // ripple color
}

export const TapRipple: React.FC<TapRippleProps> = ({ triggerKey, x, y, color = 'rgba(255,255,255,0.18)' }) => {
  const scale = useRef(new Animated.Value(0.001)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start new ripple animation on trigger change
    scale.setValue(0.001);
    opacity.setValue(0.24);

    Animated.parallel([
      Animated.timing(scale, {
        toValue: 1.6,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }),
    ]).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerKey]);

  const rippleStyle: ViewStyle = {
    position: 'absolute',
    left: x - 60,
    top: y - 60,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: color,
    transform: [{ scale }],
    opacity,
  };

  return <Animated.View pointerEvents="none" style={[styles.container, rippleStyle]} />;
};

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
  },
});


