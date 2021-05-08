import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import Book from '../../models/Book';
import { AuthUser } from '../../models/User';
import AuthService from '../../services/authService';

import { BookHeaderState } from './Book';


interface PropTypes {
    state: BookHeaderState;
    params ?: {
        book ?: Book;
    };

    // react-router
    // history: any;
}

/*

export enum BookHeaderState {
    DocumentView, 
    EditView,
    ContributionView,
    None,
}

*/

// case state

const BookActionHeader = (props: PropTypes) : JSX.Element => {
    const {state } = props;

    const history = useHistory(); 

    const renderEditsToolbar = () => {
        return (
            <React.Fragment>
                <button className="btn btn-secondary me-2">Reject</button>
                <button className="btn btn-primary">Accept</button>
            </React.Fragment>
        );
    };

    const onClickBack = () => {
        history.goBack();
    };
    
    return (
        <div className="p-2 d-flex">
            <button className="btn btn-light" onClick={onClickBack}> Back </button>
            {state === BookHeaderState.EditView &&
                <div className="d-flex w-100 justify-content-end">
                    { renderEditsToolbar() }
                </div>
            }
        </div>
    );
};

export default BookActionHeader;