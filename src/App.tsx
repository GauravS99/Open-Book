import './App.css';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link
} from 'react-router-dom';

import { getUsers } from './services/db/userService';
import { useEffect } from 'react';

import { AuthType } from './models/User';

import Home from './pages/Home/Home';
import UserForm from './pages/UserForm/UserForm';
import Book from './components/Book/Book';

const App = (): JSX.Element => {
	// Add appropriate DB calls when ready
	useEffect(() => {
		getUsers();
	});

	const user = {
		name: 'Test',
		points: 10
	};

	return (
		<Router>
			<div>
				<div className="h-100">
					<div className="header py-2 px-3 text-navbar">
						<span>Open Book</span>
						<div>
							<button>
								<Link to="/signup">
									Sign Up
								</Link>
							</button>
							<button>
								<Link to="/signin">
									Sign In
								</Link>
							</button>
							<span className="user-info">{user.name}</span>
							<span className="user-info">{user.points}</span>
						</div>
					</div>
				</div>

				<div className="h-100">
					<div className="content">
						<Switch>
							<Route exact path="/">
								<Home />
							</Route>
							<Route path="/book/:id">
								<Book />
							</Route>
							<Route path="/signup">
								<UserForm authType={AuthType.SignUp} />
							</Route>
							<Route path="/signin">
								<UserForm authType={AuthType.SignIn} />
							</Route>
						</Switch>
					</div>
				</div >
			</div>
		</Router>
	);
};


export default App;