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
        <>
            <div className="flex flex-row justify-between pt-4">
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
                    >
                        <Button>Предыдущая серия</Button>
                    </Link>
                ) : (
                    <Button variant={"ghost"} className="invisible">
                        Предыдущая серия
                    </Button>
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
                    >
                        <Button>Следующая серия</Button>
                    </Link>
                ) : (
                    <Button variant={"ghost"} className="invisible">
                        Следующая серия
                    </Button>
                )}
            </div>
        </>
    );
}
