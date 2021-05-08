import Book from './Book';
import User from './User';

export interface Edit {
	author: User;
	book: Book;
	replace: string;
	with: string;
	previous_story: string;
	new_story: string;
}
