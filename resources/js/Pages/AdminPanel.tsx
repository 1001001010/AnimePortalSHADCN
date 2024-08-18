import { Anime, FriendShips, PageProps } from "@/types";
import Header from "@/Components/Header";
import NewAnimeForm from "@/Components/Admin/NewAnime";
import DelAnimeForm from "@/Components/Admin/DelAnime";

export default function AdminPanel({
    auth,
    friendship,
    Anime,
}: PageProps<{ friendship: FriendShips; Anime: Anime[] }>) {
    return (
        <>
            <Header auth={auth} friendship={friendship} />
            <div className="ml-14 ml:ml-0 max-sm:ml-0">
                <div className="m-4 border border-gray-200 rounded-lg shadow dark:border-gray-700 flex justify-start gap-2 p-4">
                    <NewAnimeForm />
                    <DelAnimeForm auth={auth} animeList={Anime} />
                </div>
            </div>
        </>
    );
}
