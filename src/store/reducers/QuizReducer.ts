import { data } from '../../api/data';

import { LocalStorageKeys } from '../../types/localStorage';
import { ACTIONS } from '../types/actions';
import { IQuizAction, IQuizState } from '../types/reducer';

const initialState: IQuizState = {
	data: data,
	answers: localStorage.getItem(LocalStorageKeys.QUIZ_ANSWERS)
		? JSON.parse(localStorage.getItem(LocalStorageKeys.QUIZ_ANSWERS)!)
		: [],
};

export const QuizReducer = (state = initialState, action: IQuizAction) => {
	switch (action.type) {
		case ACTIONS.ADD_ANSWER:
			if (state.answers.length === 0) {
				const array = [...state.answers];
				array.push(action.payload);

				localStorage.setItem(
					LocalStorageKeys.QUIZ_ANSWERS,
					JSON.stringify(array)
				);

				return {
					...state,
					answers: array,
				};
			}

			const newArray = [...state.answers];
			const index = newArray.findIndex((obj) => obj.id === action.payload.id);

			if (index <= 0) {
				newArray.push(action.payload);

				localStorage.setItem(
					LocalStorageKeys.QUIZ_ANSWERS,
					JSON.stringify(newArray)
				);

				return {
					...state,
					answers: newArray,
				};
			}

			newArray.splice(index, 1, action.payload);
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
