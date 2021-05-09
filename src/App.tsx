import './App.css';
import {
	Router,
	Switch,
	Route,
	Link
} from 'react-router-dom';
import Book from './components/Book/Book';
import UserForm from './components/UserForm/UserForm';
import { AuthType, AuthUser } from './models/User';

import { useEffect } from 'react';
import Home from './pages/Home/Home';
import BookEdit from './components/Book/BookEdit';

import { createBrowserHistory } from 'history';
import AuthService, { useFetchUser } from './services/authService';

import bookImg from './assets/open-book.png';

const history = createBrowserHistory();

const App = (): JSX.Element => {
	const user = useFetchUser();
	console.log(user);

	return (
		<Router history={history}>
			<div>
				<div className="h-100">
					<div className="header py-2 px-3 text-navbar">
						<Link to="/" className="title">
							<img src={bookImg} className="open-book-img" />
							{' '}
							Open Book
						</Link>
						<div>
							<button className="auth-btn signup-btn">
								<Link to="/signup">
									Sign Up
								</Link>
							</button>
							<button className="auth-btn signin-btn">
								<Link to="/signin">
									Sign In
								</Link>
							</button>
							<span className="user-info">{user ? user.dbUser.username : ''}</span>
							<span className="user-info">{user ? user.dbUser.points : ''}</span>
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
							<Route path="/book/:id">
								<Book />
							</Route>
							<Route path="/edit/:id">
								<BookEdit />
							</Route>
						</Switch>
					</div>
				</div >
			</div>
		</Router >
	);
};


export default App;