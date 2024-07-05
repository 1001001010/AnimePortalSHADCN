import { PageProps } from "@/types";
import Header from "@/Components/Header";
import * as React from "react";
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
    user: { name: string; email: string; created_at: string };
    users: { name: string; email: string }[];
}

const Friends: React.FC<FriendsProps> = ({ auth, user, users }) => {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState("");
    const [filteredUsers, setFilteredUsers] = React.useState(users);

    const handleSearch = (searchValue: string) => {
        const filtered = users.filter((user) => {
            const name = user.name.toLowerCase();
            const email = user.email.toLowerCase();
            const search = searchValue.toLowerCase();
            return name.includes(search) || email.includes(search);
        });
        setFilteredUsers(filtered);
    };

    return (
        <>
            <Header auth={auth} />
            <div className="ml-14 max-md:ml-0">
                <div className="m-4 border border-gray-200 rounded-lg shadow dark:border-gray-700">
                    <ul className="p-4 w-full">
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className="justify-between w-full"
                                >
                                    {value ? value : "Search friends..."}
                                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full">
                                <Command>
                                    <CommandInput
                                        placeholder="Search friends..."
                                        className="h-9 w-full"
                                        value={value}
                                        onValueChange={(value) => {
                                            setValue(value);
                                            handleSearch(value);
                                        }}
                                    />
                                    <CommandList>
                                        <CommandEmpty>
                                            No friends found.
                                        </CommandEmpty>
                                        <CommandGroup>
                                            {filteredUsers.map((user) => (
                                                <CommandItem
                                                    key={user.email}
                                                    value={user.name}
                                                >
                                                    {user.name}
                                                    <CheckIcon className="ml-auto h-4 w-4" />
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Friends;
