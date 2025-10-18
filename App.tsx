/**
 * Main App Component - Japa Meditation Counter
 * Minimalist tap-anywhere counter with meditative design
 */

import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, StatusBar, GestureResponderEvent, Dimensions, Text, BackHandler, Alert, AppState } from 'react-native';
import { useAppStore } from './src/store/appStore';
import { useCounter } from './src/hooks/useCounter';
import { CounterDisplay } from './src/components/Counter/CounterDisplay';
import { BeadCircle } from './src/components/BeadCircle/BeadCircle';
import { ResetButton } from './src/components/Settings/ResetButton';
import { TapRipple } from './src/components/Effects/TapRipple';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from './src/constants/colors';
import { SettingsPanel } from './src/components/SettingsPanel';
import { MilestoneBackdrop } from './src/components/Effects/MilestoneBackdrop';
import { SessionHistory } from './src/components/History/SessionHistory';

export default function App() {
  const theme = useAppStore(state => state.theme);
  const loadState = useAppStore(state => state.loadState);
  const count = useAppStore(state => state.count);
  const sessionStartTime = useAppStore(state => state.sessionStartTime);
  const { handleTap } = useCounter();
  const [showResetModal, setShowResetModal] = useState(false);
  const [rippleKey, setRippleKey] = useState(0);
  const [ripplePos, setRipplePos] = useState({ x: 0, y: 0 });
  const { width, height } = Dimensions.get('window');
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [historyVisible, setHistoryVisible] = useState(false);
  
  const themeColors = COLORS[theme];
  const isMilestone = count > 0 && count % 108 === 0;
  const [milestoneKey, setMilestoneKey] = useState(0);

  // Check if there's an unsaved session
  const hasUnsavedSession = count > 0 && sessionStartTime !== null;

  // Set viewport meta tag for web to prevent zoom and ensure proper mobile rendering
  useEffect(() => {
    if (typeof document !== 'undefined') {
      let viewport = document.querySelector('meta[name=viewport]');
      if (viewport) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
      }
      // Prevent text size adjustment on iOS
      document.documentElement.style.webkitTextSizeAdjust = '100%';
      // Disable pull-to-refresh on mobile
      document.body.style.overscrollBehavior = 'none';
    }
  }, []);

  // Load persisted state on mount
  useEffect(() => {
    loadState();
  }, [loadState]);

  // Fire visual backdrop on milestone
  useEffect(() => {
    if (isMilestone) setMilestoneKey(prev => prev + 1);
  }, [isMilestone]);

  // Handle Android back button - prompt to save if unsaved session
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (hasUnsavedSession) {
        Alert.alert(
          'Unsaved Session',
          `You have ${count} japa counted. Would you like to save this session before exiting?`,
          [
            {
              text: 'Exit Without Saving',
              onPress: () => BackHandler.exitApp(),
              style: 'destructive',
            },
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Save Session',
              onPress: () => setShowResetModal(true),
            },
          ],
          { cancelable: true }
        );
        return true; // Prevent default back behavior
      }
      return false; // Allow normal back behavior
    });

    return () => backHandler.remove();
  }, [hasUnsavedSession, count]);

  // Handle app state changes (going to background) - prompt to save
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'background' && hasUnsavedSession) {
        // Show alert when app goes to background with unsaved session
        Alert.alert(
          'Unsaved Session',
          `You have ${count} japa counted. Don't forget to save your session!`,
          [{ text: 'OK' }]
        );
      }
    });

    return () => {
      subscription.remove();
    };
  }, [hasUnsavedSession, count]);

  // Handle long press for reset
  const handleLongPress = () => {
    setShowResetModal(true);
  };

  const handlePress = (e: GestureResponderEvent) => {
    const { pageX, pageY } = e.nativeEvent as any;
    // Clamp to screen to avoid offscreen drawing
    const x = Math.max(0, Math.min(pageX, width));
    const y = Math.max(0, Math.min(pageY, height));
    setRipplePos({ x, y });
    setRippleKey(prev => prev + 1);
    handleTap();
  };

  return (
    <TouchableWithoutFeedback 
      onPress={handlePress}
      onLongPress={handleLongPress}
    >
      <View style={[styles.container, { backgroundColor: themeColors.background }]}>
        {/* Subtle background progress gradient */}
        <LinearGradient
          colors={[themeColors.background, themeColors.primary + '0D']}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          // Opacity subtly increases with progress within the current set (0 -> ~6%)
          // eslint-disable-next-line react-native/no-inline-styles
          locations={[0, Math.min(1, (count % 108) / 108)]}
        />
        <StatusBar 
          barStyle={theme === 'light' ? 'dark-content' : 'light-content'} 
          backgroundColor={themeColors.background}
        />
        
        {/* Bead animation layer (behind counter) */}
        <BeadCircle />

        {/* Milestone backdrop pulse */}
        <MilestoneBackdrop triggerKey={milestoneKey} color={themeColors.primary + '14'} />
        
        {/* Spacer to push counter to bottom */}
        <View style={{ flex: 1 }} />
        
        {/* Counter display at bottom */}
        <CounterDisplay />

        {/* Tap ripple overlay */}
        <TapRipple triggerKey={rippleKey} x={ripplePos.x} y={ripplePos.y} color={themeColors.text + '33'} />

        {/* Settings panel toggle (top-right gear) */}
        <View style={{ position: 'absolute', top: 48, right: 16 }}>
          <TouchableWithoutFeedback onPress={() => setSettingsVisible(true)}>
            <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: themeColors.surface, alignItems: 'center', justifyContent: 'center' }}>
              <View style={{ width: 18, height: 18, borderRadius: 9, borderWidth: 2, borderColor: themeColors.text }} />
            </View>
          </TouchableWithoutFeedback>
        </View>

        {/* History button (top-left) */}
        <View style={{ position: 'absolute', top: 48, left: 16 }}>
          <TouchableWithoutFeedback onPress={() => setHistoryVisible(true)}>
            <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: themeColors.surface, alignItems: 'center', justifyContent: 'center' }}>
              {/* Simple calendar/list icon - 3 horizontal lines */}
              <View style={{ gap: 3 }}>
                <View style={{ width: 16, height: 2, backgroundColor: themeColors.text, borderRadius: 1 }} />
                <View style={{ width: 16, height: 2, backgroundColor: themeColors.text, borderRadius: 1 }} />
                <View style={{ width: 16, height: 2, backgroundColor: themeColors.text, borderRadius: 1 }} />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>

        {/* Hint text - press and hold instruction */}
        <View style={{ position: 'absolute', top: 56, alignSelf: 'center' }}>
          <Text style={{ 
            fontSize: 11, 
            color: themeColors.textSecondary, 
            opacity: 0.6,
            letterSpacing: 0.5,
            textTransform: 'uppercase',
            fontWeight: '500',
          }}>
            Press & hold to save session
          </Text>
        </View>

        {/* Reset modal (appears on long press) */}
        <ResetButton 
          visible={showResetModal}
          onClose={() => setShowResetModal(false)}
        />

        {/* Settings panel */}
        <SettingsPanel visible={settingsVisible} onClose={() => setSettingsVisible(false)} />

        {/* Session history */}
        <SessionHistory visible={historyVisible} onClose={() => setHistoryVisible(false)} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start', // Start from top, spacer will push counter to bottom
  },
});
