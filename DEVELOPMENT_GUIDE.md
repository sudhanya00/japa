# Japa Development Guide

## Quick Start

### 1. Run the App

```bash
npm start
```

This opens the Expo dev server. Choose your platform:
- Press `a` for Android
- Press `i` for iOS
- Press `w` for Web
- Scan QR code with Expo Go app on phone

### 2. Test Haptics (MUST USE REAL DEVICE)

**Critical**: Haptics don't work in simulators. Use a real phone.

1. Open app on physical device
2. Tap anywhere on screen
3. Feel gentle haptic feedback
4. Test milestone haptics at count 108, 216, etc.

### 3. Development Workflow

```bash
# Watch for errors
npm start

# In another terminal, run linting
npm run lint

# Format code
npm run format
```

## Current State (Week 1 Complete)

### ✅ What Works Now

- **Basic Counter**: Tap anywhere to increment count
- **Haptic Feedback**: Feels responsive (<50ms latency)
- **State Persistence**: Count survives app restart
- **Theme System**: Dark theme active by default
- **Type Safety**: Full TypeScript coverage

### 🧪 How to Test

1. **Counter Logic**:
   - Tap screen → count increases
   - Reach 108 → feel stronger haptic (milestone)
   - Close app → reopen → count persisted

2. **Theme**:
   - Currently dark theme
   - Counter displays in theme colors
   - Try editing `appStore.ts` initial theme to 'light' or 'twilight'

3. **Performance**:
   - Tap rapidly → no lag
   - Haptic fires before state update (optimistic)

## Next Steps (Week 2-3: Visual & Animation)

### Priority 1: Rosary Bead Animation

**Goal**: Beads flow smoothly across screen as user taps.

**Implementation Strategy**:
1. Create `RosaryBead.tsx` component
2. Use React Native Reanimated for animation
3. Render 108 beads in circular path
4. Animate bead progression on tap

**File to Create**: `src/components/RosaryBead/RosaryBead.tsx`

**Key Requirements**:
- 60fps on low-end devices
- Smooth, meditative motion
- Different bead designs per rosary type

### Priority 2: Glow Effect

**Goal**: Gentle breathing glow behind center bead.

**Implementation**:
- Use Reanimated for continuous loop
- Subtle opacity animation (0.3 → 0.7 → 0.3)
- 4-second breathing cycle

### Priority 3: Milestone Visual Feedback

**Goal**: Beautiful animation when reaching 108, 216, 324, 432.

**Ideas**:
- Circular ripple effect
- Brief glow pulse
- Subtle screen flash (respectful, not jarring)

## Code Quality Guidelines

### Before Committing

```bash
# 1. Lint your code
npm run lint

# 2. Format
npm run format

# 3. Type check
npx tsc --noEmit

# 4. Test on real device
```

### Component Structure

Follow this pattern:

```tsx
/**
 * ComponentName - Brief description
 * More details if needed
 */

import React from 'react';
import { View, StyleSheet } from 'react-native';

interface ComponentNameProps {
  // Props with JSDoc comments
}

export const ComponentName: React.FC<ComponentNameProps> = (props) => {
  // Logic here
  
  return (
    <View style={styles.container}>
      {/* JSX */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Styles
  },
});
```

### State Management Rules

1. **Use Zustand for app-wide state**:
   - Counter state
   - Theme/appearance
   - User settings

2. **Use React state for component-local state**:
   - Animation values (with Reanimated)
   - UI toggles
   - Form inputs

3. **Performance**:
   - Memoize expensive computations
   - Use `React.memo` for pure components
   - Keep state updates batched

## Performance Profiling

### Measure Tap Latency

1. Open React Native Debugger
2. Enable Performance Monitor
3. Tap screen multiple times rapidly
4. Check for frame drops

**Target**: 60fps, no dropped frames

### Memory Profiling

```bash
# iOS
npx react-native run-ios --configuration Release
# Use Xcode Instruments

# Android
npx react-native run-android --variant=release
# Use Android Profiler
```

## Common Issues & Solutions

### Issue: Haptics Not Working

**Problem**: No haptic feedback when tapping

