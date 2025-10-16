/**
 * Main App Component - Japa Meditation Counter
 * Minimalist tap-anywhere counter with meditative design
 */

import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, StatusBar } from 'react-native';
import { useAppStore } from './src/store/appStore';
import { useCounter } from './src/hooks/useCounter';
import { CounterDisplay } from './src/components/Counter/CounterDisplay';
import { BeadCircle } from './src/components/BeadCircle/BeadCircle';
import { ResetButton } from './src/components/Settings/ResetButton';
import { COLORS } from './src/constants/colors';

export default function App() {
  const theme = useAppStore(state => state.theme);
  const loadState = useAppStore(state => state.loadState);
  const { handleTap } = useCounter();
  const [showResetModal, setShowResetModal] = useState(false);
  
  const themeColors = COLORS[theme];

  // Load persisted state on mount
  useEffect(() => {
    loadState();
  }, [loadState]);

  // Handle long press for reset
  const handleLongPress = () => {
    setShowResetModal(true);
  };

  return (
    <TouchableWithoutFeedback 
      onPress={handleTap}
      onLongPress={handleLongPress}
    >
      <View style={[styles.container, { backgroundColor: themeColors.background }]}>
        <StatusBar 
          barStyle={theme === 'light' ? 'dark-content' : 'light-content'} 
          backgroundColor={themeColors.background}
        />
        
        {/* Bead animation layer (behind counter) */}
        <BeadCircle />
        
        {/* Spacer to push counter to bottom */}
        <View style={{ flex: 1 }} />
        
        {/* Counter display at bottom */}
        <CounterDisplay />

        {/* Reset modal (appears on long press) */}
        <ResetButton 
          visible={showResetModal}
          onClose={() => setShowResetModal(false)}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start', // Start from top, spacer will push counter to bottom
  },
});
