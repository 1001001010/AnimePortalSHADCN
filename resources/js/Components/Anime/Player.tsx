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
import SoloPlayer from "./Player/SoloPlayer";
import GroupPlayer from "./Player/GroupPlayer";

export default function Player({
    auth,
    anime,
    seasons,
    episode,
    currentEpisode,
    nextEpisode,
    previousEpisode,
    Host,
    invite_link,
    InGroup,
}: PageProps<{
    anime: Anime;
    seasons: Season[];
    episode: Episode;
    currentEpisode?: Episode;
    nextEpisode?: Episode;
    previousEpisode?: Episode;
    Host: string;
    invite_link: string;
    InGroup: boolean;
}>) {
    const file = `${
        `${Host}:5173/storage/app/public/` + currentEpisode?.video
    }`;
    const videoUrl = require(file);
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

    // const { data, setData, post, errors, processing, recentlySuccessful } =
    //     useForm({
    //         seasons: seasons.map((season, index) => ({
    //             id: season.id,
    //             number: index + 1,
    //             name: season.name,
    //         })),
    //     });

    // const onDragEnd = (result: any) => {
    //     if (!result.destination) {
    //         return;
    //     }

    //     const reorderedSeasons = [...data.seasons];
    //     const [removed] = reorderedSeasons.splice(result.source.index, 1);
    //     reorderedSeasons.splice(result.destination.index, 0, removed);

    //     reorderedSeasons.forEach((season, index) => {
    //         season.number = index + 1;
    //     });

    //     setData({ seasons: reorderedSeasons });
    //     handleSubmit();
    // };
    // const handleSubmit = () => {
    //     post(route("EditSeason"), { preserveScroll: true });
    // };

    return (
        <>
            {currentEpisode ? (
                <div>
                    {invite_link ? (
                        <GroupPlayer
                            auth={auth}
                            anime={anime}
                            seasons={seasons}
                            episode={episode}
                            currentEpisode={currentEpisode}
                            nextEpisode={nextEpisode}
                            previousEpisode={previousEpisode}
                            plyrProps={plyrProps}
                            invite_link={invite_link}
                            InGroup={InGroup}
                        />
                    ) : (
                        <SoloPlayer
                            auth={auth}
                            anime={anime}
                            seasons={seasons}
                            episode={episode}
                            currentEpisode={currentEpisode}
                            nextEpisode={nextEpisode}
                            previousEpisode={previousEpisode}
                            plyrProps={plyrProps}
                        />
                    )}
                </div>
            ) : (
                <SeasonEpisodeList
                    auth={auth}
                    anime={anime}
                    seasons={seasons}
                />
            )}
        </>
    );
}
