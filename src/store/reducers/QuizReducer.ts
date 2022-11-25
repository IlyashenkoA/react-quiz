import { data } from '../../api/data';

import { IQuizState, IQuizAction, LocalStorageKeys } from '../types';
import { ACTIONS } from '../types/actions';

const initialState: IQuizState = {
	data: data,
	answers: localStorage.getItem(LocalStorageKeys.QUIZ_ANSWERS) ? JSON.parse(localStorage.getItem(LocalStorageKeys.QUIZ_ANSWERS)!) : [],
};

export const QuizReducer = (state = initialState, action: IQuizAction) => {
	switch (action.type) {
		case ACTIONS.ADD_ANSWER:
			const newArray = [...state.answers];
			newArray.splice(action.payload.id, 1, action.payload);

			localStorage.setItem(LocalStorageKeys.QUIZ_ANSWERS, JSON.stringify(newArray));

			return {
				...state,
				answers: newArray,
			};
		default:
			return state;
	}
};
