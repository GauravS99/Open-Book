import Book, {BookProposal} from '../../models/Book';
import Contribution from '../../models/Contribution';
import { db } from '../firebaseConfig';

class BookService {
	// returns undefined if not found
	static getBooks = async (): Promise<Book[]> => {
		const booksRef = await db.collection('books').get();
		const result = booksRef.docs.map(book => {
			const data = book.data() as any;
			data.id = book.id;
			return data;
		});

		if(result){
			const promises = [];
			for(let i = 0; i < result.length; i++){
				const book = result[i];
				promises.push(db.collection('users').doc(book.author.id).get());
			}

			await Promise.all(promises);

			for(let i = 0; i < result.length; i++){
				const book = result[i];
				const author = (await promises[i]).data();
				// @ts-ignore
				book.author.username = author.username;
			}
		}
	
		return result;
	};

	static getBook = async (bookId: string): Promise<Book> => {
		const bookRef = await db.collection('books').doc(bookId).get();
		const result = bookRef.data() as Book;
		result.id = bookId;
		return result;
	};

	static addBook = async (book: BookProposal) => {
		await db.collection('books').add({
			title: book.title,
			author: db.doc('users/' + book.authorId),
			genre: book.genre,
			premise: book.premise,
			text: book.text,
		});
	}

	static updateBook = async (bookId: string, update: any) => {
		return await db.collection('books').doc(bookId).update(update);
	}
}

export default BookService;
