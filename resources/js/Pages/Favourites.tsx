"use client";

import { Favourite, FriendShips, PageProps } from "@/types";
import Header from "@/Components/Header";
import ItemCard from "@/Components/Anime/ItemCard";

export default function Favourites({
    auth,
    friendship,
    favourites,
}: PageProps<{
    friendship: FriendShips;
    favourites: Favourite[];
}>) {
    console.log(favourites);
    return (
        <>
            <Header friendship={friendship} auth={auth} />
            <div className="ml-14 ml:ml-0 max-sm:ml-0">
                <div className="m-4 border rounded-lg shadow">
                    <p className="text-center pt-4">Избранные аниме</p>
                    <div className="grid grid-cols-5 max-xl:grid-cols-2 max-md:grid-cols-1 items-center justify-items-center auto-rows-dense gap-4 m-4">
                        {favourites.map((item, index) => (
                            <ItemCard
                                auth={auth}
                                index={index}
                                info={item.anime}
                                favButton={true}
                                favID={item.id}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
