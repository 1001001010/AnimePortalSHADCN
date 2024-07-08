import { Link, Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import Header from "@/Components/Header";

export default function Welcome({
    auth,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
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
            <Header auth={auth} />
            <div className="ml-14 max-md:ml-0">
                <div className="m-4 p-4 border border-gray-200 rounded-lg shadow dark:border-gray-700"></div>
            </div>
        </>
    );
}
