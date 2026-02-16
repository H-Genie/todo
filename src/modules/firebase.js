import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Vite는 VITE_ 접두사가 있는 환경 변수만 노출합니다. .env에 VITE_* 로 설정해주세요.
const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    databaseURL: import.meta.env.VITE_DATABASE_URL,
    projectId: import.meta.env.VITE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_APP_ID,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID
};

if (!firebaseConfig.apiKey || firebaseConfig.apiKey === 'undefined') {
    console.error(
        '[Firebase] VITE_API_KEY가 없습니다. .env 파일에 REACT_APP_ 대신 VITE_ 접두사로 설정했는지 확인하세요.\n' +
        '예: VITE_API_KEY=your-api-key'
    );
}

firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;
export const db = firebase.firestore();
export const auth = firebase.auth();