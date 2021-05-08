import './BookList.css';
import { FC, useState, useEffect } from 'react';
import Book from '../../models/Book';
import BookService from '../../services/db/bookService';

const BookList = (): JSX.Element => {
	const [books, setBooks] = useState<Book[]>([]);

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
				books.map((book, idx) => <BookItem key={idx} book={book} />)
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