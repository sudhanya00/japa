/**
 * Bead positioning and layout calculations
 * Infinite horizontal loop with hyperrealistic perspective
 */

import { Dimensions } from 'react-native';

// Get current screen dimensions dynamically
const getDimensions = () => Dimensions.get('window');

// Layout constants for infinite horizontal loop
/**
 * Bead size relative to screen width
 */
const getBEAD_SIZE = () => getDimensions().width * 0.20;
const getBEAD_SPACING = () => getBEAD_SIZE() * 1.72;
const getBEAD_STRIP_Y = () => getDimensions().height * 0.45;

// Export legacy constants for components that need them (will update dynamically)
export const BEAD_SIZE = getBEAD_SIZE();
export const BEAD_SPACING = getBEAD_SPACING();
export const BEAD_STRIP_Y = getBEAD_STRIP_Y();

export const VISIBLE_BEADS = 12; // Number of beads visible in horizontal strip
export const TOTAL_BEADS = 108; // Traditional mala count

// Perspective depth range
export const MIN_SCALE = 0.4; // Beads at edges (far away)
export const MAX_SCALE = 1.2; // Beads at center (closest to camera)

export interface BeadPosition {
  x: number;
  y: number;
  scale: number; // Scale for perspective depth
  opacity: number; // Opacity for depth of field
  zIndex: number; // Layering (closer beads on top)
  index: number; // Original bead index
  isCenterBead: boolean; // True if this is the focal point bead
}

/**
 * Calculate position of a bead in the infinite horizontal loop
 * @param index - Bead index (0-107)
 * @param offset - Animation offset (scrolling position)
 * @returns Position object with x, y, scale, opacity, zIndex
 */
export const getBeadPosition = (
  index: number,
  offset: number = 0
): BeadPosition => {
  const { width: SCREEN_WIDTH } = getDimensions();
  const beadSpacing = getBEAD_SPACING();
  const beadStripY = getBEAD_STRIP_Y();
  
  // Calculate horizontal position - no wrapping, infinite beads!
  // Each bead has its own unique position
  const baseX = index * beadSpacing;
  const x = SCREEN_WIDTH / 2 + (baseX - offset);
  
  // Position relative to screen center
  const centerOffset = x - (SCREEN_WIDTH / 2);
  
  // Y position with subtle curve (like beads hanging)
  // Create gentle arc - beads dip slightly in center
  const normalizedX = centerOffset / (SCREEN_WIDTH / 2); // -1 to 1
  const curveDepth = 20; // pixels
  const y = beadStripY + Math.pow(Math.abs(normalizedX), 2) * curveDepth;
  
  // Perspective scale - center beads are larger (closer to camera)
  const distanceFromCenter = Math.abs(normalizedX);
  const scale = MAX_SCALE - (distanceFromCenter * (MAX_SCALE - MIN_SCALE));
  
  // Opacity for depth of field - edges fade out
  const opacity = Math.max(0.2, 1 - Math.pow(distanceFromCenter, 1.5));
  
  // Z-index - center beads should be on top
  const zIndex = Math.round((1 - distanceFromCenter) * 100);
  
  // Check if this is the center/focal bead - looser tolerance for visibility
  // Bead within 40% of bead spacing from center
  const isCenterBead = Math.abs(centerOffset) < beadSpacing * 0.4;
  
  return {
    x,
    y,
    scale,
    opacity,
    zIndex,
    index,
    isCenterBead,
  };
};

/**
 * Get all visible bead positions for current state
 * @param count - Current count (determines scroll position)
 * @param animationTime - Current animation time (for smooth scrolling)
 * @returns Array of bead positions
 */
export const getVisibleBeads = (
  count: number,
  animationTime: number = 0
): BeadPosition[] => {
  const beads: BeadPosition[] = [];
  const beadSpacing = getBEAD_SPACING();
  
  // Calculate scroll offset based on count
  // Each tap scrolls by one bead width
  const baseOffset = count * beadSpacing;
  
  // If an absolute animated offset is provided (e.g., Animated drives count * SPACING), use it directly.
  // Otherwise, fall back to baseOffset + incremental animationTime
  const totalOffset = animationTime !== 0 ? animationTime : baseOffset + animationTime;
  
  // Generate enough beads to fill screen + some overflow
  const beadsToRender = VISIBLE_BEADS + 4; // Extra for smooth edges
  
  // Start from current count and render beads around it (no modulo cycling!)
  for (let i = 0; i < beadsToRender; i++) {
    const beadIndex = count + i - Math.floor(beadsToRender / 2);
    
    // Only render beads with non-negative indices
    if (beadIndex >= 0) {
      const position = getBeadPosition(beadIndex, totalOffset);
      
      // Only include beads within or near viewport
      if (isBeadVisible(position)) {
        beads.push(position);
      }
    }
  }
  
  // Sort by z-index for correct layering
  return beads.sort((a, b) => a.zIndex - b.zIndex);
};

/**
 * Check if a bead is within the visible viewport
 * @param position - Bead position
 * @returns True if bead should be rendered
 */
export const isBeadVisible = (position: BeadPosition): boolean => {
  const { width: SCREEN_WIDTH } = getDimensions();
  const beadSize = getBEAD_SIZE();
  const buffer = beadSize * 2;
  
  return (
    position.x > -buffer &&
    position.x < SCREEN_WIDTH + buffer &&
    position.opacity > 0.1 // Don't render nearly invisible beads
  );
};

/**
 * Calculate the "active" bead position (the one being counted)
 * This is the center/focal point bead
 * @param count - Current count
 * @returns Position of the active bead
 */
export const getActiveBeadPosition = (count: number): BeadPosition => {
  const beadSpacing = getBEAD_SPACING();
  const currentBeadIndex = count % TOTAL_BEADS;
  return getBeadPosition(currentBeadIndex, count * beadSpacing);
};

/**
 * Get screen dimensions (useful for responsive calculations)
 */
export const getScreenDimensions = () => getDimensions();

/**
 * Calculate animation progress based on count
 * Useful for determining when to trigger milestone animations
 * @param count - Current count
 * @returns Object with progress info
 */
export const getProgressInfo = (count: number) => {
  const currentSet = Math.floor(count / TOTAL_BEADS) + 1;
  const beadsInCurrentSet = count % TOTAL_BEADS;
  const totalProgress = (count / (TOTAL_BEADS * 4)) * 100; // 4 sets max

  return {
    currentSet,
    beadsInCurrentSet,
    totalProgress,
    isSetComplete: beadsInCurrentSet === 0 && count > 0,
  };
};
