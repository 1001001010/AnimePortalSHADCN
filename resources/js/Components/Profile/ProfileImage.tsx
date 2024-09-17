import { Button } from "@/shadcn/ui/button";
import { PageProps, User } from "@/types";
import { Link } from "@inertiajs/react";

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
                    <div className="flex flex-col gap-2">
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
                        <Button variant={"outline"} className="w-full">
                            <Link href={route('profile.edit')}>
                            Редактировать
                            </Link>
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
}
