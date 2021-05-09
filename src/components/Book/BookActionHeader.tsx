import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import Book from '../../models/Book';
import { AuthUser } from '../../models/User';
import AuthService from '../../services/authService';

export enum BookHeaderState {
    DocumentView, 
	DocumentEdit,
    EditView,
    ContributionView,
    None,
}


interface PropTypes {
    state: BookHeaderState;
    params ?: {
        book ?: Book;
    };
    onAction : (action: BookHeaderAction) => void;

    // react-router
    // history: any;
}


export enum BookHeaderAction {
    Edit = 'Edit', 
    Accept = 'Accept',
    Reject = 'Reject',
    Vote = 'Vote',
    Submit = 'Submit',
    Cancel = 'Cancel' ,
}

// case state

const BookActionHeader = (props: PropTypes) : JSX.Element => {
    const {state, onAction} = props;

    const history = useHistory(); 

    const onClickBack = () => {
        history.goBack();
    };
    
    return (
        <div className="p-2 d-flex">
            <button className="btn btn-light" onClick={onClickBack}> Back </button>
            <div className="d-flex w-100 justify-content-end">
                {
                    state === BookHeaderState.DocumentView &&
                    <React.Fragment>
                        <button className="btn btn-primary" onClick={() => onAction(BookHeaderAction.Edit)}>Edit</button>
                    </React.Fragment>
                }
                {
                    state === BookHeaderState.DocumentEdit &&
                    <React.Fragment>
                        <button className="btn btn-secondary me-2" onClick={() => onAction(BookHeaderAction.Cancel)}>Cancel</button>
                        <button className="btn btn-primary" onClick={() => onAction(BookHeaderAction.Submit)}>Submit</button>
                    </React.Fragment>
                }
                {
                    state === BookHeaderState.EditView &&
                    <React.Fragment>
                        <button className="btn btn-secondary me-2" onClick={() => onAction(BookHeaderAction.Reject)}> Reject </button>
                        <button className="btn btn-primary" onClick={() => onAction(BookHeaderAction.Accept)}> Accept </button>
                    </React.Fragment>
                }
            </div>
        </div>
    );
};

export default BookActionHeader;