import { ChangeEvent, forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addAnswer } from "../../store/action-creators/action-creators";
import { RootState } from "../../store/reducers";

import { RadioButtonQuestion, SaveDataHandle } from "../../types";

const RadioInput = forwardRef<SaveDataHandle, RadioButtonQuestion>((props, ref) => {
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

    const [answer, setAnswer] = useState<string[]>(['']);

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
            {label ? label.map((item, index) => {
                return (
                    <li key={index.toString()}>
                        <label htmlFor={index.toString()}>{item}</label>
                        <input type="radio" name={`question-${id}`} id={index.toString()} onChange={onInputChange} value={item} checked={answer.includes(item)} />
                    </li>
                );
            }) : null}
        </ul>
    );
});

export default RadioInput;