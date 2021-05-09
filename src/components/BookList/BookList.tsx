import './BookList.css';
import { FC, useState, useEffect } from 'react';
import Book from '../../models/Book';
import BookService from '../../services/db/bookService';
import AuthService from '../../services/authService';
import { AuthUser } from '../../models/User';

const BookList: FC<{ viewUserList: boolean }> = ({ viewUserList }): JSX.Element => {
	const [books, setBooks] = useState<Book[]>([]);

	useEffect(() => {
		fetchBooks();
	}, []);

	const fetchBooks = async () => {
		const result = await BookService.getBooks();
		setBooks(result);
	};

	const currentUser = AuthService.getLocalUser() as AuthUser;

	return (
		<div>
			{
				books
					.filter((book) => viewUserList ? book.author.uid === currentUser.uid : book)
					.map((filteredBook, idx) => <BookItem key={idx} book={filteredBook} />)

			}
		</div>
	);
};

const BookItem: FC<{ book: Book }> = ({ book }) => {
	return (
		<div className="book-item">
			<h5 className="card-title">{book.title}</h5>
			<p className="card-text">{book.author.uid}</p>
			<p className="card-text">{book.genre}</p>
			<p className="card-text">{book.premise}</p>
		</div>
	);
};

export default BookList;