import { types } from '../types/types';

import Cookies from 'js-cookie';

const initialState = {
	cartItems: Cookies.get('cartItems')
		? JSON.parse(Cookies.get('cartItems'))
		: [],
};

export const cartReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.ADD_TO_CART: {
			const qty = action.payload.qty;
			let newItem = action.payload.data;
			newItem.quantity = qty;

			const existItem = state.cartItems.find(i => i._id === newItem._id);

			if (existItem) {
				existItem.quantity = qty;
			}

			let cartItems = existItem
				? state.cartItems.map(item =>
						item.name === existItem.name ? existItem : item
				  )
				: [...state.cartItems, newItem];

			Cookies.set('cartItems', JSON.stringify(cartItems));

			return {
				...state,
				cartItems: cartItems,
			};
		}

		case types.REMOVE_FROM_CART: {
			const itemToRemoveId = action.payload;

			const cartItems = state.cartItems.filter(i => i._id !== itemToRemoveId);

			Cookies.set('cartItems', JSON.stringify(cartItems));

			return {
				...state,
				cartItems: cartItems,
			};
		}

		case types.USER_LOGOUT: {
			Cookies.remove('cartItems');

			return {
				...state,
				cartItems: [],
			};
		}

		default:
			return state;
	}
};
