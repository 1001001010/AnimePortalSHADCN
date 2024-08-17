import { FriendShips, PageProps } from "@/types";
import Header from "@/Components/Header";
import { Alert, AlertDescription, AlertTitle } from "@/shadcn/ui/alert";
import { Check, UserPlus, X } from "lucide-react";
import { Link, useForm } from "@inertiajs/react";
import { Button } from "@/shadcn/ui/button";
import { FormEventHandler } from "react";

export default function Edit({
    auth,
    friendship,
    friend_info,
}: PageProps<{
    friendship: FriendShips;
    friend_info: FriendShips[];
}>) {
    const { data, setData, post, processing, reset, errors } = useForm({
        user_id: null as number | null,
        friend_id: null as number | null,
        status: "",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("friends.status"));
    };

    return (
        <>
            <Header auth={auth} friendship={friendship} />
            <div className="ml-14 ml:ml-0 max-sm:ml-0">
                <div className="m-4 p-2 border border-gray-200 rounded-lg shadow dark:border-gray-700 min-h-36">
                    {friend_info.length > 0 ? (
                        <div>
                            <p className="text-center">Новые заявки в друзья</p>
                            <form onSubmit={submit} className="w-full">
                                <div className="pt-4 flex flex-col gap-4 items-center">
                                    {friend_info.map((friend, index) => (
                                        <Alert
                                            className="w-1/3 flex justify-between items-center"
                                            key={index}
                                        >
                                            <UserPlus className="h-4 w-4" />
                                            <div>
                                                <AlertTitle>
                                                    {friend.user.name}
                                                </AlertTitle>
                                                <AlertDescription>
                                                    <Link
                                                        href="#"
                                                        className="text-gray-600"
                                                    >
                                                        Перейти в профиль
                                                    </Link>
                                                </AlertDescription>
                                            </div>
                                            <div className="flex">
                                                <Button
                                                    variant="outline"
                                                    type="submit"
                                                    name="status"
                                                    value="accepted"
                                                    onClick={(e) =>
                                                        setData({
                                                            user_id:
                                                                friend.user_id,
                                                            friend_id:
                                                                friend.friend_id,
                                                            status: "accepted",
                                                        })
                                                    }
                                                >
                                                    <Check />
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    type="submit"
                                                    name="status"
                                                    value="declined"
                                                    onClick={(e) =>
                                                        setData({
                                                            user_id:
                                                                friend.user_id,
                                                            friend_id:
                                                                friend.friend_id,
                                                            status: "declined",
                                                        })
                                                    }
                                                >
                                                    <X />
                                                </Button>
                                            </div>
                                        </Alert>
                                    ))}
                                </div>
                            </form>
                        </div>
                    ) : (
                        <p className="text-center">Новых уведомлений нет</p>
                    )}
                </div>
            </div>
        </>
    );
}
