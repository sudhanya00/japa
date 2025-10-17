# 🙏 Japa - Meditation Counter

**A beautiful, minimalist meditation counter app with hyper-realistic mala beads.**

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Platform](https://img.shields.io/badge/platform-iOS%20%7C%20Android-lightgrey)
![License](https://img.shields.io/badge/license-MIT-green)

---

## ✨ Features

### 🧘 Core Meditation Experience
- **Tap anywhere to count** - Minimalist, distraction-free interface
- **Hyper-realistic mala beads** - Beautiful 3D gradient rendering with breathing animations
- **5 traditional bead types** - Rudraksh, Crystal Quartz, Tulsi, Kamal Gatta, Amethyst
- **Gentle haptic feedback** - Three intensity levels (Off, Gentle, Strong)
- **Auto-rotate mode** - Ambient meditation with continuous bead rotation (60s cycle)

### 🎨 Beautiful Design
- **3 calming themes** - Cool Blue (Light), Warm Twilight (Default), Mystic Dark
- **Smooth spring animations** - Physics-based motion feels natural
- **Breathing glow effect** - Subtle 6-second pulse around active bead
- **Tap ripples** - Visual feedback at touch points
- **Milestone celebrations** - Backdrop flash at 108, 216, 324, 432 japa
- **Thread visualization** - Connecting thread between beads with smart masking

### 📊 Track Your Practice
- **Session history** - GitHub-style 30-day contribution graph
- **Detailed statistics** - Total sessions, japa count, time spent, current streak
- **Save sessions with notes** - Add personal reflections to each session
- **90-day rolling history** - Automatic cleanup, privacy-first
- **No cloud sync** - All data stays local on your device

### 🔒 Privacy-First
- **No analytics or tracking** - Your practice is yours alone
- **No accounts required** - Start meditating immediately
- **All data local** - Stored in AsyncStorage, never leaves device
- **No permissions** - Doesn't request access to anything
- **Open source ready** - Transparent code you can review

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (Mac) or Android Emulator

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/japa.git
cd japa

# Install dependencies
npm install

# Start the development server
npx expo start
```

### Run on Device

```bash
# iOS Simulator
npx expo start --ios

# Android Emulator
npx expo start --android

# Physical device (scan QR code with Expo Go app)
npx expo start
```

---

## 📱 Usage

### Counting Japa
1. **Tap anywhere** on screen to increment counter
2. Session **auto-starts** on first tap
3. Beads scroll smoothly with each count
4. **Haptic feedback** confirms each tap

### Saving Sessions
1. **Long press** anywhere to open save modal
2. Add **optional notes** about your practice
3. Tap **"Save Session"** button
4. Counter **resets automatically** for next session

### Viewing History
1. Tap **📊 icon** (top-left)
2. View **30-day graph** with color-coded intensity
3. Scroll through **recent sessions** with details
4. See **stats** (total sessions, japa, time, streaks)

### Customization
1. Tap **⚙️ icon** (top-right)
2. Choose **theme** (Light/Twilight/Dark)
3. Select **rosary type** (5 options)
4. Adjust **haptic intensity**
5. Toggle **auto-rotate mode**

---

## 🏗️ Architecture

### Tech Stack
- **React Native** - Cross-platform mobile framework
- **Expo** - Development and build tooling
- **TypeScript** - Type-safe code
- **Zustand** - Lightweight state management
- **AsyncStorage** - Local data persistence
- **React Native Reanimated** - Smooth animations
- **Expo Haptics** - Touch feedback
- **Expo Linear Gradient** - Beautiful gradients

### Project Structure
```
japa/
├── src/
│   ├── components/       # React components
│   │   ├── BeadCircle/   # Bead rendering & layout
│   │   ├── Counter/      # Count display
│   │   ├── Effects/      # Animations & effects
│   │   ├── History/      # Session history UI
│   │   ├── RosaryBead/   # Individual bead rendering
│   │   ├── Settings/     # Reset modal
│   │   └── SettingsPanel/ # Settings UI
│   ├── constants/        # Colors, designs, assets
│   ├── hooks/            # Custom React hooks
│   ├── store/            # Zustand state management
│   ├── types/            # TypeScript definitions
│   └── utils/            # Helper functions
├── assets/               # Images, icons, fonts
├── App.tsx               # Main entry point
└── app.json              # Expo configuration
```

---

## 🎨 Themes

### Light (Cool Blue)
- Background: Pure white (`#FFFFFF`)
- Primary: Slate blue (`#4A5F7F`)
- Accent: Bright blue (`#3B82F6`)
- **Best for**: Bright environments, focused practice

### Twilight (Warm Orange) - **Default**
- Background: Soft peachy white (`#FFF5F0`)
- Primary: Terracotta (`#C85A3F`)
- Accent: Vibrant orange (`#FF6B45`)
- **Best for**: Warm ambiance, sunset meditation

### Dark (Mystic Purple)
- Background: Deep navy (`#1A1B2E`)
- Primary: Soft purple (`#9D84B7`)
- Accent: Purple glow (`#A78BFA`)
- **Best for**: Night meditation, OLED displays

---

## 🔧 Development

### Scripts

```bash
# Start development server
npm start

# Run on specific platform
npm run ios
npm run android

# Code quality
npm run lint          # Check for errors
npm run lint:fix      # Auto-fix errors
npm run format        # Format code
npm run type-check    # TypeScript validation

# Clean install
npm run clean
```

### Building for Production

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Configure builds
eas build:configure

# Build for Android
eas build -p android --profile production

# Build for iOS
eas build -p ios --profile production
```

---

## 📄 Documentation

- **[PRODUCTION_LAUNCH.md](PRODUCTION_LAUNCH.md)** - Complete launch checklist
- **[WEEK2_PROGRESS.md](WEEK2_PROGRESS.md)** - Development progress notes
- **[SESSION_HISTORY.md](SESSION_HISTORY.md)** - Session history feature docs
- **[COLOR_SYSTEM_UPDATE.md](COLOR_SYSTEM_UPDATE.md)** - Theme system details
- **[SESSION_SAVE_IMPROVEMENTS.md](SESSION_SAVE_IMPROVEMENTS.md)** - Session UX improvements
- **[BEAD_ASSET_SYSTEM.md](BEAD_ASSET_SYSTEM.md)** - Custom bead image guide

---

## 📊 Performance

### Optimizations
- **Viewport culling** - Only 15-20 beads rendered
- **React.memo** - Prevent unnecessary re-renders
- **useMemo/useCallback** - Cache expensive calculations
- **Auto-save throttling** - Save every 5 taps, not every tap
- **Shared animations** - Global breathing effect, not per-bead

### Targets
- **60 FPS** animations on all devices
- **< 100MB** memory usage
- **< 5% CPU** when idle
- **< 0.1s** tap-to-feedback latency

---

## 🙏 Acknowledgments

- Inspired by traditional mala bead counting practices
- Built with love for the meditation community
- Special thanks to all beta testers

---

## 🌟 Roadmap

### v1.1.0
- [ ] Custom bead images support
- [ ] Sound effects (optional)
- [ ] Export session history
- [ ] More rosary types
- [ ] Improved accessibility

### v1.2.0
- [ ] Widgets (iOS/Android)
- [ ] Goal setting
- [ ] Weekly/monthly views
- [ ] Session categories

### v2.0.0
- [ ] Apple Watch app
- [ ] Guided meditation timer
- [ ] Community mantras library
- [ ] Optional iCloud sync

---

**Made with 🙏 for mindful practitioners**

**Version 1.0.0** | **Status: Production Ready ✅**
