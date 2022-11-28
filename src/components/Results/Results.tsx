import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../../store/reducers";
import { QuestionData, QUESTIONS } from "../../types/data";

import { getQuizResults } from "../../assets/js/utils/Validation";

import './Results.css';

interface ResultsProps {
    data: QuestionData[];
}

interface IResult {
    id: number;
    scores: number;
}

const Results: React.FC<ResultsProps> = ({ data }) => {
    const [totalScores, setTotalScores] = useState<number>(0);
    const [totalEarnedScores, setTotalEarnedScores] = useState<number>(0);
    const [answerResults, setAnswerResults] = useState<IResult[]>([]);

    const { answers } = useSelector((state: RootState) => {
        return state.QuizReducer;
    });

    useEffect(() => {
        let scores = 0;
        let totalScores = 0;
        const results = getQuizResults(answers, data);

        results.map((item) => {
            scores += item.scores;
        });

        data.map((item) => {
            if (item.type === QUESTIONS.DRAG_AND_DROP) return totalScores += item.drop.length;

            return totalScores += item.answer.length;
        });

        setTotalScores(totalScores);
        setTotalEarnedScores(scores);
        setAnswerResults(results);
    }, []);

    return (
        <div className="results">
            <h2 className="results__title">{`Your total result: ${totalEarnedScores}/${totalScores}`}</h2>
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
                            <div className="col col-2" data-label="Total Points">{item.type === QUESTIONS.DRAG_AND_DROP ? item.drop.length : item.answer.length}</div>
                            <div className="col col-3" data-label="Your points">{answerResults[item.id]?.scores ? answerResults[item.id].scores : 0}</div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Results;