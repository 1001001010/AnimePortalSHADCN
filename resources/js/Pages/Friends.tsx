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
            <Header auth={auth} />
            <div className="ml-14 ml:ml-0 max-sm:ml-0">
                <div className="m-4 max-sm:m-1 max-sm:p-1 borderrounded-lg shadow border">
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
