import Book from '../../models/Book';
import { db } from '../firebaseConfig';

class BookService {
	// returns undefined if not found
	static getBook = async (bookId: string): Promise<Book> => {
		const booksRef = await db.collection('books').doc(bookId).get();
		const result = booksRef.data() as Book;
		return result;
	};
}

export default BookService;
