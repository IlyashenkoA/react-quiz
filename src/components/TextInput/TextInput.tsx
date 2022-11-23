import { ChangeEvent, forwardRef, useEffect, useImperativeHandle, useState } from "react";
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

    useEffect(() => {
        if (answers[0]) {
            const defaultValue = answers[0].answer;
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
                            <label htmlFor={index.toString()}>{item}</label>
                            <input type="text" name={item} id={index.toString()} onChange={onInputChange} value={answer[index] ? answer[index] : ''} />
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