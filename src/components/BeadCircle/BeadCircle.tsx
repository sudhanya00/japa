/**
 * BeadCircle Component
 * Infinite horizontal loop of hyperrealistic beads
 * Continuous smooth rotation with perspective depth
 */

import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import Svg, { Path, Defs, Mask, Rect, Circle } from 'react-native-svg';
import { useAppStore } from '../../store/appStore';
import { HyperRealisticBead } from '../RosaryBead/HyperRealisticBead';
import { getVisibleBeads, BEAD_SPACING } from '../../utils/beadPositioning';
import { ROSARY_DESIGNS } from '../../constants/rosaryDesigns';

export const BeadCircle: React.FC = () => {
  // Responsive dimensions that update on window resize
  const [screenDimensions, setScreenDimensions] = useState(() => {
    const { width, height } = Dimensions.get('window');
    return { width, height };
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setScreenDimensions({ width: window.width, height: window.height });
    });

    return () => subscription?.remove();
  }, []);
  const count = useAppStore(state => state.count);
  const rosaryType = useAppStore(state => state.rosaryType);
  const animatedOffset = useRef(new Animated.Value(0)).current;
  const [currentOffset, setCurrentOffset] = useState(0);

  // Calculate dynamic bead dimensions based on screen size
  const beadSize = screenDimensions.width * 0.20;
  const beadSpacing = beadSize * 1.72;
  const beadStripY = screenDimensions.height * 0.45;

  // Animate to new position when count changes (tap)
  useEffect(() => {
    Animated.spring(animatedOffset, {
      toValue: count * beadSpacing,
      useNativeDriver: false,
      friction: 8,
      tension: 40,
    }).start();
  }, [count, beadSpacing]);

  // Keep a numeric snapshot of the animated offset to feed layout calculation
  useEffect(() => {
    const id = animatedOffset.addListener(({ value }) => setCurrentOffset(value));
    return () => {
      animatedOffset.removeListener(id);
    };
  }, [animatedOffset]);

  // Get visible beads for horizontal strip using the animated offset
  const visibleBeads = getVisibleBeads(count, currentOffset);

  // Active bead index (the one being counted)
  // The active bead is always the current count (no cycling)
  const activeBeadIndex = count;

  // Generate threaded path by sampling the exact bead arc formula
  const generateThreadPath = () => {
    const centerX = screenDimensions.width / 2;
    const centerY = beadStripY;
    const curveDepth = 20; // Same as bead positioning curve

    const step = 16; // pixels between samples
    let path = '';
    for (let x = -200; x <= screenDimensions.width + 200; x += step) {
      const normalizedX = (x - centerX) / (screenDimensions.width / 2); // -1..1
      const y = centerY + Math.pow(Math.abs(normalizedX), 2) * curveDepth;
      path += path.length === 0 ? `M ${x},${y}` : ` L ${x},${y}`;
    }
    return path;
  };

  const design = ROSARY_DESIGNS[rosaryType];
  const isMilestone = count > 0 && count % 108 === 0;

  return (
    <View style={styles.container} pointerEvents="none">
      {/* Thread curve behind beads with mask to avoid drawing under beads */}
      <Svg pointerEvents="none" width={screenDimensions.width} height={screenDimensions.height} style={StyleSheet.absoluteFill}>
        <Defs>
          <Mask id="threadMask">
            {/* Start with full visibility */}
            <Rect x="0" y="0" width={screenDimensions.width} height={screenDimensions.height} fill="#ffffff" />
            {/* Punch holes where beads are (so thread is hidden under them) */}
            {visibleBeads.map(b => {
              const radius = Math.max(1, (beadSize * b.scale * 0.5) * 0.96); // actual bead radius, slightly inset, min 1px
              return (
                <Circle key={`mask-${b.index}`} cx={b.x} cy={b.y} r={radius} fill="#000000" />
              );
            })}
          </Mask>
        </Defs>
        <Path
          d={generateThreadPath()}
          stroke={design.secondaryColor}
          strokeOpacity={0.45}
          strokeWidth={2}
          fill="none"
          mask="url(#threadMask)"
        />
      </Svg>

      {/* Render visible beads */}
      {visibleBeads.map((beadPosition) => (
        <HyperRealisticBead
          key={beadPosition.index}
          position={beadPosition}
          isActive={beadPosition.index === activeBeadIndex}
          milestoneTrigger={isMilestone ? count : undefined}
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
