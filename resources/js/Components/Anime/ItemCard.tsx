"use client";

import { Anime, FriendShips, PageProps } from "@/types";
import { Card, CardContent } from "@/shadcn/ui/card";
import { Link, useForm } from "@inertiajs/react";
import { Button } from "@/shadcn/ui/button";
import { FormEventHandler } from "react";

export default function ItemCard({
    info,
    index,
    favButton,
    favID = 0,
}: PageProps<{
    info: Anime;
    index: number;
    favButton: boolean;
    favID?: number;
}>) {
    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
    } = useForm({
        id: favID,
    });

    const deleteFavourite: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route("favourite.destroy"), {
            preserveScroll: true,
            onFinish: () => reset(),
        });
    };

    return (
        <>
            <Card className="h-full flex flex-col justify-between" key={index}>
                <CardContent className="flex w-full justify-center items-center p-2 h-full">
                    <img
                        src={info.cover}
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
                            <p className="text-ellipsis">{info.name}</p>
                        </div>
                        <Link
                            href={route("anime", [info.unix])}
                            className="min-w-full"
                        >
                            <Button
                                variant="outline"
                                className="max-sm:p-2 min-w-full"
                            >
                                Смотреть
                            </Button>
                        </Link>
                        {favButton ? (
                            <form
                                onSubmit={deleteFavourite}
                                className="dark:bg-background min-w-full"
                            >
                                <Button
                                    variant="outline"
                                    className="max-sm:p-2 min-w-full"
                                    disabled={processing}
                                >
                                    Удалить из избранного
                                </Button>
                            </form>
                        ) : null}
                    </div>
                </div>
            </Card>
        </>
    );
}
