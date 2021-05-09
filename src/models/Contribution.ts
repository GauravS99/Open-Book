/* eslint-disable semi */
import Book from './Book';
import User from './User';

export interface ContributionProposal {
    authorId: string;
    bookId: string;
    text: string;
}

export default interface Contribution {
    id: string;
	author: User;
    book: Book;
    text: string;
}


