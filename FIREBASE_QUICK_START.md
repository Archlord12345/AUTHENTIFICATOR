# Firebase Custom Tokens - Quick Start

## TL;DR (Time to setup: ~5 minutes)

### 1. Get Service Account Key
```bash
# Firebase Console → Project Settings → Service Accounts → Generate New Private Key
# Save as: serviceAccountKey.json (in project root)
```

### 2. Test Locally
```bash
npm run dev
# Visit: http://localhost:5173/auth/github
# Check logs: "[Firebase] Custom token created for user:"
```

### 3. Deploy to Production
```bash
# Add these to Vercel project settings (Settings → Environment Variables):
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
# ... (see FIREBASE_SETUP.md for all variables)
```

### 4. Client-Side
```javascript
import { signInWithCustomToken } from 'firebase/auth';

const customToken = new URLSearchParams(location.search).get('customToken');
if (customToken) {
  signInWithCustomToken(auth, customToken)
    .then(() => console.log('✅ Authenticated!'))
    .catch(err => console.error('❌', err));
}
```

## What's New?

### Before
```
OAuth callback → Manual JWT token → Client app
```

### Now
```
OAuth callback → Firebase Custom Token → Client app → Firebase
```

## API Changes

**Old redirect:**
```
?status=success&token=eyJ...&provider=github
```

**New redirect:**
```
?status=success&customToken=eyJ...&provider=github&uid=github_123&email=user@example.com
```

## Files Changed

| File | Status | Change |
|------|--------|--------|
| `api/callback/github.js` | ✏️ Modified | JWT → Firebase Custom Token |
| `api/callback/google.js` | ✏️ Modified | JWT → Firebase Custom Token |
| `api/lib/firebase.js` | ✨ New | Firebase Admin initialization |
| `FIREBASE_SETUP.md` | ✨ New | Complete setup guide |
| `FIREBASE_IMPLEMENTATION_SUMMARY.md` | ✨ New | Technical details |
| `package.json` | ✏️ Modified | Added firebase-admin |

## Environment Variables

### Development
```env
# .env.development.local (already configured)
GITHUB_CLIENT_ID=your-github-id
GITHUB_CLIENT_SECRET=your-github-secret
GOOGLE_CLIENT_ID=your-google-id
GOOGLE_CLIENT_SECRET=your-google-secret
NODE_ENV=development
```

### Production
```env
# Vercel Settings → Environment Variables
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY_ID=your-key-id
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=your-email
FIREBASE_CLIENT_ID=your-client-id
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_X509_CERT_URL=your-cert-url
```

## Troubleshooting

| Error | Solution |
|-------|----------|
| "Firebase credentials not found" | Add serviceAccountKey.json or set env vars |
| "Invalid custom token" | Token expired or invalid user ID format |
| "customToken parameter missing" | Check if Firebase initialization succeeded |
| Server logs show no Firebase output | Check NODE_ENV is set correctly |

## Testing Checklist

- [ ] serviceAccountKey.json downloaded from Firebase Console
- [ ] `npm install firebase-admin` (already done)
- [ ] `npm run dev` starts without errors
- [ ] OAuth GitHub flow completes and redirects with customToken
- [ ] OAuth Google flow completes and redirects with customToken
- [ ] Server logs show "[Firebase] Custom token created for user:"
- [ ] Client app can sign in with customToken using Firebase SDK

## Common Issues & Fixes

**Issue: `Cannot find module 'firebase-admin'`**
```bash
npm install firebase-admin
```

**Issue: `ENOENT: no such file or directory 'serviceAccountKey.json'`**
- Development: Place serviceAccountKey.json in project root
- Production: Set Firebase environment variables in Vercel

**Issue: Firebase token creation fails silently**
- Check Firebase service account has "Firebase Authentication Admin" role
- Verify project_id matches your Firebase project

## Next: Client-Side Setup

After deploying the backend, update your client app:

1. Install Firebase SDK
```bash
npm install firebase
```

2. Initialize Firebase in your app
```javascript
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
```

3. Handle OAuth callback
```javascript
import { signInWithCustomToken } from 'firebase/auth';

const customToken = new URLSearchParams(location.search).get('customToken');
if (customToken) {
  signInWithCustomToken(auth, customToken)
    .then(({ user }) => {
      // User is now authenticated in Firebase
      // Redirect to dashboard
    })
    .catch(error => {
      // Handle error
    });
}
```

## Git Commits

- `35cb62f` - feat: implement Firebase Custom Tokens for OAuth callbacks
- `ac7b631` - docs: add Firebase Custom Tokens implementation summary

## Documentation Files

- **FIREBASE_SETUP.md** - Complete setup and integration guide
- **FIREBASE_IMPLEMENTATION_SUMMARY.md** - Technical implementation details
- **FIREBASE_QUICK_START.md** - This file (quick reference)

---

**Status:** ✅ Complete  
**Date:** June 14, 2026  
**Branch:** project-improvement
