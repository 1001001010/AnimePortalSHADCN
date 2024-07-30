import * as React from "react";
import { PageProps } from "@/types";
import Header from "@/Components/Header";
import { Star } from "lucide-react";
import { Button } from "@/shadcn/ui/button";
import { Badge } from "@/shadcn/ui/badge";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import ScrenesCarousel from "@/Components/ScenesCarousel";
import type { Anime } from "@/types";
import { Link } from "@inertiajs/react";

export default function AnimePage({
    auth,
    Anime,
}: PageProps<{ Anime: Anime }>) {
    // Статус
    const status = [
        { status: "ongoing", text: "Онгоинг" },
        { status: "came_out", text: "Вышел" },
        { status: "preview", text: "Анонс" },
    ];
    const statusText = status.find((s) => s.status === Anime.status)?.text;

    // Параметры плеера
    const plyrProps = {
        source: {
            type: "video" as const,
            sources: [
                {
                    src: "/img/screnes/Berserk.mp4",
                    type: "video/mp4" as const,
                    size: 1080,
                },
            ],
        },
        options: {
            controls: [
                "play",
                "progress",
                "current-time",
                "mute",
                "volume",
                "settings",
                "pip",
                "fullscreen",
            ],
        },
    };
    return (
        <>
            <Header auth={auth} />
            <div className="ml-14 ml:ml-0 max-sm:ml-0">
                <div className="m-4 border border-gray-200 rounded-lg shadow dark:border-gray-700">
                    <div className="flex flex-row max-md:flex-col ">
                        <div className="w-2/12 max-md:w-full py-2 px-2 max-md:items-center">
                            <img
                                src={Anime.cover}
                                className="rounded mb-2 mx-auto"
                            ></img>
                            <Link href="#player">
                                <Button
                                    variant="outline"
                                    className="w-full border-gray-200 dark:border-gray-700"
                                >
                                    Смотреть
                                </Button>
                            </Link>
                        </div>
                        <div className="text-gray-900 dark:text-gray-100 flex flex-col w-3/12 max-md:w-full gap-2 p-4">
                            <h1 className="text-2xl">{Anime.name}</h1>
                            <div className="flex items-center gap-2">
                                <Star />
                                <p className="text-xl">{Anime.grade}/5</p>
                            </div>
                            <div className="flex justify-between w-full">
                                <p className="font-bold">Тип</p>
                                <p>{Anime.type}</p>
                            </div>
                            <div className="flex justify-between w-full">
                                <p className="font-bold">Эпизоды</p>
                                <p>25</p>
                            </div>
                            <div className="flex justify-between w-full">
                                <p className="font-bold">Статус</p>
                                <p>{statusText}</p>
                            </div>
                            <div className="flex justify-between w-full">
                                <p className="font-bold">Первоисточник</p>
                                <p>{Anime.original}</p>
                            </div>
                            <div className="flex justify-between w-full">
                                <p className="font-bold">Студия</p>
                                <p>{Anime.studio}</p>
                            </div>
                            <div className="flex justify-between w-full">
                                <p className="font-bold">
                                    Возрастные ограничения
                                </p>
                                <Badge className="font-bold">
                                    {Anime.age}+
                                </Badge>
                            </div>
                            <div className="flex justify-between w-full">
                                <p className="font-bold">Озвучка</p>
                                <p>{Anime.voice}</p>
                            </div>
                            <div className="flex justify-between w-full">
                                <p className="font-bold">Режиссёр</p>
                                <p>{Anime.director}</p>
                            </div>
                            <div className="flex justify-between w-full">
                                <p className="font-bold">Автор оригинала</p>
                                <p>{Anime.autor}</p>
                            </div>
                        </div>
                    </div>
                    <div className="description p-4 mt-5">
                        {Anime.description}
                    </div>
                    <ScrenesCarousel Anime={Anime} auth={auth} />
                    <div className="m-4 border border-gray-200 rounded-lg shadow dark:border-gray-700 flex justify-between max-md:flex-col max-md:items-center max-md:p-4">
                        <div className="m-4 w-1/2 max-md:w-full max-md:mb-4">
                            <div id="player">
                                <Plyr {...plyrProps} />
                            </div>
                        </div>
                        <div className="m-4 border border-gray-200 rounded-lg shadow dark:border-gray-700 w-1/2 max-md:w-full">
                            <div className="m-4">
                                <div className="mb-4">
                                    <h1 className="text-center">1 Сезон</h1>
                                    <div className="mt-4 grid grid-cols-4 gap-4 max-sm:grid-cols-3">
                                        <Button variant="outline">
                                            Серия 1
                                        </Button>
                                        <Button variant="outline">
                                            Серия 2
                                        </Button>
                                        <Button variant="outline">
                                            Серия 3
                                        </Button>
                                        <Button variant="outline">
                                            Серия 4
                                        </Button>
                                        <Button variant="outline">
                                            Серия 5
                                        </Button>
                                        <Button variant="outline">
                                            Серия 6
                                        </Button>
                                        <Button variant="outline">
                                            Серия 7
                                        </Button>
                                        <Button variant="outline">
                                            Серия 8
                                        </Button>
                                        <Button variant="outline">
                                            Серия 9
                                        </Button>
                                        <Button variant="outline">
                                            Серия 10
                                        </Button>
                                        <Button variant="outline">
                                            Серия 11
                                        </Button>
                                        <Button variant="outline">
                                            Серия 12
                                        </Button>
                                        <Button variant="outline">
                                            Серия 13
                                        </Button>
                                        <Button variant="outline">
                                            Серия 14
                                        </Button>
                                        <Button variant="outline">
                                            Серия 15
                                        </Button>
                                        <Button variant="outline">
                                            Серия 16
                                        </Button>
                                        <Button variant="outline">
                                            Серия 17
                                        </Button>
                                        <Button variant="outline">
                                            Серия 18
                                        </Button>
                                        <Button variant="outline">
                                            Серия 19
                                        </Button>
                                        <Button variant="outline">
                                            Серия 20
                                        </Button>
                                        <Button variant="outline">
                                            Серия 21
                                        </Button>
                                        <Button variant="outline">
                                            Серия 22
                                        </Button>
                                        <Button variant="outline">
                                            Серия 23
                                        </Button>
                                        <Button variant="outline">
                                            Серия 24
                                        </Button>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <h1 className="text-center">2 Сезон</h1>
                                    <div className="mt-4 grid grid-cols-4 gap-4 max-sm:grid-cols-3">
                                        <Button variant="outline">
                                            Серия 1
                                        </Button>
                                        <Button variant="outline">
                                            Серия 2
                                        </Button>
                                        <Button variant="outline">
                                            Серия 3
                                        </Button>
                                        <Button variant="outline">
                                            Серия 4
                                        </Button>
                                        <Button variant="outline">
                                            Серия 5
                                        </Button>
                                        <Button variant="outline">
                                            Серия 6
                                        </Button>
                                        <Button variant="outline">
                                            Серия 7
                                        </Button>
                                        <Button variant="outline">
                                            Серия 8
                                        </Button>
                                        <Button variant="outline">
                                            Серия 9
                                        </Button>
                                        <Button variant="outline">
                                            Серия 10
                                        </Button>
                                        <Button variant="outline">
                                            Серия 11
                                        </Button>
                                        <Button variant="outline">
                                            Серия 12
                                        </Button>
                                        <Button variant="outline">
                                            Серия 13
                                        </Button>
                                        <Button variant="outline">
                                            Серия 14
                                        </Button>
                                        <Button variant="outline">
                                            Серия 15
                                        </Button>
                                        <Button variant="outline">
                                            Серия 16
                                        </Button>
                                        <Button variant="outline">
                                            Серия 17
                                        </Button>
                                        <Button variant="outline">
                                            Серия 18
                                        </Button>
                                        <Button variant="outline">
                                            Серия 19
                                        </Button>
                                        <Button variant="outline">
                                            Серия 20
                                        </Button>
                                        <Button variant="outline">
                                            Серия 21
                                        </Button>
                                        <Button variant="outline">
                                            Серия 22
                                        </Button>
                                        <Button variant="outline">
                                            Серия 23
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
