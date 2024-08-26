import { PageProps } from "@/types";
import { Button } from "@/shadcn/ui/button";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import { Link, useForm } from "@inertiajs/react";
import type { Anime, Season, Episode } from "@/types";
import NewSeasonForm from "@/Components/Admin/NewSeasonForm";
import NewEpisodeForm from "@/Components/Admin/NewEpisodeForm";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { PencilLine } from "lucide-react";
import { useState } from "react";

export default function Player({
    auth,
    Anime,
    seasons,
    currentEpisode,
    nextEpisode,
    previousEpisode,
}: PageProps<{
    Anime: Anime;
    seasons: Season[];
    episode: Episode;
    currentEpisode?: Episode;
    nextEpisode?: Episode;
    previousEpisode?: Episode;
}>) {
    const [EditMode, setEditMode] = useState(false);
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
                skip: false,
            },
        },
    };

    const handleEditModeToggle = () => {
        setEditMode(!EditMode);
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
                                <video
                                    controls
                                    src={currentEpisode.video}
                                ></video>
                                {/* <Plyr {...plyrProps} /> */}
                                <div className="flex flex-row justify-between pt-4">
                                    {previousEpisode ? (
                                        <Link
                                            href={route("anime", [
                                                Anime.unix,
                                                previousEpisode?.season.number,
                                                previousEpisode?.number,
                                            ])}
                                            preserveScroll
                                        >
                                            <Button>Предыдущая серия</Button>
                                        </Link>
                                    ) : (
                                        <Button
                                            variant={"ghost"}
                                            className="invisible"
                                        >
                                            Предыдущая серия
                                        </Button>
                                    )}
                                    <Link
                                        href={route("anime", [Anime.unix])}
                                        preserveScroll
                                    >
                                        <Button variant="outline">
                                            Список всех серий
                                        </Button>
                                    </Link>
                                    {nextEpisode ? (
                                        <Link
                                            href={route("anime", [
                                                Anime.unix,
                                                nextEpisode?.season.number,
                                                nextEpisode?.number,
                                            ])}
                                            preserveScroll
                                        >
                                            <Button>Следующая серия</Button>
                                        </Link>
                                    ) : (
                                        <Button
                                            variant={"ghost"}
                                            className="invisible"
                                        >
                                            Следующая серия
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="m-4 p-4 w-1/2 border rounded-lg shadow max-md:flex-col max-md:items-center max-md:p-4 max-md:w-full">
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
                                seasons
                                    .slice()
                                    .sort((a, b) => a.number - b.number)
                                    .map((season: Season, index) => (
                                        <div key={index}>
                                            <h1 className="font-bold text-center">
                                                {season.name
                                                    ? `Сезон ${season.number} (${season.name})`
                                                    : `Сезон ${season.number}`}
                                            </h1>
                                            <div className="mt-4 grid grid-cols-5 gap-4 max-sm:grid-cols-3 mb-4">
                                                {season.episodes &&
                                                    season.episodes
                                                        .slice()
                                                        .sort(
                                                            (a, b) =>
                                                                a.number -
                                                                b.number
                                                        )
                                                        .map((episode, index) =>
                                                            currentEpisode &&
                                                            episode.id ===
                                                                currentEpisode.id ? (
                                                                <Button
                                                                    key={index}
                                                                >
                                                                    {
                                                                        episode.number
                                                                    }
                                                                </Button>
                                                            ) : (
                                                                <Link
                                                                    href={route(
                                                                        "anime",
                                                                        [
                                                                            Anime.unix,
                                                                            season.number,
                                                                            episode.number,
                                                                        ]
                                                                    )}
                                                                    key={
                                                                        episode.id
                                                                    }
                                                                    preserveScroll
                                                                >
                                                                    <Button
                                                                        className="w-full"
                                                                        variant="outline"
                                                                    >
                                                                        {
                                                                            episode.number
                                                                        }
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
                    <div className="m-4 p-4 border rounded-lg shado max-md:flex-col max-md:items-center">
                        {auth.user && auth.user.is_admin === 1 ? (
                            <div className="flex justify-between gap-4 pb-3">
                                <NewSeasonForm Anime={Anime} auth={auth} />
                                <NewEpisodeForm
                                    Anime={Anime}
                                    Season={seasons}
                                    auth={auth}
                                />
                                <Button
                                    variant={EditMode ? "default" : "outline"}
                                    className="w-min"
                                    onClick={handleEditModeToggle}
                                >
                                    <PencilLine />
                                </Button>
                            </div>
                        ) : null}
                        {EditMode ? (
                            <Droppable droppableId="droppable-1">
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >
                                        {seasons &&
                                            seasons
                                                .slice()
                                                .sort(
                                                    (a, b) =>
                                                        a.number - b.number
                                                )
                                                .map(
                                                    (season: Season, index) => (
                                                        <Draggable
                                                            key={season.id}
                                                            draggableId={season.id.toString()}
                                                            index={index}
                                                        >
                                                            {(provided) => (
                                                                <div
                                                                    ref={
                                                                        provided.innerRef
                                                                    }
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                >
                                                                    <h1 className="font-bold text-center">
                                                                        {season.name
                                                                            ? `Сезон ${season.number} (${season.name})`
                                                                            : `Сезон ${season.number}`}
                                                                    </h1>
                                                                    <div className="mt-4 grid grid-cols-10 gap-4 max-sm:grid-cols-3 mb-4">
                                                                        {season.episodes &&
                                                                            season.episodes.map(
                                                                                (
                                                                                    episode,
                                                                                    index
                                                                                ) => (
                                                                                    <Link
                                                                                        href={route(
                                                                                            "anime",
                                                                                            [
                                                                                                Anime.unix,
                                                                                                season.number,
                                                                                                episode.number,
                                                                                            ]
                                                                                        )}
                                                                                        preserveScroll
                                                                                        key={
                                                                                            index
                                                                                        }
                                                                                    >
                                                                                        <Button
                                                                                            className="w-full"
                                                                                            variant="outline"
                                                                                            key={
                                                                                                episode.id
                                                                                            }
                                                                                        >
                                                                                            {
                                                                                                episode.number
                                                                                            }
                                                                                        </Button>
                                                                                    </Link>
                                                                                )
                                                                            )}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </Draggable>
                                                    )
                                                )}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        ) : (
                            <div>
                                {seasons &&
                                    seasons
                                        .slice()
                                        .sort((a, b) => a.number - b.number)
                                        .map((season: Season, index) => (
                                            <div key={index}>
                                                <h1 className="font-bold text-center">
                                                    {season.name
                                                        ? `Сезон ${season.number} (${season.name})`
                                                        : `Сезон ${season.number}`}
                                                </h1>
                                                <div className="mt-4 grid grid-cols-10 gap-4 max-sm:grid-cols-3 mb-4">
                                                    {season.episodes &&
                                                        season.episodes.map(
                                                            (
                                                                episode,
                                                                index
                                                            ) => (
                                                                <Link
                                                                    href={route(
                                                                        "anime",
                                                                        [
                                                                            Anime.unix,
                                                                            season.number,
                                                                            episode.number,
                                                                        ]
                                                                    )}
                                                                    preserveScroll
                                                                    key={index}
                                                                >
                                                                    <Button
                                                                        className="w-full"
                                                                        variant="outline"
                                                                        key={
                                                                            episode.id
                                                                        }
                                                                    >
                                                                        {
                                                                            episode.number
                                                                        }
                                                                    </Button>
                                                                </Link>
                                                            )
                                                        )}
                                                </div>
                                            </div>
                                        ))}
                            </div>
                        )}
                    </div>
                )}
            </DragDropContext>
        </>
    );
}
