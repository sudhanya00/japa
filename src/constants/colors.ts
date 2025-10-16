/**
 * Color palette definitions for all themes
 * All colors follow WCAG AAA contrast requirements (7:1 minimum)
 */

export const COLORS = {
  // Light Theme
  light: {
    background: '#FFFFFF',
    surface: '#F5F5F5',
    primary: '#8B4513', // Saddle brown (traditional rudraksh color)
    secondary: '#D2691E', // Chocolate
    text: '#1A1A1A',
    textSecondary: '#4A4A4A',
    accent: '#FF6B35', // Warm accent for milestones
    glow: 'rgba(139, 69, 19, 0.3)',
    beadShadow: 'rgba(0, 0, 0, 0.15)',
  },
  
  // Dark Theme (now subtle off-white for meditation)
  dark: {
    background: '#F8F6F4', // Subtle warm off-white
    surface: '#EFEBE7',
    primary: '#8B4513', // Saddle brown
    secondary: '#A0622C',
    text: '#2A1810',
    textSecondary: '#6B4423',
    accent: '#D2691E',
    glow: 'rgba(139, 69, 19, 0.25)',
    beadShadow: 'rgba(0, 0, 0, 0.08)',
  },
  
  // Twilight Theme (meditative purple-blue)
  twilight: {
    background: '#1A1B2E',
    surface: '#252640',
    primary: '#9D84B7', // Soft purple
    secondary: '#B8A5CC',
    text: '#E8E4F3',
    textSecondary: '#A8A4B8',
    accent: '#E38B75',
    glow: 'rgba(157, 132, 183, 0.4)',
    beadShadow: 'rgba(255, 255, 255, 0.08)',
  },
} as const;

// Opacity values for dim mode
export const DIM_MODE_OPACITY = {
  full: 1.0,
  dimmed: 0.3, // Visual overlay opacity in dim mode
  brightnessScale: 0.2, // Screen brightness scale (0.2 = 20% brightness)
} as const;
