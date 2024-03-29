import {
    useEffect,
    useState
} from "react";
import { useDispatch, useSelector } from "react-redux";

import Drag from "./Drag/Drag";
import Drop from "./Drop/Drop";

import { addAnswer } from "../../store/action-creators/action-creators";
import { RootState } from "../../store/reducers";
import { DragDropId } from "../../store/types/reducer";

import { DragDrop, QUESTIONS } from "../../types/data";

import './DragDrop.css';

interface DragDropInput {
    id: number;
    question: string;
    img?: never;
    drop: DragDrop[];
    drag: DragDrop[];
    type: QUESTIONS.DRAG_AND_DROP;
    isFinished: boolean;
}

interface ICorrectAnswer {
    isFinished: boolean;
    answer: DragDropId;
}
export interface handleDropProps {
    dragItem: DragLabel;
    dropId: number;
}

interface DragLabel {
    label: string;
}

const getEmptyArray = (drop: DragDrop[]) => Array.from(drop, (item) => ({ dragId: 0, dragLabel: '', dropId: item.id }));

/**
 * In case if quiz was completed, show if the answer was correct or incorrect
 */
const getAnswerResult = ({ isFinished, answer }: ICorrectAnswer) => {
    if (isFinished && answer.dragId === 0) return;

    if (isFinished && answer.dragId === answer.dropId) {
        return 'rgba(0,200,0,0.3)';
    }

    if (isFinished && answer.dragId !== answer.dropId) {
        return 'rgba(255,0,0,0.3)';
    }

    return;
};

export const DragAndDrop: React.FC<DragDropInput> = ({ drag, drop, id, isFinished }) => {
    const [answer, setAnswer] = useState<DragDropId[]>(getEmptyArray(drop));
    const dispatch = useDispatch();

    const savedAnswers = useSelector((state: RootState) => {
        const answerArray = state.QuizReducer.answers;

        return answerArray.filter((item) => {
            return item.id === id;
        });
    });

    /**
     * When move from question to question:
     *  - If the answer has already been given, this data will be used
     *  - Otherwise default value will be used
     */
    useEffect(() => {
        if (savedAnswers[0]) {
            const defaultValue = savedAnswers[0].answer as DragDropId[];
            setAnswer([...defaultValue]);

            return;
        }

        setAnswer(getEmptyArray(drop));
    }, [id]);

    useEffect(() => {
        const result = { id, answer };
        dispatch(addAnswer(result));
    }, [answer]);

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

    return (
        <div className="drag-drop">
            <div className="drop-container">
                {drop.map((item) => {
                    return (
                        <Drop
                            label={item.label}
                            id={item.id}
                            key={item.id}
                            onDrop={(data) => handleDrop({ dragItem: data, dropId: item.id })}
                            lastDroppedItem={getLastDroppedItemLabelById(item.id)}
                            backgroundColor={getAnswerResult({
                                isFinished: isFinished,
                                answer: getLastDroppedItemLabelById(item.id)
                            })}
                        />
                    );
                })}
            </div>
            <div className="drag-container">
                {drag.map((item) => {
                    return (
                        <Drag
                            label={item.label}
                            id={item.id}
                            key={item.id}
                            isFinished={isFinished}
                        />
                    );
                })}
            </div>
        </div>
    );
};