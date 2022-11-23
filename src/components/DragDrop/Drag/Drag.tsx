import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../../../types';

import './Drag.css';

interface DragProps {
    label: string;
    id: number;
}

interface DropResult {
    label: string;
}

function isImage(url: string) {
    return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}

const Drag: React.FC<DragProps> = React.memo(({ label, id }) => {
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
    }), [label]);

    return (
        <div className='drag' id={id.toString()} ref={drag}>{isImage(label) ? <img src={label} /> : <span>{label}</span>}</div>
    );
});

export default Drag;