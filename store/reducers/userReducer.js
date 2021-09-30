import { types } from '../types/types';

import Cookies from 'js-cookie';

const initialState = {
	user: Cookies.get('user') ? JSON.parse(Cookies.get('user')) : '',
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.USER_LOGIN: {
			const { data } = action.payload;

			Cookies.set('user', JSON.stringify(data));

			return {
				...state,
				user: data,
			};
		}

		case types.USER_LOGOUT: {
			Cookies.remove('user');

			return {
				...state,
				user: null,
			};
		}

		case types.USER_REGISTER: {
			const userData = action.payload;
			console.log(userData);
			Cookies.set('user', JSON.stringify(userData));

			return {
				...state,
				user: userData,
			};
		}

		default:
			return state;
	}
};

export default userReducer;
