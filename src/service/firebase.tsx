// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GithubAuthProvider, signOut } from "firebase/auth";
import CryptoJS from 'crypto-js';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const GithubProvider = new GithubAuthProvider();

const signInWithGithub = async () => {
    GithubProvider.addScope('read:user');
    GithubProvider.addScope('repo');
    GithubProvider.addScope('workflow');

    try {
        const result = await signInWithPopup(auth, GithubProvider);
        const credential = GithubAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken ?? '';

        // Mã hoá với Key là UID
        const encryptedToken = CryptoJS.AES.encrypt(token, result.user.uid).toString();

        localStorage.setItem('encryptedGithubAccessToken', encryptedToken);

    } catch (error) {
        console.error('SignIn Error', error);
    }
}

const handleLogout = async () => {
    try {
        await signOut(auth);
        window.location.reload();
    } catch (err) {
        console.error(err);
    }
}
export { auth, signInWithGithub, signOut, handleLogout }