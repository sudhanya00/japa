/**
 * Zustand store for app state management
 * Includes automatic persistence to AsyncStorage
 */

import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState, RosaryType, Theme, HapticIntensity, SessionRecord } from '../types';
import { DEFAULT_ROSARY_TYPE } from '../constants/rosaryDesigns';
import { BEADS_PER_SET, MAX_COUNT } from '../constants/hapticPatterns';

const STORAGE_KEY = '@japa_app_state';
const SESSION_HISTORY_KEY = '@japa_session_history';

// Initial state
const initialState = {
  count: 0,
  currentSet: 1,
  totalSets: 4,
  sessionStartTime: null,
  sessionHistory: [],
  rosaryType: DEFAULT_ROSARY_TYPE as RosaryType,
  theme: 'dark' as Theme,
  hapticIntensity: 'gentle' as HapticIntensity,
  screenBrightness: 0.5,
  isInDimMode: false,
  autoRotate: false, // Auto-rotation off by default
};

export const useAppStore = create<AppState>((set, get) => ({
  ...initialState,

  // Counter actions
  incrementCount: () => {
    const { count } = get();
    
    // No limit - allow unlimited counting!
    const newCount = count + 1;
    const newSet = Math.ceil(newCount / BEADS_PER_SET);
    
    set({ count: newCount, currentSet: newSet });
    
    // Auto-save every 5 counts (performance optimization)
    if (newCount % 5 === 0) {
      get().saveState();
    }
  },

  decrementCount: () => {
    const { count } = get();
    
    if (count <= 0) {
      return;
    }
    
    const newCount = count - 1;
    const newSet = Math.max(Math.ceil(newCount / BEADS_PER_SET), 1);
    
    set({ count: newCount, currentSet: newSet });
    get().saveState();
  },

  resetCount: () => {
    set({ 
      count: 0, 
      currentSet: 1,
      sessionStartTime: null,
    });
    get().saveState();
  },

  // Appearance actions
  setRosaryType: (rosaryType: RosaryType) => {
    set({ rosaryType });
    get().saveState();
  },

  setTheme: (theme: Theme) => {
    set({ theme });
    get().saveState();
  },

  // Settings actions
  setHapticIntensity: (hapticIntensity: HapticIntensity) => {
    set({ hapticIntensity });
    get().saveState();
  },

  setScreenBrightness: (screenBrightness: number) => {
    set({ screenBrightness: Math.max(0.2, Math.min(1.0, screenBrightness)) });
    get().saveState();
  },

  toggleDimMode: () => {
    set(state => ({ isInDimMode: !state.isInDimMode }));
  },

  toggleAutoRotate: () => {
    set(state => ({ autoRotate: !state.autoRotate }));
    get().saveState();
  },

  setTotalSets: (totalSets: number) => {
    set({ totalSets: Math.max(1, Math.min(4, totalSets)) });
    get().saveState();
  },

  // Session management
  startSession: () => {
    set({ 
      sessionStartTime: Date.now(),
      count: 0,
      currentSet: 1,
    });
    get().saveState();
  },

  endSession: async () => {
    const { count, sessionStartTime, rosaryType, sessionHistory } = get();
    
    if (!sessionStartTime || count === 0) {
      return;
    }
    
    const duration = Math.round((Date.now() - sessionStartTime) / 60000); // minutes
    
    const newRecord: SessionRecord = {
      date: new Date().toISOString(),
      count,
      duration,
      rosaryType,
    };
    
    // Keep only last 7 days of history
    const updatedHistory = [newRecord, ...sessionHistory].slice(0, 7);
    
    set({ 
      sessionHistory: updatedHistory,
      sessionStartTime: null,
    });
    
    // Save session history separately
    try {
      await AsyncStorage.setItem(SESSION_HISTORY_KEY, JSON.stringify(updatedHistory));
    } catch (error) {
      console.error('Failed to save session history:', error);
    }
    
    get().saveState();
  },

  // Persistence
  loadState: async () => {
    try {
      const [stateJson, historyJson] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEY),
        AsyncStorage.getItem(SESSION_HISTORY_KEY),
      ]);
      
      if (stateJson) {
        const savedState = JSON.parse(stateJson);
        set({ ...savedState });
      }
      
      if (historyJson) {
        const savedHistory = JSON.parse(historyJson);
        set({ sessionHistory: savedHistory });
      }
    } catch (error) {
      console.error('Failed to load state:', error);
    }
  },

  saveState: async () => {
    try {
      const state = get();
      const stateToSave = {
        count: state.count,
        currentSet: state.currentSet,
        totalSets: state.totalSets,
        sessionStartTime: state.sessionStartTime,
        rosaryType: state.rosaryType,
        theme: state.theme,
        hapticIntensity: state.hapticIntensity,
        screenBrightness: state.screenBrightness,
        isInDimMode: state.isInDimMode,
        autoRotate: state.autoRotate,
      };
      
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (error) {
      console.error('Failed to save state:', error);
    }
  },
}));
