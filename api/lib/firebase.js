import admin from 'firebase-admin';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let initialized = false;

export async function initializeFirebase() {
  if (admin.apps.length > 0) {
    console.log('[Firebase] Already initialized');
    return admin;
  }

  try {
    // Try to load serviceAccountKey.json from project root
    const keyPath = path.join(__dirname, '../../serviceAccountKey.json');
    
    if (!fs.existsSync(keyPath)) {
      console.warn('[Firebase] serviceAccountKey.json not found at', keyPath);
      console.warn('[Firebase] Using environment variables for Firebase Admin SDK');
      
      // Fallback to environment variables
      const serviceAccount = {
        type: process.env.FIREBASE_TYPE,
        project_id: process.env.FIREBASE_PROJECT_ID,
        private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
        private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        client_email: process.env.FIREBASE_CLIENT_EMAIL,
        client_id: process.env.FIREBASE_CLIENT_ID,
        auth_uri: process.env.FIREBASE_AUTH_URI,
        token_uri: process.env.FIREBASE_TOKEN_URI,
        auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
        client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
      };

      if (!serviceAccount.project_id) {
        throw new Error('Firebase credentials not found. Please set environment variables or add serviceAccountKey.json');
      }

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    } else {
      const serviceAccount = JSON.parse(fs.readFileSync(keyPath, 'utf8'));
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
      console.log('[Firebase] Initialized with serviceAccountKey.json');
    }

    initialized = true;
    return admin;
  } catch (error) {
    console.error('[Firebase] Initialization error:', error.message);
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
