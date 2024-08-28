import { FriendShips, PageProps, User } from "@/types";
import Header from "@/Components/Header";
import ProfileImage from "@/Components/Profile/ProfileImage";

export default function Profile({
    auth,
    friendship,
    user_info,
}: PageProps<{
    user: User;
    friendship: FriendShips;
    user_info: User;
}>) {
    return (
        <>
            <Header friendship={friendship} auth={auth} />
            <div className="ml-14 ml:ml-0 max-sm:ml-0">
                <div className="m-4 border rounded-lg shadow">
                    <div className="flex">
                        <ProfileImage auth={auth} user_info={user_info} />
                        <div className="m-2 text-gray-900 dark:text-gray-100 flex flex-col gap-4">
                            {user_info ? (
                                <div className="flex flex-col gap-4">
                                    <h3>{user_info.name}</h3>
                                    <div>
                                        Дата регистрации:{" "}
                                        {`${new Date(
                                            user_info.created_at
                                        ).toLocaleString()}`}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-4">
                                    <h3>{auth.user.name}</h3>
                                    <div>
                                        Дата регистрации:{" "}
                                        {`${new Date(
                                            auth.user.created_at
                                        ).toLocaleString()}`}
                                    </div>
                                    <div>Email: {auth.user.email}</div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
