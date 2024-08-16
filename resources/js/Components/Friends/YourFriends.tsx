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
            <div className="grid grid-cols-4 gap-4 m-4">
                {friend_list.map((friend, index) => (
                    <Alert className="truncate overflow-hidden">
                        <UserRoundCheck className="h-4 w-4 " />
                        {friend.user_id === auth.user.id ? (
                            <AlertTitle>{friend.friend.name}</AlertTitle>
                        ) : (
                            <AlertTitle>{friend.user.name}</AlertTitle>
                        )}
                        <AlertDescription>
                            <Link href="#" className="text-gray-600">
                                Перейти в профиль
                            </Link>
                        </AlertDescription>
                    </Alert>
                ))}
            </div>
        </>
    );
}
