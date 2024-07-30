import { PageProps } from "@/types";
import Header from "@/Components/Header";
import NewAnimeForm from "@/Components/NewAnime";
import NewEpisodes from "@/Components/NewEpisodes";

export default function AdminPanel({
    auth,
    Anime,
}: PageProps<{ Anime: any[] }>) {
    return (
        <>
            <Header auth={auth} />
            <div className="ml-14 ml:ml-0 max-sm:ml-0">
                <div className="m-4 border border-gray-200 rounded-lg shadow dark:border-gray-700 flex justify-between p-4">
                    <NewAnimeForm />
                    <NewEpisodes Anime={Anime} auth={auth} />
                </div>
            </div>
        </>
    );
}
