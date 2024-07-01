import React, { useState, useEffect } from "react";
import { Button } from "@/shadcn/ui/button";
import type { ActiveSession } from "@/types";
import axios from "axios";
import { v4 as uuid } from "uuid";

interface ActiveSessionProps {
    activeSessions: ActiveSession[];
}

export default function ActiveSession({ activeSessions }: ActiveSessionProps) {
    const handleDestroySession = (sessionId: any) => {
        axios.delete(`/profile/session/${sessionId}`);
    };

    return (
        <div>
            <ul>
                {activeSessions.map((session) => (
                    <li
                        key={uuid()}
                        className="mb-4 border border-gray-200 rounded-lg shadow dark:border-gray-700 w-full p-4"
                    >
                        <p>IP Address: {session.ip_address}</p>
                        <meta
                            name="csrf-token"
                            content="{{ csrf_token() }}"
                        ></meta>
                        <p>User Agent: {session.user_agent}</p>
                        <p>
                            Последняя активность:{" "}
                            {new Date(
                                session.last_activity * 1000
                            ).toLocaleString()}
                        </p>
                        <p>{session.id}</p>
                        <Button
                            variant="outline"
                            className="mt-2"
                            onClick={() =>
                                handleDestroySession(session.payload)
                            }
                        >
                            Завершить
                        </Button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
