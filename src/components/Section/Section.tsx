import { Ref, RefObject } from "react";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import CheckboxInput from "../CheckboxInput/CheckboxInput";
import RadioInput from "../RadioInput/RadioInput";
import TextInput from "../TextInput/TextInput";
import DragDrop from "../DragDrop/DragDrop";

import { QuestionData, QUESTIONS } from "../../types/data";
import { SaveDataHandle } from "../../types/ref";

import './Section.css';

const getInput = (data: QuestionData, inputRef: Ref<SaveDataHandle> | undefined) => {
    const { type } = data;

    switch (type) {
        case QUESTIONS.TEXT:
            return (
                <TextInput {...data} ref={inputRef} />
            );
        case QUESTIONS.CHECKBOX:
            return (
                <CheckboxInput {...data} ref={inputRef} />
            );
        case QUESTIONS.RADIO:
            return (
                <RadioInput {...data} ref={inputRef} />
            );

        case QUESTIONS.DRAG_AND_DROP:
            return (
                <DragDrop {...data} ref={inputRef} />
            );
    }
};

interface SectionProps {
    data: QuestionData;
    inputRef: RefObject<SaveDataHandle>;
}

const Section: React.FC<SectionProps> = ({ data, inputRef }) => {
    if (data) {
        const { question, id, img } = data;

        return (
            <DndProvider backend={HTML5Backend}>
                <section className="question-container">
                    <h3>{id}. question</h3>
                    <article>
                        <p>{question}</p>
                        {img ? <img src={img}></img> : null}
                        {getInput(data, inputRef)}
                    </article>
                </section>
            </DndProvider>
        );
    }

    return null;
};

export default Section;