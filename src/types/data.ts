export enum QUESTIONS {
	TEXT = 'TextInput',
	CHECKBOX = 'CheckboxInput',
	RADIO = 'RadioInput',
	DRAG_AND_DROP = 'DragDrop',
}

export interface TextQuestion {
	id: number;
	question: string;
	label?: string[];
	img?: string;
	answer: string[];
	type: QUESTIONS.TEXT;
}

export interface CheckboxQuestion {
	id: number;
	question: string;
	label: string[];
	img?: string;
	answer: string[];
	type: QUESTIONS.CHECKBOX;
}

export interface RadioButtonQuestion {
	id: number;
	question: string;
	label: string[];
	img?: string;
	answer: string[];
	type: QUESTIONS.RADIO;
}

export interface DragAndDropQuestion {
	id: number;
	question: string;
	img?: never;
	drop: DragDrop[];
	drag: DragDrop[];
	type: QUESTIONS.DRAG_AND_DROP;
}

export interface DragDrop {
	id: number;
	label: string;
}

export type QuestionData =
	| TextQuestion
	| CheckboxQuestion
	| RadioButtonQuestion
	| DragAndDropQuestion;
