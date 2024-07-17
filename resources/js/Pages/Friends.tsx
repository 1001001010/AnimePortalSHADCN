import { PageProps } from "@/types";
import Header from "@/Components/Header";
import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/shadcn/ui/popover";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Button } from "@/shadcn/ui/button";
import cn from 'classnames';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shadcn/ui/command";
import { useForm } from "@inertiajs/react";

export default function Friends({
  auth,
  user,
  users,
}: PageProps<{
  user: { name: string; email: string; created_at: string };
  users: any[];
}>) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <>
      <Header auth={auth} />
      <div className="ml-14 ml:ml-0 max-sm:ml-0">
        <div className="m-4 border border-gray-200 rounded-lg shadow dark:border-gray-700">
          <ul className="p-4 w-full">
            <Command>
              <CommandInput
                placeholder="Search user..."
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
                          setValue(currentValue === value? "" : currentValue);
                          setOpen(false);
                        }}
                      >
                        <CheckIcon
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === user.id? "opacity-100" : "opacity-0"
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