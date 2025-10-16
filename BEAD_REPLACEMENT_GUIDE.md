# 🔄 Bead Asset Replacement Guide

Quick guide for replacing gradient beads with custom hyperrealistic image assets.

## For Designers

### Create Your Assets
1. Follow specifications in `assets/beads/README.md`
2. Create PNG images: 1024x1024px, transparent background
3. Required files:
   - `sandalwood.png`
   - `rudraksha.png`
   - `crystal.png`
   - `lotus.png`
   - `tulsi.png`

4. Optional glow versions (for active beads):
   - `sandalwood-glow.png`
   - `rudraksha-glow.png`
   - etc.

### Place Files
Save all PNG files in: `assets/beads/` folder

---

## For Developers

### Step 1: Verify Assets
Ensure image files exist in `assets/beads/` folder:
```
assets/beads/sandalwood.png ✓
assets/beads/rudraksha.png ✓
assets/beads/crystal.png ✓
assets/beads/lotus.png ✓
assets/beads/tulsi.png ✓
```

### Step 2: Update Configuration

Open: `src/constants/beadAssets.ts`

Change each bead type from:
```typescript
sandalwood: {
  type: 'gradient',
  useGradient: true,
}
```

To:
```typescript
sandalwood: {
  type: 'image',
  image: require('../../assets/beads/sandalwood.png'),
  activeImage: require('../../assets/beads/sandalwood-glow.png'), // optional
}
```

### Step 3: Test
```bash
npm start
# or
npx expo start
```

The app will now use image assets instead of gradients!

---

## Switching Back to Gradients

To revert to gradient-based beads, simply change back in `beadAssets.ts`:

```typescript
sandalwood: {
  type: 'gradient',
  useGradient: true,
}
```

---

## Current State

**Default Mode**: Gradient-based beads (procedurally generated)
**Ready for**: Image asset replacement (system is in place)

The app is **production-ready** with gradients and **asset-swap-ready** for when professional images are available!

---

## Architecture Benefits

✅ **Zero code changes** - Just swap config
✅ **Hot reload friendly** - Changes reflect immediately
✅ **Fallback system** - Missing images fall back to gradients
✅ **Performance optimized** - Images cached automatically
✅ **Flexible** - Mix gradient and image beads if needed

---

## File Structure

```
japa/
├── assets/
│   └── beads/
│       ├── README.md              ← Designer instructions
│       ├── sandalwood.png         ← Your custom assets (future)
│       ├── sandalwood-glow.png
│       └── ... (other beads)
│
├── src/
│   ├── constants/
│   │   └── beadAssets.ts          ← Configuration file (edit here)
│   │
│   └── components/
│       └── RosaryBead/
│           └── HyperRealisticBead.tsx  ← Renders based on config
│
└── BEAD_REPLACEMENT_GUIDE.md      ← This file
```

---

## Questions?

- **Where do images go?** → `assets/beads/`
- **What format?** → PNG with transparency, 1024x1024px
- **How to activate?** → Edit `src/constants/beadAssets.ts`
- **Can I test one bead at a time?** → Yes! Change config per bead type
- **Performance impact?** → Minimal - React Native caches images efficiently
