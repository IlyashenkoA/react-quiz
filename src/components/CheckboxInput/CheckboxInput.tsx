import { ChangeEvent, forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addAnswer } from "../../store/action-creators/action-creators";
import { RootState } from "../../store/reducers";

import { CheckboxQuestion, SaveDataHandle } from "../../types";

const getEmptyArray = (label: string[]) => {
    return Array.from({ length: label.length }, () => '');
};

const CheckboxInput = forwardRef<SaveDataHandle, CheckboxQuestion>((props, ref) => {
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
                        <input type="checkbox" name={item} id={index.toString()} onChange={onInputChange} value={item} checked={answer.includes(item)} />
                    </li>
                );
            }) : null}
        </ul>
    );
});

export default CheckboxInput;