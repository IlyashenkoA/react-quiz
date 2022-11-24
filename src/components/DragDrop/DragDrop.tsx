import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Drag from "./Drag/Drag";
import Drop from "./Drop/Drop";

import { DragAndDropQuestion, SaveDataHandle } from "../../types";
import { DragDropId } from "../../store/types";
import { addAnswer } from "../../store/action-creators/action-creators";
import { RootState } from "../../store/reducers";

import './DragDrop.css';

export interface handleDropProps {
    dragItem: DragLabel;
    dropId: number;
}

interface DragLabel {
    label: string;
}

const getEmptyArray = (data: DragAndDropQuestion) => {
    const { drop } = data;

    return Array.from(drop, (item) => ({ dragId: 0, dragLabel: '', dropId: item.id }));
};


const DragDrop = forwardRef<SaveDataHandle, DragAndDropQuestion>((data, ref) => {
    const { drag, drop, id } = data;

    const [answer, setAnswer] = useState<DragDropId[]>(getEmptyArray(data));
    const dispatch = useDispatch();

    const savedAnswers = useSelector((state: RootState) => {
        const answerArray = state.QuizReducer.answers;

        return answerArray.filter((item) => {
            return item.id === id;
        });
    });

    useEffect(() => {
        if (savedAnswers[0]) {
            const defaultValue = savedAnswers[0].answer as DragDropId[];
            setAnswer([...defaultValue]);
            return;
        }

        const defaultValue = getEmptyArray(data);
        setAnswer([...defaultValue]);
    }, [id]);

    const handleDrop = ({ dragItem, dropId }: handleDropProps) => {
        const dragItemId = getLastDroppedItemIdByLabel(dragItem.label).id;

        setAnswer(current => current.map((obj) => {
            if (obj.dropId === dropId) {
                return { ...obj, dragId: dragItemId, dragLabel: dragItem.label };
            }

            return obj;
        }));
    };

    const getLastDroppedItemLabelById = (id: number) => {
        const result = answer.filter((obj) => {
            return obj.dropId === id;
        });

        return result[0];
    };

    const getLastDroppedItemIdByLabel = (label: string) => {
        const result = drag.filter((obj) => {
            return obj.label === label;
        });

        return result[0];
    };

    useImperativeHandle(ref, () => ({
        saveData() {
            const result = { id: id, answer: answer };
            dispatch(addAnswer(result));
        }
    }));

    return (
        <div className="drag-drop">
            <div className="drop-container">
                {drop.map((item) => {
                    return (
                        <Drop label={item.label} id={item.id} key={item.id} onDrop={(data) => handleDrop({ dragItem: data, dropId: item.id })} lastDroppedItem={getLastDroppedItemLabelById(item.id)} />
                    );
                })}
            </div>
            <div className="drag-container">
                {drag.map((item) => {
                    return (
                        <Drag label={item.label} id={item.id} key={item.id} />
                    );
                })}
            </div>
        </div>
    );
});

export default DragDrop;