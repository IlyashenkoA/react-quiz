import { Ref, RefObject } from "react";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import CheckboxInput from "../CheckboxInput/CheckboxInput";
import RadioInput from "../RadioInput/RadioInput";
import TextInput from "../TextInput/TextInput";

import { QuestionData, QUESTIONS, SaveDataHandle } from "../../types";

import './Section.css';
import DragDrop from "../DragDrop/DragDrop";

const getInput = (data: QuestionData, inputRef: Ref<SaveDataHandle> | undefined) => {
    const { type } = data;

    if (type === QUESTIONS.TEXT) {
        return (
            <TextInput {...data} ref={inputRef} />
        );
    }

    if (type === QUESTIONS.CHECKBOX) {
        return (
            <CheckboxInput {...data} ref={inputRef} />
        );
    }

    if (type === QUESTIONS.RADIO) {
        return (
            <RadioInput {...data} ref={inputRef} />
        );
    }

    if (type === QUESTIONS.DRAG_AND_DROP) {
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
};

export default Section;