import { PageProps } from "@/types";
import Header from "@/Components/Header";
import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/shadcn/ui/popover";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Button } from "@/shadcn/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/shadcn/ui/command";

interface FriendsProps {
    auth: any;
    users: { name: string; email: string }[];
}

const Friends: React.FC<FriendsProps> = ({ auth, users }) => {
    const [open, setOpen] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [filteredUsers, setFilteredUsers] = useState(users);

    const handleSearch = (searchValue: string) => {
        if (searchValue.trim() === "") {
            setFilteredUsers(users);
        } else {
            const filtered = users.filter((user) => {
                const name = user.name.toLowerCase();
                const email = user.email.toLowerCase();
                const search = searchValue.toLowerCase();
                return name.includes(search) || email.includes(search);
            });
            setFilteredUsers(filtered);
        }
    };

    return (
        <>
            <Header auth={auth} />
            <div className="ml-14 max-md:ml-0">
                <div className="m-4 border border-gray-200 rounded-lg shadow dark:border-gray-700">
                    <ul className="p-4 w-full">
                        <Popover open={open} onOpenChange={setOpen}>
                            <Command>
                                <CommandInput
                                    placeholder="Поиск друзей..."
                                    className="h-9 w-full"
                                    value={searchValue}
                                    onValueChange={(value) => {
                                        setSearchValue(value);
                                        handleSearch(value);
                                    }}
                                />
                                {searchValue && (
                                    <CommandList>
                                        {filteredUsers.length > 0 ? (
                                            <CommandGroup>
                                                {filteredUsers.map((user) => (
                                                    <CommandItem
                                                        key={user.email}
                                                        value={user.name}
                                                    >
                                                        {user.name}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        ) : (
                                            <CommandEmpty>
                                                Друзей не найдено.
                                            </CommandEmpty>
                                        )}
                                    </CommandList>
                                )}
                            </Command>
                        </Popover>
                    </ul>
                    <ul className="m-4">Ваши друзья</ul>
                </div>
            </div>
        </>
    );
};

export default Friends;
