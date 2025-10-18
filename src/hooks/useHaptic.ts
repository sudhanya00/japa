/**
 * Custom hook for haptic feedback
 * Provides tactile responses based on app state and user preferences
 * Using Web Vibration API for web platform
 */

import { useCallback } from 'react';
import { useAppStore } from '../store/appStore';
import { HAPTIC_PATTERNS, MILESTONES } from '../constants/hapticPatterns';

export const useHaptic = () => {
  const hapticIntensity = useAppStore(state => state.hapticIntensity);

  const triggerHaptic = useCallback((patternKey: keyof typeof HAPTIC_PATTERNS) => {
    // Skip if haptics are disabled
    if (hapticIntensity === 'off') {
      return;
    }

    // Check if browser supports Vibration API
    if (!navigator.vibrate) {
      return; // Gracefully degrade if not supported
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

    // Trigger appropriate haptic feedback using Web Vibration API
    if (pattern.type === 'impact') {
      // Light impact for normal taps
      navigator.vibrate(10); // 10ms vibration
    } else if (pattern.type === 'notification') {
      // Stronger feedback for notifications/milestones
      if (adjustedIntensity === 'heavy') {
        // Longer, more distinct sequence for milestones
        // Pattern: [vibrate, pause, vibrate, pause, vibrate]
        navigator.vibrate([60, 40, 90]); // ms
      } else {
        // Medium notification
        navigator.vibrate([30, 20, 30]); // ms
      }
    } else if (pattern.type === 'selection') {
      // Selection feedback - very brief
      navigator.vibrate(5); // 5ms vibration
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
