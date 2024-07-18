import { PageProps } from "@/types";
import Header from "@/Components/Header";
import { useState } from "react";
import { CheckIcon } from "@radix-ui/react-icons";
import cn from "classnames";
import {
    Command,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/shadcn/ui/command";
import { useForm } from "@inertiajs/react";

export default function Friends({
    auth,
    users,
}: PageProps<{
    user: { name: string; email: string; created_at: string };
    users: any[];
}>) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    const { data, setData, post, processing, errors } = useForm({
        friend_id: null,
    });

    const handleSubmit = (friendId: any) => {
        setData("friend_id", friendId);
        console.log(friendId);
        post(route("friends.add"));
    };

    return (
        <>
            <Header auth={auth} />
            <div className="ml-14 ml:ml-0 max-sm:ml-0">
                <div className="m-4 border border-gray-200 rounded-lg shadow dark:border-gray-700">
                    <ul className="p-4 w-full">
                        <Command>
                            <CommandInput
                                placeholder="Поиск пользователя..."
                                onFocus={() => setOpen(true)}
                                onBlur={() => setOpen(false)}
                            />
                            {open && (
                                <CommandList>
                                    <CommandGroup>
                                        {users.map((user) => (
                                            <CommandItem
                                                key={user.id}
                                                value={user.id}
                                                onSelect={(currentValue) => {
                                                    handleSubmit(currentValue);
                                                    setOpen(false);
                                                }}
                                            >
                                                <CheckIcon
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        value === user.id
                                                            ? "opacity-100"
                                                            : "opacity-0"
                                                    )}
                                                />
                                                {user.name}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            )}
                        </Command>
                    </ul>
                    <ul className="m-4">Ваши друзья</ul>
                </div>
            </div>
        </>
    );
}
