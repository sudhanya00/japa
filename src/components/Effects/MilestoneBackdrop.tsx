import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';

interface MilestoneBackdropProps {
  triggerKey: number; // increment to trigger the pulse
  color: string; // base color (e.g., theme primary)
}

export const MilestoneBackdrop: React.FC<MilestoneBackdropProps> = ({ triggerKey, color }) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!triggerKey) return;
    opacity.setValue(0);
    Animated.sequence([
      Animated.timing(opacity, { toValue: 0.10, duration: 240, useNativeDriver: false }),
      Animated.timing(opacity, { toValue: 0.0, duration: 700, useNativeDriver: false }),
    ]).start();
  }, [triggerKey, opacity]);

  return <Animated.View pointerEvents="none" style={[styles.backdrop, { backgroundColor: color, opacity }]} />;
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0.5 as unknown as number, // sit above background, below beads/counter
  },
});


