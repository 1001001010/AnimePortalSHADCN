import { Link, Head } from "@inertiajs/react";
import { FriendShips, PageProps } from "@/types";
import Header from "@/Components/Header";
import NewItems from "@/Components/NewItems";
import HighestScoreItems from "@/Components/HighestScoreItems";
import ItemsList from "@/Components/ItemsList";

export default function Welcome({
    auth,
    NewAnime,
    friendship,
}: PageProps<{ NewAnime: any[]; friendship: any }>) {
    const handleImageError = () => {
        document
            .getElementById("screenshot-container")
            ?.classList.add("!hidden");
        document.getElementById("docs-card")?.classList.add("!row-span-1");
        document
            .getElementById("docs-card-content")
            ?.classList.add("!flex-row");
        document.getElementById("background")?.classList.add("!hidden");
    };

    return (
        <>
            <Header friendship={friendship} auth={auth} />
            <div className="ml-14 ml:ml-0 max-sm:ml-0">
                <div className="m-4 p-4 border border-gray-200 rounded-lg shadow dark:border-gray-700">
                    <NewItems Anime={NewAnime} auth={auth} />
                    <HighestScoreItems />
                    <ItemsList />
                </div>
            </div>
        </>
    );
}
