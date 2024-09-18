import React, { useState, useEffect, FormEventHandler } from "react";
import { Button } from "@/shadcn/ui/button";
import type { ActiveSession } from "@/types";
import { useForm } from "@inertiajs/react";
import { setDate } from "date-fns";

export default function ActiveSession({
    activeSessions,
}: {
    activeSessions: ActiveSession[];
}) {
    const { post, processing, setData } = useForm({
        payload: "",
    });

    const handleDestroySession: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("session.destroy"));
    };

    return (
        <div>
            <ul>
                {activeSessions.map((session, index) => (
                    <form onSubmit={handleDestroySession} key={index}>
                        <li className="mb-4 border rounded-lg shadow w-full p-4 ">
                            <p>IP адрес: {session.ip_address}</p>
                            <p>
                                Последняя активность:{" "}
                                {new Date(
                                    session.last_activity * 1000
                                ).toLocaleString()}
                            </p>
                            <Button
                                type="submit"
                                variant="outline"
                                className="mt-2"
                                disabled={processing}
                                onClick={() =>
                                    setData("payload", session.payload)
                                }
                            >
                                Завершить
                            </Button>
                        </li>
                    </form>
                ))}
            </ul>
        </div>
    );
}
