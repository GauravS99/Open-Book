import Edit from '../../models/Edit';
import { db } from '../firebaseConfig';

class EditService {
	// returns undefined if not found
	static getEdit = async (editId: string): Promise<Edit> => {
		const editRef = await db.collection('edits').doc(editId).get();
		const result = editRef.data() as Edit;
		return result;
	};
}

export default EditService;
