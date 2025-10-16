/**
 * Custom hook for counter logic with optimistic updates
 * Ensures tap-to-haptic response happens immediately (<50ms target)
 */

import { useCallback } from 'react';
import { useAppStore } from '../store/appStore';
import { useHaptic } from './useHaptic';

export const useCounter = () => {
  const count = useAppStore(state => state.count);
  const currentSet = useAppStore(state => state.currentSet);
  const totalSets = useAppStore(state => state.totalSets);
  const incrementCount = useAppStore(state => state.incrementCount);
  const decrementCount = useAppStore(state => state.decrementCount);
  const resetCount = useAppStore(state => state.resetCount);
  
  const { triggerTapFeedback, triggerHaptic } = useHaptic();

  // Optimistic tap handler - haptic fires BEFORE state update
  const handleTap = useCallback(() => {
    // Calculate what the next count will be
    const nextCount = count + 1;
    
    // Trigger haptic immediately (before state update)
    triggerTapFeedback(nextCount);
    
    // Then update state
    incrementCount();
  }, [count, incrementCount, triggerTapFeedback]);

  const handleUndo = useCallback(() => {
    if (count === 0) {
      triggerHaptic('ERROR');
      return;
    }
    
    triggerHaptic('UNDO');
    decrementCount();
  }, [count, decrementCount, triggerHaptic]);

  const handleReset = useCallback(() => {
    if (count === 0) {
      return;
    }
    
    triggerHaptic('RESET');
    resetCount();
  }, [count, resetCount, triggerHaptic]);

  return {
    count,
    currentSet,
    totalSets,
    handleTap,
    handleUndo,
    handleReset,
  };
};
