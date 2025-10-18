# Japa - Meditation Counter App

A premium, meditation-focused japa (mantra recitation) counting application built with React Native.

## Philosophy

Japa is designed to be **invisible**—an extension of your meditation practice, not an interruption. Every interaction is crafted to maintain focus and enhance the spiritual experience.

### Core Principles
- ✨ **Minimal cognitive load** - Tap anywhere to count
- 🧘 **Meditative UX** - Intentional animations, never jarring
- ⚡ **Instant responsiveness** - <50ms tap-to-haptic response
- ♿ **Accessibility-first** - Universal usability (ages 4-100)
- 🚀 **Performance obsessed** - Smooth on 5-year-old devices
- 🙏 **Respectful design** - Honors the spiritual practice

## Tech Stack

- **Framework**: React Native (Expo)
- **Language**: TypeScript
- **State Management**: Zustand
- **Animations**: React Native Reanimated v3
- **Persistence**: AsyncStorage
- **Haptics**: expo-haptics (Expo Go compatible)
- **Code Quality**: ESLint + Prettier

## Project Structure

```
src/
├── components/
│   ├── Counter/
│   │   └── CounterDisplay.tsx
│   ├── RosaryBead/
│   ├── Settings/
│   └── SettingsPanel/
├── hooks/
│   ├── useHaptic.ts          # Haptic feedback logic
│   ├── useCounter.ts         # Counter logic with optimistic updates
│   └── useDimMode.ts
├── store/
│   └── appStore.ts           # Zustand store with persistence
├── constants/
│   ├── hapticPatterns.ts     # Pre-defined haptic patterns
│   ├── colors.ts             # Theme color palettes
│   └── rosaryDesigns.ts      # Rosary bead designs
├── utils/
│   ├── animations.ts
│   └── storage.ts
├── types/
│   └── index.ts              # TypeScript type definitions
└── App.tsx
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Expo Go app (for testing on device)

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run on specific platform
npm run android
npm run ios
npm run web
```

### Testing on Real Device (CRITICAL for Haptics)

**⚠️ Important**: Haptic feedback ONLY works on real devices, not simulators.

1. Install Expo Go on your phone:
   - iOS: App Store
   - Android: Play Store

2. Scan QR code from terminal after running `npm start`

3. Test tap responsiveness and haptic feedback

## Development Status

### ✅ Completed (Phase 1 - Week 1)

- [x] Project setup with Expo + TypeScript
- [x] Folder structure following architecture
- [x] Zustand store with persistence
- [x] Core counter logic
- [x] Haptic feedback system
- [x] Basic counter display
- [x] Theme system (light/dark/twilight)
- [x] Constants and type definitions
- [x] Code quality tools (ESLint, Prettier)

### 🚧 In Progress (Phase 1 - Week 2-3)

- [ ] Rosary bead animation system
- [ ] Glow effect behind center bead
- [ ] 4 rosary type designs
- [ ] Milestone visual feedback
- [ ] Tap feedback visual pulse

### 📋 Upcoming (Phase 1 - Week 3-6)

- [ ] Long press for undo/reset menu
- [ ] Dim mode with brightness scaling
- [ ] Settings panel
- [ ] Quick rosary type switcher
- [ ] Theme switcher UI
- [ ] Performance optimization
- [ ] Platform builds (iOS/Android)

## Performance Targets

| Metric | Target | Current |
|--------|--------|---------|
| App open to first tap | <500ms | TBD |
| Tap to haptic response | <50ms | ✅ Optimistic |
| 60 FPS during animation | 100% | TBD |
| Memory usage | <100MB | TBD |
| Battery drain (1hr) | <5% | TBD |
| App size | <50MB | TBD |

## Testing

```bash
# Run tests (when implemented)
npm test

# Lint code
npm run lint

# Format code
npm run format
```

## Architecture Decisions

### Why Zustand over Redux?
- Minimal boilerplate
- Faster iteration
- Perfect for this app's complexity
- Better TypeScript inference

### Why React Native Reanimated?
- 60fps guaranteed animations
- Native thread execution (no JS blocking)
- Essential for smooth bead animations

### Why no cloud sync in v1?
- Keeps it simple and fast
- Respects user privacy
- No tracking philosophy
- Local-only = instant responsiveness

## Accessibility

WCAG AAA Compliance:
- ✅ 7:1 color contrast ratio
- ✅ Full screen tap targets
- ✅ Screen reader support (planned)
- ✅ Haptics as primary feedback

## Contributing

This is a focused meditation app. Before adding features, ask:
> "Does this bring the user closer to their jaap, or further away?"

## License

MIT (or appropriate spiritual/open source license)

## Acknowledgments

Inspired by the ancient practice of japa meditation and the need for a distraction-free digital tool that honors the spiritual tradition.

---

**Built with 🙏 for mindful meditation**
