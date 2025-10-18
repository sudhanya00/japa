/**
 * Pre-defined haptic feedback patterns for consistent tactile experience
 * These patterns are optimized to feel intentional and meditative
 */

import { HapticPattern } from '../types';

export const HAPTIC_PATTERNS = {
  // Normal tap feedback - gentle, confirming
  NORMAL_TAP: {
    type: 'impact' as const,
    intensity: 'light' as const,
  },
  
  // Milestone reached (108, 216, 324, 432) - more pronounced and longer
  MILESTONE: {
    type: 'notification' as const,
    intensity: 'heavy' as const,
  },
  
  // Set completion (108 beads) - distinct celebration
  SET_COMPLETE: {
    type: 'notification' as const,
    intensity: 'heavy' as const,
  },
  
  // Undo action - light warning
  UNDO: {
    type: 'impact' as const,
    intensity: 'medium' as const,
  },
  
  // Reset/Clear - stronger warning
  RESET: {
    type: 'notification' as const,
    intensity: 'heavy' as const,
  },
  
  // Error or invalid action
  ERROR: {
    type: 'notification' as const,
    intensity: 'heavy' as const,
  },
  
  // UI navigation/selection
  SELECTION: {
    type: 'selection' as const,
  },
} as const;

// Milestone counts
export const MILESTONES = [108, 216, 324, 432] as const;

// Beads per set (traditional mala)
export const BEADS_PER_SET = 108;

// Maximum total count
export const MAX_COUNT = 432; // 4 sets
