import firebase from 'firebase';
import { useEffect, useState } from 'react';
import User, { AuthUser } from '../models/User';
import UserService from './db/userService';
import { auth } from './firebaseConfig';

export const signUpUser = async (email: string, password: string, username: string) => {

	const cred = await auth.createUserWithEmailAndPassword(email, password);

	if (cred.user != null) {
		await UserService.addUser(cred.user.uid, {
			points: 0,
			username
		});
	}

	console.log('user credentials', cred);

	return cred;
};

export const signInUser = async (email: string, password: string) => {
	await auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
	const cred = await auth.signInWithEmailAndPassword(email, password);
	console.log('user credentials', cred.user);

	return cred;
};

export const signOutUser = async () => {
	await auth.signOut();
	window.localStorage.clear();
};

const userKey = 'openbookuser';

export default class AuthService {
	static getLocalUser = (): AuthUser | undefined => {
		const value = window.localStorage.getItem(userKey);
		if (value) {
			return JSON.parse(value);
		}

		return undefined;
	}

	static setLocalUser = (user: AuthUser | undefined) => {
		window.localStorage.setItem(userKey, JSON.stringify(user));
	}

	static removeLocalUser = () => {
		window.localStorage.removeItem(userKey);
	}
}

export const useFetchUser = () => {
	const [user, setUser] = useState<AuthUser | undefined>(undefined);

	useEffect(() => {
		auth.onAuthStateChanged(async (firebaseUser) => {
			console.log('onAuthStateChanged', firebaseUser);
			let authUser: AuthUser | undefined;
			if (firebaseUser) {
				const dbUser = await UserService.getUser(firebaseUser.uid);
				authUser = {
					uid: firebaseUser.uid,
					// @ts-ignore
					email: firebaseUser.email,
					dbUser,
				};

				AuthService.setLocalUser(authUser);
				setUser(authUser);
			}
			else{
				AuthService.removeLocalUser();
				setUser(undefined);
			}
		});
	}, []);

	return user;
};