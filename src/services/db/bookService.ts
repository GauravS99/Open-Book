import Book, {BookProposal} from '../../models/Book';
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
}

export default BookService;
