import './BookList.css';
import { FC, useState, useEffect } from 'react';
import Book from '../../models/Book';
import BookService from '../../services/db/bookService';

const BookList: FC<{ viewUserList: boolean }> = ({ viewUserList }): JSX.Element => {
	const [books, setBooks] = useState<Book[]>([]);

	// Change this to actual user
	const currentUser = 'Current User';

	useEffect(() => {
		fetchBooks();
	});

	const fetchBooks = async () => {
		const result = await BookService.getBooks();
		setBooks(result);
	};

	return (
		<div>
			{
				books
					.filter((book) => viewUserList ? book.author === currentUser : book)
					.map((filteredBook, idx) => <BookItem key={idx} book={filteredBook} />)

			}
		</div>
	);
};

const BookItem: FC<{ book: Book }> = ({ book }) => {
	return (
		<div className="book-item">
			<h5 className="card-title">{book.title}</h5>
			<p className="card-text">{book.author}</p>
			<p className="card-text">{book.genre}</p>
		</div>
	);
};

export default BookList;