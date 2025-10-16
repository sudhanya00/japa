# Bead Assets - Designer Guide

This folder contains hyperrealistic bead image assets for the Japa meditation app.

## 📋 Image Requirements

### Technical Specifications
- **Format**: PNG with transparency (alpha channel)
- **Size**: 1024x1024px (square, high resolution)
- **Color Mode**: RGB/RGBA
- **DPI**: 300+ for best quality
- **File Size**: Keep under 500KB per image (optimize with TinyPNG or similar)

### Visual Requirements
- **Content**: Single bead, perfectly centered
- **Lighting**: Natural, soft lighting from top-left (consistent with gradient version)
- **Shadow**: Include subtle drop shadow within the image
- **Highlight**: Add specular highlight for realism (top-left area)
- **Background**: Fully transparent (no background color)
- **Style**: Hyperrealistic, photographic quality

## 🎨 Bead Types

Create assets for each of these bead types:

1. **Sandalwood** (`sandalwood.png`)
   - Warm brown wood texture
   - Natural grain patterns
   - Smooth, polished finish

2. **Rudraksha** (`rudraksha.png`)
   - Deep brown/reddish color
   - Natural wrinkled texture
   - Traditional sacred bead appearance

3. **Crystal** (`crystal.png`)
   - Translucent/semi-transparent
   - Light refractions and internal highlights
   - Clear or slightly tinted

4. **Lotus Seed** (`lotus.png`)
   - Cream/beige color
   - Subtle natural texture
   - Organic, seed-like appearance

5. **Tulsi** (`tulsi.png`)
   - Dark brown/black color
   - Smooth surface with slight texture
   - Sacred basil wood appearance

## 💫 Optional: Active State Assets

For enhanced user experience, you can create glowing versions for active beads:

- `sandalwood-glow.png` - Same bead with subtle glow effect
- `rudraksha-glow.png` - Same bead with subtle glow effect
- `crystal-glow.png` - Same bead with subtle glow effect
- `lotus-glow.png` - Same bead with subtle glow effect
- `tulsi-glow.png` - Same bead with subtle glow effect

**Glow Effect Guidelines:**
- Subtle, soft outer glow (not too bright)
- Color should match the bead type
- Keep glow within the 1024x1024px canvas
- Transparency gradient on the glow

## 📁 Folder Structure

```
assets/
  beads/
    sandalwood.png          ← Normal state (required)
    sandalwood-glow.png     ← Active/glowing state (optional)
    rudraksha.png           ← Normal state (required)
    rudraksha-glow.png      ← Active/glowing state (optional)
    crystal.png             ← Normal state (required)
    crystal-glow.png        ← Active/glowing state (optional)
    lotus.png               ← Normal state (required)
    lotus-glow.png          ← Active/glowing state (optional)
    tulsi.png               ← Normal state (required)
    tulsi-glow.png          ← Active/glowing state (optional)
    README.md               ← This file
```

## 🔧 How to Activate Custom Assets

Once you've created the bead images:

1. **Place files** in `assets/beads/` folder (following the naming convention above)

2. **Update configuration** in `src/constants/beadAssets.ts`:

```typescript
export const BEAD_ASSETS: Record<string, BeadAssetConfig> = {
  sandalwood: {
    type: 'image',
    image: require('../../assets/beads/sandalwood.png'),
    activeImage: require('../../assets/beads/sandalwood-glow.png'), // optional
  },
  // ... repeat for other bead types
};
```

3. **Test the app** - The images will automatically replace the gradient beads!

## 🎯 Design Tips

### Lighting & Shadows
- **Primary light source**: Top-left (45° angle)
- **Highlight**: Small, bright spot on upper-left quadrant
- **Shadow**: Soft, diffused shadow on bottom-right
- **Ambient occlusion**: Subtle darkening around the bottom edge

### Texture & Realism
- Use high-quality reference photos of real beads
- Add subtle imperfections (natural variations, small marks)
- Wood grain should be visible but not overpowering
- Crystal beads should have internal depth and refractions

### Color Palette (as reference)
- **Sandalwood**: #D4A574, #C08552 (warm browns)
- **Rudraksha**: #8B4513, #654321 (reddish browns)
- **Crystal**: #E8F4F8, #B8E6F0 (translucent blues)
- **Lotus**: #F5E6D3, #E8D4B8 (cream/beige)
- **Tulsi**: #4A3F35, #2C2520 (dark browns)

## ✨ Examples

### Good Example
✅ Centered bead
✅ Consistent lighting
✅ Realistic texture
✅ Transparent background
✅ Proper shadows and highlights
✅ High resolution

### Bad Example
❌ Off-center bead
❌ Flat lighting
❌ Low resolution/pixelated
❌ White background
❌ No shadows or highlights
❌ Unrealistic colors

## 🤝 Questions?

If you need clarification or have questions about the requirements, please reach out to the development team.

Happy designing! 🎨✨
