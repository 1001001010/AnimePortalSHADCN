import * as React from "react";
import { PageProps } from "@/types";
import { useForm } from "@inertiajs/react";
import Header from "@/Components/Header";
import { FormEventHandler } from "react";
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
    SelectLabel,
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
import { Form } from "react-hook-form";

export default function AdminPanel({ auth }: PageProps<{}>) {
    const { data, setData, post, processing, reset } = useForm({
        age: "",
        genre: "",
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

    const [selectedFile, setSelectedFile] = React.useState<null | File>(null);
    const [preview, setPreview] = React.useState<null | string>(null);
    const [blocks, setBlocks] = useState<{ id: number; image: File | null }[]>(
        []
    );

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === "string") {
                    setPreview(reader.result);
                }
            };
            reader.readAsDataURL(event.target.files[0]);
            setData("cover", event.target.files[0]);
        }
    };

    const handleScreenChange = (event: React.FormEvent<HTMLInputElement>) => {
        const file = (event.target as HTMLInputElement).files?.[0];
        if (file) {
            const newBlock = {
                id: blocks.length + 1,
                image: file,
            };
            setBlocks([...blocks, newBlock]);
            setData("screens", [...data.screens, file]);
        }
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("NewAnime"));
    };

    return (
        <>
            <Header auth={auth} />
            <div className="ml-14 ml:ml-0 max-sm:ml-0">
                <div className="m-4 border border-gray-200 rounded-lg shadow dark:border-gray-700">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline">Добавить Аниме</Button>
                        </DialogTrigger>
                        {/* Форма добавления аниме */}
                        <form onSubmit={submit}>
                            <DialogContent className="max-md:max-h-screen max-md:overflow-y-auto">
                                <DialogHeader>
                                    <DialogTitle>Добавить Аниме</DialogTitle>
                                </DialogHeader>
                                <div className="flex justify-around">
                                    <div className="w-1/2 max-md:w-full max-md:items-center flex flex-col">
                                        {preview ? (
                                            <img
                                                src={preview}
                                                className="w-full h-full mb-2 mx-auto"
                                            />
                                        ) : (
                                            <div className="w-full h-full border border-input rounded-lg mb-2 mx-auto" />
                                        )}
                                        <Input
                                            id="cover"
                                            name="cover"
                                            type="file"
                                            multiple
                                            className=" custom-file-input2"
                                            onChange={handleFileChange}
                                        />
                                    </div>
                                    <div>
                                        <Input
                                            id="name"
                                            name="name"
                                            type="text"
                                            placeholder="Название"
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                        />
                                        <div className="flex flex-col mt-2 gap-2">
                                            <Input
                                                id="type"
                                                name="type"
                                                type="text"
                                                placeholder="Тип"
                                                onChange={(e) =>
                                                    setData(
                                                        "type",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <Select
                                                onValueChange={(value) =>
                                                    setData("genre", value)
                                                }
                                            >
                                                <SelectTrigger className="w-full">
                                                    <SelectValue placeholder="Выберите жанр" />
                                                </SelectTrigger>
                                                <SelectContent>
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
                                                id="original"
                                                name="original"
                                                type="text"
                                                placeholder="Первоисточник"
                                                onChange={(e) =>
                                                    setData(
                                                        "original",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <Input
                                                id="studio"
                                                name="studio"
                                                type="text"
                                                placeholder="Студия"
                                                onChange={(e) =>
                                                    setData(
                                                        "studio",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <Select
                                                onValueChange={(value) =>
                                                    setData("age", value)
                                                }
                                            >
                                                <SelectTrigger className="w-full">
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
                                                id="voice"
                                                name="voice"
                                                type="text"
                                                placeholder="Озвучка"
                                                onChange={(e) =>
                                                    setData(
                                                        "voice",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <Input
                                                id="director"
                                                name="director"
                                                type="text"
                                                placeholder="Режиссёр"
                                                onChange={(e) =>
                                                    setData(
                                                        "director",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            <Input
                                                id="autor"
                                                name="autor"
                                                type="text"
                                                placeholder="Автор оригинала"
                                                onChange={(e) =>
                                                    setData(
                                                        "autor",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                                <Textarea
                                    placeholder="Описание"
                                    name="description"
                                    onChange={(e) =>
                                        setData("description", e.target.value)
                                    }
                                />
                                <div className="flex justify-center">
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
                                                                        {index +
                                                                            1}
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
                                                            onChange={
                                                                handleScreenChange
                                                            }
                                                            className="custom-file-input2"
                                                        />
                                                    </Card>
                                                </div>
                                            </CarouselItem>
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
                </div>
            </div>
        </>
    );
}
