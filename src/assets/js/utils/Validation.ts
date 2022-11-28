import {
	RadioButtonQuestion,
	TextQuestion,
	CheckboxQuestion,
	QUESTIONS,
	QuestionData,
} from './../../../types/data';
import { DragDropId, IAnswer } from '../../../store/types/reducer';

export const getQuizResults = (answers: IAnswer[], data: QuestionData[]) => {
	let scores = Array.from(answers, (item) => ({ id: item.id, scores: -1 }));

	answers.map((item, index) => {
		if (data[item.id - 1].type === QUESTIONS.TEXT) {
			const result = {
				id: item.id,
				scores: validateTextInput(data[item.id - 1] as TextQuestion, item),
			};

			scores.splice(index, 1, result);
		}

		if (data[item.id - 1].type === QUESTIONS.RADIO) {
			const result = {
				id: item.id,
				scores: validateRadioInput(
					data[item.id - 1] as RadioButtonQuestion,
					item
				),
			};

			scores.splice(index, 1, result);
		}

		if (data[item.id - 1].type === QUESTIONS.CHECKBOX) {
			const result = {
				id: item.id,
				scores: validateCheckboxInput(
					data[item.id - 1] as CheckboxQuestion,
					item
				),
			};

			scores.splice(index, 1, result);
		}

		if (data[item.id - 1].type === QUESTIONS.DRAG_AND_DROP) {
			const result = {
				id: item.id,
				scores: validateDragDrop(item),
			};

			scores.splice(index, 1, result);
		}
	});

	return scores;
};

const validateTextInput = (data: TextQuestion, item: IAnswer) => {
	let score = 0;

	item.answer.map((item, index) => {
		if (item === data.answer[index]) return score++;
	});

	return score;
};

const validateRadioInput = (data: RadioButtonQuestion, item: IAnswer) => {
	let score = 0;

	if (item.answer === data.answer) return score++;

	return score;
};

const validateCheckboxInput = (data: CheckboxQuestion, item: IAnswer) => {
	let score = 0;

	item.answer.map((item) => {
		if (typeof item === 'string')
			if (data.answer.includes(item)) return score++;
	});

	return score;
};

const validateDragDrop = (item: IAnswer) => {
	let score = 0;

	if (
		item.answer.length === 1 &&
		(item.answer as any).every((item: any) => item === '')
	)
		return score;

	(item.answer as DragDropId[]).map((item) => {
		item.dragId === item.dropId ? score++ : null;
	});

	return score;
};
