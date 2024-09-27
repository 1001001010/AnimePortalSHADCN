import { PageProps } from "@/types";
import { Button } from "@/shadcn/ui/button";
import { Link } from "@inertiajs/react";
import type { Anime, Episode } from "@/types";

export default function EpisodeControls({
    auth,
    Anime,
    nextEpisode,
    previousEpisode,
}: PageProps<{
    Anime: Anime;
    currentEpisode?: Episode;
    nextEpisode?: Episode;
    previousEpisode?: Episode;
}>) {
    return (
        <>
            <div className="grid grid-cols-3 py-4">
                {previousEpisode &&
                previousEpisode.seasonNumber &&
                previousEpisode.episode &&
                previousEpisode.episode.number ? (
                    <Link
                        href={route("anime", [
                            Anime.unix,
                            previousEpisode?.seasonNumber,
                            previousEpisode?.episode?.number,
                        ])}
                        preserveScroll
                        className="mr-auto"
                    >
                        <Button>Предыдущая серия</Button>
                    </Link>
                ) : (
                    <div className="w-full" />
                )}
                <Link
                    className="justify-self-center"
                    href={route("anime", [Anime.unix])}
                    preserveScroll
                >
                    <Button variant="outline">Список всех серий</Button>
                </Link>
                {nextEpisode &&
                nextEpisode.seasonNumber &&
                nextEpisode.episode &&
                nextEpisode.episode.number ? (
                    <Link
                        href={route("anime", [
                            Anime.unix,
                            nextEpisode?.seasonNumber,
                            nextEpisode?.episode?.number,
                        ])}
                        preserveScroll
                        className="ml-auto"
                    >
                        <Button>Следующая серия</Button>
                    </Link>
                ) : null}
            </div>
            {auth.user?.is_admin ? (
                <div>
                    <hr />
                    <div className="flex flex-start gap-4 pt-4">
                        <Button variant="outline">Удалить эпизод</Button>
                        <Button variant="outline">Редактировать номер</Button>
                    </div>
                </div>
            ) : null}
        </>
    );
}
