import './Book.css';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
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
	params?: any;
	onAction: (action: BookHeaderAction) => void;

	// react-router
	// history: any;
}

export enum BookHeaderAction {
	Edit = 'Edit',
	Accept = 'Accept',
	Reject = 'Reject',
	Vote = 'Vote',
	Submit = 'Submit',
	Cancel = 'Cancel',
}

// case state

const BookActionHeader = (props: PropTypes): JSX.Element => {
	const { state, onAction, params} = props;
	const history = useHistory();

	const onClickBack = () => {
		history.goBack();
	};

	return (
		<div className="p-2 d-flex action-header">
			<button className="btn btn-light" onClick={onClickBack}> Back </button>
			<div className="d-flex w-100 justify-content-end">
				{
					state === BookHeaderState.DocumentView &&
					<>
						<button className="btn btn-primary" onClick={() => onAction(BookHeaderAction.Edit)}>Edit</button>
					</>
				}
				{
					state === BookHeaderState.DocumentEdit &&
					<>
						<button className="btn btn-secondary me-2" onClick={() => onAction(BookHeaderAction.Cancel)}>Cancel</button>
						<button className="btn btn-primary" onClick={() => onAction(BookHeaderAction.Submit)}>Submit</button>
					</>
				}
				{
					state === BookHeaderState.EditView &&
					<>
						<button className="btn btn-secondary me-2" onClick={() => onAction(BookHeaderAction.Reject)}> Reject </button>
						<button className="btn btn-primary" onClick={() => onAction(BookHeaderAction.Accept)}> Accept </button>
					</>
				}
                {
					state === BookHeaderState.ContributionView && (
                    !window.localStorage.getItem(`contribution-${params.contributionId}`) ?
					<>
						<button className="btn btn-primary" onClick={() => onAction(BookHeaderAction.Vote)}> Vote </button>
					</>
                    :
                    <>
						<button disabled className="btn btn-primary" onClick={() => onAction(BookHeaderAction.Vote)}> Voted </button>
					</>
                    )
				}
			</div>
		</div>
	);
};

export default BookActionHeader;