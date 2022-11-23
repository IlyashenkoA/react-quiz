import { handleDropProps } from './../../components/DragDrop/DragDrop';
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
	answer: any
}
