import { data } from '../../api/data';

import { IQuizState, IQuizAction } from '../types';
import { ACTIONS } from '../types/actions';

const initialState: IQuizState = {
	data: data,
	answers: [],
};

export const QuizReducer = (state = initialState, action: IQuizAction) => {
	switch (action.type) {
		case ACTIONS.ADD_ANSWER:
			const newArray = [...state.answers];
			newArray.splice(action.payload.id, 1, action.payload);

			return {
				...state,
				answers: newArray,
			};
		default:
			return state;
	}
};
