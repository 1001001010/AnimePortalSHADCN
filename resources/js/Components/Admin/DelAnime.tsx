import { Button } from "@/shadcn/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/shadcn/ui/dialog";
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/shadcn/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/shadcn/ui/popover";
import { Anime, PageProps } from "@/types";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { toast } from "sonner";

export default function DelAnimeForm({
    animeList,
}: PageProps<{ animeList: Anime[] }>) {
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState("");

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        anime_id: 0,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route("DelAnime"), {
            onSuccess: () => {
                toast("Успешно", {
                    description: "Аниме успешно удалено",
                });
                window.location.reload();
            },
            onError: () => {
                toast("Ошибка удаления", {
                    description: "Ошибка! Попробуйте позже",
                });
            },
        });
    };
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant={"outline"}>Удалить аниме</Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogDescription className="flex flex-col gap-3">
                            <p>Выберите аниме для удаления</p>
                            <form className="flex gap-4" onSubmit={submit}>
                                <Popover open={open} onOpenChange={setOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={open}
                                            className="w-full justify-between"
                                        >
                                            {value
                                                ? animeList.find(
                                                      (anime) =>
                                                          anime.name === value
                                                  )?.name
                                                : data.anime_id
                                                ? ""
                                                : "Выберите аниме"}
                                            <ChevronsUpDown className="ml-2 h-4 w-0 shrink-0 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className=" p-0">
                                        <Command>
                                            <CommandInput placeholder="Введите название" />
                                            <CommandList>
                                                <CommandEmpty>
                                                    Аниме не найдено
                                                </CommandEmpty>
                                                <CommandGroup>
                                                    {animeList.map(
                                                        (anime, index) => (
                                                            <CommandItem
                                                                key={index}
                                                                value={
                                                                    anime.name
                                                                }
                                                                onSelect={(
                                                                    currentValue
                                                                ) => {
                                                                    setValue(
                                                                        currentValue ===
                                                                            value
                                                                            ? ""
                                                                            : currentValue
                                                                    );
                                                                    setOpen(
                                                                        false
                                                                    );
                                                                    setData(
                                                                        "anime_id",
                                                                        anime.id
                                                                    );
                                                                }}
                                                            >
                                                                <Check
                                                                    className={cn(
                                                                        "mr-2 h-4 w-4",
                                                                        value ===
                                                                            anime.name
                                                                            ? "opacity-100"
                                                                            : "opacity-0"
                                                                    )}
                                                                />
                                                                {anime.name}
                                                            </CommandItem>
                                                        )
                                                    )}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                                <Button type="submit">Удалить</Button>
                            </form>
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    );
}
