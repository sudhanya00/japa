# Bead Asset System - Quick Reference

## 🎯 System Overview

The app now supports **two rendering modes** for beads:

1. **Gradient Mode** (Current) - Procedurally generated gradient beads
2. **Image Mode** (Ready) - Custom hyperrealistic PNG assets

Switch between modes by editing **one configuration file**.

---

## 📦 Files Created

### Configuration
- `src/constants/beadAssets.ts` - **Main config file** (edit here to swap assets)

### Documentation
- `assets/beads/README.md` - Detailed designer specifications
- `BEAD_REPLACEMENT_GUIDE.md` - Quick swap guide for developers
- `BEAD_ASSET_SYSTEM.md` - This overview document

### Code
- `src/components/RosaryBead/HyperRealisticBead.tsx` - Updated to support both modes

### Folder Structure
- `assets/beads/` - Folder ready for custom PNG files

---

## ⚡ Quick Start for Designers

1. **Read specifications**: `assets/beads/README.md`
2. **Create 5 PNG files** (1024x1024px each):
   - sandalwood.png
   - rudraksha.png
   - crystal.png
   - lotus.png
   - tulsi.png
3. **Save to**: `assets/beads/` folder
4. **Notify developer** to update config

---

## ⚡ Quick Start for Developers

### Activate Image Assets

**File**: `src/constants/beadAssets.ts`

Change from:
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

Repeat for all 5 bead types. Done! ✅

---

## 🔍 How It Works

### Current Flow (Gradient Mode)
```
User taps → BeadCircle → HyperRealisticBead
                            ↓
                    Check beadAssets.ts
                            ↓
                    type === 'gradient'
                            ↓
                    Render LinearGradient
```

### Future Flow (Image Mode)
```
User taps → BeadCircle → HyperRealisticBead
                            ↓
                    Check beadAssets.ts
                            ↓
                    type === 'image'
                            ↓
                    Render PNG asset
```

### Features
- ✅ **Hot reload** - Changes reflect instantly
- ✅ **Type-safe** - TypeScript ensures correct usage
- ✅ **Fallback** - Missing assets use gradient
- ✅ **Flexible** - Mix modes per bead type
- ✅ **Performant** - Images cached automatically
- ✅ **Zero breaking changes** - Existing code unchanged

---

## 📋 Asset Checklist

When designer provides assets:

- [ ] Verify all 5 PNG files present
- [ ] Check file names match exactly
- [ ] Confirm 1024x1024px size
- [ ] Test transparency/alpha channel
- [ ] Update `beadAssets.ts` config
- [ ] Test in app with `npm start`
- [ ] Verify smooth animations
- [ ] Check glow effect (if provided)
- [ ] Test on both iOS and Android

---

## 🎨 Design Specs Summary

| Property | Value |
|----------|-------|
| Format | PNG with alpha |
| Dimensions | 1024x1024px |
| DPI | 300+ |
| Background | Transparent |
| Lighting | Top-left (45°) |
| Shadow | Included in image |
| Highlight | Top-left specular |

---

## 🚀 Current Status

**Mode**: Gradient (default)
**Ready for**: Image assets
**Action needed**: None (works perfectly as-is)
**Next step**: When designer provides assets, update config

---

## 💡 Tips

### For Mixed Mode (Advanced)
You can use images for some beads and gradients for others:

```typescript
export const BEAD_ASSETS = {
  sandalwood: {
    type: 'image',
    image: require('../../assets/beads/sandalwood.png'),
  },
  rudraksha: {
    type: 'gradient', // Still using gradient
    useGradient: true,
  },
  // ... mix as needed
};
```

### For Testing
Create a simple test image:
1. Make a 1024x1024px PNG with a circle
2. Save as `sandalwood.png`
3. Update config
4. Run app to verify system works

### Performance
- Images are cached after first load
- No performance difference between modes
- Gradients are generated on-the-fly (also fast)

---

## 📞 Support

**Configuration issue?** Check `src/constants/beadAssets.ts`
**Image not showing?** Verify file path and name
**App crashes?** Check console for require() errors
**Need design specs?** See `assets/beads/README.md`

---

Built with ❤️ for seamless asset swapping
