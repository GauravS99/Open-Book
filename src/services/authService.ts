import firebase from 'firebase';
import { auth } from './firebaseConfig';

export const signUpUser = async (email: string, password: string, username: string) => {
	await auth.createUserWithEmailAndPassword(email, password);
};

export const signInUser = async (email: string, password: string) => {
	await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
	const cred = await auth.signInWithEmailAndPassword(email, password);
};