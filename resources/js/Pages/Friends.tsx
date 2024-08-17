"use client";

import { Friends, FriendShips, PageProps, User } from "@/types";
import Header from "@/Components/Header";
import YourFriends from "@/Components/Friends/YourFriends";
import SearchFriends from "@/Components/Friends/SearchFriends";

export default function Friend({
    auth,
    users,
    request,
    friendship,
    friend_list,
}: PageProps<{
    users: User[];
    request: FriendShips[];
    friendship: FriendShips;
    friend_list: Friends[];
}>) {
    return (
        <>
            <Header friendship={friendship} auth={auth} />
            <div className="ml-14 ml:ml-0 max-sm:ml-0">
                <div className="m-4 border border-gray-200 rounded-lg shadow dark:border-gray-700">
                    <SearchFriends
                        users={users}
                        request={request}
                        auth={auth}
                    />
                    <YourFriends auth={auth} friend_list={friend_list} />
                </div>
            </div>
        </>
    );
}
