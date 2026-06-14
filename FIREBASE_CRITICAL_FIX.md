# Firebase Custom Tokens - Critical Fix

## Issue Fixed
**Error:** "Cannot read properties of undefined (reading 'length')"

**Root Cause:** The `firebase.js` module was checking `admin.apps.length` without verifying that `admin.apps` exists first.

## Changes Made

### 1. Firebase Module (`api/lib/firebase.js`)
- ✅ Added null check for `admin.apps` before accessing `.length`
- ✅ Improved error messages with detailed debugging info
- ✅ Better validation of Firebase credentials
- ✅ Enhanced logging for troubleshooting

### 2. GitHub Callback (`api/callback/github.js`)
- ✅ Added try-catch for Firebase token creation
- ✅ Improved error messages
- ✅ Better error propagation

### 3. Google Callback (`api/callback/google.js`)
- ✅ Added try-catch for Firebase token creation
- ✅ Improved error messages
- ✅ Better error propagation

## Setup Requirements (CRITICAL)

You **MUST** configure Firebase credentials before the app works. Choose ONE method:

### Method 1: Local Development (Recommended)
```bash
# 1. Download Firebase service account key
# - Go to Firebase Console
# - Project Settings → Service Accounts
# - Click "Generate New Private Key"
# - Save as: serviceAccountKey.json

# 2. Place in project root
cp ~/Downloads/serviceAccountKey.json ./serviceAccountKey.json

# 3. Test
npm run dev
```

### Method 2: Production (Vercel)
Set these environment variables in Vercel project settings:

```
FIREBASE_TYPE=service_account
FIREBASE_PROJECT_ID=your-project-id
FIREBASE_PRIVATE_KEY_ID=your-key-id
FIREBASE_PRIVATE_KEY=your-private-key (with \n replaced by actual newlines)
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com
FIREBASE_CLIENT_ID=your-client-id
FIREBASE_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_CLIENT_X509_CERT_URL=your-cert-url
```

## Verification Steps

### Check Local Setup
```bash
# 1. Verify serviceAccountKey.json exists
ls -la serviceAccountKey.json

# 2. Check file is valid JSON
cat serviceAccountKey.json | jq .

# 3. Start dev server
npm run dev

# 4. Watch for logs:
# "[Firebase] Successfully initialized with project: your-project-id"
```

### Check Production Setup
1. Go to Vercel Project Settings
2. Go to "Vars" section
3. Verify all `FIREBASE_*` variables are set
4. Re-deploy the project

## Error Messages and Solutions

### "Firebase credentials incomplete"
**Cause:** Missing environment variables or serviceAccountKey.json  
**Solution:** Follow Setup Requirements above

### "Cannot read properties of undefined (reading 'length')"
**Cause:** Firebase Admin SDK not properly initialized  
**Solution:** This is now fixed. Ensure credentials are properly set.

### "Firebase token creation failed"
**Cause:** Firebase credentials are invalid or permissions missing  
**Solution:**
1. Verify the service account key is from the correct Firebase project
2. Check that Firebase Authentication is enabled in your project
3. Regenerate service account key

## Testing Authentication Flow

```bash
# 1. Start dev server
npm run dev

# 2. Open browser
open "http://localhost:5173"

# 3. Click GitHub or Google login

# 4. Check console logs for:
# "[Firebase] Successfully initialized with project: ..."
# "[GitHub OAuth] Firebase custom token created successfully"

# 5. Should redirect to app with customToken in URL
```

## Important Notes

- ⚠️ Never commit `serviceAccountKey.json` to git
- ⚠️ Keep private keys secure
- ⚠️ Use environment variables for production
- ✅ This fix is backward compatible
- ✅ No changes needed to frontend code

## Rollback (if needed)

If you need to revert to manual JWT tokens:
```bash
git revert HEAD~3  # Reverts all Firebase implementation commits
```

---

**Status:** Fixed and ready for testing  
**Date:** June 14, 2026  
**Next Step:** Configure Firebase credentials and test
