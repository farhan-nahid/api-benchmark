# PWA Configuration

This application has been converted to a Progressive Web App (PWA). Users can now install it on their devices and use it offline.

## What Was Added

### 1. Dependencies
- **@ducanh2912/next-pwa**: PWA plugin for Next.js (requires webpack)
- **sharp**: Icon generation tool (dev dependency)

### 2. Configuration Files

#### next.config.ts
Configured with PWA support using `@ducanh2912/next-pwa`. The service worker is disabled in development mode and generated in the `public` directory.

#### src/app/layout.tsx
Added PWA metadata including:
- Web manifest link
- Apple Web App configuration
- Viewport settings with theme color
- PWA icons for different platforms

### 3. PWA Assets

#### public/manifest.json
Web app manifest defining:
- App name and description
- Display mode (standalone)
- Theme colors
- Icon references
- App categories

#### public/icon.svg
Source SVG icon used to generate all PWA icons

#### Generated Icons
- `icon-192x192.png` - Android icon (maskable)
- `icon-384x384.png` - Android icon
- `icon-512x512.png` - Android icon (maskable, splash screen)
- `apple-touch-icon.png` - iOS home screen icon (180x180)

#### Service Worker (Generated at Build)
- `public/sw.js` - Service worker for caching and offline support
- `public/workbox-*.js` - Workbox library for SW functionality

## Building the App

The PWA plugin requires webpack (not Turbopack). Build commands:

```bash
# Build for production (uses webpack)
pnpm build

# Build with Turbopack (without PWA, faster)
pnpm build:turbopack

# Development (PWA disabled in dev mode)
pnpm dev
```

## Customization

### Changing Icons

1. Replace `public/icon.svg` with your custom icon
2. Run the icon generator:
   ```bash
   pnpm generate-icons
   ```

Or manually create PNG files with these sizes:
- 192x192 pixels
- 384x384 pixels
- 512x512 pixels
- 180x180 pixels (Apple)

### Updating Manifest

Edit `public/manifest.json` to customize:
- App name and description
- Theme colors
- Display mode
- Orientation
- Categories

### Customizing Service Worker

The service worker is auto-generated with sensible defaults. To customize caching strategies, create a custom worker configuration in [next-pwa documentation](https://github.com/DuCanhGH/next-pwa).

## Testing PWA

### Local Testing

1. Build the app: `pnpm build`
2. Start production server: `pnpm start`
3. Open in browser: `http://localhost:3000`
4. Check DevTools > Application > Manifest
5. Test "Add to Home Screen" functionality

### Lighthouse Audit

Run a Lighthouse audit in Chrome DevTools to verify PWA compliance:
1. Open DevTools (F12)
2. Go to Lighthouse tab
3. Select "Progressive Web App" category
4. Click "Generate report"

## Browser Support

- ✅ Chrome/Edge (excellent)
- ✅ Safari/iOS (good, with limitations)
- ✅ Firefox (good)
- ⚠️ Samsung Internet (good)

## Deployment Notes

When deploying, ensure:
1. HTTPS is enabled (required for PWA)
2. Service worker files are served with correct MIME types
3. Manifest is accessible at `/manifest.json`
4. Icons are properly sized and formatted

## Troubleshooting

### Build Failing
If you get Turbopack/webpack errors, ensure you're using `pnpm build` (which includes `--webpack` flag).

### Icons Not Showing
1. Check icon files exist in `public/` directory
2. Verify manifest.json references correct paths
3. Clear browser cache and hard reload

### Service Worker Not Registering
1. Ensure you're using HTTPS or localhost
2. Check browser console for errors
3. Verify `sw.js` exists in the public directory after build

## Future Enhancements

Consider adding:
- Custom offline fallback page
- Push notifications support
- Background sync for form submissions
- Advanced caching strategies
- App shortcuts in manifest
