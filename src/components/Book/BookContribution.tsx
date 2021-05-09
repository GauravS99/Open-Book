import React, { useState, useEffect } from 'react';
import {useParams } from 'react-router-dom';
import difflib from '../../jsdifflib/difflib';
import diffview from '../../jsdifflib/diffview';
import '../../jsdifflib/diffview.css';
import Contribution from '../../models/Contribution';
import User from '../../models/User';
import ContributionService from '../../services/db/contributionService';
import UserService from '../../services/db/userService';
import BookActionHeader, { BookHeaderAction, BookHeaderState } from './BookActionHeader';
import {useHistory} from 'react-router-dom';

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

const BookContribution = (props: PropTypes) : JSX.Element => {
    // @ts-ignore
	const { id } = useParams();
    const { contribution, setContribution, author } = useFetchContribution(id);
    const history = useHistory(); 

    if(!contribution || !author){
        return <div></div>;
    }

    console.log(author);

    const applyContribution = async () => {
        await ContributionService.applyContribution(contribution);
        history.push(`/book/${contribution.book.id}`);
    };

    const incrementVote = async () => {
        await ContributionService.updateContribution(contribution.id, {votes: contribution.votes + 1});
        contribution.votes += 1;
        setContribution(contribution);
    };

	const onHeaderAction = (action: BookHeaderAction) => {
        if(action === BookHeaderAction.Vote){
            if(1 + contribution.votes >= voteThreshold){
                // accept contribution
                applyContribution();
            }
            else{
                incrementVote();
            }
        }
    };

    return (
        <div className="content bg-colour-2 colour-4 h-100 rounded pb-3">
            <div className='px-3 pt-3'>
                <BookActionHeader state={BookHeaderState.ContributionView} onAction={onHeaderAction} />
            </div>
            <div>
                <div className='p-3 bg-colour-4 text-dark mt-4 row mx-3'>
                    <div className="col-3 rounded p-3 border border-dark">
                        <h5>
                            Contributer
                        </h5>
                        <hr />
                        <h6>{author.username}</h6>
                        <h6>{author.points} Points</h6>
                    </div>
                    <div className="col-9">
                        <div>
                            {contribution.text}
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default BookContribution;