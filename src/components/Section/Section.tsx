import { DndProvider } from 'react-dnd';
import { TouchBackend } from "react-dnd-touch-backend";

import { CheckboxInput } from "../CheckboxInput/CheckboxInput";
import { DragAndDrop } from "../DragDrop/DragDrop";
import { RadioInput } from "../RadioInput/RadioInput";
import { TextInput } from "../TextInput/TextInput";

import { QuestionData, QUESTIONS } from "../../types/data";

import './Section.css';

const getInput = (data: QuestionData, isFinished: boolean) => {
    const { type } = data;

    switch (type) {
        case QUESTIONS.TEXT:
            return (
                <TextInput {...data} isFinished={isFinished} />
            );
        case QUESTIONS.CHECKBOX:
            return (
                <CheckboxInput {...data} isFinished={isFinished} />
            );
        case QUESTIONS.RADIO:
            return (
                <RadioInput {...data} isFinished={isFinished} />
            );

        case QUESTIONS.DRAG_AND_DROP:
            return (
                <DragAndDrop {...data} isFinished={isFinished} />
            );
    }
};

interface SectionProps {
    data: QuestionData;
    isFinished: boolean;
}

export const Section: React.FC<SectionProps> = ({ data, isFinished }) => {
    if (data) {
        const { question, id, img } = data;

        return (
            <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
                <section className="question-container">
                    <h3>{id}. question</h3>
                    <article>
                        <p>{question}</p>
                        {img ? <img src={img}></img> : null}
                        {getInput(data, isFinished)}
                    </article>
                </section>
            </DndProvider>
        );
    }

    return null;
};
