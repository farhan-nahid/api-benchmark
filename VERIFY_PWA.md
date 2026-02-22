# How to Verify Your PWA is Working

## 🔍 Quick Verification Checklist

### 1. **Check Build Output**
When you run `pnpm build`, you should see:
```
 ✓ (pwa) Compiling for server...
 ✓ (pwa) Compiling for client (static)...
 ○ (pwa) Service worker: /Users/.../public/sw.js
 ○ (pwa)   URL: /sw.js
 ○ (pwa)   Scope: /
```

### 2. **Check Generated Files**
Verify these files exist in `public/` directory:
```bash
ls -la public/
```

You should see:
- ✅ `sw.js` - Service worker
- ✅ `workbox-*.js` - Workbox runtime
- ✅ `manifest.json` - Web manifest
- ✅ `icon-192x192.png`
- ✅ `icon-384x384.png`
- ✅ `icon-512x512.png`
- ✅ `apple-touch-icon.png`

---

## 🖥️ Desktop Testing

### Google Chrome / Edge

1. **Build and Start**:
   ```bash
   pnpm build
   pnpm start
   ```

2. **Open DevTools** (F12 or Cmd+Option+I)

3. **Check Application Tab**:
   - **Manifest**: 
     - Go to Application > Manifest
     - Should show "API Benchmark" with all icons
     - Click "Add to home screen" link to test installability
   
   - **Service Workers**:
     - Go to Application > Service Workers
     - Should show `/sw.js` as activated and running
     - Status should be green
   
4. **Install the App**:
   - Look for the install icon (⊕) in the address bar
   - Or go to Chrome menu > "Install API Benchmark..."
   - The app will open in a standalone window (no browser UI)

5. **Run Lighthouse Audit**:
   - DevTools > Lighthouse tab
   - Check "Progressive Web App"
   - Click "Generate report"
   - Should score 90+ for PWA compliance

### Firefox

1. Visit `http://localhost:3000`
2. DevTools > Application > Manifest
3. Look for "Add to Home Screen" in address bar

---

## 📱 Mobile Testing

### Android (Chrome)

1. **Deploy or Use ngrok**:
   ```bash
   # Option 1: Deploy to Vercel/Netlify
   # OR
   # Option 2: Use local network IP
   pnpm build && pnpm start
   # Access via http://YOUR_IP:3000
   ```

2. **Visit on Mobile Chrome**

3. **Check for Install Prompt**:
   - Tap the menu (⋮)
   - Should see "Install app" or "Add to Home screen"
   - Install it!

4. **After Installation**:
   - App appears on home screen with your icon
   - Opens in standalone mode (no browser UI)
   - **Now you have the hamburger menu (☰) for navigation!**

5. **Test Offline**:
   - Open the installed app
   - Turn on airplane mode
   - Previously visited pages should still work
   - Service worker caches static assets

### iOS / Safari

1. **Visit on Safari**

2. **Add to Home Screen**:
   - Tap Share button (square with arrow)
   - Scroll down, tap "Add to Home Screen"
   - Confirm

3. **After Installation**:
   - Icon appears on home screen
   - Opens in standalone mode
   - Uses `apple-touch-icon.png` for icon

**Note**: iOS has PWA limitations:
- Service worker scope is limited
- Push notifications not supported
- Background sync not available

---

## 🧪 Testing Guide

### Test 1: Installability
**What to check**: Install prompt appears
```
✅ Address bar shows install button
✅ Can click "Install" or "Add to Home Screen"
✅ App installs successfully
✅ Icon appears on device/desktop
```

### Test 2: Standalone Mode
**What to check**: App opens without browser UI
```
✅ No address bar when opened
✅ No browser tabs
✅ Full screen experience
✅ App feels native
```

### Test 3: Service Worker
**What to check**: Caching and offline support
```
✅ sw.js is registered and active
✅ Console shows "Service worker registered"
✅ Network tab shows resources from "ServiceWorker"
✅ Basic offline functionality works
```

### Test 4: Mobile Navigation
**What to check**: Navigation works on small screens
```
✅ Hamburger menu (☰) visible on mobile
✅ Menu opens when tapped
✅ All navigation links work
✅ Menu closes after selecting a link
```

