import './Home.css';
import BookList from '../../components/BookList/BookList';

const Home = (): JSX.Element => {
	return (
		<div className="h-100 overflow-hidden">
			<div className="btn-container">
				<button className="btn btn-primary">Create New Story</button>
				<button className="btn btn-primary">View Your Stories</button>
			</div>
			<BookList />
		</div>
	);
};

export default Home;