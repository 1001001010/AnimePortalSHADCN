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

export default function HighestScoreItems() {
    const data = [
        { title: "Берсерк", studio: "Studio 4°C" },
        { title: "Наруто", studio: "Studio Pierrot" },
        { title: "Драконий жемчуг", studio: "Toei Animation" },
        { title: "Атака титанов", studio: "Wit Studio" },
        { title: "Хеллсинг", studio: "Gonzo" },
    ];

    const status = [
        { status: "ongoing", text: "Онгоинг" },
        { status: "came_out", text: "Вышел" },
        { status: "preview", text: "Анонс" },
    ];

    return (
        <div className="mt-4">
            <div className="flex justify-around max-lg:mx-10 gap-4 max-md:flex-col-reverse max-md:w-full max-md:mx-0">
                <div className="p-2 text-gray-900 dark:text-gray-100 w-full md:w-2/3 max-md:w-3/3 border border-gray-700 rounded-lg">
                    <h2 className="text-lg font-medium p-1">Список Аниме</h2>
                    <div className="grid grid-cols-3 max-xl:grid-cols-2 max-md:grid-cols-1 items-center justify-items-center auto-rows-dense">
                        {data.map((item, index) => (
                            <Card
                                key={index}
                                className="w-9/12 m-2 max-md:w-3/5 max-sm:w-5/5"
                            >
                                <CardContent className="flex aspect-square items-center justify-center p-2">
                                    <img src="/img/Poster.jpg" alt="Лого" />
                                </CardContent>
                                <div className="flex items-start justify-start max-2xl:justify-center py-2">
                                    <div className="w-full flex items-center justify-between px-5 max-2xl:flex-col max-2xl:justify-center">
                                        <div className="max-2xl:text-center">
                                            <p className="font-semibold">
                                                {item.title}
                                            </p>
                                            <p className="text-gray-600 font-medium">
                                                {item.studio}
                                            </p>
                                        </div>
                                        <Button
                                            variant="outline"
                                            className="max-sm:p-2"
                                        >
                                            Смотреть
                                        </Button>
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
                <div className="p-2 text-gray-900 dark:text-gray-100 w-full md:w-1/3 border border-gray-700 rounded-lg">
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
