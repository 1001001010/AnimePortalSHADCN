import { PageProps } from "@/types";
import { Button } from "@/shadcn/ui/button";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import { Link } from "@inertiajs/react";
import type { Anime, Season, Episode } from "@/types";
import NewSeasonForm from "@/Components/NewSeasonForm";
import NewEpisodeForm from "@/Components/NewEpisodeForm";

export default function Player({
    auth,
    Anime,
    seasons,
    episode,
    currentEpisode,
}: PageProps<{
    Anime: Anime;
    seasons: Season[];
    episode: Episode;
    currentEpisode?: Episode;
}>) {
    // Параметры плеера
    const plyrProps = {
        source: {
            type: "video" as const,
            sources: [
                {
                    src: currentEpisode ? currentEpisode.video : "",
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
            seeking: {
                enabled: true,
                skip: true, // Включите перемотку к конкретному времени
            },
        },
    };
    return (
        <>
            {currentEpisode ? (
                <div className="m-4 border border-gray-200 rounded-lg shadow dark:border-gray-700 flex justify-between max-md:flex-col max-md:items-center max-md:p-4">
                    <div className="m-4 w-1/2 max-md:w-full max-md:mb-4">
                        <div id="player">
                            <Plyr {...plyrProps} />
                        </div>
                    </div>
                    <div className="m-4 p-4 w-1/2 border border-gray-200 rounded-lg shadow dark:border-gray-700 max-md:flex-col max-md:items-center max-md:p-4 max-md:w-full">
                        {auth.user && auth.user.is_admin === 1 ? (
                            <div className="flex justify-between gap-4 pb-3">
                                <NewSeasonForm Anime={Anime} auth={auth} />
                                <NewEpisodeForm
                                    Anime={Anime}
                                    Season={seasons}
                                    auth={auth}
                                />
                            </div>
                        ) : null}
                        {seasons &&
                            seasons.map((season: Season) => (
                                <div key={season.id}>
                                    <h1 className="font-bold text-center">
                                        {season.name
                                            ? `Сезон ${season.number} (${season.name})`
                                            : `Сезон ${season.number}`}
                                    </h1>
                                    <div className="mt-4 grid grid-cols-5 gap-4 max-sm:grid-cols-3 mb-4">
                                        {season.episodes &&
                                            season.episodes.map((episode) =>
                                                currentEpisode &&
                                                episode.id ===
                                                    currentEpisode.id ? (
                                                    <Button key={episode.id}>
                                                        {episode.number}
                                                    </Button>
                                                ) : (
                                                    <Link
                                                        href={route("anime", [
                                                            Anime.unix,
                                                            season.number,
                                                            episode.number,
                                                        ])}
                                                        key={episode.id}
                                                        preserveScroll
                                                    >
                                                        <Button
                                                            className="w-full"
                                                            variant="outline"
                                                        >
                                                            {episode.number}
                                                        </Button>
                                                    </Link>
                                                )
                                            )}
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            ) : (
                <div className="m-4 p-4 border border-gray-200 rounded-lg shadow dark:border-gray-700 max-md:flex-col max-md:items-center">
                    {auth.user && auth.user.is_admin === 1 ? (
                        <div className="flex justify-between gap-4 pb-3">
                            <NewSeasonForm Anime={Anime} auth={auth} />
                            <NewEpisodeForm
                                Anime={Anime}
                                Season={seasons}
                                auth={auth}
                            />
                        </div>
                    ) : null}
                    {seasons &&
                        seasons.map((season: Season) => (
                            <div key={season.id}>
                                <h1 className="font-bold text-center">
                                    {season.name
                                        ? `Сезон ${season.number} (${season.name})`
                                        : `Сезон ${season.number}`}
                                </h1>
                                <div className="mt-4 grid grid-cols-10 gap-4 max-sm:grid-cols-3 mb-4">
                                    {season.episodes &&
                                        season.episodes.map((episode) => (
                                            <Link
                                                href={route("anime", [
                                                    Anime.unix,
                                                    season.number,
                                                    episode.number,
                                                ])}
                                                preserveScroll
                                            >
                                                <Button
                                                    className="w-full"
                                                    variant="outline"
                                                    key={episode.id}
                                                >
                                                    {episode.number}
                                                </Button>
                                            </Link>
                                        ))}
                                </div>
                            </div>
                        ))}
                </div>
            )}
        </>
    );
}
