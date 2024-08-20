"use client";
import { Card, CardContent } from "@/shadcn/ui/card";
import { Button } from "@/shadcn/ui/button";
import { Input } from "@/shadcn/ui/input";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/shadcn/ui/pagination";
import { Label } from "@/shadcn/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shadcn/ui/select";
import { Anime, PageProps } from "@/types";
import { Link } from "@inertiajs/react";

export default function ItemsList({ anime }: PageProps<{ anime: Anime[] }>) {
    const status = [
        { status: "ongoing", text: "Онгоинг" },
        { status: "came_out", text: "Вышел" },
        { status: "preview", text: "Анонс" },
    ];

    return (
        <div className="mt-4">
            <div className="flex justify-around max-lg:mx-10 gap-4 max-md:flex-col-reverse max-md:w-full max-md:mx-0">
                <div className="p-2 text-gray-900 dark:text-gray-100 w-full md:w-2/3 max-md:w-3/3 border rounded-lg">
                    <h2 className="text-lg font-medium p-1">Список Аниме</h2>
                    <div className="grid grid-cols-3 max-xl:grid-cols-2 max-md:grid-cols-1 items-center justify-items-center auto-rows-dense gap-4">
                        {Array.isArray(anime) &&
                            anime.map((item, index) => (
                                <Card
                                    className="h-full flex flex-col justify-between"
                                    key={index}
                                >
                                    <CardContent className="flex w-full justify-center items-center p-2 h-full">
                                        <img
                                            src={item.cover}
                                            alt="Лого"
                                            className="min-w-full max-h-full object-cover"
                                            style={{
                                                width: "300px",
                                                height: "400px",
                                            }}
                                        />
                                    </CardContent>
                                    <div className="py-2 max-w-full">
                                        <div className="w-full flex flex-col items-center gap-2 px-5">
                                            <div className="max-sm:text-center">
                                                <p className="text-ellipsis">
                                                    {item.name}
                                                </p>
                                            </div>
                                            <Link
                                                href={route("anime", [
                                                    item.unix,
                                                ])}
                                                className="min-w-full"
                                            >
                                                <Button
                                                    variant="outline"
                                                    className="max-sm:p-2 min-w-full"
                                                >
                                                    Смотреть
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                    </div>
                    <Pagination className="my-4">
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious href="#" />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#" isActive>
                                    1
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">2</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">3</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext href="#" />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
                <div className="p-2 text-gray-900 dark:text-gray-100 w-full md:w-1/3 border rounded-lg">
                    <div className="grid w-full items-center gap-2 p-2">
                        <Label htmlFor="anime_name">Название</Label>
                        <Input
                            className="w-full"
                            type="text"
                            id="anime_name"
                            placeholder="Введите ключевое слово"
                        />
                    </div>
                    <div className="grid w-full items-center gap-2 p-2">
                        <Label htmlFor="status">Статус</Label>
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Выберите статус" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {status.map((item, index) => (
                                        <SelectItem
                                            key={index}
                                            value={item.status}
                                        >
                                            {item.text}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>
        </div>
    );
}
