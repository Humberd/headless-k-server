import * as admin from 'firebase-admin';

// todo: get key from env as a string
const serviceAccount = require('../../serviceAccountKey.json');

export function initFirebase() {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  console.log('Firebase initialized');
}
