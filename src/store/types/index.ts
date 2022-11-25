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

export enum LocalStorageKeys {
	QUIZ_ANSWERS = 'QUIZ_ANSWERS',
	QUIZ_STARTED = 'QUIZ_STARTED',
	QUIZ_FINISHED = 'QUIZ_FINISHED',
	QUIZ_TIMER = 'QUIZ_TIMER'
}
