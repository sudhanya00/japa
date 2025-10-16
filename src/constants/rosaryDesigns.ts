/**
 * Rosary (mala) bead designs and visual properties
 * Each design represents a different traditional bead type
 */

import { RosaryDesign, RosaryType } from '../types';

export const ROSARY_DESIGNS: Record<RosaryType, RosaryDesign> = {
  rudraksh: {
    type: 'rudraksh',
    name: 'Rudraksh',
    description: 'Sacred seeds from Rudraksha tree, traditional for Shiva devotees',
    primaryColor: '#8B4513', // Saddle brown
    secondaryColor: '#654321', // Dark brown
    glowColor: 'rgba(139, 69, 19, 0.6)',
  },
  
  quartz: {
    type: 'quartz',
    name: 'Crystal Quartz',
    description: 'Clear quartz beads for clarity and spiritual amplification',
    primaryColor: '#E8E8E8', // Near white with slight warmth
    secondaryColor: '#D0D0D0',
    glowColor: 'rgba(255, 255, 255, 0.8)',
  },
  
  tulsi: {
    type: 'tulsi',
    name: 'Tulsi',
    description: 'Holy basil wood beads, sacred to Vishnu and Krishna',
    primaryColor: '#8B7355', // Light brown (tulsi wood)
    secondaryColor: '#6B5845',
    glowColor: 'rgba(139, 115, 85, 0.6)',
  },
  
  'kamal-gatta': {
    type: 'kamal-gatta',
    name: 'Kamal Gatta',
    description: 'Lotus seed beads for purity and spiritual growth',
    primaryColor: '#D2B48C', // Tan (lotus seed color)
    secondaryColor: '#C4A57B',
    glowColor: 'rgba(210, 180, 140, 0.7)',
  },
  
  amethyst: {
    type: 'amethyst',
    name: 'Amethyst',
    description: 'Purple crystal beads for meditation and crown chakra',
    primaryColor: '#9966CC', // Amethyst purple
    secondaryColor: '#7744AA',
    glowColor: 'rgba(153, 102, 204, 0.7)',
  },
} as const;

// Default rosary type for new users
export const DEFAULT_ROSARY_TYPE: RosaryType = 'rudraksh';
