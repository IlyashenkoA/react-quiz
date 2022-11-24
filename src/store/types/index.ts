import { ACTIONS } from './actions';
import { QuestionData } from '../../types';

export interface IQuizState {
	data: QuestionData[];
	answers: IAnswer[];
}

export interface IQuizAction {
	payload: IAnswer;
	type: ACTIONS;
}

export interface IAnswer {
	id: number;
	answer: string[] | DragDropId[]
}

export interface DragDropId {
	dragId: number;
	dragLabel: string;
	dropId: number;
}
