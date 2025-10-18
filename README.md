# 🙏 Japa - Meditation Counter# Japa - Meditation Counter App



> Minimalist web meditation counter with beautiful mala beadsA premium, meditation-focused japa (mantra recitation) counting application built with React Native.



**Status**: ✅ Ready to deploy!## Philosophy



---Japa is designed to be **invisible**—an extension of your meditation practice, not an interruption. Every interaction is crafted to maintain focus and enhance the spiritual experience.



## 🚀 Quick Start### Core Principles

- ✨ **Minimal cognitive load** - Tap anywhere to count

```bash- 🧘 **Meditative UX** - Intentional animations, never jarring

# Development- ⚡ **Instant responsiveness** - <50ms tap-to-haptic response

npm install --legacy-peer-deps- ♿ **Accessibility-first** - Universal usability (ages 4-100)

npm start- 🚀 **Performance obsessed** - Smooth on 5-year-old devices

- 🙏 **Respectful design** - Honors the spiritual practice

# Production Build

npm run build## Tech Stack



# Deploy to Vercel- **Framework**: React Native (Expo)

vercel- **Language**: TypeScript

```- **State Management**: Zustand

- **Animations**: React Native Reanimated v3

---- **Persistence**: AsyncStorage

- **Haptics**: expo-haptics (Expo Go compatible)

## ✨ Features- **Code Quality**: ESLint + Prettier



- ✅ Tap-anywhere counter## Project Structure

- ✅ 10 traditional mala types (Rudraksh, Tulsi, Sphatik, etc.)

- ✅ 3 beautiful themes (Light, Twilight, Dark)```

- ✅ Session history with GitHub-style graphsrc/

- ✅ PWA support (Add to Home Screen)├── components/

- ✅ Completely private (localStorage only)│   ├── Counter/

- ✅ No authentication needed│   │   └── CounterDisplay.tsx

- ✅ Works on desktop & mobile│   ├── RosaryBead/

│   ├── Settings/

---│   └── SettingsPanel/

├── hooks/

## 📱 Install as App│   ├── useHaptic.ts          # Haptic feedback logic

│   ├── useCounter.ts         # Counter logic with optimistic updates

### iOS (Safari)│   └── useDimMode.ts

1. Visit site├── store/

2. Tap Share → "Add to Home Screen"│   └── appStore.ts           # Zustand store with persistence

3. Use like native app├── constants/

│   ├── hapticPatterns.ts     # Pre-defined haptic patterns

### Android (Chrome)│   ├── colors.ts             # Theme color palettes

1. Visit site│   └── rosaryDesigns.ts      # Rosary bead designs

2. Tap menu → "Install app"├── utils/

3. App appears on home screen│   ├── animations.ts

│   └── storage.ts

---├── types/

│   └── index.ts              # TypeScript type definitions

## 🎨 Tech Stack└── App.tsx

```

- React 18 + TypeScript

- Expo Web## Getting Started

- Zustand (state)

- localStorage (persistence)### Prerequisites

- CSS animations- Node.js 18+

- Vercel/Netlify (hosting)- npm or yarn

- Expo Go app (for testing on device)

---

### Installation

## 📦 Deployment

```bash

See [WEB_DEPLOYMENT_GUIDE.md](WEB_DEPLOYMENT_GUIDE.md) for full instructions.# Install dependencies

npm install

**One command**:

```bash# Start development server

vercelnpm start

```

# Run on specific platform

---npm run android

npm run ios

## 🙏 Philosophynpm run web

```

- **Simple**: Tap anywhere to count

- **Private**: Data stays on your device### Testing on Real Device (CRITICAL for Haptics)

- **Beautiful**: Realistic 3D beads

- **Free**: No costs, no ads, no tracking**⚠️ Important**: Haptic feedback ONLY works on real devices, not simulators.

- **Spiritual**: Honors multiple traditions

1. Install Expo Go on your phone:

---   - iOS: App Store

   - Android: Play Store

## 📖 Mala Types

2. Scan QR code from terminal after running `npm start`

1. **Rudraksh** - Shiva worship

2. **Tulsi** - Vishnu/Krishna3. Test tap responsiveness and haptic feedback

3. **Kamal Gatta** - Lotus seed

4. **Chandan** - Sandalwood## Development Status

5. **Sphatik** - Crystal quartz

6. **Moonga** - Red coral### ✅ Completed (Phase 1 - Week 1)

7. **Amethyst** - Meditation

8. **Hakik Red/Black/Green** - Agate variants- [x] Project setup with Expo + TypeScript

- [x] Folder structure following architecture

All names in Hinglish for cultural authenticity.- [x] Zustand store with persistence

- [x] Core counter logic

---- [x] Haptic feedback system

- [x] Basic counter display

## 🔒 Privacy- [x] Theme system (light/dark/twilight)

- [x] Constants and type definitions

- ✅ No backend- [x] Code quality tools (ESLint, Prettier)

- ✅ No database

- ✅ No authentication (optional)### 🚧 In Progress (Phase 1 - Week 2-3)

- ✅ No tracking

- ✅ No cookies- [ ] Rosary bead animation system

- ✅ 100% client-side- [ ] Glow effect behind center bead

- [ ] 4 rosary type designs

Your data **never** leaves your browser.- [ ] Milestone visual feedback

- [ ] Tap feedback visual pulse

---

### 📋 Upcoming (Phase 1 - Week 3-6)

## 📝 License

- [ ] Long press for undo/reset menu

MIT - Use freely for your spiritual practice- [ ] Dim mode with brightness scaling

- [ ] Settings panel

---- [ ] Quick rosary type switcher

- [ ] Theme switcher UI

**Namaste** 🙏- [ ] Performance optimization

- [ ] Platform builds (iOS/Android)

*Built with love for the meditation community*

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
