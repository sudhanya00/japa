/**
 * Animation utilities and configurations
 * Reanimated worklets and timing functions
 */

import { Easing, withTiming, withRepeat, withSpring } from 'react-native-reanimated';

// Animation durations (in milliseconds)
export const ANIMATION_DURATION = {
  beadFlow: 400, // Bead rotation on tap
  breathingGlow: 2000, // Half cycle of breathing (4s total)
  tapRipple: 600, // Tap ripple expand and fade
  milestone: 800, // Milestone celebration
  quick: 200, // Quick UI transitions
};

// Easing functions
export const EASING = {
  // Smooth, natural easing (Material Design standard)
  standard: Easing.bezier(0.4, 0.0, 0.2, 1),

  // Ease in (accelerate)
  easeIn: Easing.bezier(0.4, 0.0, 1, 1),

  // Ease out (decelerate)
  easeOut: Easing.bezier(0.0, 0.0, 0.2, 1),

  // Ease in and out
  easeInOut: Easing.inOut(Easing.ease),

  // Elastic (for celebrations)
  elastic: Easing.elastic(1.2),

  // Linear (for continuous animations)
  linear: Easing.linear,
};

/**
 * Animate bead flow (rotation on tap)
 * Returns a worklet-ready animation config
 */
export const animateBeadFlow = () => {
  'worklet';
  return withTiming(1, {
    duration: ANIMATION_DURATION.beadFlow,
    easing: EASING.standard,
  });
};

/**
 * Animate breathing glow effect
 * Infinite loop, back and forth
 */
export const animateBreathingGlow = () => {
  'worklet';
  return withRepeat(
    withTiming(1, {
      duration: ANIMATION_DURATION.breathingGlow,
      easing: EASING.easeInOut,
    }),
    -1, // Infinite
    true // Reverse
  );
};

/**
 * Animate tap ripple effect
 * Expands and fades out
 */
export const animateTapRipple = () => {
  'worklet';
  return {
    scale: withTiming(2, {
      duration: ANIMATION_DURATION.tapRipple,
      easing: EASING.easeOut,
    }),
    opacity: withTiming(0, {
      duration: ANIMATION_DURATION.tapRipple,
      easing: EASING.easeOut,
    }),
  };
};

/**
 * Animate milestone celebration
 * Gentle pulse effect
 */
export const animateMilestonePulse = () => {
  'worklet';
  return withSpring(1.1, {
    damping: 8,
    stiffness: 100,
    mass: 1,
  });
};

/**
 * Interpolate value with custom range
 * Useful for mapping animation values to visual properties
 */
export const interpolateValue = (
  value: number,
  inputRange: [number, number],
  outputRange: [number, number]
): number => {
  'worklet';
  const [inputMin, inputMax] = inputRange;
  const [outputMin, outputMax] = outputRange;

  const ratio = (value - inputMin) / (inputMax - inputMin);
  return outputMin + ratio * (outputMax - outputMin);
};

/**
 * Clamp value between min and max
 */
export const clamp = (value: number, min: number, max: number): number => {
  'worklet';
  return Math.min(Math.max(value, min), max);
};

/**
 * Calculate opacity based on distance from center
 * Useful for depth effect
 */
export const calculateDepthOpacity = (
  distance: number,
  maxDistance: number
): number => {
  'worklet';
  const normalized = clamp(distance / maxDistance, 0, 1);
  return 1 - normalized * 0.7; // Fade to 30% opacity at max distance
};

/**
 * Calculate scale based on position
 * Useful for perspective effect
 */
export const calculateDepthScale = (
  distance: number,
  maxDistance: number
): number => {
  'worklet';
  const normalized = clamp(distance / maxDistance, 0, 1);
  return 1 - normalized * 0.4; // Scale down to 60% at max distance
};
