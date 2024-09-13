import { PageProps } from "@/types";
import { Button } from "@/shadcn/ui/button";
import { Link } from "@inertiajs/react";
import type { Anime, Episode } from "@/types";

export default function EpisodeControls({
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
        <div className="flex pt-4">
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
                <div className="mr-auto" />
            )}
            <Link href={route("anime", [Anime.unix])} preserveScroll>
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
            ) : (
                <div className="ml-auto" />
            )}
        </div>
    );
}
