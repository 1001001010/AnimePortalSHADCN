import React, { useState, useEffect } from "react";
import { Button } from "@/shadcn/ui/button";
import type { ActiveSession } from "@/types";

interface ActiveSessionProps {
    activeSessions: ActiveSession[];
}

const ActiveSession: React.FC<ActiveSessionProps> = ({ activeSessions }) => {
    const handleDeleteSession = (sessionId: number) => {
        fetch(`/profile/session/${sessionId}`, {
            method: "DELETE",
        })
            .then((response) => response.json())
            .then(() => {
                console.log(`Session ${sessionId} deleted successfully`);
            })
            .catch((error) => console.error(error));
    };

    return (
        <div>
            <ul>
                {activeSessions.map((session) => (
                    <li
                        key={session.id}
                        className="mb-4 border border-gray-200 rounded-lg shadow dark:border-gray-700 w-full p-4"
                    >
                        <p>IP Address: {session.ip_address}</p>
                        <p>User Agent: {session.user_agent}</p>
                        <p>
                            Последняя активность:{" "}
                            {new Date(
                                session.last_activity * 1000
                            ).toLocaleString()}
                        </p>

                        <Button
                            variant="outline"
                            className="mt-2"
                            onClick={() => handleDeleteSession(session.id)}
                        >
                            Завершить
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ActiveSession;
