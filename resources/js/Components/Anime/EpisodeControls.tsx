import { PageProps } from "@/types";
import { Button } from "@/shadcn/ui/button";
import { Link } from "@inertiajs/react";
import type { Anime, Episode } from "@/types";
import DeleteEpisode from "../Admin/DeleteEpisode";

export default function EpisodeControls({
    auth,
    anime,
    nextEpisode,
    currentEpisode,
    previousEpisode,
}: PageProps<{
    anime: Anime;
    currentEpisode?: Episode;
    nextEpisode?: Episode;
    previousEpisode?: Episode;
}>) {
    return (
        <>
            <div className="grid grid-cols-3 py-4 max-md:grid-cols-1 max-md:gap-3">
                {previousEpisode &&
                previousEpisode.seasonNumber &&
                previousEpisode.episode &&
                previousEpisode.episode.number ? (
                    <Link
                        href={route("anime", [
                            anime.unix,
                            previousEpisode?.seasonNumber,
                            previousEpisode?.episode?.number,
                        ])}
                        preserveScroll
                        className="mr-auto max-md:w-full"
                    >
                        <Button className="max-md:w-full">
                            Предыдущая серия
                        </Button>
                    </Link>
                ) : (
                    <div className="w-full" />
                )}
                <Link
                    className="justify-self-center max-md:w-full"
                    href={route("anime", [anime.unix])}
                    preserveScroll
                >
                    <Button variant="outline" className="max-md:w-full">
                        Список всех серий
                    </Button>
                </Link>
                {nextEpisode &&
                nextEpisode.seasonNumber &&
                nextEpisode.episode &&
                nextEpisode.episode.number ? (
                    <Link
                        href={route("anime", [
                            anime.unix,
                            nextEpisode?.seasonNumber,
                            nextEpisode?.episode?.number,
                        ])}
                        preserveScroll
                        className="ml-auto max-md:w-full"
                    >
                        <Button className="max-md:w-full">
                            Следующая серия
                        </Button>
                    </Link>
                ) : null}
            </div>
            {auth.user?.is_admin ? (
                <div>
                    <hr />
                    <div className="flex flex-start gap-4 pt-4">
                        <DeleteEpisode
                            auth={auth}
                            anime={anime}
                            currentEpisode={currentEpisode}
                        />
                    </div>
                </div>
            ) : null}
        </>
    );
}
