# Firebase Custom Tokens Integration Guide

## Overview
Your AUTHENTIFICATOR API now uses **Firebase Custom Tokens** instead of manual JWT tokens. This provides:
- ✅ Better security and token management
- ✅ Native Firebase authentication integration
- ✅ Simplified client-side authentication
- ✅ Built-in token validation and refresh capabilities

## What Changed

### Files Modified
1. **`api/callback/github.js`** - Now creates Firebase Custom Tokens instead of JWT
2. **`api/callback/google.js`** - Now creates Firebase Custom Tokens instead of JWT
3. **`api/lib/firebase.js`** - New Firebase Admin SDK initialization module

### Removed Dependencies
- ❌ Manual `jsonwebtoken` usage (imported but no longer used in OAuth callbacks)
- ❌ Manual JWT signing and verification

## Setup Instructions

### Step 1: Get Firebase Service Account Key

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (AfroVibe or whichever app you're using)
3. Navigate to **Project Settings** (⚙️ icon)
4. Go to **Service Accounts** tab
5. Click **Generate New Private Key**
6. A JSON file will download automatically

### Step 2: Add Service Account Key to Project

**Option A: Local Development**
```bash
# Place the downloaded serviceAccountKey.json at project root
cp ~/Downloads/serviceAccountKey.json /path/to/AUTHENTIFICATOR-API/serviceAccountKey.json

# Add to .gitignore (already present)
echo "serviceAccountKey.json" >> .gitignore
```

**Option B: Production (Vercel)**
Add the following environment variables to your Vercel project settings:

```
FIREBASE_TYPE=service_account
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY_ID=your-key-id
FIREBASE_PRIVATE_KEY=your-private-key
FIREBASE_CLIENT_EMAIL=your-service-account@your-project.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=your-client-id
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_X509_CERT_URL=your-cert-url
```

### Step 3: Install Dependencies

```bash
npm install firebase-admin
```

*(Already done, but included for completeness)*

### Step 4: Test the Integration

**Local Testing:**
```bash
npm run dev

# Visit GitHub OAuth flow:
# http://localhost:5173/auth/github

# Or Google OAuth flow:
# http://localhost:5173/auth/google

# You should be redirected back with customToken parameter
```

**Check Redirect Parameters:**
The callback redirects include:
- `customToken` - Firebase Custom Token (use with Firebase SDK)
- `provider` - OAuth provider (github or google)
- `uid` - User unique ID
- `email` - User email
- `name` - User display name
- `avatar` - User avatar URL
- `status` - 'success' or 'failure'

## Client-Side Usage

### Firebase Web SDK Integration

```javascript
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithCustomToken } from 'firebase/auth';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// In your OAuth callback handler
const urlParams = new URLSearchParams(window.location.search);
const customToken = urlParams.get('customToken');

if (customToken) {
  signInWithCustomToken(auth, customToken)
    .then((result) => {
      console.log('User signed in:', result.user.uid);
      // Redirect to dashboard
    })
    .catch((error) => {
      console.error('Authentication failed:', error.message);
    });
}
```

## Environment Variables

### Development (.env.development.local)
```
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
NODE_ENV=development
```

### Production (.env or Vercel Settings)
Same as above, plus Firebase credentials (see Step 2 Option B)

## OAuth Flow Diagram

```
User Login Request
    ↓
Redirect to OAuth Provider (GitHub/Google)
    ↓
User Authorizes
    ↓
OAuth Provider redirects to AUTHENTIFICATOR callback
    ↓
AUTHENTIFICATOR exchanges code for access token
    ↓
AUTHENTIFICATOR fetches user profile
    ↓
✨ Firebase Admin SDK creates Custom Token
    ↓
AUTHENTIFICATOR redirects to client app with customToken
    ↓
Client app uses Firebase SDK to sign in with custom token
    ↓
✅ User authenticated and ready to use Firebase services
```

## Security Notes

1. **Service Account Key** is NEVER exposed to the client
2. **Custom Tokens** are short-lived and can only be used once
3. **Firebase Rules** should be configured to enforce user-specific access
4. **Environment Variables** must be secured in production

## Troubleshooting

### Error: "Firebase credentials not found"
- Ensure `serviceAccountKey.json` is in the project root (development)
- OR ensure all `FIREBASE_*` environment variables are set (production)

### Error: "Invalid custom token"
- Token may have expired (custom tokens are short-lived)
- Check that the user ID is properly formatted
- Verify Firebase project configuration

### Error: "customToken parameter missing"
- Check if callback is being executed
- Verify OAuth provider credentials are correct
- Check that state parameter is being properly encoded/decoded

## Files Reference

- **`api/lib/firebase.js`** - Firebase Admin initialization and token creation
- **`api/callback/github.js`** - GitHub OAuth callback
- **`api/callback/google.js`** - Google OAuth callback
- **`FIREBASE_SETUP.md`** - This file

## Next Steps

1. ✅ Copy service account key or set environment variables
2. ✅ Test OAuth flow in development
3. ✅ Integrate Firebase SDK on client side
4. ✅ Deploy to production
5. ✅ Configure Firebase security rules for your app

## Support

For issues with:
- **Firebase**: https://firebase.google.com/support
- **AUTHENTIFICATOR**: Check the project README.md
- **OAuth Providers**: GitHub/Google developer documentation

---

**Last Updated:** June 14, 2026
**Version:** 1.0 (Firebase Custom Tokens)
