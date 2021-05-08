import firebase from 'firebase';

firebase.initializeApp({
	apiKey: 'AIzaSyCF8hOcby9Kmh-XyRF0C627KFYV4JHnLAk',
	authDomain: 'open-book-7d39d.firebaseapp.com',
	projectId: 'open-book-7d39d',
	storageBucket: 'open-book-7d39d.appspot.com',
	messagingSenderId: '236458745825',
	appId: '1:236458745825:web:fc1963459a8190a55c7ca0',
	measurementId: 'G-XM8K270SR9'
});
export const db = firebase.firestore();
export const auth = firebase.auth();