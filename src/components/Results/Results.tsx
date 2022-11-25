import { QuestionData, QUESTIONS } from "../../types";

import './Results.css';

interface ResultsProps {
    data: QuestionData[];
}

const Results: React.FC<ResultsProps> = ({ data }) => {
    return (
        <div className="results">
            <h2 className="results__title">Your total results - </h2>
            <ul className="responsive-table">
                <li className="table-header">
                    <div className="col col-1">Question</div>
                    <div className="col col-2">Total Points</div>
                    <div className="col col-3">Your points</div>
                </li>
                {data.map((item) => {
                    return (
                        <li className="table-row" key={item.id}>
                            <div className="col col-1" data-label="Question">{`${item.id}. Question`}</div>
                            <div className="col col-2" data-label="Total POints">{item.type === QUESTIONS.DRAG_AND_DROP ? item.drop.length : item.answer.length}</div>
                            <div className="col col-3" data-label="Your points">$350</div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Results;