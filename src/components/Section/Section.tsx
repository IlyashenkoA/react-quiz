import { Ref, RefObject } from "react";
import { DndProvider } from 'react-dnd';

import CheckboxInput from "../CheckboxInput/CheckboxInput";
import DragAndDrop from "../DragDrop/DragDrop";
import RadioInput from "../RadioInput/RadioInput";
import TextInput from "../TextInput/TextInput";

import { QuestionData, QUESTIONS } from "../../types/data";
import { SaveDataHandle } from "../../types/ref";

import { TouchBackend } from "react-dnd-touch-backend";
import './Section.css';

const getInput = (data: QuestionData, inputRef: Ref<SaveDataHandle> | undefined, isFinished: boolean) => {
    const { type } = data;

    switch (type) {
        case QUESTIONS.TEXT:
            return (
                <TextInput {...data} ref={inputRef} isFinished={isFinished} />
            );
        case QUESTIONS.CHECKBOX:
            return (
                <CheckboxInput {...data} ref={inputRef} isFinished={isFinished} />
            );
        case QUESTIONS.RADIO:
            return (
                <RadioInput {...data} ref={inputRef} isFinished={isFinished} />
            );

        case QUESTIONS.DRAG_AND_DROP:
            return (
                <DragAndDrop {...data} ref={inputRef} isFinished={isFinished} />
            );
    }
};

interface SectionProps {
    data: QuestionData;
    inputRef: RefObject<SaveDataHandle>;
    isFinished: boolean;
}

const Section: React.FC<SectionProps> = ({ data, inputRef, isFinished }) => {
    if (data) {
        const { question, id, img } = data;

        return (
            <DndProvider backend={TouchBackend} options={{ enableMouseEvents: true }}>
                <section className="question-container">
                    <h3>{id}. question</h3>
                    <article>
                        <p>{question}</p>
                        {img ? <img src={img}></img> : null}
                        {getInput(data, inputRef, isFinished)}
                    </article>
                </section>
            </DndProvider>
        );
    }

    return null;
};

export default Section;