"use client";

import { useEffect, useState } from "react";

type TimerClientProps = {
    sessionDate: Date;
    type: "Created" | "Updated" | "Expires";
    text?: "ago" | "left";
    className: string;
};

export default function TimerClient(props: TimerClientProps) {
    const { sessionDate, type, text, className } = props;
    const [time, setTime] = useState("0s");

    const refreshTimer = () => {
        if (!text) {
            const date = new Date(sessionDate)
                .toLocaleTimeString('fr-FR',{ hour: '2-digit', minute: '2-digit' })
                .replace(':', 'h')

            setTime(date)
        } else {
            let time = 0

            if (type === "Created")
                time = new Date().getTime() - new Date(sessionDate).getTime()
            else if (type === "Updated")
                time = new Date().getTime() - new Date(sessionDate).getTime()
            else if (type === "Expires")
                time = new Date(sessionDate).getTime() - new Date().getTime()

            const seconds = Math.floor(time / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);

            const remainingSeconds = seconds % 60;
            const remainingMinutes = minutes % 60;

            let date = ""

            if (hours > 0)
                date += `${hours}h`;
            if (!hours && minutes > 0)
                date += `${remainingMinutes}min`;
            if (!hours && !minutes && remainingSeconds >= 0)
                date += `${remainingSeconds}s`;

            setTime(date)
        }
    }

    useEffect(() => {
        // On load
        refreshTimer();

        // Every second
        if (text) {
            const intervalId = setInterval(refreshTimer, 1000);
            return () => clearInterval(intervalId);
        }
    });

    return (
        <span className={className}>
            {time} {text}
        </span>
    );
}
