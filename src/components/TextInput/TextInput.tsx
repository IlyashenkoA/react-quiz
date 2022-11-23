import { ChangeEvent, forwardRef, useImperativeHandle, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addAnswer } from "../../store/action-creators/action-creators";
import { RootState } from "../../store/reducers";

import { TextQuestion, SaveDataHandle } from "../../types";

import './TextInput.css';

const getEmptyArray = (label: string[] | undefined) => {
    return label ? Array.from({ length: label.length }, () => '') : [''];
};

const TextInput = forwardRef<SaveDataHandle, TextQuestion>((props, ref) => {
    const { label, id } = props;
    const dispatch = useDispatch();

    const answers = useSelector((state: RootState) => {
        const answerArray = state.QuizReducer.answers;

        return answerArray.filter((item) => {
            return item.id === id;
        });
    });

    const defaultValue = answers[0] ? answers[0].answer : getEmptyArray(label);
    const [answer, setAnswer] = useState<string[]>(defaultValue);

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const array: string[] = defaultValue;
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
                            <label htmlFor={item}>{item}</label>
                            <input type="text" name={item} id={index.toString()} onChange={onInputChange} value={defaultValue[index]} />
                        </li>
                    );
                })}
            </ul>
        );
    }

    return (
        <input type="text" id="0" onChange={onInputChange} value={answer[0]} />
    );
});

export default TextInput;