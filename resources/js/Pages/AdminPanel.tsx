import { FriendShips, PageProps } from "@/types";
import Header from "@/Components/Header";
import NewAnimeForm from "@/Components/Admin/NewAnime";

export default function AdminPanel({
    auth,
    Anime,
    friendship,
}: PageProps<{ Anime: any[]; friendship: FriendShips }>) {
    return (
        <>
            <Header auth={auth} friendship={friendship} />
            <div className="ml-14 ml:ml-0 max-sm:ml-0">
                <div className="m-4 border border-gray-200 rounded-lg shadow dark:border-gray-700 flex justify-between p-4">
                    <NewAnimeForm />
                </div>
            </div>
        </>
    );
}
