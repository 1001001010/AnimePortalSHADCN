import { PageProps } from "@/types";
import { Button } from "@/shadcn/ui/button";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import { Link, useForm } from "@inertiajs/react";
import type { Anime, Season, Episode } from "@/types";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import EpisodeControls from "./EpisodeControls";
import SeasonEpisodeList from "./SeasonEpisodeList";
import NewSeasonForm from "@/Components/Admin/NewSeasonForm";
import NewEpisodeForm from "@/Components/Admin/NewEpisode";

export default function Player({
    auth,
    Anime,
    seasons,
    currentEpisode,
    nextEpisode,
    previousEpisode,
    Host,
}: PageProps<{
    Anime: Anime;
    seasons: Season[];
    episode: Episode;
    currentEpisode?: Episode;
    nextEpisode?: Episode;
    previousEpisode?: Episode;
    Host: String;
}>) {
    const file = `${
        `${Host}:5173/storage/app/public/` + currentEpisode?.video
    }`;
    const videoUrl = require(file);
    console.log(videoUrl);
    // Параметры плеера
    const plyrProps = {
        source: {
            type: "video" as const,
            sources: [
                {
                    src: videoUrl,
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
                skip: false,
            },
        },
    };

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            seasons: seasons.map((season, index) => ({
                id: season.id,
                number: index + 1,
                name: season.name,
            })),
        });

    const onDragEnd = (result: any) => {
        if (!result.destination) {
            return;
        }

        const reorderedSeasons = [...data.seasons];
        const [removed] = reorderedSeasons.splice(result.source.index, 1);
        reorderedSeasons.splice(result.destination.index, 0, removed);

        reorderedSeasons.forEach((season, index) => {
            season.number = index + 1;
        });

        setData({ seasons: reorderedSeasons });
        handleSubmit();
    };
    const handleSubmit = () => {
        post(route("EditSeason"), { preserveScroll: true });
    };

    return (
        <>
            <DragDropContext onDragEnd={onDragEnd}>
                {currentEpisode ? (
                    <div className="m-4 border rounded-lg shadow flex justify-between max-md:flex-col max-md:items-center max-md:p-4">
                        <div className="m-4 w-1/2 max-md:w-full max-md:mb-4">
                            <div id="player">
                                <Plyr {...plyrProps} />
                                <EpisodeControls
                                    auth={auth}
                                    Anime={Anime}
                                    nextEpisode={nextEpisode}
                                    previousEpisode={previousEpisode}
                                />
                            </div>
                        </div>
                        <div className="m-4 p-4 w-1/2 border rounded-lg shadow max-md:flex-col max-md:items-center max-md:p-4 max-md:w-full">
                            {auth.user && auth.user.is_admin === 1 ? (
                                <div className="flex justify-between gap-4 pb-3 max-sm:justify-center max-sm:w-full">
                                    <NewSeasonForm Anime={Anime} auth={auth} />
                                    <NewEpisodeForm
                                        Anime={Anime}
                                        Season={seasons}
                                        auth={auth}
                                    />
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
                                                season.episodes.map(
                                                    (episode, index) =>
                                                        currentEpisode &&
                                                        episode.id ===
                                                            currentEpisode.id ? (
                                                            <Button key={index}>
                                                                {episode &&
                                                                    episode.number}
                                                            </Button>
                                                        ) : (
                                                            <Link
                                                                href={route(
                                                                    "anime",
                                                                    [
                                                                        Anime.unix,
                                                                        season &&
                                                                            season.number,
                                                                        episode &&
                                                                            episode.number,
                                                                    ]
                                                                )}
                                                                key={
                                                                    episode &&
                                                                    episode.id
                                                                }
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
                ) : (
                    <SeasonEpisodeList
                        auth={auth}
                        Anime={Anime}
                        seasons={seasons}
                    />
                )}
            </DragDropContext>
        </>
    );
}
