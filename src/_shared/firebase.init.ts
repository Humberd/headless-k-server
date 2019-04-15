import * as admin from 'firebase-admin';

export function initFirebase() {
  const keyString = process.env.SERVICE_ACCOUNT_KEY;
  if (!keyString) {
    throw Error('SERVICE_ACCOUNT_KEY has not been set');
  }

  let serviceAccountKeyObject: object;
  try {
    serviceAccountKeyObject = JSON.parse(keyString);
  } catch (e) {
    console.error('There was a problem parsing SERVICE_ACCOUNT_KEY env variable');
    throw e;
  }
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKeyObject),
  });

  console.log('Firebase initialized');
}
