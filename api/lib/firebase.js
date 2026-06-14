import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let initialized = false;

export async function initializeFirebase() {
  // Check if already initialized
  if (admin.apps && admin.apps.length > 0) {
    console.log('[Firebase] Already initialized');
    return admin;
  }

  try {
    // Try to load serviceAccountKey.json from project root
    const keyPath = path.join(__dirname, '../../serviceAccountKey.json');
    let serviceAccount;
    
    if (!fs.existsSync(keyPath)) {
      console.log('[Firebase] serviceAccountKey.json not found at', keyPath);
      console.log('[Firebase] Attempting to use environment variables for Firebase Admin SDK');
      
      // Build service account from environment variables
      serviceAccount = {
        type: process.env.FIREBASE_TYPE || 'service_account',
        project_id: process.env.FIREBASE_PROJECT_ID,
        private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
        private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        client_id: process.env.FIREBASE_CLIENT_ID,
        auth_uri: process.env.FIREBASE_AUTH_URI || 'https://accounts.google.com/o/oauth2/auth',
        token_uri: process.env.FIREBASE_TOKEN_URI || 'https://oauth2.googleapis.com/token',
        auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL || 'https://www.googleapis.com/oauth2/v1/certs',
        client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
      };

      // Validate required fields
      if (!serviceAccount.project_id || !serviceAccount.private_key || !serviceAccount.client_email) {
        console.error('[Firebase] Missing required Firebase environment variables:');
        console.error('[Firebase] - FIREBASE_PROJECT_ID:', !!serviceAccount.project_id);
        console.error('[Firebase] - FIREBASE_PRIVATE_KEY:', !!serviceAccount.private_key);
        console.error('[Firebase] - FIREBASE_CLIENT_EMAIL:', !!serviceAccount.client_email);
        throw new Error('Firebase credentials incomplete. Please set all required environment variables or add serviceAccountKey.json');
      }
    } else {
      console.log('[Firebase] Loading serviceAccountKey.json from', keyPath);
      try {
        serviceAccount = JSON.parse(fs.readFileSync(keyPath, 'utf8'));
        console.log('[Firebase] Service account loaded successfully');
      } catch (parseError) {
        console.error('[Firebase] Failed to parse serviceAccountKey.json:', parseError.message);
        throw parseError;
      }
    }

    // Initialize Firebase Admin
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

    console.log('[Firebase] Successfully initialized with project:', serviceAccount.project_id);
    initialized = true;
    return admin;
  } catch (error) {
    console.error('[Firebase] Initialization error:', error.message);
    console.error('[Firebase] Stack:', error.stack);
    throw error;
  }
}

export async function createCustomToken(userId) {
  try {
    await initializeFirebase();
    const customToken = await admin.auth().createCustomToken(userId);
    console.log('[Firebase] Custom token created for user:', userId);
    return customToken;
  } catch (error) {
    console.error('[Firebase] Error creating custom token:', error.message);
    throw error;
  }
}

export default admin;
