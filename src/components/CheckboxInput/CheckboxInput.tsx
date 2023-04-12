import {
    ChangeEvent,
    useEffect,
    useState
} from "react";
import { useDispatch, useSelector } from "react-redux";

import { addAnswer } from "../../store/action-creators/action-creators";
import { RootState } from "../../store/reducers";

import { CheckboxQuestion, QUESTIONS } from "../../types/data";

interface CheckboxInputProps {
    id: number;
    question: string;
    label: string[];
    img?: string;
    answer: string[];
    type: QUESTIONS.CHECKBOX;
    isFinished: boolean;
}

interface ICorrectAnswer {
    isFinished: boolean;
    answer: string;
    checked: boolean;
    correctAnswers: CheckboxQuestion;
}

const getEmptyArray = (label: string[]) => {
    return Array.from({ length: label.length }, () => '');
};

/**
 * In case if quiz was completed, show if the answer was correct or incorrect
 */
const getAnswerResult = ({ isFinished, answer, checked, correctAnswers }: ICorrectAnswer) => {
    if (isFinished && correctAnswers.answer.includes(answer) && checked) {
        return 'rgba(0,200,0,0.3)';
    }

    if (isFinished && !correctAnswers.answer.includes(answer) && checked) {
        return 'rgba(255,0,0,0.3)';
    }

    return;
};

export const CheckboxInput: React.FC<CheckboxInputProps> = ({ label, id, isFinished }) => {
    const [answer, setAnswer] = useState<string[]>(getEmptyArray(label));
    const dispatch = useDispatch();

    const { answers, data } = useSelector((state: RootState) => {
        return state.QuizReducer;
    });

    const savedAnswers = answers.filter((item) => {
        return item.id === id;
    });

    /**
     * When move from question to question:
     *  - If the answer has already been given, this data will be used
     *  - Otherwise default value will be used
     */
    useEffect(() => {
        if (savedAnswers[0]) {
            const defaultValue = savedAnswers[0].answer as string[];
            setAnswer([...defaultValue]);

            return;
        }
    }, [id]);

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const array: string[] = answer;
        e.target.checked ? array.splice(+e.target.id, 1, e.target.value) : array.splice(+e.target.id, 1, '');
        setAnswer([...array]);

        const result = { id, answer: array };
        dispatch(addAnswer(result));
    };

    return (
        <ul>
            {label
                ? label.map((item, index) => {
                    return (
                        <li key={index.toString()} style={{
                            backgroundColor: getAnswerResult({
                                isFinished: isFinished,
                                answer: item,
                                checked: answer.includes(item),
                                correctAnswers: data[id - 1] as CheckboxQuestion,
                            })
                        }}>
                            <label htmlFor={index.toString()}>{item}</label>
                            <input
                                type="checkbox"
                                name={item}
                                id={index.toString()}
                                onChange={onInputChange}
                                value={item}
                                checked={answer.includes(item)}
                                disabled={isFinished}
                            />
                        </li>
                    );
                })
                : null}
        </ul>
    );
};