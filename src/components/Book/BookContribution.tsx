import './Book.css';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import difflib from '../../jsdifflib/difflib';
import diffview from '../../jsdifflib/diffview';
import '../../jsdifflib/diffview.css';
import Contribution from '../../models/Contribution';
import User from '../../models/User';
import ContributionService from '../../services/db/contributionService';
import UserService from '../../services/db/userService';
import BookActionHeader, { BookHeaderAction, BookHeaderState } from './BookActionHeader';
import { useHistory } from 'react-router-dom';

interface PropTypes {

}

const useFetchContribution = (contributionId: string) => {
	const [contribution, setContribution] = useState<Contribution | undefined>(undefined);
	const [user, setUser] = useState<User | undefined>(undefined);

	const fetchContribution = async () => {
		const contribution = await ContributionService.getContribution(contributionId) as Contribution;
		// @ts-ignore
		const user = await UserService.getUser(contribution.author.id as string);
		setContribution(contribution);
		setUser(user);
	};

	useEffect(() => { fetchContribution(); }, []);

	return { contribution, setContribution, author: user };
};

const voteThreshold = 2;

const BookContribution = (props: PropTypes): JSX.Element => {
	// @ts-ignore
	const { id } = useParams();
	const { contribution, setContribution, author } = useFetchContribution(id);
	const history = useHistory();

    const [dummy, setDummy] = useState<any>(undefined);

	if (!contribution || !author) {
		return <div></div>;
	}

	console.log(author);

	const applyContribution = async () => {
		await ContributionService.applyContribution(contribution);
		history.push(`/book/${contribution.book.id}`);
	};

	const incrementVote = async () => {
		await ContributionService.updateContribution(contribution.id, { votes: contribution.votes + 1 });
		contribution.votes += 1;
		setContribution(contribution);
	};

	const onHeaderAction = (action: BookHeaderAction) => {
		if (action === BookHeaderAction.Vote) {
			if (1 + contribution.votes >= voteThreshold) {
				// accept contribution
				applyContribution();
			}
			else {
                window.localStorage.setItem(`contribution-${contribution.id}`, 'true');
				incrementVote();
				contribution.votes += 1;
                setDummy(true);
			}
		}
	};

	let bookTextCopy = '';
	if(contribution.text.length !== 0){
		bookTextCopy = contribution.text.charAt(0);
		let prev_character = contribution.text.charAt(0);
		for(let i = 1; i < contribution.text.length; i++){
			const current_character = contribution.text.charAt(i);
			if(!(current_character === '\n' && prev_character === '\n')){
				bookTextCopy += current_character;
			}
			
			prev_character = current_character;
		}
	}

	return (
		<div className="content colour-4 h-100 rounded pb-3">
			<div className='px-3 pt-3'>
				<BookActionHeader state={BookHeaderState.ContributionView} onAction={onHeaderAction} params={{dummy, contributionId: contribution.id, contributionVotes: contribution.votes}}/>
			</div>
			<div>
				<div className='p-3 bg-colour-4 text-dark row mx-3 contribution-container'>
					<div className="col-3 rounded p-3 border border-dark">
						<h5>
                            Contributor
                        </h5>
						<hr />
						<h6>{author.username}</h6>
						<h6>{author.points} Points</h6>
					</div>
					<div className="col-9">
						<div>
							{bookTextCopy.split('\n').map((text, index) => <div key={index}>{text}</div>)}
						</div>
					</div>
				</div>
			</div>

		</div>
	);
};

export default BookContribution;