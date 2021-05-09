import firebase from 'firebase';

firebase.initializeApp({
    apiKey: 'AIzaSyBzQ3_zWWIJD0dVHOas93iYbhA-ZyUkrts',
    authDomain: 'open-book-tohacks.firebaseapp.com',
    projectId: 'open-book-tohacks',
    storageBucket: 'open-book-tohacks.appspot.com',
    messagingSenderId: '792349453818',
    appId: '1:792349453818:web:f0080a51357aee80154843'
});

export const db = firebase.firestore();
export const auth = firebase.auth();