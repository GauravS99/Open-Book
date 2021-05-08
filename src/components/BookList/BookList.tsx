import './BookList.css';
import { FC } from 'react';
import Book, { Genre } from '../../models/Book';

const BookList = (): JSX.Element => {
	const books = [
		{
			title: 'Mistborn',
			author: 'Brandon Sanderson',
			genre: Genre.Fantasy
		}
	];

	return (
		<div className="d-flex justify-content-center booklist">
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