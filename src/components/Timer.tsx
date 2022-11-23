import { useEffect, useState, forwardRef, useImperativeHandle } from "react";

import { config } from "../api/data";

export type StopTimerHandle = {
    stopTimer: () => void;
};

const Timer = forwardRef<StopTimerHandle>((_, ref) => {
    const { defaultHours, defaultMinutes, defaultSeconds } = config.timer;
    const [hours, setHours] = useState(defaultHours);
    const [minutes, setMinutes] = useState(defaultMinutes);
    const [seconds, setSeconds] = useState(defaultSeconds);

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

        return () => {
            clearInterval(myInterval);
        };
    });

    useImperativeHandle(ref, () => ({
        stopTimer() {
            setHours(0);
            setMinutes(0);
            setSeconds(0);
        }
    }));

    return (
        <div className="timer" style={{ color: hours === 0 && minutes <= 1 ? 'red' : 'black' }}>
            {`${hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}
        </div>
    );
});

export default Timer;