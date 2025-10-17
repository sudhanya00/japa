/**
 * Counter Display Component
 * Shows the current count with large, readable typography
 */

import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { useAppStore } from '../../store/appStore';
import { COLORS } from '../../constants/colors';

export const CounterDisplay: React.FC = () => {
  const count = useAppStore(state => state.count);
  const theme = useAppStore(state => state.theme);
  
  const themeColors = COLORS[theme];
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    anim.setValue(0);
    Animated.timing(anim, {
      toValue: 1,
      duration: 200,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [count, anim]);

  const animatedStyle = {
    transform: [
      {
        translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [8, 0] }),
      },
    ],
    opacity: anim.interpolate({ inputRange: [0, 1], outputRange: [0.6, 1] }),
  };

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.count, { color: themeColors.primary }, animatedStyle]}>
        {count}
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 80, // Position at bottom with comfortable padding
    width: '100%',
  },
  count: {
    fontSize: 96,
    fontWeight: '200',
    letterSpacing: -2,
  },
});
