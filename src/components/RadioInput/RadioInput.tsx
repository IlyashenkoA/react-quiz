import {
    ChangeEvent,
    forwardRef,
    useEffect,
    useImperativeHandle,
    useState
} from "react";

import { useDispatch, useSelector } from "react-redux";

import { addAnswer } from "../../store/action-creators/action-creators";
import { RootState } from "../../store/reducers";

import { QUESTIONS, RadioButtonQuestion } from "../../types/data";
import { SaveDataHandle } from "../../types/ref";

interface RadioInputProps {
    id: number;
    question: string;
    label: string[];
    img?: string;
    answer: string[];
    type: QUESTIONS.RADIO;
    isFinished: boolean;
}

interface ICorrectAnswer {
    isFinished: boolean;
    answer: string;
    checked: boolean;
    correctAnswers: RadioButtonQuestion;
}

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

const RadioInput = forwardRef<SaveDataHandle, RadioInputProps>((props, ref) => {
    const { label, id, isFinished } = props;

    const [answer, setAnswer] = useState<string[]>(['']);
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
        array.splice(0, 1, e.target.value);
        setAnswer([...array]);
    };

    useImperativeHandle(ref, () => ({
        saveData() {
            const result = { id: id, answer: answer };
            dispatch(addAnswer(result));
        }
    }));

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
                                correctAnswers: data[id - 1] as RadioButtonQuestion
                            })
                        }}>
                            <label htmlFor={index.toString()}>{item}</label>
                            <input
                                type="radio"
                                name={`radio-${id}`}
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
});

export default RadioInput;