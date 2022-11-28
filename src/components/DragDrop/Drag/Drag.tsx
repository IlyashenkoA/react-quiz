import React from 'react';
import { useDrag } from 'react-dnd';

import { ItemTypes } from '../../../types/drag-drop';

import { isImage } from '../../../assets/js/utils/Image';

import './Drag.css';

interface DragProps {
    label: string;
    id: number;
    isFinished: boolean;
}

const Drag: React.FC<DragProps> = React.memo(({ label, id, isFinished }) => {
    const [{ }, drag] = useDrag(() => ({
        type: isImage(label) ? ItemTypes.IMAGE : ItemTypes.BOX,
        item: { label },
        isDragging(monitor) {
            const item = monitor.getItem();
            return label === item.label;
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
        canDrag: () => {
            return !isFinished;
        }
    }), [label]);

    return (
        <div className='drag' id={id.toString()} ref={drag}>{isImage(label) ? <img src={label} /> : <span>{label}</span>}</div>
    );
});

export default Drag;