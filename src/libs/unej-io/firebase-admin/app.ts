// import { credential } from "firebase-admin";
// import { initializeApp } from "firebase-admin/app";
// import type { App, AppOptions } from "firebase-admin/app";

// import { getAuth } from "firebase-admin/auth";

// declare global {
//   var FIREBASE_ADMIN_APP: App;
// }

// const options: AppOptions = {
//   credential: credential.cert({
//     clientEmail: "firebase-adminsdk-nnkfn@unej-io.iam.gserviceaccount.com",
//     privateKey:
//       "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCgaoZMlOOZdX8z\n4Ld1o58V/u1FN5B8lNFlJXjXAsXgaYnXV1XYLF5b30jfyDCj4mNkQbs+qy0Rg95g\n9ZMkzfDTFBW28Yv38KaQnoY5STZlVxvQc4+j2RHD9mgmDc6NZdQdvEQhfXT/r2Jh\n15sYgsZO53SDnw0JAUwd49DpczU9AGgWs0NKQwTwzeW8qRah/W8EN8KSD7WwXNs+\n9m+tOjnoN2H7oeWfIQq35aYbtPN+9tcdrQZ3q+ABwGyjUEx7DK0TqVAURiqGTop0\nsmoNaJ+c99XvMpVdN+BmE8JCNo329QvRsljdCGe3wWf7oUTSoK2aLnDbSRVS8LTd\nnb3WDWc1AgMBAAECggEAAy8SEs+Ks+dH2sr9QS258NkSMwM/ECXxAQGtJBFXRZS6\nqmY+my+IQOkN3Hkv8/TAlcMTORNzLcuQ/JorLToUK1BU/QBOz6E8YRbwYY8xL/I6\naFj+0xjyGBJaL1UrUhWhD+UGcia4DYIY4QnDN4mS74p6/sjHnLPko5w7r4J8nkUN\nc2GvagDCuXUHWe+0dW9SCLuSw80vCkStSQeZBqYuHuDsKqJt8FU7E5bmLnuP6JR0\nBaT5ePnLWecJDgC7EbGRha9AVZziuSaWh9DNYFZUIRS+VJVyoN0RxfqVGvNhdT0+\nm0CVB8jWHm98r+5BDZO6OSG1Xx/WCy0I5YVOCP+RMQKBgQDi1riQv34DpIqM5MqN\nToMwg5Gki5G6s6b4xQfOvI4F2EbYaX+9WwuHzv9UkmgqzFyxudu0D5kzRNU6dcjl\ncRWni30FZWdt++sVB3YFQYXjqhmp0pSPFPJ0N7/z4Uq/2ztVZSi1RpqgRNwIuH6p\nlUh+szCyF/fkt2xkBhc9b/+wZQKBgQC1CdR1TBm8a8CBo45bcSQMNQ2Kio+5dYJC\nxh7WB7VAshonWgYY9inM8g5dd3DSUDl+FSTLmg8qjxWd7G1cOrKJ4r/+WQSOYa+j\nNDGt1aL5eC6iuTkRljfQ1uxRJuoNQrP8fSGFNO+YEAcNNXftMd/TBR3TETZ9NpZb\n2jEf2mWmkQKBgQCjkwkWwC/DurR6c0Wo7lPl+QpeaJLW2lPukk5WA1w61MIJrtIB\nnxTKgzdWKhlZu3KgapEG4DSuZtWISYVsBscBwbGO4ZfbFM1ppa6yjZRaHsBQ2Nxt\n7UIFEmqmF/EKNrIrmz3mspowNlehJkGYUmErlFXqJySIVsifvFCn6gqsjQKBgGi0\nlryAlyHy8BQKlHsupLqqtHo8SYPqAry7+XmwW5RfbeD0oDIvrV1rYgOM4SPCYn4Z\nnH5lTABBYS9FXrrI+Bnnm0NwGMKAnSS3O0RfGzNN3yseFXOmfgG7TFJjP1sMCS0u\n8gQo6an5Gxr4obP99IYHn4hDnFAvEidtupvBpKkBAoGAWmj5pvWOD/VDWwNCRiqE\nGpa3TCCPboXxYQqm0WskphUxgduogEaQyDYYwkpi5InPP/N7mqTuEUSqp2o7lJCG\nb4k+wPcZezT0jPNhCTm4Lqm+qGxnQiZxG0N+FlAuxEIOHZYA32/y2z1vA8XE49dL\nmBT22n0rFc2iId+THA7vTnM=\n-----END PRIVATE KEY-----\n",
//     projectId: "unej-io",
//   }),
//   serviceAccountId: "firebase-adminsdk-nnkfn@unej-io.iam.gserviceaccount.com",
//   storageBucket: "unej-io.appspot.com",
// };

// if (!globalThis.FIREBASE_ADMIN_APP) globalThis.FIREBASE_ADMIN_APP = initializeApp(options);

// const app = globalThis.FIREBASE_ADMIN_APP;

// const auth = getAuth(app);

// function verifyIdToken(idToken: string, checkRevoked?: boolean) {
//   return auth.verifyIdToken(idToken, checkRevoked);
// }

// export { auth };
// export { verifyIdToken };
export {};
