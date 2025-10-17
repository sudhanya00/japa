/**
 * Custom hook for haptic feedback
 * Provides tactile responses based on app state and user preferences
 * Using Expo Haptics for compatibility with Expo Go
 */

import { useCallback } from 'react';
import { Platform, Vibration } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useAppStore } from '../store/appStore';
import { HAPTIC_PATTERNS, MILESTONES } from '../constants/hapticPatterns';

export const useHaptic = () => {
  const hapticIntensity = useAppStore(state => state.hapticIntensity);

  const triggerHaptic = useCallback((patternKey: keyof typeof HAPTIC_PATTERNS) => {
    // Skip if haptics are disabled
    if (hapticIntensity === 'off') {
      return;
    }

    const pattern = HAPTIC_PATTERNS[patternKey];
    
    // Adjust intensity based on user preference
    const adjustedIntensity = 
      hapticIntensity === 'gentle' && 'intensity' in pattern
        ? pattern.intensity === 'heavy'
          ? 'medium'
          : pattern.intensity === 'medium'
          ? 'light'
          : pattern.intensity
        : 'intensity' in pattern
        ? pattern.intensity
        : undefined;

    // Trigger appropriate haptic feedback using Expo Haptics
    if (pattern.type === 'impact') {
      // Light impact for normal taps
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } else if (pattern.type === 'notification') {
      // Stronger feedback for notifications/milestones
      if (adjustedIntensity === 'heavy') {
        // Longer, more distinct sequence for milestones
        if (Platform.OS === 'android') {
          // Custom vibration pattern on Android (durations in ms)
          // 0ms delay, 60ms vibrate, 40ms pause, 90ms vibrate
          Vibration.vibrate([0, 60, 40, 90], false);
        } else {
          (async () => {
            await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
          })();
        }
      } else {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      }
    } else if (pattern.type === 'selection') {
      // Selection feedback
      Haptics.selectionAsync();
    }
  }, [hapticIntensity]);

  const triggerTapFeedback = useCallback((count: number) => {
    // Check if this is a milestone
    const isMilestone = MILESTONES.includes(count as any);
    
    if (isMilestone) {
      triggerHaptic('MILESTONE');
    } else if (count % 108 === 0 && count > 0) {
      triggerHaptic('SET_COMPLETE');
    } else {
      triggerHaptic('NORMAL_TAP');
    }
  }, [triggerHaptic]);

  return {
    triggerHaptic,
    triggerTapFeedback,
  };
};
