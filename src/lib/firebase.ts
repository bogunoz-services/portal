import {initializeApp} from "firebase/app";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    FacebookAuthProvider,
    OAuthProvider,
} from "firebase/auth";
//
// const app = initializeApp({
//     apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
//     authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
//     projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
//     appId: import.meta.env.VITE_FIREBASE_APP_ID,
// });
//
// export const auth = getAuth(app);
//
const providers = {
    google: new GoogleAuthProvider(),
    apple: new OAuthProvider("apple.com"),
    facebook: new FacebookAuthProvider(),
};
//
export type ProviderName = keyof typeof providers;
//
// export const signInWith = (name: ProviderName) => signInWithPopup(auth, providers[name]);