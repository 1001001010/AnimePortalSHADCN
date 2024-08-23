import { Anime, PageProps, Season } from "@/types";
import * as React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/shadcn/ui/dialog";
import { Button } from "@/shadcn/ui/button";
import { Input } from "@/shadcn/ui/input";
import { Label } from "@/shadcn/ui/label";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shadcn/ui/select";

export default function NewEpisodeForm({
    Season,
}: PageProps<{ Anime: Anime; Season: Season[] }>) {
    const { data, setData, post, processing, errors, reset } = useForm({
        season_id: "",
        file: null as File | null,
    });
    const [isOpen, setIsOpen] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setData("file", event.target.files[0]);
        }
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("NewEpisode"), {
            preserveScroll: true,
            onSuccess: () => {
                setIsOpen(false);
                reset();
            },
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="w-1/2"
                    onClick={() => setIsOpen(true)}
                >
                    Добавить Эпизод
                </Button>
            </DialogTrigger>
            <form onSubmit={submit} encType="multipart/form-data">
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Добавление эпизода</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <Select
                            onValueChange={(value) =>
                                setData("season_id", value)
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Выберите сезон" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {Season.map((season) => (
                                        <SelectItem
                                            key={season.id}
                                            value={season.id.toString()}
                                            onChange={(e) =>
                                                setData(
                                                    "season_id",
                                                    (
                                                        e.target as HTMLSelectElement
                                                    ).value
                                                )
                                            }
                                        >
                                            {season.name
                                                ? `Сезон ${season.number} (${season.name})`
                                                : `Сезон ${season.number}`}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Видео
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                type="file"
                                className="col-span-3 custom-file-input2"
                                onChange={handleFileChange}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={submit} disabled={processing}>
                            Добавить
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
}
