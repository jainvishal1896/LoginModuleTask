import { LOGIN, LOGOUT, SIGNUP } from "../actions/auth";

const initialState = {
	token: null,
	userId: null,
	name: null,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case SIGNUP:
			return {
				...state,
				userId: action.id,
				name: action.name,
			};

		case LOGIN:
			return {
				userId: action.id,
				name: action.name,
				token: action.token,
			};

		default:
			return state;
	}
};
