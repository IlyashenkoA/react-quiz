import { IAnswer } from '../types';
import { ACTIONS } from './../types/actions';

export const addAnswer = (answer: IAnswer) => {
	return { type: ACTIONS.ADD_ANSWER, payload: answer };
};
