import { data } from '../../api/data';

import { IQuizState, IQuizAction } from '../types/reducer';
import { LocalStorageKeys } from '../../types/localStorage';
import { ACTIONS } from '../types/actions';

const initialState: IQuizState = {
	data: data,
	answers: localStorage.getItem(LocalStorageKeys.QUIZ_ANSWERS)
		? JSON.parse(localStorage.getItem(LocalStorageKeys.QUIZ_ANSWERS)!)
		: [],
};

export const QuizReducer = (state = initialState, action: IQuizAction) => {
	switch (action.type) {
		case ACTIONS.ADD_ANSWER:
			const newArray = [...state.answers];
			newArray.splice(action.payload.id - 1, 1, action.payload);

			localStorage.setItem(
				LocalStorageKeys.QUIZ_ANSWERS,
				JSON.stringify(newArray)
			);

			return {
				...state,
				answers: newArray,
			};
		case ACTIONS.SET_EMPTY_ANSWERS:
			return {
				...state,
				answers: [],
			};
		default:
			return state;
	}
};
