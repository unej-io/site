declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly FIREBASE_ADMIN_CREDENTIAL_CLIENT_EMAIL: string;
      readonly FIREBASE_ADMIN_CREDENTIAL_PRIVATE_KEY: string;
      readonly FIREBASE_ADMIN_CREDENTIAL_PROJECT_ID: string;
      readonly FIREBASE_ADMIN_SERVICE_ACCOUNT_ID: string;
      readonly FIREBASE_ADMIN_STORAGE_BUCKET: string;

      readonly NEXT_PUBLIC_STATUS?: "BETA" | (string & {});

      readonly NEXT_PUBLIC_FIREBASE_API_KEY: string;
      readonly NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: string;
      readonly NEXT_PUBLIC_FIREBASE_PROJECT_ID: string;
      readonly NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: string;
      readonly NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: string;
      readonly NEXT_PUBLIC_FIREBASE_APP_ID: string;

      readonly NEXT_PUBLIC_SITE_HOST: string;
      readonly NEXT_PUBLIC_APP_HOST: string;
    }
  }
}

export {};
