# Week 2: Bead Animation System - Design Document

## Overview

Create a smooth, meditative bead animation system that feels like physical mala beads flowing through your fingers.

---

## 🎯 Goals

1. **Visual Beauty**: Beads flow smoothly across screen
2. **Performance**: Solid 60fps on 5-year-old devices
3. **Meditative Feel**: Slow, intentional, breathing-like motion
4. **Responsive**: Immediate visual feedback on tap

---

## 🏗️ Architecture

### Component Hierarchy

```
App.tsx
  └── CounterDisplay.tsx (existing)
  └── BeadCircle.tsx (NEW)
      ├── GlowEffect.tsx (breathing animation)
      └── RosaryBead.tsx × N (individual beads)
          └── BeadVisual.tsx (bead type-specific rendering)
  └── TapRipple.tsx (NEW - tap feedback)
  └── MilestoneEffect.tsx (NEW - celebration animations)
```

---

## 📿 Bead Layout Strategy

### Option 1: Full Circle (108 beads visible)
**Pros**: 
- Authentic mala representation
- See all beads at once
- Beautiful visual

**Cons**:
- Performance intensive (108 components)
- Small beads on mobile screens
- Complex layout calculations

### Option 2: Partial Arc (Recommended) ✅
**Pros**:
- Show 15-20 beads at a time
- Larger, more visible beads
- Better performance (fewer renders)
- Viewport culling optimization

**Cons**:
- Doesn't show full mala
- Requires scroll/flow animation

**Decision**: Use **Option 2** with flowing animation

---

## 🎨 Visual Design

### Bead Size & Spacing

```
Screen width: 100%
Bead diameter: 40-50px
Spacing: 10-15px
Visible beads: 15-20 at a time
Arc radius: 60% of screen height
```

### Bead Positioning Algorithm

```typescript
// Circular arc positioning
const getBeadPosition = (index: number, total: number = 108) => {
  const angle = (index / total) * Math.PI * 2; // Full circle
  const radius = SCREEN_HEIGHT * 0.6;
  const centerX = SCREEN_WIDTH / 2;
  const centerY = SCREEN_HEIGHT / 2;
  
  return {
    x: centerX + Math.cos(angle - Math.PI / 2) * radius,
    y: centerY + Math.sin(angle - Math.PI / 2) * radius,
    rotation: angle, // Bead rotation for realistic feel
  };
};
```

### Viewport Culling

Only render beads within viewport + buffer zone:

```typescript
const isBeadVisible = (position: Position) => {
  const buffer = 100; // pixels
  return (
    position.x > -buffer &&
    position.x < SCREEN_WIDTH + buffer &&
    position.y > -buffer &&
    position.y < SCREEN_HEIGHT + buffer
  );
};
```

---

## ⚡ Animation Strategy

### 1. Bead Flow Animation (on tap)

**Trigger**: User taps screen  
**Effect**: All beads rotate/shift by one position  
**Duration**: 300-500ms  
**Easing**: `Easing.bezier(0.4, 0.0, 0.2, 1)` (Material Design standard)

```typescript
// Reanimated worklet
const animateBeadFlow = () => {
  'worklet';
  
  beadOffset.value = withTiming(
    beadOffset.value + (360 / 108), // One bead rotation
    {
      duration: 400,
      easing: Easing.bezier(0.4, 0.0, 0.2, 1),
    }
  );
};
```

### 2. Breathing Glow Effect

**Continuous**: Always running  
**Duration**: 4 seconds per cycle (calm breathing pace)  
**Effect**: Opacity pulse behind center bead

```typescript
const glowAnimation = useSharedValue(0);

useEffect(() => {
  glowAnimation.value = withRepeat(
    withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
    -1, // Infinite
    true // Reverse (back and forth)
  );
}, []);

// In style
const animatedStyle = useAnimatedStyle(() => ({
  opacity: interpolate(glowAnimation.value, [0, 1], [0.3, 0.7]),
}));
```

### 3. Tap Ripple Effect

**Trigger**: User taps screen  
**Effect**: Circular ripple from tap point  
**Duration**: 600ms  
**Opacity**: 1 → 0 (fade out)  
**Scale**: 0 → 2 (expand)

