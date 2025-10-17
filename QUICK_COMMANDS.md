# 🚀 Quick Launch Commands

## Development

```bash
# Start development server
npx expo start

# Run on iOS
npx expo start --ios

# Run on Android
npx expo start --android

# Clear cache and restart
npx expo start --clear
```

## Code Quality

```bash
# Check TypeScript
npm run type-check

# Lint code
npm run lint

# Fix linting errors
npm run lint:fix

# Format code
npm run format

# Check formatting
npm run format:check
```

## Production Build

```bash
# Install EAS CLI (one-time)
npm install -g eas-cli

# Login to Expo
eas login

# Configure builds (one-time)
eas build:configure

# Build for Android (APK for testing)
eas build -p android --profile preview

# Build for Android (AAB for Play Store)
eas build -p android --profile production

# Build for iOS (Simulator)
eas build -p ios --profile preview

# Build for iOS (App Store)
eas build -p ios --profile production
```

## Submit to Stores

```bash
# Submit to Google Play
eas submit -p android

# Submit to App Store
eas submit -p ios
```

## Testing

```bash
# Install on physical device
# 1. Install Expo Go from App Store/Play Store
# 2. Run: npx expo start
# 3. Scan QR code with phone camera

# Clear AsyncStorage (reset app data)
# For testing: Delete and reinstall app
```

## Troubleshooting

```bash
# Clear node modules and reinstall
rm -rf node_modules
npm install

# Clear Expo cache
npx expo start --clear

# Reset Metro bundler
npx expo start --reset-cache

# Check for outdated packages
npm outdated

# Update packages
npm update
```

## Useful EAS Commands

```bash
# Check build status
eas build:list

# View build details
eas build:view BUILD_ID

# Cancel build
eas build:cancel BUILD_ID

# Configure credentials
eas credentials

# Check project status
eas whoami
eas project:info
```

## Pre-Launch Checklist

```bash
# 1. Run all quality checks
npm run type-check
npm run lint
npm run format:check

# 2. Test on real devices
npx expo start
# (Scan QR with iOS and Android devices)

# 3. Create production builds
eas build -p android --profile production
eas build -p ios --profile production

# 4. Test production builds
# Download and install .apk/.ipa files

# 5. Submit to stores
eas submit -p android
eas submit -p ios
```

## Version Bumping

```bash
# Update version in:
# 1. package.json - "version": "1.0.1"
# 2. app.json - "version": "1.0.1"
# 3. app.json - "ios.buildNumber": "2"
# 4. app.json - "android.versionCode": 2

# Commit version bump
git add .
git commit -m "Bump version to 1.0.1"
git tag v1.0.1
git push origin main --tags
```

## Environment Setup

```bash
# Required for first-time setup
npm install -g expo-cli
npm install -g eas-cli

# Project dependencies
cd japa
npm install

# Start developing
npx expo start
```

---

## Common Issues

### "Metro bundler crashed"
```bash
npx expo start --clear
```

### "Unable to resolve module"
```bash
rm -rf node_modules
npm install
npx expo start --clear
```

### "Expo Go incompatible"
```bash
# Update Expo Go app on your phone
# Or update Expo SDK in project:
npm install expo@latest
```

### "Build failed"
```bash
# Check EAS build logs
eas build:list
# View specific build
eas build:view BUILD_ID
```

---

**Quick Start**: `npx expo start` then scan QR code! 📱
