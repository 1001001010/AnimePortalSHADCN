import * as React from "react";
import { PageProps } from "@/types";
import Header from "@/Components/Header";
import { Star } from "lucide-react";
import { Badge } from "@/shadcn/ui/badge";
import "plyr-react/plyr.css";
import ScrenesCarousel from "@/Components/Anime/ScenesCarousel";
import type {
    Anime,
    Season,
    Episode,
    FriendShips,
    Ratings,
    Favourite,
} from "@/types";
import Player from "@/Components/Anime/Player";
import { Link } from "@inertiajs/react";
import { Button } from "@/shadcn/ui/button";
import Rating from "@/Components/Anime/Rating";
import EditAnimeInfo from "@/Components/Admin/UpdateAnime";
import NewGroup from "@/Components/Groups/NewGroup";

// Статус
export const type = [
    { status: "TV", text: "ТВ Сериал" },
    { status: "Film", text: "Фильм" },
    { status: "speshl", text: "Спешл" },
    { status: "OVA", text: "OVA" },
];

export const status = [
    { status: "ongoing", text: "Онгоинг" },
    { status: "came_out", text: "Вышел" },
    { status: "preview", text: "Анонс" },
];

export default function AnimePage({
    auth,
    anime,
    seasons,
    episode,
    friendship,
    currentEpisode,
    userRating,
    averageRating,
    episode_count,
    favourite,
    nextEpisode,
    previousEpisode,
    Host,
    invite_link,
}: PageProps<{
    anime: Anime;
    seasons: Season[];
    episode: Episode;
    friendship: FriendShips;
    currentEpisode?: Episode;
    userRating: Ratings;
    averageRating: number;
    episode_count: number;
    favourite: Favourite;
    nextEpisode?: Episode;
    previousEpisode?: Episode;
    Host: String;
    invite_link: string;
}>) {
    const statusText = status.find((s) => s.status === anime.status)?.text;
    const typeText = type.find((s) => s.status === anime.type)?.text;

    const animeProperties = [
        { label: "Тип", value: typeText },
        { label: "Эпизоды", value: episode_count },
        { label: "Статус", value: statusText },
        { label: "Первоисточник", value: anime.original },
        { label: "Студия", value: anime.studio },
        {
            label: "Возрастные ограничения",
            value: <Badge className="font-bold">{anime.age}+</Badge>,
        },
        { label: "Озвучка", value: anime.voice },
        { label: "Режиссёр", value: anime.director },
        { label: "Автор оригинала", value: anime.autor },
    ];
    return (
        <>
            <Header friendship={friendship} auth={auth} />
            <div className="ml-14 ml:ml-0 max-sm:ml-0">
                <div className="m-4 max-sm:m-1 max-sm:p-1 border rounded-lg shadow ">
                    <div className="flex flex-row max-md:flex-col">
                        <div className="w-2/12 max-md:w-full py-2 px-2 max-md:items-center max-xl:w-full h-full flex flex-col justify-between">
                            <img
                                src={anime.cover}
                                className="rounded mb-2 mx-auto max-xl:w-full h-full object-cover max-sm:w-4/5"
                            />
                            <div className="flex flex-col gap-2 max-xl:w-full max-sm:w-4/5">
                                <div className="flex flex-row justify-around gap-2">
                                    <Link
                                        href={route("favourite.add", anime.id)}
                                        className="w-full"
                                    >
                                        {favourite ? (
                                            <Button
                                                variant="outline"
                                                className="w-full"
                                            >
                                                В избранном
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="outline"
                                                className="w-full"
                                            >
                                                В избранное
                                            </Button>
                                        )}
                                    </Link>
                                    <Rating
                                        anime={anime}
                                        auth={auth}
                                        rating={userRating}
                                    />
                                </div>
                                <NewGroup auth={auth} anime={anime} />
                                {auth.user?.is_admin ? (
                                    <EditAnimeInfo auth={auth} anime={anime} />
                                ) : null}
                            </div>
                        </div>
                        <div className="text-gray-900 dark:text-gray-100 flex flex-col w-3/12 max-md:w-full max-xl:w-full gap-2 p-4">
                            <h1 className="text-2xl">{anime.name}</h1>
                            <div className="flex items-center gap-2">
                                <Star />
                                <p className="text-xl">{averageRating}/5</p>
                            </div>
                            <div className="flex flex-col gap-4">
                                {animeProperties.map((property, index) => (
                                    <div
                                        key={index}
                                        className="flex flex-row justify-between w-full"
                                    >
                                        <div className="font-bold justify-start">
                                            {property.label}
                                        </div>
                                        <div className="justify-end">
                                            {property.value}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="description p-4 mt-5 max-md:text-center">
                        <p className="break-words">{anime.description}</p>
                    </div>
                    {invite_link ? <p>{invite_link}</p> : null}
                    <ScrenesCarousel anime={anime} auth={auth} />
                    <Player
                        auth={auth}
                        anime={anime}
                        seasons={seasons}
                        episode={episode}
                        currentEpisode={currentEpisode}
                        nextEpisode={nextEpisode}
                        previousEpisode={previousEpisode}
                        Host={Host}
                    />
                </div>
            </div>
        </>
    );
}