```typescript
const rippleScale = useSharedValue(0);
const rippleOpacity = useSharedValue(1);

const triggerRipple = (x: number, y: number) => {
  rippleScale.value = 0;
  rippleOpacity.value = 1;
  
  rippleScale.value = withTiming(2, { duration: 600 });
  rippleOpacity.value = withTiming(0, { duration: 600 });
};
```

### 4. Milestone Celebration

**Trigger**: Count reaches 108, 216, 324, or 432  
**Effect**: Gentle screen pulse or bead highlight  
**Duration**: 800ms  
**Style**: Subtle, not jarring

Options:
- Glow intensifies briefly
- Beads pulse in size
- Background subtle flash
- All beads shimmer simultaneously

---

## 🎨 Bead Type Visuals

Each rosary type needs distinct visual design:

### 1. Rudraksh (Traditional Brown)
```typescript
<View style={{
  width: 40,
  height: 40,
  borderRadius: 20,
  backgroundColor: COLORS.rudraksh.primary,
  borderWidth: 2,
  borderColor: COLORS.rudraksh.secondary,
  // Add texture with shadow/gradient
  shadowColor: '#000',
  shadowOpacity: 0.3,
}} />
```

### 2. Crystal Quartz (Clear/White)
```typescript
// Use LinearGradient for crystal effect
<LinearGradient
  colors={['#FFFFFF', '#E8E8E8', '#FFFFFF']}
  style={{ borderRadius: 20 }}
  start={{ x: 0, y: 0 }}
  end={{ x: 1, y: 1 }}
/>
```

### 3. Tulsi (Light Brown Wood)
```typescript
// Wood grain effect with multiple layers
<View style={{
  backgroundColor: COLORS.tulsi.primary,
  // Add subtle radial gradient for depth
}} />
```

### 4. Kamal Gatta (Tan/Beige)
```typescript
// Lotus seed texture - smooth with subtle patterns
```

### 5. Amethyst (Purple Crystal)
```typescript
// Crystal facets with gradient
<LinearGradient
  colors={['#9966CC', '#7744AA', '#9966CC']}
  style={{ borderRadius: 20 }}
/>
```

---

## 🚀 Performance Optimization

### Critical Optimizations

1. **Use Reanimated Worklets**: All animations run on native thread
2. **Memoize Components**: `React.memo` on RosaryBead
3. **Viewport Culling**: Only render visible beads
4. **Shared Values**: Use `useSharedValue` for animation state
5. **Batch Updates**: Update all beads in single animation frame

### Performance Targets

```
Metric                  Target      Measurement
─────────────────────────────────────────────────
Frame rate             60fps       Performance Monitor
Tap-to-animation       <100ms      React Native Profiler
Memory (with beads)    <120MB      Xcode Instruments
Animation smoothness   100%        Visual inspection
Battery impact         <6%/hour    Device battery stats
```

### Profiling Strategy

```bash
# 1. Enable performance monitor in Expo
# Press 'm' in terminal → Toggle Performance Monitor

# 2. Profile on low-end device
# Test on: Samsung A12, iPhone SE (2016)

# 3. Check for dropped frames
# Monitor FPS during animations

# 4. Memory profiling
# Use React Native Debugger Memory tab
```

---

## 📐 Layout Calculations

### Responsive Sizing

```typescript
import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const BEAD_SIZE = Math.min(SCREEN_WIDTH, SCREEN_HEIGHT) * 0.08; // 8% of smaller dimension
const ARC_RADIUS = SCREEN_HEIGHT * 0.4; // 40% of screen height
const VISIBLE_ARC_ANGLE = Math.PI; // 180 degrees (half circle)
const BEADS_IN_VIEW = 15;
```

### Center Bead Position

```typescript
// The "active" bead - centered at bottom or top of arc
const CENTER_BEAD_POSITION = {
  x: SCREEN_WIDTH / 2,
  y: SCREEN_HEIGHT * 0.7, // 70% down from top
};
```

---

## 🎬 Implementation Order

### Phase 1: Basic Structure (Day 1-2)
1. ✅ Create `BeadCircle.tsx` container
2. ✅ Create `RosaryBead.tsx` component
3. ✅ Implement positioning algorithm
4. ✅ Render static beads (no animation yet)
5. ✅ Test on device

