"use client";

import { Friends, PageProps } from "@/types";
import { Link } from "@inertiajs/react";
import { UserRoundCheck } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/shadcn/ui/alert";

export default function YourFriends({
    auth,
    friend_list,
}: PageProps<{
    friend_list: Friends[];
}>) {
    return (
        <>
            <ul className="m-4">Ваши друзья</ul>
            <div className="grid grid-cols-4 gap-4 m-4 max-xl:grid-cols-2 max-md:grid-cols-1">
                {friend_list.map((friend, index) => (
                    <Alert className="truncate overflow-hidden" key={index}>
                        <UserRoundCheck className="h-4 w-4 " />
                        {friend.user_id === auth.user.id ? (
                            <AlertTitle>{friend.friend.name}</AlertTitle>
                        ) : (
                            <AlertTitle>{friend.user.name}</AlertTitle>
                        )}
                        <AlertDescription>
                            {friend.user_id === auth.user.id ? (
                                <Link
                                    href={route("profile", friend.friend.unix)}
                                >
                                    Перейти в профиль
                                </Link>
                            ) : (
                                <Link href={route("profile", friend.user.unix)}>
                                    Перейти в профиль
                                </Link>
                            )}
                        </AlertDescription>
                    </Alert>
                ))}
            </div>
        </>
    );
}
