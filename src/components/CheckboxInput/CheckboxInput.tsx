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

import { CheckboxQuestion, QUESTIONS } from "../../types/data";
import { SaveDataHandle } from "../../types/ref";

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

const getAnswerResult = ({ isFinished, answer, checked, correctAnswers }: ICorrectAnswer) => {
    if (isFinished && correctAnswers.answer.includes(answer) && checked) {
        return 'rgba(0,200,0,0.3)';
    }

    if (isFinished && !correctAnswers.answer.includes(answer) && checked) {
        return 'rgba(255,0,0,0.3)';
    }

    return;
};

const CheckboxInput = forwardRef<SaveDataHandle, CheckboxInputProps>((props, ref) => {
    const { label, id, isFinished } = props;
    const dispatch = useDispatch();

    const { answers, data } = useSelector((state: RootState) => {
        return state.QuizReducer;
    });

    const savedAnswers = answers.filter((item) => {
        return item.id === id;
    });

    useEffect(() => {
        if (savedAnswers[0]) {
            const defaultValue = savedAnswers[0].answer as string[];
            setAnswer([...defaultValue]);
            return;
        }

        const defaultValue = [''];
        setAnswer([...defaultValue]);
    }, [id]);

    const [answer, setAnswer] = useState<string[]>(getEmptyArray(label));

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const array: string[] = answer;
        e.target.checked ? array.splice(+e.target.id, 1, e.target.value) : array.splice(+e.target.id, 1, '');
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
});

export default CheckboxInput;