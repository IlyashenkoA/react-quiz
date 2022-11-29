import { config, data } from "../../api/data";

import './Intro.css';

const Intro: React.FC = () => {
    const { title, subtitle, description } = config;
    const { defaultHours, defaultMinutes, defaultSeconds } = config.timer;

    const getTotalTime = () => {
        return (
            `${defaultHours > 0
                ? defaultHours + ' hours'
                : ''}
            ${defaultMinutes > 0
                ? defaultMinutes + ' minutes'
                : ''}
            ${defaultSeconds > 0
                ? defaultSeconds + ' seconds'
                : ''}`
        );
    };

    return (
        <section className="intro">
            <h1>{title}</h1>
            <h3>{subtitle}</h3>
            <p>{description}</p>
            <h4>Rules:</h4>
            <ul>
                <li>{`There are ${data.length} questions in the test`}</li>
                <li>Time limit: {getTotalTime()}</li>
                <li>In the test, it is possible to move freely and return to previous answers to correct them</li>
            </ul>
        </section>
    );
};

export default Intro;