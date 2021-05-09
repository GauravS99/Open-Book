/* eslint-disable semi */
import Book from './Book';
import User from './User';

export interface EditProposal {
    authorId: string;
    bookId: string;
    replace: string;
    with: string;
    previous_story: string;
    new_story: string;
}

export default interface Edit {
	author: User;
    book: Book;
    replace: string;
    with: string;
    previous_story: string;
    new_story: string;
}
