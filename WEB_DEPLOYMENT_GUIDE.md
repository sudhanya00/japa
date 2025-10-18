# Japa Web App - Deployment Guide

## 🚀 Quick Deploy to Vercel (FREE)

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/sudhanya00/japa)

### Manual Deploy

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   # From project root
   vercel
   
   # Follow prompts:
   # - Set up and deploy? Yes
   # - Which scope? (your account)
   # - Link to existing project? No
   # - Project name? japa-meditation
   # - Directory? ./
   # - Override settings? No
   ```

4. **Production Deploy**
   ```bash
   vercel --prod
   ```

---

## 📦 Build Commands

### Development
```bash
npm start          # Start Expo web dev server
npm run dev        # Same as above
```

### Production Build
```bash
npm run build      # Creates optimized production build
```

---

## 🌐 Alternative Hosting Options

### Netlify (FREE)

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Build & Deploy**
   ```bash
   npm run build
   netlify deploy --prod --dir=web-build
   ```

### Firebase Hosting (FREE)

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Initialize**
   ```bash
   firebase init hosting
   # Choose web-build as public directory
   ```

3. **Deploy**
   ```bash
   npm run build
   firebase deploy
   ```

### GitHub Pages (FREE)

1. **Build**
   ```bash
   npm run build
   ```

2. **Push to gh-pages branch**
   ```bash
   npm install -g gh-pages
   gh-pages -d web-build
   ```

---

## 🔧 Environment Variables

No environment variables needed! The app works completely client-side with localStorage.

---

## 📱 PWA Features

### Add to Home Screen

Users can install the app on their phones:

**iOS (Safari)**:
1. Open in Safari
2. Tap Share button
3. Tap "Add to Home Screen"
4. App icon appears on home screen

**Android (Chrome)**:
1. Open in Chrome
2. Tap menu (3 dots)
3. Tap "Install app" or "Add to Home Screen"
4. App icon appears on home screen

### Offline Support (Future)

Currently requires internet for first load. Service worker for offline support can be added in v1.1.

---

## 🎯 Performance

### Bundle Size
- Initial load: ~200-300 KB (gzipped)
- Total assets: ~500 KB

### Lighthouse Scores (Target)
- Performance: 95+
- Accessibility: 100
- Best Practices: 100
- SEO: 100
- PWA: 100

---

## 🐛 Troubleshooting

### Build Fails

```bash
# Clear cache and rebuild
rm -rf node_modules .expo web-build
npm install --legacy-peer-deps
npm run build
```

### Can't Access Deployed Site

- Check Vercel/Netlify dashboard for deploy status
- Ensure custom domain DNS is configured
- Wait 5-10 minutes for DNS propagation

### PWA Not Installing

- Ensure HTTPS (required for PWA)
- Check manifest.json is accessible at /manifest.json
- Verify icons exist in /public folder

---

## 📊 Analytics (Optional)

To add analytics in future:

```bash
# Google Analytics
npm install react-ga4

# Or Vercel Analytics
npm install @vercel/analytics
```

---

## 🔒 Security

### Current Setup
- ✅ No backend = no server vulnerabilities
- ✅ No database = no SQL injection
- ✅ No authentication = no password breaches
- ✅ Client-side only = maximum privacy

### Data Storage
- All data stored in browser localStorage
- Data never leaves user's device
- No tracking, no cookies, no third-party scripts

---

## 🚀 Post-Deploy Checklist

- [ ] Verify site loads on desktop
- [ ] Test on iPhone Safari
- [ ] Test on Android Chrome
- [ ] Test "Add to Home Screen" on both platforms
- [ ] Test all mala types load
- [ ] Test counter increments
- [ ] Test session save/history
- [ ] Test theme switching
- [ ] Test settings persistence
- [ ] Share link with friends for beta testing

---

## 📈 Future Enhancements

**v1.1** (Optional):
- [ ] Firebase Authentication (if users request it)
- [ ] Cloud sync across devices
- [ ] Service worker for offline mode
- [ ] Push notifications for meditation reminders
- [ ] Social sharing (share session achievements)

**v1.2** (Nice to have):
- [ ] Multiple languages (Hindi, Sanskrit)
- [ ] Custom mantras
- [ ] Timer mode
- [ ] Streak tracking
- [ ] Achievements/milestones

---

## 💰 Costs

**Current (v1.0)**: $0/month
- Vercel/Netlify free tier
- No database
- No authentication
- No server costs

**With Firebase (if added later)**: Still $0/month
- Free tier: 10k users/month
- 50k reads/day
- 20k writes/day
- More than enough for years

---

## 🙏 You're Ready to Ship!

Your meditation app is ready to help people with their spiritual practice.

**Deploy now**: `vercel`

Namaste! 🙏
