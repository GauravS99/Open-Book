import React, { useState, useEffect } from 'react';
import Book from '../../models/Book';
import BookService from '../../services/db/bookService';
import BookActionHeader, { BookHeaderAction } from './BookActionHeader';
import BookDocumentView from './BookDocumentView';
import {  useParams } from 'react-router-dom';
import BookEditList from './BookEditList';

interface PropTypes {

}

enum Tab {
	story,
	edits,
	contributions,
}

const useFetchBook = (bookId: string): Book | null => {
	const [book, setBook] = useState<Book | null>(null);

	const fetchBook = async () => {
		const book = await BookService.getBook(bookId);
		setBook(book);
	};

	useEffect(() => { fetchBook(); }, []);

	return book;
};

const BookComponent = (props: PropTypes): JSX.Element => {

	// @ts-ignore
	const { id } = useParams();
	const book: Book | null = useFetchBook(id);
	const [tab, setTab] = useState(Tab.story);

	const emphasis = 'fw-bold';
    
	console.log(tab);
	return (
		<div className="content bg-colour-2 colour-4 h-100 p-3 rounded">
			<div>
				<h6 className={`d-inline-block me-3 clickable ${tab === Tab.story ? emphasis : ''}`} onClick={() => setTab(Tab.story)}>
					Story
                </h6>
				<h6 className={`me-3 d-inline clickable ${tab === Tab.edits ? emphasis : ''}`} onClick={() => setTab(Tab.edits)}>
					Edits
                </h6>
				<h6 className={`me-3 d-inline clickable ${tab === Tab.contributions ? emphasis : ''}`} onClick={() => setTab(Tab.contributions)}>
					Contributions
                </h6>
            </div>
            <hr/>
            <div className="mt-3">
                <div className="bg-color-5">
                    {tab === Tab.story &&
                        <BookDocumentView book={book}/>
                    }
                </div>
                <div>
                    {tab === Tab.edits &&
                        <BookEditList book={book}/>
                    }
                </div>
            </div>
        </div>
    );
};

export default BookComponent;