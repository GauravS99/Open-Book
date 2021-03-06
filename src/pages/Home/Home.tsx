import './Home.css';
import { useState } from 'react';
import Modal from 'react-modal';
import BookList from '../../components/BookList/BookList';
import BookForm from '../../components/BookForm/BookForm';

const Home = (): JSX.Element => {
	const [formModalOpen, setFormModalOpen] = useState(false);
	const [viewUserList, setViewUserList] = useState(false);

	return (
		<div className="h-100 overflow-hidden">
			<div className="btn-container">
				<button className="btn btn-primary" onClick={() => setFormModalOpen(true)}>Create New Story</button>
				<button className="btn btn-primary" onClick={() => setViewUserList(!viewUserList)}>
					{viewUserList ? 'View All Stories' : 'View Your Stories'}
				</button>
			</div>
			<BookList viewUserList={viewUserList} />
			<Modal
				className="form-modal"
				isOpen={formModalOpen}
				shouldCloseOnOverlayClick={true}
				shouldCloseOnEsc={true}
				onRequestClose={() => setFormModalOpen(false)}
				shouldFocusAfterRender={true}
				shouldReturnFocusAfterClose={true}
				ariaHideApp={false}
				style={{ overlay: { background: 'rgba(0,0,0,0.5)' } }}
			>
				<BookForm setModalFormOpen={setFormModalOpen} />
			</Modal>

		</div>
	);
};

export default Home;