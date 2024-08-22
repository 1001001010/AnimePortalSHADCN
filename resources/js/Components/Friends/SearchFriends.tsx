import React, { FormEventHandler, useState } from "react";
import { useForm } from "@inertiajs/react";
import { FriendShips, PageProps } from "@/types";
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

export default function SearchFriends({
    users,
    request,
}: PageProps<{
    users: any[];
    request: FriendShips[];
}>) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    const [focused, setFocused] = useState(false); // Add a new state for focus
    const { data, setData, post, processing, errors } = useForm({
        friend_id: null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("friends.add"));
    };

    return (
        <>
            <ul className="p-4 w-full">
                <Command>
                    <CommandInput
                        placeholder="Введите имя"
                        className="min-w-full"
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        onClick={(e) =>
                            setValue((e.target as HTMLInputElement).value)
                        }
                    />
                    {focused || value ? ( // Render CommandList only when focused or has value
                        <CommandList>
                            <CommandEmpty>Пользователь не найден</CommandEmpty>
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
                                                onSelect={(currentValue) => {
                                                    setValue(
                                                        currentValue === value
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
                    ) : null}
                </Command>
            </ul>
        </>
    );
}
