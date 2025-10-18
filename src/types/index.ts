/**
 * Core type definitions for Japa app
 */

export type RosaryType = 
  | 'rudraksh' 
  | 'sphatik' 
  | 'tulsi' 
  | 'kamal-gatta' 
  | 'amethyst'
  | 'chandan'
  | 'moonga'
  | 'hakik-red'
  | 'hakik-black'
  | 'hakik-green';

export type Theme = 'light' | 'dark' | 'twilight';

export type HapticIntensity = 'off' | 'gentle' | 'strong';

export interface AppState {
  // Counter state
  count: number; // 0-432
  currentSet: number; // 1-4
  totalSets: number; // 1-4 (session configuration)
  
  // Session tracking
  sessionStartTime: number | null;
  sessionHistory: SessionRecord[];
  
  // Appearance
  rosaryType: RosaryType;
  theme: Theme;
  
  // Settings
  hapticIntensity: HapticIntensity;
  screenBrightness: number; // 0.2-1.0
  isInDimMode: boolean;
  
  // Actions
  incrementCount: () => void;
  decrementCount: () => void;
  resetCount: () => void;
  setRosaryType: (type: RosaryType) => void;
  setTheme: (theme: Theme) => void;
  setHapticIntensity: (intensity: HapticIntensity) => void;
  setScreenBrightness: (brightness: number) => void;
  toggleDimMode: () => void;
  setTotalSets: (sets: number) => void;
  startSession: () => void;
  endSession: (notes?: string) => void;
  loadState: () => Promise<void>;
  saveState: () => Promise<void>;
}

export interface SessionRecord {
  date: string; // ISO date string
  count: number;
  duration: number; // in minutes
  rosaryType: RosaryType;
  notes?: string;
}

export interface HapticPattern {
  type: 'impact' | 'notification' | 'selection';
  intensity?: 'light' | 'medium' | 'heavy';
}

export interface RosaryDesign {
  type: RosaryType;
  name: string;
  description: string;
  primaryColor: string;
  secondaryColor: string;
  glowColor: string;
}