### Test 5: Manifest
**What to check**: Metadata is correct
```
✅ App name: "API Benchmark"
✅ Theme color: #000000
✅ Display: standalone
✅ Icons load correctly (no broken images)
```

---

## 🐛 Troubleshooting

### "Install" option doesn't appear

**Possible causes**:
1. Not using HTTPS (required for PWA, except localhost)
2. Service worker not registered
3. Manifest missing or invalid
4. Already installed

**Solutions**:
```bash
# Check manifest is accessible
curl http://localhost:3000/manifest.json

# Rebuild to regenerate service worker
pnpm build

# Clear browser data and try again
# Chrome: Settings > Privacy > Clear browsing data
```

### Service worker shows "redundant" or "error"

**Fix**:
1. DevTools > Application > Service Workers
2. Click "Unregister"
3. Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
4. Rebuild: `pnpm build`

### Mobile navigation not showing

**Fix**: Already done! The Layout component now includes:
- Desktop navigation (screens >= 768px)
- Mobile hamburger menu (screens < 768px)

Rebuild and test:
```bash
pnpm build
pnpm start
```

### Icons not loading

**Fix**:
```bash
# Regenerate icons
pnpm generate-icons

# Verify they exist
ls -lh public/icon-*

# Rebuild
pnpm build
```

---

## 📊 Expected Results

### Chrome DevTools - Application Tab

**Manifest Section**:
```
✓ Identity
  Name: API Benchmark
  Short name: API Bench
  
✓ Presentation
  Start URL: /
  Display: standalone
  Theme color: #000000
  Background color: #ffffff
  
✓ Icons (3 icons)
  192x192 (maskable, any)
  384x384
  512x512 (maskable, any)
```

**Service Workers Section**:
```
✓ Status: activated and is running
✓ Source: sw.js
✓ Scope: /
```

### Lighthouse PWA Score

Expected checks passed:
- ✅ Installable manifest
- ✅ Service worker registered
- ✅ HTTPS (in production)
- ✅ Splash screen configured
- ✅ Themed address bar
- ✅ Viewport meta tag
- ✅ Icons provided

---

## 🚀 Production Deployment

For fullPWA experience in production:

1. **Deploy to Vercel/Netlify**:
   ```bash
   git push
   # Automatic deployment
   ```

2. **Verify HTTPS** (automatic on most hosts)

3. **Test on real devices**:
   - Android: Chrome, Samsung Internet
   - iOS: Safari
   - Desktop: Chrome, Edge, Firefox

4. **Monitor in Analytics**:
   - Track install events
   - Monitor offline usage
   - Check service worker errors

---

## 📱 Visual Confirmation

**Before PWA (Browser)**:
```
┌─────────────────────────┐
│ [<] [>] 🔒 localhost... │ ← Browser UI
├─────────────────────────┤
│   🎯 API Benchmark      │
│   📊 Test 🔀 Compare    │ ← Desktop only
│                         │
│   (Your app content)    │
└─────────────────────────┘
```

**After PWA (Installed + Mobile Nav)**:
```
┌─────────────────────────┐
│   🎯 API Benchmark   ☰  │ ← Hamburger menu
├─────────────────────────┤
│                         │
│   (Your app content)    │
│                         │
│   Full screen!          │
│   No browser UI!        │
└─────────────────────────┘
     ↓ Tap ☰
┌─────────────────────────┐
│   🎯 API Benchmark   ✕  │
├─────────────────────────┤
│ 📊 Single Test          │ ← Navigation visible!
│ 🔀 Compare              │
│ 📖 Docs                 │
│ 🐙 GitHub               │
└─────────────────────────┘
```

---

## ✅ Quick Test Command

```bash
# Complete testing workflow
pnpm build && pnpm start

# Then visit: http://localhost:3000
# Check DevTools > Application > Manifest & Service Workers
# Look for install button in address bar
# Test on mobile device using local IP address
```

Your PWA is working when:
1. ✅ Install prompt appears
2. ✅ Can be added to home screen
3. ✅ Opens in standalone mode
4. ✅ Mobile navigation menu (☰) works
5. ✅ Service worker shows as active
6. ✅ Works offline (basic functionality)
