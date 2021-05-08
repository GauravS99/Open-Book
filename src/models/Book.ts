interface Book {
	title: string;
	author: string;
	genre: Genre;
}

export enum Genre {
	Fantasy = 'Fantasy',
	Mystery = 'Mystery',
	SciFi = 'Sci-Fi'
}

export default Book;