"use client";
import React, { FormEventHandler } from "react";
import { Button } from "@/shadcn/ui/button";
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/shadcn/ui/dialog";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shadcn/ui/select";
import { Card, CardContent } from "@/shadcn/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/shadcn/ui/carousel";
import { Input } from "@/shadcn/ui/input";
import { Textarea } from "@/shadcn/ui/textarea";
import { toast } from "sonner";
import { Anime, PageProps } from "@/types";
import { useForm } from "@inertiajs/react";
import { type, status } from "@/app";

export default function EditAnimeInfo({
    auth,
    anime,
}: PageProps<{ anime: Anime }>) {
    const { data, setData, post, reset, errors } = useForm({
        age: "",
        status: "",
        name: "",
        type: "",
        original: "",
        studio: "",
        voice: "",
        director: "",
        autor: "",
        description: "",
        cover: null as File | null,
        screens: [] as File[],
    });

    const [open, setOpen] = React.useState(false);
    const [selectedFile, setSelectedFile] = React.useState<null | File>(null);
    const [preview, setPreview] = React.useState<null | string>(null);
    // const [blocks, setBlocks] = useState<{ id: number; image: File | null }[]>;

    // const handleFileChange = () => {
    //     const file = anime.cover;
    //     if (!file.type.match(/^image\/(png|jpeg|jpg|webp)$/)) {
    //         alert("Загрузите изображение формата: png, jpeg, jpg, webp");
    //         return;
    //     }
    //     setSelectedFile(file);
    //     const reader = new FileReader();
    //     reader.onloadend = () => {
    //         if (typeof reader.result === "string") {
    //             setPreview(reader.result);
    //         }
    //     };
    //     reader.readAsDataURL(file);
    //     setData("cover", file);
    // };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("NewAnime"), {
            onSuccess: () => {
                // setBlocks([]);
                setOpen(false);
                // setSelectedFile(null);
                // setPreview(null);
                toast("Аниме успешно добавлено");
            },
            onError: () => {
                toast("Ошибка добавления аниме");
            },
        });
    };
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Редактировать</Button>
                </DialogTrigger>
                <form onSubmit={submit}>
                    <DialogContent className="max-md:max-h-screen max-md:overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Добавить Аниме</DialogTitle>
                        </DialogHeader>
                        <div className="flex justify-around max-md:gap-2">
                            <div className="w-1/2 max-md:w-full max-md:items-center flex flex-col">
                                {/* {preview ? (
                                    <img
                                        src={preview}
                                        className="w-full h-full mb-2 mx-auto"
                                    />
                                ) : (
                                    <div
                                        className={`w-full h-full border border-input rounded-lg mb-2 mx-auto ${
                                            errors.description
                                                ? "border-red-500"
                                                : ""
                                        }`}
                                    />
                                )}
                                <Input
                                    value={anime.cover}
                                    id="cover"
                                    name="cover"
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className={`custom-file-input2 ${
                                        errors.cover ? "border-red-500" : ""
                                    }`}
                                /> */}
                            </div>
                            <div>
                                <Input
                                    value={anime.name}
                                    id="name"
                                    name="name"
                                    type="text"
                                    placeholder="Название"
                                    className={` ${
                                        errors.name ? "border-red-500" : ""
                                    }`}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                />
                                <div className="flex flex-col mt-2 gap-2">
                                    <Select
                                        value={anime.type}
                                        onValueChange={(value) =>
                                            setData("type", value)
                                        }
                                    >
                                        <SelectTrigger
                                            className={`w-full ${
                                                errors.status
                                                    ? "border-red-500"
                                                    : ""
                                            }`}
                                        >
                                            <SelectValue placeholder="Тип" />
                                        </SelectTrigger>
                                        <SelectContent
                                            className={` ${
                                                errors.name
                                                    ? "border-red-500"
                                                    : ""
                                            }`}
                                        >
                                            <SelectGroup>
                                                <SelectItem value="TV">
                                                    ТВ Сериал
                                                </SelectItem>
                                                <SelectItem value="Film">
                                                    Фильм
                                                </SelectItem>
                                                <SelectItem value="speshl">
                                                    Спешл
                                                </SelectItem>
                                                <SelectItem value="OVA">
                                                    OVA
                                                </SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>

                                    <Select
                                        value={anime.status}
                                        onValueChange={(value) =>
                                            setData("status", value)
                                        }
                                    >
                                        <SelectTrigger
                                            className={`w-full ${
                                                errors.status
                                                    ? "border-red-500"
                                                    : ""
                                            }`}
                                        >
                                            <SelectValue placeholder="Статус" />
                                        </SelectTrigger>
                                        <SelectContent
                                            className={` ${
                                                errors.name
                                                    ? "border-red-500"
                                                    : ""
                                            }`}
                                        >
                                            <SelectGroup>
                                                <SelectItem value="ongoing">
                                                    Онгоинг
                                                </SelectItem>
                                                <SelectItem value="came_out">
                                                    Вышел
                                                </SelectItem>
                                                <SelectItem value="preview">
                                                    Анонс
                                                </SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <Input
                                        value={anime.original}
                                        id="original"
                                        name="original"
                                        type="text"
                                        placeholder="Первоисточник"
                                        onChange={(e) =>
                                            setData("original", e.target.value)
                                        }
                                        className={` ${
                                            errors.original
                                                ? "border-red-500"
                                                : ""
                                        }`}
                                    />
                                    <Input
                                        value={anime.studio}
                                        id="studio"
                                        name="studio"
                                        type="text"
                                        placeholder="Студия"
                                        onChange={(e) =>
                                            setData("studio", e.target.value)
                                        }
                                        className={` ${
                                            errors.studio
                                                ? "border-red-500"
                                                : ""
                                        }`}
                                    />
                                    <Select
                                        value={anime.age}
                                        onValueChange={(value) =>
                                            setData("age", value)
                                        }
                                    >
                                        <SelectTrigger
                                            className={`w-full ${
                                                errors.age
                                                    ? "border-red-500"
                                                    : ""
                                            }`}
                                        >
                                            <SelectValue placeholder="Ограничения" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="0">
                                                    0+
                                                </SelectItem>
                                                <SelectItem value="6">
                                                    6+
                                                </SelectItem>
                                                <SelectItem value="12">
                                                    12+
                                                </SelectItem>
                                                <SelectItem value="16">
                                                    16+
                                                </SelectItem>
                                                <SelectItem value="18">
                                                    18+
                                                </SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <Input
                                        value={anime.voice}
                                        id="voice"
                                        name="voice"
                                        type="text"
                                        placeholder="Озвучка"
                                        onChange={(e) =>
                                            setData("voice", e.target.value)
                                        }
                                        className={`${
                                            errors.voice ? "border-red-500" : ""
                                        }`}
                                    />
                                    <Input
                                        value={anime.director}
                                        id="director"
                                        name="director"
                                        type="text"
                                        placeholder="Режиссёр"
                                        onChange={(e) =>
                                            setData("director", e.target.value)
                                        }
                                        className={`${
                                            errors.director
                                                ? "border-red-500"
                                                : ""
                                        }`}
                                    />
                                    <Input
                                        value={anime.autor}
                                        id="autor"
                                        name="autor"
                                        type="text"
                                        placeholder="Автор оригинала"
                                        onChange={(e) =>
                                            setData("autor", e.target.value)
                                        }
                                        className={`${
                                            errors.autor ? "border-red-500" : ""
                                        }`}
                                    />
                                </div>
                            </div>
                        </div>
                        <Textarea
                            value={anime.description}
                            placeholder="Описание"
                            name="description"
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                            className={`${
                                errors.description ? "border-red-500" : ""
                            }`}
                        />
                        {/* <div className="flex justify-center">
                            <Carousel
                                opts={{
                                    align: "start",
                                }}
                                className="w-full max-w-sm"
                            >
                                <CarouselContent>
                                    {blocks.map((block, index) => (
                                        <CarouselItem
                                            key={block.id}
                                            className="md:basis-1/2 lg:basis-1/3"
                                        >
                                            <div className="p-1">
                                                {block.image ? (
                                                    <img
                                                        src={URL.createObjectURL(
                                                            block.image
                                                        )}
                                                        alt="Загруженное изображение"
                                                    />
                                                ) : (
                                                    <Card>
                                                        <CardContent className="flex aspect-square items-center justify-center p-6 h-full">
                                                            <span className="text-3xl font-semibold">
                                                                {index + 1}
                                                            </span>
                                                        </CardContent>
                                                    </Card>
                                                )}
                                            </div>
                                        </CarouselItem>
                                    ))}
                                    <CarouselItem className="md:basis-1/2 lg:basis-1/3 h-full">
                                        <div className="p-1 max-sm:p-0">
                                            <Card>
                                                <Input
                                                    type="file"
                                                    multiple
                                                    accept="image/*"
                                                    onChange={
                                                        handleScreenChange
                                                    }
                                                    className={`custom-file-input2 ${
                                                        errors.description
                                                            ? "border-red-500"
                                                            : ""
                                                    }`}
                                                />
                                            </Card>
                                        </div>
                                    </CarouselItem>
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>
                        </div> */}
                        <DialogFooter>
                            <Button onClick={submit}>Сохранить</Button>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Dialog>
        </>
    );
}
