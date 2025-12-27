import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

console.log('[firebase] projectId:', projectId ? '✓' : '✗');
console.log('[firebase] clientEmail:', clientEmail ? '✓' : '✗');
console.log('[firebase] privateKey length:', privateKey?.length || '✗');
console.log('[firebase] privateKey starts with:', privateKey?.substring(0, 30));

let db;

if (projectId && clientEmail && privateKey) {
  try {
    if (!getApps().length) {
      const credential = cert({
        projectId,
        clientEmail,
        privateKey,
      });
      console.log('[firebase] Credential created successfully');
      
      initializeApp({
        credential,
      });
      console.log('[firebase] App initialized successfully');
    }
    db = getFirestore();
    console.log('[firebase] ✓ Connected to Firestore');
  } catch (err) {
    console.error('[firebase] Failed to initialize:', err.message);
    console.error('[firebase] Stack:', err.stack);
  }
} else {
  console.warn('[firebase] Missing Firebase admin environment variables; Firestore disabled.');
}

export function getDb() {
  if (!db) {
    throw new Error('Firestore is not configured. Set FIREBASE_* environment variables.');
  }
  return db;
}

