import { Anime, FriendShips, PageProps } from "@/types";
import Header from "@/Components/Header";
import NewItems from "@/Components/Welcome/NewItems";
import ItemsList from "@/Components/Welcome/ItemsList";

export default function Welcome({
    auth,
    NewAnime,
    friendship,
    AllItems,
}: PageProps<{
    NewAnime: Anime[];
    friendship: FriendShips;
    AllItems: Anime[];
}>) {
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
                <div className="m-4 p-4 max-sm:m-1 max-sm:p-1 border rounded-lg shadow">
                    <NewItems Anime={NewAnime} auth={auth} />
                    <ItemsList auth={auth} anime={AllItems} />
                </div>
            </div>
        </>
    );
}
