import { PageProps } from "@/types";
import { Button } from "@/shadcn/ui/button";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import { Link } from "@inertiajs/react";
import type { Anime, Season, Episode } from "@/types";
import EpisodeControls from "../EpisodeControls";
import NewSeasonForm from "@/Components/Admin/NewSeasonForm";
import NewEpisodeForm from "@/Components/Admin/NewEpisode";

export default function SoloPlayer({
    auth,
    anime,
    seasons,
    currentEpisode,
    nextEpisode,
    previousEpisode,
    plyrProps,
}: PageProps<{
    anime: Anime;
    seasons: Season[];
    episode: Episode;
    currentEpisode?: Episode;
    nextEpisode?: Episode;
    previousEpisode?: Episode;
    plyrProps?: any;
    // invite_link: string;
}>) {
    // const file = `${
    //     `${Host}:5173/storage/app/public/` + currentEpisode?.video
    // }`;
    // const videoUrl = require(file);
    // // Параметры плеера
    // const plyrProps = {
    //     source: {
    //         type: "video" as const,
    //         sources: [
    //             {
    //                 src: videoUrl,
    //                 type: "video/mp4" as const,
    //                 size: 1080,
    //             },
    //         ],
    //     },
    //     options: {
    //         controls: [
    //             "play",
    //             "progress",
    //             "current-time",
    //             "mute",
    //             "volume",
    //             "settings",
    //             "pip",
    //             "fullscreen",
    //         ],
    //         seeking: {
    //             enabled: true,
    //             skip: false,
    //         },
    //     },
    // };

    return (
        <>
            <div className="m-4 border rounded-lg shadow flex justify-between max-xl:flex-col max-xl:items-center max-xl:p-4">
                <div className="m-4 w-1/2 max-xl:w-full max-xl:mb-4">
                    <div id="player">
                        <Plyr {...plyrProps} />
                        <EpisodeControls
                            auth={auth}
                            anime={anime}
                            currentEpisode={currentEpisode}
                            nextEpisode={nextEpisode}
                            previousEpisode={previousEpisode}
                        />
                    </div>
                </div>
                <div className="m-4 p-4 w-1/2 border rounded-lg shadow max-xl:p-4 max-xl:w-full">
                    {auth.user && auth.user.is_admin === 1 ? (
                        <div className="flex justify-between gap-4 pb-3 max-xl:justify-center max-sm:flex-col max-sm:gap-1">
                            <NewSeasonForm anime={anime} auth={auth} />
                            <NewEpisodeForm Season={seasons} auth={auth} />
                        </div>
                    ) : null}
                    {seasons &&
                        seasons.length > 0 &&
                        seasons.map((season, index) => (
                            <div key={index}>
                                <h1 className="font-bold text-center break-words">
                                    {season.name
                                        ? `Сезон ${season.number} (${season.name})`
                                        : `Сезон ${season.number}`}
                                </h1>
                                <div className="mt-4 grid grid-cols-5 gap-4 max-sm:grid-cols-3 mb-4">
                                    {season.episodes &&
                                        season.episodes.length > 0 &&
                                        season.episodes.map((episode, index) =>
                                            currentEpisode &&
                                            episode.id === currentEpisode.id ? (
                                                <Button key={index}>
                                                    {episode && episode.number}
                                                </Button>
                                            ) : (
                                                <Link
                                                    href={route("anime", [
                                                        anime.unix,
                                                        season && season.number,
                                                        episode &&
                                                            episode.number,
                                                    ])}
                                                    key={episode && episode.id}
                                                    preserveScroll
                                                >
                                                    <Button
                                                        className="w-full"
                                                        variant="outline"
                                                    >
                                                        {episode &&
                                                            episode.number}
                                                    </Button>
                                                </Link>
                                            )
                                        )}
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
}
