/**
 * HyperRealisticBead Component
 * 3D-style bead with realistic gradients, shadows, and highlights
 * Supports both gradient-based rendering and custom image assets
 */

import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Image, Easing, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppStore } from '../../store/appStore';
import { ROSARY_DESIGNS } from '../../constants/rosaryDesigns';
import { BEAD_SIZE } from '../../utils/beadPositioning';
import { getBeadAsset } from '../../constants/beadAssets';
import type { BeadPosition } from '../../utils/beadPositioning';

interface HyperRealisticBeadProps {
  position: BeadPosition;
  isActive?: boolean;
  // Bumped whenever a milestone (108, 216, ...) is reached; triggers a pulse
  milestoneTrigger?: number;
}

// Global breathing animation - outward pulse only (vignette effect)
const globalBreathingGlow = new Animated.Value(1.0); // Start at base (no pulse)
let globalBreathingAnimation: Animated.CompositeAnimation | null = null;

// Start global breathing animation once - subtle outward pulse only
if (!globalBreathingAnimation) {
  globalBreathingAnimation = Animated.loop(
    Animated.sequence([
      // Pulse outward (expand glow)
      Animated.timing(globalBreathingGlow, {
        toValue: 1.3, // Expand to 1.3x
        duration: 3000, // 3 seconds out
        easing: Easing.bezier(0.4, 0, 0.6, 1),
        useNativeDriver: false,
      }),
      // Return to base
      Animated.timing(globalBreathingGlow, {
        toValue: 1.0, // Back to base
        duration: 3000, // 3 seconds in
        easing: Easing.bezier(0.4, 0, 0.6, 1),
        useNativeDriver: false,
      }),
    ])
  );
  globalBreathingAnimation.start();
}

