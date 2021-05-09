import React, { useState, useEffect } from 'react';
import Book from '../../models/Book';
import Contribution from '../../models/Contribution';
import ContributionService from '../../services/db/contributionService';
import { Link } from 'react-router-dom';

interface PropTypes {
    book: Book;
}

const useFetchContributions = (bookId: string): Contribution[] | undefined => {
	const [contributions, setContributions] = useState<Contribution[] | undefined>(undefined);

	const fetchContribution = async () => {
		const contributions = await ContributionService.getContributions(bookId);
		setContributions(contributions);
	};

	useEffect(() => { fetchContribution(); }, []);

	return contributions;
};

const BookContributionsList = (props: PropTypes) : JSX.Element => {
    const {book} = props;
    const contributions = useFetchContributions(book.id);
   
    if(!contributions){
        return <div></div>;
    }

    return (
        <div className="text-dark ">
            {
                contributions.map((contribution, i) => {
                    return (
                        <Link key={`contribution_${i}`} to={`/contribution/${contribution.id}`}>
                            <div className="rounded bg-colour-4 colour-1 my-4 p-3 clickable">
                                {contribution.text}
                            </div>
                        </Link>  
                    );
                })
            }
        </div>
    );
};

export default BookContributionsList;