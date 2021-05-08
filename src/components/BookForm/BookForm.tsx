import './BookForm.css';
import { FC } from 'react';
import { Genre } from '../../models/Book';

const BookForm: FC<{ setModalFormOpen: React.Dispatch<React.SetStateAction<boolean>> }> = ({ setModalFormOpen }): JSX.Element => {
	return (
		<div className="p-3 colour-5 form-container">
			<div>
				<div className="text-center">
					<h4> Add a Story </h4>
				</div>
				<div className="form-group mt-4">
					<label>Title</label>
					<input className="form-control" id="newBookTitle" placeholder="What should your book be called?" />
				</div>
				<div className="form-group mt-4">
					<label> Genre </label>
					<select className="form-control" id="exampleFormControlSelect1">
						<option></option>
						{
							Object.values(Genre).map(
								(genre, idx) => <option key={idx}>{genre}</option>
							)
						}
					</select>
				</div>
				<div className="form-group mt-4">
					<label>Premise</label>
					<textarea className="form-control" id="newBookPremise" rows={3} placeholder="What is your book about?" />
					<small> Give a rough premise of the story so others know if they&apos;d like to contribute </small>
				</div>

				<div className="text-center mt-3">
					<button className="btn btn-secondary me-2" onClick={() => setModalFormOpen(false)}>
						Cancel
					</button>
					<button className="btn btn-primary d-inline-block">
						Create Book
					</button>
				</div>
			</div>
		</div>
	);
};

export default BookForm;