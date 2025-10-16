/**
 * BeadCircle Component
 * Infinite horizontal loop of hyperrealistic beads
 * Continuous smooth rotation with perspective depth
 */

import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useAppStore } from '../../store/appStore';
import { HyperRealisticBead } from '../RosaryBead/HyperRealisticBead';
import { getVisibleBeads, BEAD_STRIP_Y, BEAD_SPACING } from '../../utils/beadPositioning';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const BeadCircle: React.FC = () => {
  const count = useAppStore(state => state.count);
  const autoRotate = useAppStore(state => state.autoRotate);
  const animatedOffset = useRef(new Animated.Value(0)).current;
  const autoRotateAnimation = useRef<Animated.CompositeAnimation | null>(null);

  // Animate to new position when count changes (manual tap)
  useEffect(() => {
    if (!autoRotate) {
      Animated.spring(animatedOffset, {
        toValue: count * BEAD_SPACING,
        useNativeDriver: false,
        friction: 8,
        tension: 40,
      }).start();
    }
  }, [count, autoRotate]);

  // Auto-rotation continuous animation
  useEffect(() => {
    if (autoRotate) {
      // Stop any existing tap animation
      animatedOffset.stopAnimation((currentValue) => {
        // Create continuous rotation from current position
        autoRotateAnimation.current = Animated.loop(
          Animated.timing(animatedOffset, {
            toValue: currentValue + (BEAD_SPACING * 108), // One full rotation (108 beads)
            duration: 60000, // 60 seconds for full rotation (slow, meditative)
            useNativeDriver: false,
          })
        );
        autoRotateAnimation.current.start();
      });
    } else {
      // Stop auto-rotation when disabled
      if (autoRotateAnimation.current) {
        autoRotateAnimation.current.stop();
        autoRotateAnimation.current = null;
      }
    }

    return () => {
      if (autoRotateAnimation.current) {
        autoRotateAnimation.current.stop();
      }
    };
  }, [autoRotate]);

  // Get visible beads for horizontal strip
  const visibleBeads = getVisibleBeads(count, 0);

  // Active bead index (the one being counted)
  // The active bead is always the current count (no cycling)
  const activeBeadIndex = count;

  // Generate curved path through all beads matching their arc
  const generateThreadPath = () => {
    const startX = -200;
    const endX = SCREEN_WIDTH + 200;
    const centerX = SCREEN_WIDTH / 2;
    const centerY = BEAD_STRIP_Y;
    const curveDepth = 20; // Same as bead positioning curve
    
    // The beads use: y = BEAD_STRIP_Y + (normalizedX^2) * curveDepth
    // We need a quadratic Bézier curve that matches this parabola
    
    // For quadratic Bézier: control point should be at center
    const controlX = centerX;
    const controlY = centerY + curveDepth; // Bottom of the curve (beads dip down)
    
    // Create smooth downward curve (like a smile/arc)
    return `M ${startX},${centerY} Q ${controlX},${controlY} ${endX},${centerY}`;
  };

  return (
    <View style={styles.container} pointerEvents="none">
      {/* Render visible beads */}
      {visibleBeads.map((beadPosition) => (
        <HyperRealisticBead
          key={beadPosition.index}
          position={beadPosition}
          isActive={beadPosition.index === activeBeadIndex}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0, // Behind counter
  },
});
