import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');

console.log('[firebase] projectId:', projectId ? '✓' : '✗');
console.log('[firebase] clientEmail:', clientEmail ? '✓' : '✗');
console.log('[firebase] privateKey:', privateKey ? '✓' : '✗');

let db;

if (projectId && clientEmail && privateKey) {
  if (!getApps().length) {
    initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey,
      }),
    });
  }
  db = getFirestore();
  console.log('[firebase] ✓ Connected to Firestore');
} else {
  console.warn('[firebase] Missing Firebase admin environment variables; Firestore disabled.');
}

export function getDb() {
  if (!db) {
    throw new Error('Firestore is not configured. Set FIREBASE_* environment variables.');
  }
  return db;
}
