/**
 * Counter Display Component
 * Shows the current count with large, readable typography
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppStore } from '../../store/appStore';
import { COLORS } from '../../constants/colors';

export const CounterDisplay: React.FC = () => {
  const count = useAppStore(state => state.count);
  const theme = useAppStore(state => state.theme);
  
  const themeColors = COLORS[theme];

  return (
    <View style={styles.container}>
      <Text style={[styles.count, { color: themeColors.primary }]}>
        {count}
      </Text>
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
