import { PageProps, User } from "@/types";

export default function ProfileImage({
    auth,
    user_info,
}: PageProps<{
    user_info: User;
}>) {
    return (
        <>
            <div className="w-44 h-full m-2">
                {user_info ? (
                    <div>
                        {user_info.profile_image ? (
                            <img
                                src={`/../${user_info.profile_image}`}
                                className="rounded"
                            ></img>
                        ) : (
                            <img
                                src="/img/defaultAvatar.png"
                                className="rounded"
                            ></img>
                        )}
                    </div>
                ) : (
                    <div>
                        {auth.user.profile_image ? (
                            <img
                                src={auth.user.profile_image}
                                className="rounded"
                            ></img>
                        ) : (
                            <img
                                src="/img/defaultAvatar.png"
                                className="rounded"
                            ></img>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}
