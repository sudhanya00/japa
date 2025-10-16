# ✅ Japa App - Setup Verification Checklist

Use this checklist to verify everything is working correctly before starting development.

## 📦 Installation Verification

- [ ] Node modules installed (`node_modules/` exists)
- [ ] `package.json` has all dependencies
- [ ] No vulnerabilities reported (`npm audit`)

```bash
# Verify installation
npm list --depth=0
```

Expected dependencies:
- ✅ zustand
- ✅ react-native-reanimated
- ✅ @react-native-async-storage/async-storage
- ✅ react-native-haptic-feedback
- ✅ expo

---

## 🏗️ Project Structure Verification

- [ ] `src/` folder exists with subfolders
- [ ] `src/components/Counter/CounterDisplay.tsx` exists
- [ ] `src/hooks/useCounter.ts` exists
- [ ] `src/hooks/useHaptic.ts` exists
- [ ] `src/store/appStore.ts` exists
- [ ] `src/constants/` has 3 files
- [ ] `src/types/index.ts` exists

```bash
# List all source files
Get-ChildItem -Recurse -File -Path .\src\
```

Expected: 8 TypeScript files

---

## ⚙️ Configuration Verification

- [ ] `babel.config.js` includes Reanimated plugin
- [ ] `tsconfig.json` exists
- [ ] `.eslintrc.json` exists
- [ ] `.prettierrc` exists
- [ ] `package.json` has custom scripts (lint, format, etc.)

```bash
# Check TypeScript compilation
npm run type-check
```

Expected: No errors ✅

---

## 🧪 Basic Functionality Test

### 1. App Starts

```bash
npm start
```

Expected:
- [ ] Expo dev server opens
- [ ] QR code appears
- [ ] No error messages in terminal

### 2. TypeScript Validation

```bash
npm run type-check
```

Expected:
- [ ] No TypeScript errors
- [ ] Clean compilation

### 3. Code Linting

```bash
npm run lint
```

Expected:
- [ ] No critical errors
- [ ] Only minor warnings (if any)

### 4. Code Formatting

```bash
npm run format:check
```

Expected:
- [ ] All files formatted correctly
- [ ] Or run `npm run format` to auto-fix

---

## 📱 Device Testing

### On Real Device (CRITICAL)

**Why**: Haptic feedback ONLY works on physical devices.

1. [ ] Installed Expo Go app on phone
   - iOS: App Store → "Expo Go"
   - Android: Play Store → "Expo Go"

2. [ ] Scanned QR code from `npm start`

3. [ ] App loads successfully

4. [ ] See counter display (shows "0")

5. [ ] Tap anywhere on screen
   - [ ] Counter increments (0 → 1 → 2...)
   - [ ] Feel gentle haptic feedback ⚡
   - [ ] No lag or delay

6. [ ] Close app completely

7. [ ] Reopen app
   - [ ] Counter shows same count (persisted) ✅

8. [ ] Continue counting to 108
   - [ ] Feel stronger haptic at milestone

---

## 🎨 Visual Verification

- [ ] Dark theme is active (black background)
- [ ] Counter is large and readable
- [ ] "Set 1 of 4" text appears below counter
- [ ] Text color contrasts well with background

---

## 🚨 Common Issues Troubleshooting

### Issue: `npm start` fails

**Solution**:
```bash
# Clear cache and restart
npm run clean
npm start -- --clear
```

### Issue: TypeScript errors

**Solution**:
```bash
# Restart TypeScript server in VS Code
# Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"
```

### Issue: No haptic feedback

**Check**:
- [ ] Testing on real device (not simulator)?
- [ ] Device haptics enabled in system settings?
- [ ] Haptic intensity not set to 'off'?

Edit `src/store/appStore.ts` line 18:
```typescript
hapticIntensity: 'gentle' as HapticIntensity, // Not 'off'
```

### Issue: Count not persisting

**Check**:
- [ ] `loadState()` called in `App.tsx`?
- [ ] No AsyncStorage errors in console?

**Debug**:
```bash
# Check console for AsyncStorage errors
# Should see no red error messages
```

---

## 📚 Documentation Verification

- [ ] `README.md` exists and is readable
- [ ] `DEVELOPMENT_GUIDE.md` exists
- [ ] `ROADMAP.md` exists
- [ ] `FOUNDATION_COMPLETE.md` exists
- [ ] `PROJECT_OVERVIEW.md` exists

All documentation should be clear and helpful.

---

## 🎯 Feature Checklist

### Core Features (Should Work Now)

- [x] Tap-to-count functionality
- [x] Haptic feedback on tap
- [x] Milestone haptics (108, 216, 324, 432)
- [x] State persistence
- [x] Theme system (dark theme active)
- [x] Type-safe TypeScript code
- [x] Auto-save every 5 taps

### Features Not Yet Implemented (Expected)

- [ ] Bead animations (Week 2)
- [ ] Glow effect (Week 2)
- [ ] Settings panel UI (Week 4)
- [ ] Dim mode UI (Week 4)
- [ ] Long-press menu (Week 4)
- [ ] Visual tap feedback (Week 3)

---

## ⚡ Performance Quick Check

### Test Rapid Tapping

1. [ ] Tap screen rapidly 20+ times
2. [ ] No lag or freezing
3. [ ] Haptics keep up with taps
4. [ ] Counter updates smoothly

Expected: Smooth, responsive, no dropped frames

### Test Memory

1. [ ] Count to 100+
2. [ ] Background app
3. [ ] Reopen app
4. [ ] Count persisted ✅
5. [ ] No memory warnings

---

## 🏆 Ready to Develop?

If all checkboxes above are ✅, you're ready!

### What to Do Next

**Option 1**: Start Week 2 (Bead Animations)
- See `DEVELOPMENT_GUIDE.md` for instructions

**Option 2**: Experiment with Current Build
- Change theme in `src/store/appStore.ts`
- Adjust haptic intensity
- Test on multiple devices

**Option 3**: Read Documentation
- Understand architecture
- Review roadmap
- Plan your approach

---

## 🐛 Found a Bug?

1. Note what you were doing
2. Check console for errors
3. Refer to `DEVELOPMENT_GUIDE.md` Common Issues
4. Check TypeScript errors with `npm run type-check`

---

## 📊 Final Status

Date: _________________

- [ ] All checkboxes above completed ✅
- [ ] App running successfully on device
- [ ] No errors in console
- [ ] Ready to start Week 2 development

**Signed off**: _________________

---

## 🎉 Congratulations!

You have a **production-ready foundation** for a meditation app.

The architecture is solid, the code is clean, and the foundation is set for building something beautiful and meaningful.

**Next stop**: Week 2 - Bead Animation System 🎬

---

**Remember the philosophy**:
> "Does this bring the user closer to their jaap, or further away?"

Build with intention. 🙏
