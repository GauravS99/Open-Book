import './UserForm.css';
import { FC, useState } from 'react';
import { AuthType } from '../../models/User';
import { Link, useHistory } from 'react-router-dom';
import { signUpUser, signInUser } from '../../services/authService';
import React from 'react';

const UserForm: FC<{ authType: AuthType }> = ({ authType }): JSX.Element => {

	const history = useHistory();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [username, setUsername] = useState('');


	const goBack = () => {
		history.goBack();
	};

	const handleSignUp = async () => {
		await signUpUser(email, password, username);
		goBack();
	};
	const handleSignIn = async () => { 
		await signInUser(email, password);
		goBack();
	};

	return (
		<div className="user-form-container">
			<div>
				<div className="text-center">
					<h4>{authType}</h4>
				</div>
				<div className="form-group mt-4">
					<input className="form-control" placeholder="Email" onChange={event => setEmail(event.target.value)} />
					<input className="form-control" type="password" placeholder="Password" onChange={event => setPassword(event.target.value)} />
					{authType === AuthType.SignUp &&
						<React.Fragment>
							<input className="form-control" placeholder="Username" onChange={event => setUsername(event.target.value)} />
						</React.Fragment>
					}
				</div>
				<div className="form-btn-container">
					<button className="form-btn btn btn-secondary" onClick={() => goBack()}>
						Cancel
					</button>
					<button
						className="form-btn btn btn-primary"
						onClick={authType === AuthType.SignUp ? handleSignUp : handleSignIn}
					>
						{authType}
					</button>
				</div>
			</div>
		</div>
	);
};

export default UserForm;