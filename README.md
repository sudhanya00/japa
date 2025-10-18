# 🙏 Japa - Meditation Counter# 🙏 Japa - Meditation Counter# Japa - Meditation Counter App



A minimalist web app for tracking japa meditation with beautiful, realistic mala beads. Built for practitioners who value simplicity, privacy, and authentic spiritual tools.



**Live Demo**: https://japa-fk5zkhmkg-sudhanyas-projects.vercel.app> Minimalist web meditation counter with beautiful mala beadsA premium, meditation-focused japa (mantra recitation) counting application built with React Native.



---



## ✨ Features**Status**: ✅ Ready to deploy!## Philosophy



- **Tap-anywhere counter** - Simple, distraction-free counting

- **10 traditional mala types** - Rudraksh, Tulsi, Sphatik, Kamal Gatta, Chandan, Moonga, Amethyst, and Hakik (red/black/green)

- **3 calming themes** - Light, Twilight (warm default), and Dark modes---Japa is designed to be **invisible**—an extension of your meditation practice, not an interruption. Every interaction is crafted to maintain focus and enhance the spiritual experience.

- **Session tracking** - GitHub-style contribution graph with notes

- **PWA support** - Install as app on mobile devices

- **Privacy-first** - All data stays on your device (localStorage)

- **No sign-up** - Start using immediately## 🚀 Quick Start### Core Principles



---- ✨ **Minimal cognitive load** - Tap anywhere to count



## 🚀 Quick Start```bash- 🧘 **Meditative UX** - Intentional animations, never jarring



```bash# Development- ⚡ **Instant responsiveness** - <50ms tap-to-haptic response

# Install dependencies

npm install --legacy-peer-depsnpm install --legacy-peer-deps- ♿ **Accessibility-first** - Universal usability (ages 4-100)



# Developmentnpm start- 🚀 **Performance obsessed** - Smooth on 5-year-old devices

npm start

- 🙏 **Respectful design** - Honors the spiritual practice

# Production build

npm run build# Production Build



# Deploy to Vercelnpm run build## Tech Stack

vercel

```



Visit `http://localhost:8081` to see the app.# Deploy to Vercel- **Framework**: React Native (Expo)



---vercel- **Language**: TypeScript



## 🎨 Tech Stack```- **State Management**: Zustand



- **Frontend**: React 18 + TypeScript- **Animations**: React Native Reanimated v3

- **State**: Zustand

- **Build**: Expo (Metro bundler)---- **Persistence**: AsyncStorage

- **Styling**: React Native Web + CSS

- **Storage**: localStorage- **Haptics**: expo-haptics (Expo Go compatible)

- **Hosting**: Vercel

## ✨ Features- **Code Quality**: ESLint + Prettier

---



## 📱 Usage

- ✅ Tap-anywhere counter## Project Structure

### Desktop

1. Visit the app URL- ✅ 10 traditional mala types (Rudraksh, Tulsi, Sphatik, etc.)

2. Tap anywhere to increment counter

3. Long-press to save session- ✅ 3 beautiful themes (Light, Twilight, Dark)```

4. Access settings (⚙️) and history (📋) from top corners

- ✅ Session history with GitHub-style graphsrc/

### Mobile (PWA)

**iOS**: Safari → Share → "Add to Home Screen"  - ✅ PWA support (Add to Home Screen)├── components/

**Android**: Chrome → Menu → "Install app"

- ✅ Completely private (localStorage only)│   ├── Counter/

App works offline after installation.

- ✅ No authentication needed│   │   └── CounterDisplay.tsx

---

- ✅ Works on desktop & mobile│   ├── RosaryBead/

## 📂 Project Structure

│   ├── Settings/

```

japa/---│   └── SettingsPanel/

├── src/

│   ├── components/     # React components├── hooks/

│   ├── constants/      # Theme colors, mala configs

│   ├── hooks/          # Custom hooks (counter, haptics)## 📱 Install as App│   ├── useHaptic.ts          # Haptic feedback logic

│   ├── store/          # Zustand state management

│   ├── types/          # TypeScript definitions│   ├── useCounter.ts         # Counter logic with optimistic updates

│   └── utils/          # localStorage, positioning

├── public/             # PWA manifest### iOS (Safari)│   └── useDimMode.ts

├── App.tsx             # Main app component

└── package.json        # Dependencies1. Visit site├── store/

```

2. Tap Share → "Add to Home Screen"│   └── appStore.ts           # Zustand store with persistence

---

3. Use like native app├── constants/

## 🎯 Mala Types

│   ├── hapticPatterns.ts     # Pre-defined haptic patterns

Traditional beads from multiple spiritual traditions:

### Android (Chrome)│   ├── colors.ts             # Theme color palettes

- **Rudraksh** (रुद्राक्ष) - Shiva worship

- **Tulsi** (तुलसी) - Vishnu/Krishna devotion  1. Visit site│   └── rosaryDesigns.ts      # Rosary bead designs

- **Kamal Gatta** (कमल गट्टा) - Lotus seed for purity

- **Chandan** (चन्दन) - Sandalwood for peace2. Tap menu → "Install app"├── utils/

- **Sphatik** (स्फटिक) - Crystal quartz for clarity

- **Moonga** (मूंगा) - Red coral for vitality3. App appears on home screen│   ├── animations.ts

- **Amethyst** - Universal meditation stone

- **Hakik** (हकीक) - Red, black, and green agate for protection│   └── storage.ts



Names use Hinglish (Hindi-English phonetics) for cultural authenticity.---├── types/



---│   └── index.ts              # TypeScript type definitions



## 🔒 Privacy## 🎨 Tech Stack└── App.tsx



- **No backend** - Pure client-side app```

- **No database** - localStorage only

- **No tracking** - Zero analytics or cookies- React 18 + TypeScript

- **No authentication** - Optional, not required

- **Open source** - Transparent code- Expo Web## Getting Started



Your meditation data never leaves your browser.- Zustand (state)



---- localStorage (persistence)### Prerequisites



## 🌐 Deployment- CSS animations- Node.js 18+



Deployed on Vercel with zero configuration:- Vercel/Netlify (hosting)- npm or yarn



```bash- Expo Go app (for testing on device)

vercel --prod

```---



Free tier includes:### Installation

- HTTPS/SSL

- Global CDN## 📦 Deployment

- Unlimited requests

- Automatic deployments```bash



---See [WEB_DEPLOYMENT_GUIDE.md](WEB_DEPLOYMENT_GUIDE.md) for full instructions.# Install dependencies



## 📝 Licensenpm install



MIT License - Free to use for personal or commercial spiritual practice.**One command**:



---```bash# Start development server



## 🙏 Acknowledgmentsvercelnpm start



Built with respect for meditation traditions worldwide. Inspired by the need for distraction-free, privacy-first spiritual tools.```



**Namaste** 🙏# Run on specific platform


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
