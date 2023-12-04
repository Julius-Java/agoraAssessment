import React, { useState, useEffect } from "react";

const CallDurationTimer = ({ seconds }: { seconds: number }) => {
    const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });

    useEffect(() => {
        const updateTime = () => {
            const hours = Math.floor(seconds / 3600);
            const minutes = Math.floor((seconds % 3600) / 60);
            const remainingSeconds = seconds % 60;

            setTime({ hours, minutes, seconds: remainingSeconds });
        };

        updateTime();

        // Update the time every second
        const intervalId = setInterval(() => {
            updateTime();
        }, 1000);

        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);
    }, [seconds]);

    const formatTime = (value: number) => (value < 10 ? `0${value}` : value);

    return (
        <span>
            {formatTime(time.hours)}:{formatTime(time.minutes)}:
            {formatTime(time.seconds)}
        </span>
    );
};

export default CallDurationTimer;
