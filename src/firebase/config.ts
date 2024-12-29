import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getMessaging } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyDEDQMvWDRXCtEXCN1GbriqvilDMEwzshc",
  authDomain: "chronoscope-400ce.firebaseapp.com",
  projectId: "chronoscope-400ce",
  storageBucket: "chronoscope-400ce.firebasestorage.app",
  messagingSenderId: "698913140017",
  appId: "1:698913140017:web:639e00c3f98a4403671410",
  measurementId: "G-K18JGSKH0V"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const messaging = getMessaging(app);

export default app;