"use client";

import {
    Anime,
    Favourite,
    Friends,
    FriendShips,
    PageProps,
    User,
} from "@/types";
import Header from "@/Components/Header";
import { Card, CardContent } from "@/shadcn/ui/card";
import { Link } from "@inertiajs/react";
import { Button } from "@/shadcn/ui/button";

export default function Favourites({
    auth,
    friendship,
    favourites,
}: PageProps<{
    friendship: FriendShips;
    favourites: Favourite[];
}>) {
    console.log(favourites);
    return (
        <>
            <Header friendship={friendship} auth={auth} />
            <div className="ml-14 ml:ml-0 max-sm:ml-0">
                <div className="m-4 border rounded-lg shadow">
                    <p className="text-center">Избранные аниме</p>
                    <div className="grid grid-cols-4 max-xl:grid-cols-2 max-md:grid-cols-1 items-center justify-items-center auto-rows-dense m-2">
                        {favourites.map((item, index) => (
                            <Card
                                className="h-full flex flex-col justify-between"
                                key={index}
                            >
                                <CardContent className="flex w-full justify-center items-center p-2 h-full">
                                    <img
                                        src={item.anime.cover}
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
                                                {item.anime.name}
                                            </p>
                                        </div>
                                        <Link
                                            href={route("anime", [
                                                item.anime.unix,
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
                </div>
            </div>
        </>
    );
}
