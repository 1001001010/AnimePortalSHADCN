import { Anime, PageProps, User } from "@/types";
import Header from "@/Components/Header";
import NewAnimeForm from "@/Components/Admin/NewAnime";
import DelAnimeForm from "@/Components/Admin/DelAnime";
import UserTable from "@/Components/Admin/UserTable";
import { Button } from "@/shadcn/ui/button";
import { Link } from "@inertiajs/react";

export default function AdminPanel({
    auth,
    Anime,
    user,
}: PageProps<{ Anime: Anime[]; user: User[] }>) {
    return (
        <>
            <Header auth={auth} />
            <div className="ml-14 ml:ml-0 max-sm:ml-0">
                <div className="m-4 max-sm:m-1 max-sm:p-1 border rounded-lg shadow p-4">
                    <div className="flex justify-start flex-wrap gap-2 pb-4">
                        <NewAnimeForm />
                        <DelAnimeForm auth={auth} animeList={Anime} />
                        <Button variant={"outline"} className="ml-2">
                            <Link href={route("DownloadsLogs")}>
                                Получить логи
                            </Link>
                        </Button>
                    </div>
                    <hr />
                    <UserTable users={user} auth={auth} />
                </div>
            </div>
        </>
    );
}
