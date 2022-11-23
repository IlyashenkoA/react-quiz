import React from 'react';
import { useDrop } from 'react-dnd';

import { LastDroppedItems } from '../DragDrop';

import { ItemTypes } from '../../../types';
import { isImage } from '../../../assets/js/utils/Image';

import './Drop.css';

interface DropProps {
    label: string;
    id: number;
    lastDroppedItem: LastDroppedItems[];
    onDrop: (arg: any) => void;
}

const Drop: React.FC<DropProps> = React.memo(({ label, id, onDrop, lastDroppedItem }) => {
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: [ItemTypes.BOX, ItemTypes.IMAGE],
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
        drop: (item: unknown) => onDrop(item),
    }));

    const isActive = canDrop && isOver;

    const getBackgroundColor = () => {
        if (isActive) {
            return '#4B8F8C';
        }

        return '#FFFFFF';
    };

    return (
        <div className='drop' id={id.toString()} ref={drop} style={{ backgroundColor: getBackgroundColor() }}>
            <span>{label}</span>
            {isActive ? <span>Release to drop</span> : null}
            {lastDroppedItem[0].lasDroppedItem ? isImage(lastDroppedItem[0].lasDroppedItem) ? <img src={lastDroppedItem[0].lasDroppedItem} /> : <span>{lastDroppedItem[0].lasDroppedItem}</span>: null}
        </div>
    );
});

export default Drop;