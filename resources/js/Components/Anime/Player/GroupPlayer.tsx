import { PageProps } from "@/types";
import { Button } from "@/shadcn/ui/button";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import { Link } from "@inertiajs/react";
import type { Anime, Season, Episode, GroupMembers } from "@/types";
import EpisodeControls from "../EpisodeControls";
import NewSeasonForm from "@/Components/Admin/NewSeasonForm";
import NewEpisodeForm from "@/Components/Admin/NewEpisode";
import GroupChat from "./GroupChat";
import BandMembers from "./BandMembers";

export default function GroupPlayer({
    auth,
    anime,
    seasons,
    currentEpisode,
    nextEpisode,
    previousEpisode,
    plyrProps,
    invite_link,
    InGroup,
    groupMembers,
    user_group_info,
}: PageProps<{
    anime: Anime;
    seasons: Season[];
    episode: Episode;
    currentEpisode?: Episode;
    nextEpisode?: Episode;
    previousEpisode?: Episode;
    plyrProps?: any;
    invite_link: string;
    InGroup: boolean;
    groupMembers: GroupMembers[];
    user_group_info?: GroupMembers;
}>) {
    return (
        <>
            <div className=" border rounded-lg shadow flex justify-between max-xl:flex-col max-xl:items-center max-xl:p-4 w-full">
                <div className="m-4 max-xl:w-full max-xl:mb-4 flex gap-4 w-full">
                    <div id="player" className="w-4/6">
                        <Plyr {...plyrProps} />
                        <EpisodeControls
                            auth={auth}
                            anime={anime}
                            currentEpisode={currentEpisode}
                            nextEpisode={nextEpisode}
                            previousEpisode={previousEpisode}
                            InGroup={InGroup}
                        />
                    </div>
                    <GroupChat auth={auth} />
                </div>
            </div>

            <div className="border rounded p-4">
                <ul className="m-4">Участники группы</ul>
                <BandMembers
                    auth={auth}
                    invite_link={invite_link}
                    InGroup={InGroup}
                    groupMembers={groupMembers}
                    user_group_info={user_group_info}
                />
            </div>
        </>
    );
}
