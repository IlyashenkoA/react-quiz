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

import { QUESTIONS, TextQuestion } from "../../types/data";
import { SaveDataHandle } from "../../types/ref";

import { isImage } from "../../assets/js/utils/Image";

import './TextInput.css';

interface TextInputProps {
    id: number;
    question: string;
    label?: string[];
    img?: string;
    answer: string[];
    type: QUESTIONS.TEXT;
    isFinished: boolean;
}

interface ICorrectAnswer {
    isFinished: boolean;
    answer: string;
    correctAnswers: TextQuestion;
    index: number;
}

const getEmptyArray = (label: string[] | undefined) => {
    return label ? Array.from({ length: label.length }, () => '') : [''];
};

const getAnswerResult = ({ isFinished, answer, correctAnswers, index }: ICorrectAnswer) => {
    if (isFinished && answer === correctAnswers.answer[index]) {
        return 'rgba(0,200,0,0.3)';
    }

    if (isFinished && answer !== correctAnswers.answer[index] && answer !== '') {
        return 'rgba(255,0,0,0.3)';
    }

    return;
};

const TextInput = forwardRef<SaveDataHandle, TextInputProps>((props, ref) => {
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

        if (label) {
            const defaultValue = getEmptyArray(label);
            setAnswer([...defaultValue]);

            return;
        }

        const defaultValue = [''];
        setAnswer([...defaultValue]);
    }, [id]);

    const [answer, setAnswer] = useState<string[]>(getEmptyArray(label));

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const array: string[] = answer;
        array.splice(+e.target.id, 1, e.target.value);
        setAnswer([...array]);
    };

    useImperativeHandle(ref, () => ({
        saveData() {
            const result = { id: id, answer: answer };
            dispatch(addAnswer(result));
        }
    }));

    if (label) {
        return (
            <ul>
                {label.map((item, index) => {
                    return (
                        <li key={index.toString()}>
                            <label htmlFor={index.toString()}>{isImage(item) ? <img src={item} /> : item}</label>
                            <input
                                type="text"
                                id={index.toString()}
                                onChange={onInputChange}
                                value={answer[index] ? answer[index] : ''}
                                disabled={isFinished} style={{
                                    backgroundColor: getAnswerResult({
                                        isFinished: isFinished,
                                        answer: answer[index],
                                        correctAnswers: data[id - 1] as TextQuestion,
                                        index: index
                                    })
                                }} />
                        </li>
                    );
                })}
            </ul>
        );
    }

    return (
        <input
            type="text"
            id="0"
            onChange={onInputChange}
            value={answer[0]}
            disabled={isFinished}
            style={{
                backgroundColor: getAnswerResult({
                    isFinished: isFinished,
                    answer: answer[0],
                    correctAnswers: data[id - 1] as TextQuestion,
                    index: 0
                })
            }} />
    );
});

export default TextInput;