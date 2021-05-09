// DB model
interface User {
	uid ?: string;
	username: string;
	points: number;
}

export enum AuthType {
	SignUp = 'Sign Up',
	SignIn = 'Sign In'
}

export interface AuthUser {
	uid: string;
	email: string;
	dbUser: User;
}

export default User;

