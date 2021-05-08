import Book from '../../models/Book';
import { db } from '../firebaseConfig';

class BookService {
	static getBooks = async (): Promise<Book[]> => {
		const booksRef = await db.collection('books').get();
		const result = booksRef.docs.map(book => book.data() as Book);
		return result;
	};

	static getBook = async (bookId: string): Promise<Book> => {
		const bookRef = await db.collection('books').doc(bookId).get();
		const result = bookRef.data() as Book;
		return result;
	};

	static addBook = async (book: Book) => {
		await db.collection('books').add(book);
	}
}

export default BookService;
