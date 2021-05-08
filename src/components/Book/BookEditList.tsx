import React, { useState, useEffect } from 'react';
import Book from '../../models/Book';

interface PropTypes {
    book: Book | null;
}

const BookEdits = (props: PropTypes) : JSX.Element => {

    return (
        <div className="text-dark">
            <div id="diffOutput" className="bg-colour-5"></div>
        </div>
    );
};

export default BookEdits;