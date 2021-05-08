interface User {
	name: string;
	points: number;
}

export enum AuthType {
	SignUp = 'Sign Up',
	SignIn = 'Sign In'
}

export default User;