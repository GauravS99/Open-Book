import './Book.css';
import React, { useState, useEffect } from 'react';
import Book from '../../models/Book';
import Edit from '../../models/Edit';
import { AuthUser } from '../../models/User';
import AuthService from '../../services/authService';
import ContributionService from '../../services/db/contributionService';
import BookActionHeader, { BookHeaderAction, BookHeaderState } from './BookActionHeader';

interface PropTypes {
    book: Book;
}

const BookDocumentView = (props: PropTypes): JSX.Element => {
	const { book } = props;

	if (!book) {
		return <div></div>;
	}

	let bookTextCopy = '';
	if(book.text.length !== 0){
		bookTextCopy = book.text.charAt(0);
		let prev_character = book.text.charAt(0);
		for(let i = 1; i < book.text.length; i++){
			const current_character = book.text.charAt(i);
			if(!(current_character === '\n' && prev_character === '\n')){
				bookTextCopy += current_character;
			}
			
			prev_character = current_character;
		}
	}

	const bookTextEditable = book.text.slice();

	const [state, setState] = useState(BookHeaderState.DocumentView);
	const [editing, setEditing] = useState(false);

	const onSubmitEdit = async () => {
		const editableDiv = document.getElementById('editableBook');
		if (editableDiv) {
			const value = editableDiv.innerText as string;

			// awdfawd
			// awdfawdaw
			const addition = value.substring(bookTextCopy.length);

			// ASSUME all edits are contributions

			const currentUser = AuthService.getLocalUser() as AuthUser;

			console.log(bookTextCopy);
			console.log(value);
			console.log(addition);

			await ContributionService.addContribution({
				bookId: book.id as string,
				authorId: currentUser.uid,
				text: addition
			});

			setState(BookHeaderState.DocumentView);
			setEditing(false);

			// editableDiv.textContent = bookText;
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
					<div className="p-2 rounded">
						{
							book.text.split('\n').map((text, index) => <div key={index}>{text}</div>)
						}
					</div>
					:
					<div id="editableBook" className="border border-dark p-2 rounded" style={{minHeight: 40}} contentEditable="true">
						{
							bookTextEditable.split('\n').map((text, index) => <div key={index}>{text}</div>)
						}
					</div>
				}
			</div>
		</div>
	);
};

export default BookDocumentView;