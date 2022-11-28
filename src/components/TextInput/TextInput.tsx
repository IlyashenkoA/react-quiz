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

import { QUESTIONS } from "../../types/data";
import { SaveDataHandle } from "../../types/ref";

import { isImage } from "../../assets/js/utils/Image";

import './TextInput.css';

const getEmptyArray = (label: string[] | undefined) => {
    return label ? Array.from({ length: label.length }, () => '') : [''];
};

interface TextInputProps {
    id: number;
    question: string;
    label?: string[];
    img?: string;
    answer: string[];
    type: QUESTIONS.TEXT;
    isFinished: boolean;
}

const TextInput = forwardRef<SaveDataHandle, TextInputProps>((props, ref) => {
    const { label, id, isFinished } = props;
    const dispatch = useDispatch();

    const savedAnswers = useSelector((state: RootState) => {
        const answerArray = state.QuizReducer.answers;

        return answerArray.filter((item) => {
            return item.id === id;
        });
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
                            <input type="text" id={index.toString()} onChange={onInputChange} value={answer[index] ? answer[index] : ''} disabled={isFinished} />
                        </li>
                    );
                })}
            </ul>
        );
    }

    return (
        <input type="text" id="0" onChange={onInputChange} value={answer[0]} disabled={isFinished} />
    );
});

export default TextInput;