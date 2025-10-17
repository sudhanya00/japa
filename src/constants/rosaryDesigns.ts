/**
 * Rosary (mala) bead designs and visual properties
 * Each design represents a different traditional bead type
 * Names in Hinglish for cultural authenticity
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
  
  sphatik: {
    type: 'sphatik',
    name: 'Sphatik',
    description: 'Crystal quartz beads for clarity and spiritual amplification',
    primaryColor: '#F0F0F0', // Clear crystal white
    secondaryColor: '#E0E0E0',
    glowColor: 'rgba(255, 255, 255, 0.9)',
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

  chandan: {
    type: 'chandan',
    name: 'Chandan',
    description: 'Sandalwood beads for peace, cooling effect, and meditation',
    primaryColor: '#E8D4A0', // Pale sandalwood yellow
    secondaryColor: '#D4BC84',
    glowColor: 'rgba(232, 212, 160, 0.7)',
  },

  moonga: {
    type: 'moonga',
    name: 'Moonga',
    description: 'Red coral beads for vitality, Mars energy, and courage',
    primaryColor: '#FF6B6B', // Coral red
    secondaryColor: '#E85555',
    glowColor: 'rgba(255, 107, 107, 0.7)',
  },

  'hakik-red': {
    type: 'hakik-red',
    name: 'Hakik (Red)',
    description: 'Red agate beads for grounding and protection',
    primaryColor: '#C44536', // Deep red agate
    secondaryColor: '#A53828',
    glowColor: 'rgba(196, 69, 54, 0.7)',
  },

  'hakik-black': {
    type: 'hakik-black',
    name: 'Hakik (Black)',
    description: 'Black agate beads for protection and strength',
    primaryColor: '#2C2C2C', // Deep black agate
    secondaryColor: '#1A1A1A',
    glowColor: 'rgba(100, 100, 100, 0.6)',
  },

  'hakik-green': {
    type: 'hakik-green',
    name: 'Hakik (Green)',
    description: 'Green agate beads for healing and prosperity',
    primaryColor: '#4A7C59', // Green agate
    secondaryColor: '#3A6347',
    glowColor: 'rgba(74, 124, 89, 0.7)',
  },
} as const;

// Default rosary type for new users
export const DEFAULT_ROSARY_TYPE: RosaryType = 'rudraksh';
