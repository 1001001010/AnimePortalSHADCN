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
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/shadcn/ui/select";
import { toast } from "sonner";
export default function NewEpisodeForm({
    auth,
    Anime,
    Season,
}: PageProps<{ Anime: Anime; Season: Season[] }>) {
    const { data, setData, post, processing, errors, reset } = useForm({
        season_id: "",
        file: null as File | null,
    });
    const [isOpen, setIsOpen] = useState(false);
    const [selectedFile, setSelectedFile] = React.useState<null | File>(null);
    const [preview, setPreview] = React.useState<null | string>(null);
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setData("file", event.target.files[0]);
        }
    };
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("NewEpisode"), {
            onSuccess: () => {
                setIsOpen(false);
                reset();
            },
        });
    };

    const handleSeasonClick = () => {
        if (Season.length > 0) {
            setIsOpen(true);
        } else {
            toast("Нет доступных сезонов!", {
                description: "Сначала добавьте сезон, а потом епизод",
            });
        }
    };
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="w-1/2"
                    onClick={handleSeasonClick}
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
