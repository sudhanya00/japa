/**
 * Bead Asset Configuration
 * Central place to manage bead visual assets
 * Easy to swap between gradient-based beads and custom image assets
 */

import { ImageSourcePropType } from 'react-native';

export type BeadAssetType = 'gradient' | 'image';

export interface BeadAssetConfig {
  type: BeadAssetType;
  // For image-based assets
  image?: ImageSourcePropType;
  activeImage?: ImageSourcePropType; // Optional different image for active bead
  // For gradient-based assets (current implementation)
  useGradient?: boolean;
}

/**
 * BEAD ASSET CONFIGURATION
 * 
 * TO USE CUSTOM IMAGES:
 * 1. Add your bead images to assets/beads/ folder
 * 2. Change type to 'image'
 * 3. Set image to require('./path/to/bead.png')
 * 
 * Example:
 * {
 *   sandalwood: {
 *     type: 'image',
 *     image: require('../../assets/beads/sandalwood.png'),
 *     activeImage: require('../../assets/beads/sandalwood-glow.png'),
 *   }
 * }
 */
export const BEAD_ASSETS: Record<string, BeadAssetConfig> = {
  // Sandalwood beads
  sandalwood: {
    type: 'gradient',
    useGradient: true,
    // When ready, replace with:
    // type: 'image',
    // image: require('../../assets/beads/sandalwood.png'),
  },

  // Rudraksha beads
  rudraksha: {
    type: 'gradient',
    useGradient: true,
    // When ready, replace with:
    // type: 'image',
    // image: require('../../assets/beads/rudraksha.png'),
  },

  // Crystal beads
  crystal: {
    type: 'gradient',
    useGradient: true,
    // When ready, replace with:
    // type: 'image',
    // image: require('../../assets/beads/crystal.png'),
  },

  // Lotus seed beads
  lotus: {
    type: 'gradient',
    useGradient: true,
    // When ready, replace with:
    // type: 'image',
    // image: require('../../assets/beads/lotus.png'),
  },

  // Tulsi beads
  tulsi: {
    type: 'gradient',
    useGradient: true,
    // When ready, replace with:
    // type: 'image',
    // image: require('../../assets/beads/tulsi.png'),
  },
};

/**
 * Get bead asset configuration for a rosary type
 */
export const getBeadAsset = (rosaryType: string): BeadAssetConfig => {
  return BEAD_ASSETS[rosaryType] || BEAD_ASSETS.sandalwood;
};

/**
 * INSTRUCTIONS FOR DESIGNERS:
 * 
 * Image Requirements:
 * - Format: PNG with transparency
 * - Size: 512x512px or 1024x1024px (square, high resolution)
 * - Content: Single bead, centered, with realistic lighting
 * - Shadow: Include subtle shadow in the image itself
 * - Highlight: Include specular highlight for realism
 * 
 * File Structure:
 * assets/
 *   beads/
 *     sandalwood.png          // Normal state
 *     sandalwood-glow.png     // Active/glowing state (optional)
 *     rudraksha.png
 *     rudraksha-glow.png
 *     crystal.png
 *     crystal-glow.png
 *     lotus.png
 *     lotus-glow.png
 *     tulsi.png
 *     tulsi-glow.png
 * 
 * How to Replace:
 * 1. Create your bead images following the requirements above
 * 2. Place them in assets/beads/ folder
 * 3. Update the BEAD_ASSETS configuration above
 * 4. Change type from 'gradient' to 'image'
 * 5. Add require() paths to your images
 * 
 * The app will automatically use image assets instead of gradients!
 */
