/**
 * RosaryBead Component
 * Individual bead with type-specific visual design
 * Simplified for Expo Go compatibility (no advanced Reanimated)
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useAppStore } from '../../store/appStore';
import { ROSARY_DESIGNS } from '../../constants/rosaryDesigns';
import { BEAD_SIZE } from '../../utils/beadPositioning';
import type { BeadPosition } from '../../utils/beadPositioning';

interface RosaryBeadProps {
  position: BeadPosition;
  isActive?: boolean; // True if this is the current bead being counted
}

export const RosaryBead: React.FC<RosaryBeadProps> = React.memo(({ position, isActive }) => {
  const rosaryType = useAppStore(state => state.rosaryType);
  const design = ROSARY_DESIGNS[rosaryType];

  // Static style based on position (will add animation later)
  const positionStyle = {
    transform: [
      { translateX: position.x - BEAD_SIZE / 2 },
      { translateY: position.y - BEAD_SIZE / 2 },
      { scale: position.scale },
    ],
    opacity: position.opacity,
  };

  return (
    <View style={[styles.beadContainer, positionStyle]}>
      <View
        style={[
          styles.bead,
          {
            backgroundColor: design.primaryColor,
            borderColor: design.secondaryColor,
            borderWidth: isActive ? 3 : 2,
          },
        ]}
      >
        {/* Active bead highlight */}
        {isActive && (
          <View
            style={[
              styles.activeHighlight,
              { backgroundColor: design.glowColor },
            ]}
          />
        )}
      </View>
    </View>
  );
});

RosaryBead.displayName = 'RosaryBead';

const styles = StyleSheet.create({
  beadContainer: {
    position: 'absolute',
    width: BEAD_SIZE,
    height: BEAD_SIZE,
  },
  bead: {
    width: BEAD_SIZE,
    height: BEAD_SIZE,
    borderRadius: BEAD_SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    // Shadow for depth
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  activeHighlight: {
    position: 'absolute',
    width: BEAD_SIZE * 0.6,
    height: BEAD_SIZE * 0.6,
    borderRadius: (BEAD_SIZE * 0.6) / 2,
    opacity: 0.5,
  },
});
