import * as React from "react";
import { PageProps } from "@/types";
import Header from "@/Components/Header";
import { Star } from "lucide-react";
import { Badge } from "@/shadcn/ui/badge";
import "plyr-react/plyr.css";
import ScrenesCarousel from "@/Components/Anime/ScenesCarousel";
import type { Anime, Season, Episode, FriendShips, Ratings } from "@/types";
import Player from "@/Components/Anime/Player";
import { Link } from "@inertiajs/react";
import { Button } from "@/shadcn/ui/button";
import Rating from "@/Components/Anime/Rating";

export default function AnimePage({
    auth,
    Anime,
    seasons,
    episode,
    friendship,
    currentEpisode,
    userRating,
    averageRating,
}: PageProps<{
    Anime: Anime;
    seasons: Season[];
    episode: Episode;
    friendship: FriendShips;
    currentEpisode?: Episode;
    userRating: Ratings;
    averageRating: number;
}>) {
    // Статус
    const status = [
        { status: "ongoing", text: "Онгоинг" },
        { status: "came_out", text: "Вышел" },
        { status: "preview", text: "Анонс" },
    ];
    const statusText = status.find((s) => s.status === Anime.status)?.text;

    console.log(averageRating);

    return (
        <>
            <Header auth={auth} friendship={friendship} />
            <div className="ml-14 ml:ml-0 max-sm:ml-0">
                <div className="m-4 border border-gray-200 rounded-lg shadow dark:border-gray-700">
                    <div className="flex flex-row max-md:flex-col ">
                        <div className="w-2/12 max-md:w-full py-2 px-2 max-md:items-center">
                            <img
                                src={Anime.cover}
                                className="rounded mb-2 mx-auto"
                            ></img>
                            <div className="flex flex-col gap-2">
                                <Link href="#player">
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                    >
                                        В избранное
                                    </Button>
                                </Link>
                                <Rating
                                    Anime={Anime}
                                    auth={auth}
                                    rating={userRating}
                                />
                            </div>
                        </div>
                        <div className="text-gray-900 dark:text-gray-100 flex flex-col w-3/12 max-md:w-full gap-2 p-4">
                            <h1 className="text-2xl">{Anime.name}</h1>
                            <div className="flex items-center gap-2">
                                <Star />
                                <p className="text-xl">{averageRating}/5</p>
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
                    <Player
                        auth={auth}
                        Anime={Anime}
                        seasons={seasons}
                        episode={episode}
                        currentEpisode={currentEpisode}
                    />
                </div>
            </div>
        </>
    );
}
