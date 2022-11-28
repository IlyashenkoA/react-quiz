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


const getEmptyArray = (label: string[]) => {
    return Array.from({ length: label.length }, () => '');
};

interface CheckboxInputProps {
    id: number;
    question: string;
    label: string[];
    img?: string;
    answer: string[];
    type: QUESTIONS.CHECKBOX;
    isFinished: boolean;
}

const CheckboxInput = forwardRef<SaveDataHandle, CheckboxInputProps>((props, ref) => {
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
            {label ? label.map((item, index) => {
                return (
                    <li key={index.toString()}>
                        <label htmlFor={index.toString()}>{item}</label>
                        <input type="checkbox" name={item} id={index.toString()} onChange={onInputChange} value={item} checked={answer.includes(item)} disabled={isFinished} />
                    </li>
                );
            }) : null}
        </ul>
    );
});

export default CheckboxInput;