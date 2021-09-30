import { types } from '../types/types';
import axios from 'axios';

export const LoginUser = (email, password) => async dispatch => {
	try {
		const { data } = await axios.post('/api/users/login', {
			email,
			password,
		});

		dispatch({
			type: types.USER_LOGIN,
			payload: { data },
		});
	} catch (error) {
		return error.response.data ? error.response.data.message : error.message;
	}
};

export const LogoutUser = () => dispatch => {
	dispatch({
		type: types.USER_LOGOUT,
	});

	return 'Logout successfully';
};

export const registerUser = (name, email, password) => async dispatch => {
	try {
		const { data } = await axios.post('/api/users/register', {
			name,
			email,
			password,
			isAdmin: false,
		});

		const userData = {
			name,
			email,
			password,
		};
		dispatch({
			type: types.USER_REGISTER,
			payload: userData,
		});
	} catch (error) {
		return error.response.data ? error.response.data.message : error.message;
	}
};
