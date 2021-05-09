import './Book.css';
import React, { useState, useEffect } from 'react';
import Book from '../../models/Book';
import Edit from '../../models/Edit';
import { AuthUser } from '../../models/User';
import AuthService from '../../services/authService';
import ContributionService from '../../services/db/contributionService';
import BookActionHeader, { BookHeaderAction, BookHeaderState } from './BookActionHeader';

interface PropTypes {
	book: Book | null;
}

const BookDocumentView = (props: PropTypes): JSX.Element => {
	const { book } = props;

	if (!book) {
		return <div></div>;
	}

	const bookText = book.text;

	const [state, setState] = useState(BookHeaderState.DocumentView);
	const [editing, setEditing] = useState(false);
	const [text, setText] = useState(bookText);

	const onSubmitEdit = async () => {
		const editableDiv = document.getElementById('editableBook');
		if (editableDiv) {
			const value = editableDiv.textContent as string;

			// awdfawd
			// awdfawdaw
			const addition = value.substring(bookText.length);

			// ASSUME all edits are contributions

			const currentUser = AuthService.getLocalUser() as AuthUser;

			await ContributionService.addContribution({
				bookId: book.id as string,
				authorId: currentUser.uid,
				text: addition
			});

			setState(BookHeaderState.DocumentView);
			setEditing(false);

			editableDiv.textContent = bookText;
			// TODO Thivagar we need to create a EditProposal object and send it to a 
			// the EditService to submit the edit request to DB it should have the
			// ids of the current user and book, and in EditService we need to add these
			// as document references

			// const edit: Edit = {
			//     author: {

			//     };
			//     book: Book;
			//     replace: string;
			//     with: string;
			//     previous_story: string;
			//     new_story: string;
			// };
		}
	};

	const onHeaderAction = (action: BookHeaderAction) => {
		if (action === BookHeaderAction.Edit) {
			setState(BookHeaderState.DocumentEdit);
			setEditing(true);
		}
		else if (action === BookHeaderAction.Cancel) {
			setState(BookHeaderState.DocumentView);
			setEditing(false);
		}
		else if (action === BookHeaderAction.Submit) {
			onSubmitEdit();
		}
	};

	return (
		<div>
			<BookActionHeader
				state={state}
				onAction={onHeaderAction}
			/>
			<div className='doc-container p-3 text-dark'>
				<div className="text-center mb-4">
					<h4>{book.title}</h4>
				</div>
				{!editing ?
					<div className="p-2 rounded">{bookText}</div>
					:
					<div id="editableBook" className="border border-dark p-2 rounded" contentEditable="true">
						{text}
					</div>
				}
			</div>
		</div>
	);
};

export default BookDocumentView;