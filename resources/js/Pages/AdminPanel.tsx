import { Anime, FriendShips, PageProps, User } from "@/types";
import Header from "@/Components/Header";
import NewAnimeForm from "@/Components/Admin/NewAnime";
import DelAnimeForm from "@/Components/Admin/DelAnime";
import UserTable from "@/Components/Admin/UserTable";

export default function AdminPanel({
    auth,
    friendship,
    Anime,
    user,
}: PageProps<{ friendship: FriendShips; Anime: Anime[]; user: User[] }>) {
    return (
        <>
            <Header friendship={friendship} auth={auth} />
            <div className="ml-14 ml:ml-0 max-sm:ml-0">
                <div className="m-4 max-sm:m-1 max-sm:p-1 border rounded-lg shadow p-4">
                    <div className="flex justify-start gap-2 pb-4">
                        <NewAnimeForm />
                        <DelAnimeForm auth={auth} animeList={Anime} />
                    </div>
                    <hr />
                    <UserTable users={user} auth={auth} />
                </div>
            </div>
        </>
    );
}
