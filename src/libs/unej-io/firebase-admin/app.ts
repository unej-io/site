import { credential } from "firebase-admin";
import { initializeApp } from "firebase-admin/app";
import type { App, AppOptions } from "firebase-admin/app";

declare global {
  var FIREBASE_ADMIN_APP: App;
}

const options: AppOptions = {
  credential: credential.cert({
    clientEmail: process.env.FIREBASE_ADMIN_CREDENTIAL_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_ADMIN_CREDENTIAL_PRIVATE_KEY,
    projectId: process.env.FIREBASE_ADMIN_CREDENTIAL_PROJECT_ID,
  }),
  serviceAccountId: process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_ID,
  storageBucket: process.env.FIREBASE_ADMIN_STORAGE_BUCKET,
};

if (!globalThis.FIREBASE_ADMIN_APP) globalThis.FIREBASE_ADMIN_APP = initializeApp(options);

const app = globalThis.FIREBASE_ADMIN_APP;

export default app;
