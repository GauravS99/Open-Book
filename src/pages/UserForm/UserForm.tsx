import { FC, useState } from 'react';
import { AuthType } from '../../models/User';
import { Link } from 'react-router-dom';
import { signUpUser, signInUser } from '../../services/authService';
import React from 'react';

const UserForm: FC<{ authType: AuthType }> = ({ authType }): JSX.Element => {

	const [email, setemail] = useState('');
	const [password, setPassword] = useState('');
	const [username, setUsername] = useState('');

	const handleSignUp = () => signUpUser(email, password, username);
	const handleSignIn = () => signInUser(email, password);

	return (
		<div className="p-3 colour-5 form-container">
			<div>
				<div className="text-center">
					<h4>{authType}</h4>
				</div>
				<div className="form-group mt-4">
					<label>Email</label>
					<input className="form-control" onChange={event => setemail(event.target.value)} />
					{
						authType === AuthType.SignUp &&
						<React.Fragment>
							<label> Username </label>
							<input className="form-control" onChange={event => setUsername(event.target.value)} />
						</React.Fragment>
					}
					<label>Password</label>
					<input className="form-control" onChange={event => setPassword(event.target.value)} />
				</div>
				<button className="btn btn-secondary me-2">
					<Link to="/">Cancel</Link>
				</button>
				<button
					className="btn btn-primary d-inline-block"
					onClick={authType === AuthType.SignUp ? handleSignUp : handleSignIn}
				>
					{authType}
				</button>
			</div>
		</div>
	);
};

export default UserForm;