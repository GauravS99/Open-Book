import { ContributionProposal } from '../../models/Contribution';
import User from '../../models/User';
import { db } from '../firebaseConfig';


const collection = 'contributions';
export default class ContributionService {
    static mapper = (firebaseModel: any) => {
        return null;
    }

	static getContributions = async (bookId: string) => {
		const contributionsRef = await db.collection(collection).where('book.id', '==', bookId).get();
		contributionsRef.docs.forEach(doc => {
			console.log(doc.data());
		});
	};

	static getContribution = async (id: string) => {
		const contributionRef = await db.collection(collection).doc(id).get();
		const result = contributionRef.data() as User;
		return result;
	};

	static addContribution = async (contribution: ContributionProposal) : Promise<void> => {
		await db.collection(collection).add({
            author: db.doc('users/' + contribution.authorId),
            book: db.doc('books/' + contribution.bookId),
            text: contribution.text
        });
	}
}

