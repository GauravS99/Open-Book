import Book from '../../models/Book';
import Contribution, { ContributionProposal } from '../../models/Contribution';
import User from '../../models/User';
import { db } from '../firebaseConfig';
import BookService from './bookService';


const collection = 'contributions';
export default class ContributionService {
    static mapper = (firebaseModel: any) => {
        return null;
    }

	static getContributions = async (bookId: string) => {
		const bookRef = db.collection('books')
			.doc(bookId);

		const contributionsRef = await db.collection(collection).where('book', '==', bookRef).get();
		const result = contributionsRef.docs.map(contribution => {
			const data = contribution.data() as Contribution;
			data.id = contribution.id;
			return data;
		});

		return result;
	};

	static getContribution = async (id: string) => {
		const contributionRef = await db.collection(collection).doc(id).get();
		const result = contributionRef.data() as Contribution;
		result.id = id;
		return result;
	};

	static addContribution = async (contribution: ContributionProposal) : Promise<void> => {
		await db.collection(collection).add({
            author: db.doc('users/' + contribution.authorId),
            book: db.doc('books/' + contribution.bookId),
            text: contribution.text,
			votes: 0
        });
	}

	static updateContribution = async (id: string, update: any) => {
		const result = await db.collection(collection).doc(id).update(update);
	}

	static applyContribution = async (contribution: Contribution) => {
		const book = await BookService.getBook(contribution.book.id) as Book;
		let text = book.text;
		text += contribution.text;
		await BookService.updateBook(book.id, {text});

		const bookRef = db.collection('books')
			.doc(book.id);
		const contributionsRef = await db.collection(collection).where('book', '==', bookRef).get();
		contributionsRef.forEach((doc) => doc.ref.delete());
	}
}

