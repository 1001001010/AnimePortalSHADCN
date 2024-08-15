"use client";

import { FriendShips, PageProps } from "@/types";
import React, { FormEventHandler } from "react";
import { useForm } from "@inertiajs/react";
import Header from "@/Components/Header";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/shadcn/ui/command";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function Friends({
    auth,
    users,
    request,
    friendship,
}: PageProps<{
    users: any[];
    request: FriendShips[];
    friendship: FriendShips;
}>) {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState("");
    const { data, setData, post, processing, errors } = useForm({
        friend_id: null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("friends.add"));
    };

    return (
        <>
            <Header friendship={friendship} auth={auth} />
            <div className="ml-14 ml:ml-0 max-sm:ml-0">
                <div className="m-4 border border-gray-200 rounded-lg shadow dark:border-gray-700">
                    <ul className="p-4 w-full">
                        <Command>
                            <CommandInput
                                placeholder="Введите имя"
                                className="min-w-full"
                            />
                            <CommandList>
                                <CommandEmpty>
                                    Пользователь не найден
                                </CommandEmpty>
                                <CommandGroup>
                                    <form onSubmit={submit}>
                                        {users.map((user, index) => (
                                            <button
                                                type="submit"
                                                className="w-full"
                                                key={index}
                                            >
                                                <CommandItem
                                                    value={user.name}
                                                    onSelect={(
                                                        currentValue
                                                    ) => {
                                                        setValue(
                                                            currentValue ===
                                                                value
                                                                ? ""
                                                                : currentValue
                                                        );
                                                        setOpen(false);
                                                        setData({
                                                            friend_id: user.id,
                                                        });
                                                    }}
                                                >
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            value === user.id
                                                                ? "opacity-100"
                                                                : "opacity-0"
                                                        )}
                                                    />
                                                    {request.some(
                                                        (req) =>
                                                            req.friend_id ===
                                                            user.id
                                                    ) ? (
                                                        <div className="flex flex-wrap flex-row justify-between w-full">
                                                            <p>{user.name}</p>
                                                            <p className="text-gray-500">
                                                                Заявка уже
                                                                отправлена
                                                            </p>
                                                        </div>
                                                    ) : (
                                                        user.name
                                                    )}
                                                </CommandItem>
                                            </button>
                                        ))}
                                    </form>
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </ul>
                    <ul className="m-4">Ваши друзья</ul>
                </div>
            </div>
        </>
    );
}
