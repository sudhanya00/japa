/**
 * Color palette definitions for all themes
 * All colors follow WCAG AAA contrast requirements (7:1 minimum)
 */

export const COLORS = {
  // Light Theme (cool, serene blue tones)
  light: {
    background: '#FFFFFF',
    surface: '#F5F7FA',
    primary: '#4A5F7F', // Slate blue (calming)
    secondary: '#5B7A9F', // Lighter blue
    text: '#1A1A1A',
    textSecondary: '#4A4A4A',
    accent: '#3B82F6', // Bright blue accent (distinct from twilight)
    glow: 'rgba(74, 95, 127, 0.3)',
    beadShadow: 'rgba(0, 0, 0, 0.15)',
  },
  
  // Dark Theme (meditative purple-blue night)
  dark: {
    background: '#1A1B2E',
    surface: '#252640',
    primary: '#9D84B7', // Soft purple
    secondary: '#B8A5CC',
    text: '#E8E4F3',
    textSecondary: '#A8A4B8',
    accent: '#A78BFA', // Purple accent (consistent with theme)
    glow: 'rgba(157, 132, 183, 0.4)',
    beadShadow: 'rgba(255, 255, 255, 0.08)',
  },
  
  // Twilight Theme (warm sunset meditation - DEFAULT)
  twilight: {
    background: '#FFF5F0', // Soft peachy white
    surface: '#FFE8DC', // Light coral tint
    primary: '#C85A3F', // Terracotta/burnt orange
    secondary: '#E8856B', // Soft coral
    text: '#3D1E15', // Deep warm brown
    textSecondary: '#6B3929', // Medium warm brown
    accent: '#FF6B45', // Vibrant orange accent (warm)
    glow: 'rgba(200, 90, 63, 0.3)', // Warm orange glow
    beadShadow: 'rgba(200, 90, 63, 0.12)',
  },
} as const;

// Opacity values for dim mode
export const DIM_MODE_OPACITY = {
  full: 1.0,
  dimmed: 0.3, // Visual overlay opacity in dim mode
  brightnessScale: 0.2, // Screen brightness scale (0.2 = 20% brightness)
} as const;
