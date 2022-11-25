import { useEffect, useState, forwardRef, useImperativeHandle, SetStateAction, Dispatch } from "react";

import { config } from "../api/data";

export type StopTimerHandle = {
    stopTimer: () => void;
};

interface TimerProps {
    setIsFinished: Dispatch<SetStateAction<boolean>>;
}

interface CurrentTimeProps {
    hours: number;
    minutes: number;
    seconds: number;
}

const getRemainingTime = ({ hours, minutes, seconds }: CurrentTimeProps) => {
    return `${hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
};

const Timer = forwardRef<StopTimerHandle, TimerProps>((props, ref) => {
    const { defaultHours, defaultMinutes, defaultSeconds } = config.timer;
    const [hours, setHours] = useState<number>(defaultHours);
    const [minutes, setMinutes] = useState<number>(defaultMinutes);
    const [seconds, setSeconds] = useState<number>(defaultSeconds);

    // При начале, в локалку отправить текущее время и конечное (текущее плюс время таймера)
    // И каждый раз при перезагрузке, надо будет брать конечное и отнимать от него текущее и проверять, сколько времени осталось и осталось ли вообще

    /**
const date = new Date();

const seconds = Math.floor(date.getTime() / 1000)

console.log(new Date((seconds + 3600) * 1000))

console.log(new Date())

     */

    useEffect(() => {
        const { setIsFinished } = props;

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

        if (seconds === 0 && minutes === 0 && hours === 0) {
            setIsFinished(true);
        }

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
            {getRemainingTime({ hours: hours, minutes: minutes, seconds: seconds })}
        </div>
    );
});

export default Timer;