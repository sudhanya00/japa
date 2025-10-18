/**
 * Zustand store for app state management
 * Includes automatic persistence to localStorage (web)
 */

import { create } from 'zustand';
import webStorage from '../utils/webStorage';
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
  theme: 'twilight' as Theme, // Default to warm twilight theme
  hapticIntensity: 'gentle' as HapticIntensity,
  screenBrightness: 0.5,
  isInDimMode: false,
};

export const useAppStore = create<AppState>((set, get) => ({
  ...initialState,

  // Counter actions
  incrementCount: () => {
    const { count, sessionStartTime } = get();
    
    // Auto-start session on first tap if not already started
    if (count === 0 && !sessionStartTime) {
      set({ sessionStartTime: Date.now() });
    }
    
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

  endSession: async (notes?: string) => {
    const { count, sessionStartTime, rosaryType, sessionHistory } = get();
    
    // Don't save if count is 0
    if (count === 0) {
      return;
    }
    
    // Calculate duration (use sessionStartTime if available, otherwise estimate 1 minute per 10 japa)
    const duration = sessionStartTime 
      ? Math.round((Date.now() - sessionStartTime) / 60000) // minutes from start
      : Math.max(1, Math.round(count / 10)); // estimate: ~10 japa per minute
    
    const newRecord: SessionRecord = {
      date: new Date().toISOString(),
      count,
      duration,
      rosaryType,
      notes,
    };
    
    // Keep last 90 days of history (3 months)
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 90);
    
    const updatedHistory = [newRecord, ...sessionHistory]
      .filter(record => new Date(record.date) >= cutoffDate)
      .slice(0, 100); // Max 100 sessions
    
    set({ 
      sessionHistory: updatedHistory,
      sessionStartTime: null,
      count: 0, // Reset counter after saving session
      currentSet: 1,
    });
    
    // Save session history separately
    try {
      await webStorage.setItem(SESSION_HISTORY_KEY, JSON.stringify(updatedHistory));
    } catch (error) {
      console.error('Failed to save session history:', error);
    }
    
    get().saveState();
  },

  // Persistence
  loadState: async () => {
    try {
      const [stateJson, historyJson] = await Promise.all([
        webStorage.getItem(STORAGE_KEY),
        webStorage.getItem(SESSION_HISTORY_KEY),
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
      };
      
      await webStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (error) {
      console.error('Failed to save state:', error);
    }
  },
}));