**Solutions**:
1. Are you on a real device? (Simulators don't support haptics)
2. Check device haptic settings (some phones disable system-wide)
3. Verify `react-native-haptic-feedback` installed correctly
4. Check `useHaptic.ts` - is intensity set to 'off'?

### Issue: State Not Persisting

**Problem**: Count resets to 0 on app restart

**Solutions**:
1. Check AsyncStorage permissions
2. Verify `loadState()` called in `App.tsx` useEffect
3. Look for errors in console during save/load
4. Clear app data and restart

### Issue: TypeScript Errors

**Problem**: Type errors in IDE

**Solutions**:
```bash
# Restart TypeScript server in VS Code
Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"

# Check tsconfig.json is correct
npx tsc --noEmit
```

### Issue: Animations Janky

**Problem**: Bead animations dropping frames

**Solutions**:
1. Verify Reanimated plugin in `babel.config.js`
2. Use `useAnimatedStyle` (not regular state)
3. Move logic to worklet functions
4. Test on real device (simulators are slower)

## Architecture Reminders

### State Flow

```
User Tap 
  → useCounter.handleTap() 
  → Trigger haptic (immediate) 
  → Update Zustand store 
  → React re-renders 
  → Visual feedback
```

**Key**: Haptic fires BEFORE state update for perceived speed.

### File Organization

```
When creating new features:
1. Define types in src/types/
2. Add constants if needed
3. Create custom hook for logic
4. Build presentational component
5. Wire up in App.tsx or parent
```

### Import Order

```tsx
// 1. React imports
import React from 'react';

// 2. React Native imports
import { View, Text } from 'react-native';

// 3. Third-party libraries
import Animated from 'react-native-reanimated';

// 4. Local imports (grouped)
import { useAppStore } from '../../store/appStore';
import { COLORS } from '../../constants/colors';
import { RosaryType } from '../../types';
```

## Testing Strategy

### Manual Testing Checklist

- [ ] Tap anywhere increments count
- [ ] Haptic feedback is instant (<50ms perceived)
- [ ] Count persists after app restart
- [ ] Milestone haptics stronger at 108, 216, 324, 432
- [ ] No crashes during rapid tapping
- [ ] Theme colors render correctly
- [ ] Memory stable over 30min session

### Accessibility Testing

- [ ] Color contrast meets WCAG AAA (7:1)
- [ ] Text readable at 200% zoom
- [ ] Full screen tappable (no precision needed)
- [ ] Works with one hand
- [ ] Works lying down (any orientation)

## Resources & References

### Essential Reading

- [React Native Reanimated Docs](https://docs.swmansion.com/react-native-reanimated/)
- [Zustand Guide](https://github.com/pmndrs/zustand)
- [Expo AsyncStorage](https://docs.expo.dev/versions/latest/sdk/async-storage/)

### Design References

- Traditional mala/rosary designs
- Meditation app UX patterns
- Minimalist mobile interfaces

### Performance Guides

- [React Native Performance](https://reactnative.dev/docs/performance)
- [60fps on Mobile](https://medium.com/react-native-development/react-native-reanimated-2-performant-animations-60fps-9c2b)

## Communication

### Getting Help

**Good question format**:
> "The bead animation drops to 40fps on Samsung A12 when rendering all 108 beads. Should I implement virtualization or reduce bead count in viewport?"

**Include**:
- What you tried
- Expected vs actual behavior
- Device/platform info
- Relevant code snippet

### Reporting Issues

1. Check this guide first
2. Search existing issues/docs
3. Create minimal reproduction
4. Provide device info
5. Include error logs

## Next Session Plan

### Before Starting Next Session

1. ✅ Verify current app works
2. ✅ Test on real device
3. ✅ Review performance metrics
4. 📋 Choose next feature from roadmap

### Recommended Next Task

**Create Bead Animation System**:
- File: `src/components/RosaryBead/RosaryBead.tsx`
- Goal: Smooth 60fps bead flow animation
- Time estimate: 4-6 hours
- Dependencies: React Native Reanimated configured ✅

---

**Remember**: Every feature must pass the philosophy test:
> "Does this bring the user closer to their jaap, or further away?"

Build with intention. 🙏
