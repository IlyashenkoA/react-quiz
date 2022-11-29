import React from 'react';
import { useDrop } from 'react-dnd';

import { ItemTypes } from '../../../types/drag-drop';
import { DragDropId } from '../../../store/types/reducer';

import { isImage } from '../../../assets/js/utils/Image';

import './Drop.css';

interface DropProps {
    label: string;
    id: number;
    lastDroppedItem: DragDropId;
    onDrop: (arg: any) => void;
    backgroundColor: string | undefined;
}

const Drop: React.FC<DropProps> = React.memo(({ label, id, onDrop, lastDroppedItem, backgroundColor }) => {
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: [ItemTypes.BOX, ItemTypes.IMAGE],
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
        drop: (item: unknown) => onDrop(item),
    }), [label]);

    const isActive = canDrop && isOver;

    const getBackgroundColor = () => {
        if (backgroundColor) return backgroundColor;

        if (isActive) {
            return '#d3d3d3';
        }

        return '#FFFFFF';
    };

    return (
        <div className='drop' id={id.toString()} ref={drop} style={{ backgroundColor: getBackgroundColor() }}>
            <span>{label}</span>
            {isActive ? <span>Release to drop</span> : null}
            {lastDroppedItem.dragLabel
                ? isImage(lastDroppedItem.dragLabel)
                    ? <img src={lastDroppedItem.dragLabel} />
                    : <span>{lastDroppedItem.dragLabel}</span>
                : null}
        </div>
    );
});

export default Drop;