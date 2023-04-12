import {
    Dispatch,
    SetStateAction,
    memo,
    useEffect,
    useState
} from "react";

import { config, data } from "../../api/data";

import { LocalStorageKeys } from "../../types/localStorage";
interface TimerProps {
    setIsFinished: Dispatch<SetStateAction<boolean>>;
    setQuestionId: Dispatch<SetStateAction<number>>;
}

interface CurrentTimeProps {
    hours: number;
    minutes: number;
    seconds: number;
}

const getRemainingTime = ({ hours, minutes, seconds }: CurrentTimeProps) => {
    return `${hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
};

export const Timer: React.FC<TimerProps> = memo(({ setIsFinished, setQuestionId }) => {
    const { defaultHours, defaultMinutes, defaultSeconds } = config.timer;
    const [hours, setHours] = useState<number>(defaultHours);
    const [minutes, setMinutes] = useState<number>(defaultMinutes);
    const [seconds, setSeconds] = useState<number>(defaultSeconds);

    useEffect(() => {
        const date = new Date();

        /**
         *  - In case quiz was started get the remaining time from localStorage
         *  - Get the current time in seconds
         *  - Check the difference between the current time and and the time when the quiz should end
         *  - If difference is negative, quiz is finished
         *  - Otherwise get the remaining time in hours, minutes and seconds
         */
        if (localStorage.getItem(LocalStorageKeys.QUIZ_TIMER)) {
            const seconds = localStorage.getItem(LocalStorageKeys.QUIZ_TIMER)!;

            const currentTime = Math.floor(date.getTime() / 1000);
            const remainingTime = +seconds - currentTime;

            if (remainingTime < 0) {
                setIsFinished(true);
                localStorage.setItem(LocalStorageKeys.QUIZ_FINISHED, 'true');

                return;
            }

            if (remainingTime > 0 && remainingTime < 3600) {
                setMinutes(Math.floor(remainingTime / 60));
                setSeconds(remainingTime % 60);
            } else {
                setHours(Math.floor(remainingTime / 3600));
                setMinutes(Math.floor((remainingTime % 3600) / 60));
                setSeconds(remainingTime % 60);
            }

            return;
        }

        /**
         *  - Get the current time in seconds
         *  - Add timer time from config in seconds to the current time
         *  - Save total time in localStorage
         */
        const startTime = Math.floor(date.getTime() / 1000);
        const remainingTime = (hours * 3600) + (minutes * 60) + seconds;
        const totalTime = startTime + remainingTime;

        localStorage.setItem(LocalStorageKeys.QUIZ_TIMER, totalTime.toString());

    }, []);

    useEffect(() => {
        let myInterval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(prev => prev - 1);
            }

            if (seconds === 0) {
                if (minutes === 0) {
                    if (hours === 0) {
                        clearInterval(myInterval);
                    } else {
                        setHours(prev => prev - 1);
                        setMinutes(59);
                        setSeconds(59);
                    }
                } else {
                    setMinutes(prev => prev - 1);
                    setSeconds(59);
                }
            }
        }, 1000);

        if (seconds === 0
            && minutes === 0
            && hours === 0) {
            setIsFinished(true);
            setQuestionId(data.length + 1);

            localStorage.setItem(LocalStorageKeys.QUIZ_FINISHED, 'true');
        }

        return () => {
            clearInterval(myInterval);
        };
    });

    return (
        <div className="timer" style={{ color: hours === 0 && minutes <= 1 ? '#FF0000' : '#000000' }}>
            {getRemainingTime({ hours, minutes, seconds })}
        </div>
    );
});