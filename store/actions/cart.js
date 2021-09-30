import { types } from '../types/types';
import axios from 'axios';

export const addToCart = (productId, qty) => async dispatch => {
	const { data } = await axios.get(`/api/products/${productId}`);

	dispatch({
		type: types.ADD_TO_CART,
		payload: { data, qty },
	});
};

export const removeFromCart = productId => async dispatch => {
	dispatch({
		type: types.REMOVE_FROM_CART,
		payload: productId,
	});
};

export const updateCart = (productId, qty) => async dispatch => {
	const { data } = await axios.get(`/api/products/${productId}`);

	dispatch({
		type: types.UPDATE_CART,
		payload: { productId, qty },
	});
};
