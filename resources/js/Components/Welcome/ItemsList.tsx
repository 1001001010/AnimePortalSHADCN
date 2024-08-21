"use client";
import { Input } from "@/shadcn/ui/input";
import { Slider } from "@/shadcn/ui/slider";
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
import ItemCard from "../Anime/ItemCard";

type SliderProps = React.ComponentProps<typeof Slider>;

export default function ItemsList({
    auth,
    anime,
    ...sliderProps
}: PageProps<{ anime: Anime[] }> & SliderProps) {
    const { className, ...props } = sliderProps;
    const status = [
        { status: "ongoing", text: "Онгоинг" },
        { status: "came_out", text: "Вышел" },
        { status: "preview", text: "Анонс" },
    ];
    const type = [
        { status: "TV", text: "ТВ Сериал" },
        { status: "Film", text: "Фильм" },
        { status: "speshl", text: "Спешл" },
        { status: "OVA", text: "OVA" },
    ];

    return (
        <div className="mt-4">
            <div className="flex justify-around max-lg:mx-10 gap-4 max-md:flex-col-reverse max-md:w-full max-md:mx-0">
                <div className="p-2 text-gray-900 dark:text-gray-100 w-full md:w-2/3 max-md:w-3/3 border rounded-lg">
                    <h2 className="text-lg font-medium p-1">Список Аниме</h2>
                    <div className="grid grid-cols-3 max-xl:grid-cols-2 max-md:grid-cols-1 items-center justify-items-center auto-rows-dense gap-4 m-2">
                        {Array.isArray(anime) &&
                            anime.map((item, index) => (
                                <ItemCard
                                    key={index}
                                    auth={auth}
                                    index={index}
                                    info={item}
                                    favButton={false}
                                />
                            ))}
                    </div>
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
                    <div className="grid w-full items-center gap-2 p-2">
                        <Label htmlFor="status">Тип</Label>
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Выберите тип" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {type.map((item, index) => (
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
