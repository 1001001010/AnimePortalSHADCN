import React, { useState, useEffect } from "react";
import axios from "axios";

interface ActiveSessionProps {
    // Add any props you need here
}

interface ActiveSession {
    id: number;
    user_id: number;
    ip_address: string;
    user_agent: string;
    created_at: string;
    updated_at: string;
}

const ActiveSession: React.FC<ActiveSessionProps> = () => {
    const [activeSessions, setActiveSessions] = useState<ActiveSession[]>([]);

    useEffect(() => {
        axios
            .get("/api/active-sessions") // Replace with your Laravel API endpoint
            .then((response) => {
                setActiveSessions(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <div>
            <h2>Активные сессии</h2>
            <ul>
                {activeSessions.map((session) => (
                    <li key={session.id}>
                        <span>IP Address: {session.ip_address}</span>
                        <br />
                        <span>User Agent: {session.user_agent}</span>
                        <br />
                        <span>Created at: {session.created_at}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ActiveSession;
