import User from './User';

interface Book {
	id: string;
	title: string;
	author: User;
	genre: Genre;
	premise: string;
	text: string;
}

export interface BookProposal {
	title: string;
	authorId: string;
	genre: Genre;
	premise: string;
	text: string;
}

export enum Genre {
	Fantasy = 'Fantasy',
	Mystery = 'Mystery',
	SciFi = 'Sci-Fi'
}

export default Book;