export const HyperRealisticBead: React.FC<HyperRealisticBeadProps> = React.memo(
  ({ position, isActive, milestoneTrigger }) => {
    const rosaryType = useAppStore(state => state.rosaryType);
    const design = ROSARY_DESIGNS[rosaryType];
    const beadAsset = getBeadAsset(rosaryType);

    // Pulse scale only (avoid per-bead position animations for performance)
    const pulseScale = useRef(new Animated.Value(1)).current;
    
    // Use global breathing animation (shared across all beads)
    const breathingGlow = globalBreathingGlow;
    
    // Smooth glow visibility transition (prevents flashing) - separate ref to avoid native driver conflict
    const glowVisibility = useRef(new Animated.Value(position.isCenterBead ? 1 : 0)).current;
    
    // Smoothly fade glow in/out instead of instant show/hide
    useEffect(() => {
      Animated.timing(glowVisibility, {
        toValue: position.isCenterBead ? 1 : 0,
        duration: 500, // 500ms fade in/out
        useNativeDriver: false, // Must be false for opacity
        easing: Easing.inOut(Easing.ease),
      }).start();
    }, [position.isCenterBead, glowVisibility]);

    // No per-bead position animations; positions update from parent offset re-render

    // Milestone pulse for active bead only
    useEffect(() => {
      if (!isActive || milestoneTrigger === undefined) return;
      pulseScale.setValue(1);
      Animated.sequence([
        Animated.timing(pulseScale, {
          toValue: 1.08,
          duration: 160,
          easing: Easing.out(Easing.quad),
          useNativeDriver: false,
        }),
        Animated.timing(pulseScale, {
          toValue: 1,
          duration: 160,
          easing: Easing.out(Easing.quad),
          useNativeDriver: false,
        }),
      ]).start();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [milestoneTrigger, isActive]);

    // Calculate actual bead size with perspective scale
    const scaledSize = BEAD_SIZE * position.scale;

    // Animated position style
    const containerStyle = {
      position: 'absolute' as const,
      left: position.x - scaledSize / 2,
      top: position.y - scaledSize / 2,
      width: scaledSize,
      height: scaledSize,
      zIndex: position.zIndex,
      transform: [{ scale: Animated.multiply(pulseScale, 1) }],
    };

    // Render image-based bead
    if (beadAsset.type === 'image' && beadAsset.image) {
      const imageSource = (isActive || position.isCenterBead) && beadAsset.activeImage 
        ? beadAsset.activeImage 
        : beadAsset.image;

      return (
        <Animated.View style={containerStyle}>
          {/* Opaque occluder to hide thread under bead */}
          <View
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: scaledSize,
              height: scaledSize,
              borderRadius: scaledSize / 2,
              backgroundColor: design.primaryColor,
            }}
          />
          {/* Inner vignette glow effect - stays around the bead */}
          {/* Only render glow rings for center/active bead */}
          {position.isCenterBead && (
            <>
            {Array.from({ length: 8 }).map((_, index) => {
              // Tighter spread - max 4x bead size (vignette effect)
              const ringSize = scaledSize * (1.0 + index * 0.15);
              // Lower brightness, faster fade
              const baseOpacity = 0.04 - (index * 0.003);
              
              return (
                <Animated.View
                  key={`glow-${index}`}
                  style={[
                    styles.glowRing,
                    {
                      width: breathingGlow.interpolate({
                        inputRange: [1.0, 1.3],
                        outputRange: [ringSize, ringSize * 1.2], // Reduced expansion for performance
                      }),
                      height: breathingGlow.interpolate({
                        inputRange: [1.0, 1.3],
                        outputRange: [ringSize, ringSize * 1.2],
                      }),
                      borderRadius: ringSize / 2,
                      backgroundColor: design.glowColor,
                      opacity: glowVisibility.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, baseOpacity], // Fade in/out smoothly
                      }),
                    },
                  ]}
                />
              );
            })}
            </>
          )}

          {/* Custom image asset */}
          <Image
            source={imageSource}
            style={[
              styles.beadImage,
              {
                width: scaledSize,
                height: scaledSize,
                opacity: position.opacity,
              },
            ]}
            resizeMode="contain"
          />
        </Animated.View>
      );
    }

    // Render gradient-based bead (current implementation)
    const gradientColors: [string, string, string, string] = [
      `${design.primaryColor}FF`, // Top highlight (100% opacity)
      design.primaryColor, // Middle
      design.secondaryColor, // Bottom shadow
      `${design.secondaryColor}CC`, // Bottom dark (80% opacity)
    ];

    return (
      <Animated.View style={containerStyle}>
        {/* Opaque occluder to hide thread under bead */}
        <View
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: scaledSize,
            height: scaledSize,
            borderRadius: scaledSize / 2,
            backgroundColor: design.primaryColor,
          }}
        />
        {/* Main bead sphere with gradient */}
        <LinearGradient
          colors={gradientColors}
          style={[
            styles.bead,
            {
              width: scaledSize,
              height: scaledSize,
              borderRadius: scaledSize / 2,
              opacity: position.opacity,
            },
          ]}
          start={{ x: 0.3, y: 0.2 }} // Top-left highlight
          end={{ x: 0.7, y: 0.9 }} // Bottom-right shadow
        >
          {/* Inner vignette glow effect - stays around the bead */}
          {/* Only render glow rings for center/active bead */}
          {position.isCenterBead && (
            <>
            {Array.from({ length: 8 }).map((_, index) => {
              // Tighter spread - max 4x bead size (vignette effect)
              const ringSize = scaledSize * (1.0 + index * 0.15);
              // Lower brightness, faster fade
              const baseOpacity = 0.04 - (index * 0.003);
              
              return (
                <Animated.View
                  key={`glow-${index}`}
                  style={[
                    styles.glowRing,
                    {
                      width: breathingGlow.interpolate({
                        inputRange: [1.0, 1.3],
                        outputRange: [ringSize, ringSize * 1.2], // Reduced expansion for performance
                      }),
                      height: breathingGlow.interpolate({
                        inputRange: [1.0, 1.3],
                        outputRange: [ringSize, ringSize * 1.2],
                      }),
                      borderRadius: ringSize / 2,
                      backgroundColor: design.glowColor,
                      opacity: glowVisibility.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, baseOpacity], // Fade in/out smoothly
                      }),
                    },
                  ]}
                />
              );
            })}
            </>
          )}
        </LinearGradient>
      </Animated.View>
    );
  }
);

HyperRealisticBead.displayName = 'HyperRealisticBead';

const styles = StyleSheet.create({
  bead: {
    justifyContent: 'center',
    alignItems: 'center',
    // iOS shadow only (no elevation for Android to avoid hexagonal artifacts)
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // No elevation - prevents hexagonal shadow artifacts on Android
  },
  beadImage: {
    // Custom image asset styling
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // No elevation - prevents hexagonal shadow artifacts on Android
  },
  highlight: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    // Subtle blur effect for realism
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 4,
  },
  activeGlow: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: '-50%' }, { translateY: '-50%' }],
    // Opacity is controlled by breathingGlow animation, not static
    zIndex: -1,
  },
  // Single style for all glow rings
  glowRing: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: '-50%' }, { translateY: '-50%' }],
    zIndex: -1,
  },
  outerShadow: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: '-50%' }, { translateY: '-50%' }],
    backgroundColor: 'transparent',
    borderWidth: 0,
    zIndex: -2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
});
