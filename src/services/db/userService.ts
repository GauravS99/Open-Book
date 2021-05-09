import User from '../../models/User';
import { db } from '../firebaseConfig';


export default class UserService {
	static getUsers = async () => {
		const usersRef = await db.collection('users').get();
		usersRef.docs.forEach(doc => {
			console.log(doc.data());
		});
	};

	static getUser = async (uid: string) => {
		const userRef = await db.collection('users').doc(uid).get();
		const result = userRef.data() as any;
		result.uid = uid;
		return result;
	};

	static addUser = async (id: string, user: User) : Promise<void> => {
		await db.collection('users').doc(id).set(user);
	}
}

