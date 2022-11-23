import { forwardRef, useImperativeHandle, useState } from "react";

import Drag from "./Drag/Drag";
import Drop from "./Drop/Drop";

import { DragAndDropQuestion, SaveDataHandle } from "../../types";

import './DragDrop.css';

export interface LastDroppedItems {
    id: number;
    label: string;
    lasDroppedItem: string | null;
}

export interface handleDropProps {
    dragItem: DragLabel;
    dropId: number;
}

interface DragLabel {
    label: string;
}

const lastDroppedItem = (data: DragAndDropQuestion) => {
    const { drop } = data;
    return Array.from(drop, (item) => ({ id: item.id, label: item.label, lasDroppedItem: null }));
};

const DragDrop = forwardRef<SaveDataHandle, DragAndDropQuestion>((data, ref) => {
    const [lastDroppedItems, setLastDroppedItems] = useState<LastDroppedItems[]>(lastDroppedItem(data));

    const { drag, drop } = data;

    const handleDrop = ({ dragItem, dropId }: handleDropProps) => {
        setLastDroppedItems(current =>
            current.map(obj => {
                if (obj.id === dropId) {
                    return { ...obj, lasDroppedItem: dragItem.label };
                }

                return obj;
            }));
    };

    const getLastDroppedItemById = (id: number) => {
        return lastDroppedItems.filter((obj) => {
            return obj.id === id;
        });
    };

    useImperativeHandle(ref, () => ({
        saveData() {
            console.log(123);
        }
    }));

    return (
        <div className="drag-drop">
            <div className="drop-container">
                {drop.map((item) => {
                    return (
                        <Drop label={item.label} id={item.id} key={item.id} onDrop={(data) => handleDrop({ dragItem: data, dropId: item.id })} lastDroppedItem={getLastDroppedItemById(item.id)} />
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