import { PageProps } from "@/types";
import { Button } from "@/shadcn/ui/button";
import { Link } from "@inertiajs/react";
import type { Anime, Season } from "@/types";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { useState } from "react";
import NewSeasonForm from "@/Components/Admin/NewSeasonForm";
import NewEpisodeForm from "@/Components/Admin/NewEpisode";

export default function SeasonEpisodeList({
    auth,
    Anime,
    seasons,
}: PageProps<{
    seasons: Season[];
    Anime: Anime;
}>) {
    return (
        <>
            <div className="m-4 p-4 max-sm:m-1 max-sm:p-2 border rounded-lg shado max-md:flex-col max-md:items-center">
                {auth.user && auth.user.is_admin === 1 ? (
                    <div className="flex justify-between gap-4 pb-3 max-sm:flex-col max-sm:gap-2">
                        <NewSeasonForm Anime={Anime} auth={auth} />
                        <NewEpisodeForm
                            Anime={Anime}
                            Season={seasons}
                            auth={auth}
                        />
                    </div>
                ) : null}

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
                                                (episode, index) => (
                                                    <Link
                                                        href={route("anime", [
                                                            Anime.unix,
                                                            season.number,
                                                            episode.number,
                                                        ])}
                                                        preserveScroll
                                                        key={index}
                                                    >
                                                        <Button
                                                            className="w-full"
                                                            variant="outline"
                                                            key={episode.id}
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
        </>
    );
}
