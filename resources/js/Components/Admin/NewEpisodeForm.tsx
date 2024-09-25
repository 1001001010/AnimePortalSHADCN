import { Anime, PageProps, Season } from "@/types";
import * as React from "react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/shadcn/ui/dialog";
import { Button } from "@/shadcn/ui/button";
import { Input } from "@/shadcn/ui/input";
import { Label } from "@/shadcn/ui/label";
import { FormEventHandler } from "react";
import { useState } from "react";
import { useForm } from "@inertiajs/react";
import { toast } from "sonner";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shadcn/ui/select";
import * as tus from "tus-js-client";

export default function NewEpisodeForm({
    Season,
}: PageProps<{ Anime: Anime; Season: Season[] }>) {
    const { data, setData, post, processing, errors, reset } = useForm({
        season_id: "",
        file_url: "",
        file: null as File | null,
    });
    const [isOpen, setIsOpen] = useState(false);
    const csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        ?.getAttribute("content");

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setData("file", event.target.files[0]);

            const file = event.target.files[0];
            const upload = new tus.Upload(file, {
                endpoint: "http://127.0.0.1:8000/tus/upload",
                retryDelays: [0, 3000, 5000, 10000, 20000],
                metadata: {
                    filename: file.name,
                    filetype: file.type,
                },
                headers: {
                    "X-CSRF-TOKEN": csrfToken || "",
                },
                onError: function (error) {
                    console.log("Failed because: " + error);
                },
                onProgress: function (bytesUploaded, bytesTotal) {
                    var percentage = (
                        (bytesUploaded / bytesTotal) *
                        100
                    ).toFixed(2);
                    console.log(bytesUploaded, bytesTotal, percentage + "%");
                },
                onSuccess: function () {
                    if (upload.file instanceof File) {
                        setData("file_url", upload.file.name);
                    } else {
                        // Handle the case where upload.file is not a File
                        console.log("Upload file is not a File instance");
                    }
                },
            });

            // Check if there are any previous uploads to continue.
            upload.findPreviousUploads().then(function (previousUploads) {
                // Found previous uploads so we select the first one.
                if (previousUploads.length) {
                    upload.resumeFromPreviousUpload(previousUploads[0]);
                }

                // Start the upload
                upload.start();
            });
        }
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("season_id", data.season_id);
        if (data.file) {
            formData.append("file", data.file);
        }

        post(route("NewEpisode"), {
            preserveScroll: true,
            data: formData,
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
            <Button
                variant="outline"
                className="w-1/2 max-sm:w-full"
                onClick={handleSeasonClick}
            >
                Добавить Эпизод
            </Button>
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
                        <Button type="submit" disabled={processing}>
                            Добавить
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
}
