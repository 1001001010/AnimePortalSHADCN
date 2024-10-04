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

// Статус
const type = [
    { status: "TV", text: "ТВ Сериал" },
    { status: "Film", text: "Фильм" },
    { status: "speshl", text: "Спешл" },
    { status: "OVA", text: "OVA" },
];

const status = [
    { status: "ongoing", text: "Онгоинг" },
    { status: "came_out", text: "Вышел" },
    { status: "preview", text: "Анонс" },
];

export default function UpdateAnimeInfo({
    auth,
    anime,
}: PageProps<{ anime: Anime }>) {
    const { put, setData, post, reset, errors } = useForm({
        anime_id: anime.id,
        age: anime.age,
        status: anime.status,
        name: anime.name,
        type: anime.type,
        original: anime.original,
        studio: anime.studio,
        voice: anime.voice,
        director: anime.director,
        autor: anime.autor,
        description: anime.description,
        cover: null as File | null,
        screens: [] as File[],
    });

    const imageDataArray: string[] = JSON.parse(anime.screens);

    const [isOpen, setIsOpen] = React.useState(false);
    const [selectedFile, setSelectedFile] = React.useState<null | File>(null);
    const [preview, setPreview] = React.useState<null | string>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            if (!file.type.match(/^image\/(png|jpeg|jpg|webp)$/)) {
                alert("Загрузите изображение формата: png, jpeg, jpg, webp");
                return;
            }
            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === "string") {
                    setPreview(reader.result);
                }
            };
            reader.readAsDataURL(file);
            setData("cover", file);
        }
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("anime.edit"), {
            onSuccess: () => {
                setIsOpen(false);
                setSelectedFile(null);
                setPreview(null);
                toast("Аниме успешно обновлено");
            },
            onError: () => {
                toast("Ошибка изменения аниме");
            },
        });
    };

    return (
        <>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline" onClick={() => setIsOpen(true)}>
                        Редактировать
                    </Button>
                </DialogTrigger>
                <form onSubmit={submit}>
                    <DialogContent className="max-md:max-h-screen max-md:overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Редактировать Аниме</DialogTitle>
                        </DialogHeader>
                        <div className="flex justify-around max-md:gap-2">
                            <div className="w-1/2 max-md:w-full max-md:items-center flex flex-col">
                                {preview ? (
                                    <img
                                        src={preview}
                                        className="w-full h-full mb-2 mx-auto"
                                    />
                                ) : (
                                    <img
                                        src={anime.cover}
                                        className="w-full h-full mb-2 mx-auto"
                                    />
                                )}
                                <Input
                                    id="cover"
                                    name="cover"
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className={`custom-file-input2 ${
                                        errors.cover ? "border-red-500" : ""
                                    }`}
                                />
                            </div>
                            <div>
                                <Input
                                    defaultValue={anime.name}
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
                                        defaultValue={anime.type}
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
                                        defaultValue={anime.status}
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
                                        defaultValue={anime.original}
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
                                        defaultValue={anime.studio}
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
                                        defaultValue={anime.age}
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
                                        defaultValue={anime.voice}
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
                                        defaultValue={anime.director}
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
                                        defaultValue={anime.autor}
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
                            defaultValue={anime.description}
                            placeholder="Описание"
                            name="description"
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                            className={`${
                                errors.description ? "border-red-500" : ""
                            }`}
                        />
                        <div className="flex justify-center">
                            <Carousel
                                opts={{
                                    align: "start",
                                }}
                                className="w-full max-w-sm"
                            >
                                <CarouselContent>
                                    {imageDataArray.map((screen, index) => (
                                        <CarouselItem
                                            key={index}
                                            className="md:basis-1/2 lg:basis-1/3"
                                        >
                                            <div className="p-1">
                                                <img
                                                    src={screen}
                                                    alt="Загруженное изображение"
                                                />
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>
                        </div>
                        <DialogFooter>
                            <Button onClick={submit}>Сохранить</Button>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Dialog>
        </>
    );
}