### Phase 2: Flow Animation (Day 3-4)
1. ✅ Add Reanimated shared values
2. ✅ Implement bead rotation on tap
3. ✅ Add easing and timing
4. ✅ Test performance (60fps check)
5. ✅ Optimize if needed

### Phase 3: Glow & Effects (Day 5-6)
1. ✅ Create `GlowEffect.tsx`
2. ✅ Implement breathing animation
3. ✅ Add tap ripple effect
4. ✅ Polish timing and colors

### Phase 4: Milestone Celebrations (Day 7)
1. ✅ Detect milestone counts
2. ✅ Add celebration animation
3. ✅ Coordinate with haptics
4. ✅ Test feel and timing

---

## 🧪 Testing Checklist

- [ ] Beads render correctly for all 5 rosary types
- [ ] Animation runs at 60fps on low-end device
- [ ] Tap triggers smooth bead flow
- [ ] Glow effect breathes continuously
- [ ] Tap ripple appears at touch point
- [ ] Milestones trigger celebration
- [ ] No memory leaks after 1000 taps
- [ ] Works in portrait and landscape
- [ ] Counter display remains visible
- [ ] Animations feel meditative, not jarring

---

## 🎨 Design References

### Inspiration
- Real mala/rosary beads
- Buddhist prayer wheel motion
- Zen circle (enso) aesthetics
- Material Design ripple effects
- Calm app animations

### Color Palette (from existing)
- Use `COLORS` from `src/constants/colors.ts`
- Use `ROSARY_DESIGNS` from `src/constants/rosaryDesigns.ts`

---

## 📝 Code Structure

### New Files to Create

```
src/
├── components/
│   ├── BeadCircle/
│   │   ├── BeadCircle.tsx          # Main container
│   │   ├── RosaryBead.tsx          # Individual bead
│   │   ├── BeadVisual.tsx          # Bead type-specific rendering
│   │   └── styles.ts               # Shared styles
│   ├── Effects/
│   │   ├── GlowEffect.tsx          # Breathing glow
│   │   ├── TapRipple.tsx           # Tap feedback
│   │   └── MilestoneEffect.tsx     # Celebration animation
├── utils/
│   ├── beadPositioning.ts          # Layout calculations
│   └── animations.ts               # Animation helpers
```

---

## 🚦 Success Criteria

### Must Have ✅
- 60fps animation on iPhone SE / Samsung A12
- Smooth bead flow on every tap
- Visible, beautiful bead designs
- Glow effect runs continuously
- Milestone celebrations feel special

### Nice to Have 🎁
- 3D bead rendering (deferred to Phase 4)
- Particle effects on milestone
- Customizable bead size
- Parallax scrolling effect

---

## 🔄 Integration with Existing Code

### Update `App.tsx`

```typescript
import { BeadCircle } from './src/components/BeadCircle/BeadCircle';

// Add below CounterDisplay
<BeadCircle />
```

### Update `useCounter.ts`

Add animation trigger:

```typescript
const { animateBeadFlow } = useBeadAnimation(); // New hook

const handleTap = useCallback(() => {
  const nextCount = count + 1;
  triggerTapFeedback(nextCount);
  
  // Trigger bead animation
  animateBeadFlow();
  
  incrementCount();
}, [count, incrementCount, triggerTapFeedback, animateBeadFlow]);
```

---

## 🎯 Week 2 Deliverables

By end of week:
- ✅ Smooth bead flow animation (60fps)
- ✅ 5 distinct rosary bead designs
- ✅ Breathing glow effect
- ✅ Tap ripple feedback
- ✅ Milestone visual celebrations
- ✅ Performance optimized
- ✅ Tested on real devices

**Time Estimate**: 35-40 hours (1 week full-time, or 2 weeks part-time)

---

## 📚 Resources

- [Reanimated 3 Docs](https://docs.swmansion.com/react-native-reanimated/)
- [React Native Performance](https://reactnative.dev/docs/performance)
- [Material Design Motion](https://material.io/design/motion)
- [Circular Layout Math](https://stackoverflow.com/questions/5300938/calculating-the-position-of-points-in-a-circle)

---

**Ready to build something beautiful!** 🙏

Let's start with Phase 1: Basic bead structure and positioning.
