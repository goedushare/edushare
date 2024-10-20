import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; 

const firebaseConfig = {
    apiKey: "AIzaSyBss8RmUIP4JVgOITluQGVWERrJNWZ93RA",
    authDomain: "auth-cb825.firebaseapp.com",
    projectId: "auth-cb825",
    storageBucket: "auth-cb825.appspot.com",
    messagingSenderId: "327995760700",
    appId: "1:327995760700:web:ad0df33db3f87f9723e339"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
