import { db } from '../firebaseConfig';

export const getUsers = async () => {
	const usersRef = await db.collection('users').get();
	usersRef.docs.forEach(doc => {
		console.log(doc.data());
	});
};
