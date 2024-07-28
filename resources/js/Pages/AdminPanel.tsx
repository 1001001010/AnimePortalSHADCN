import { PageProps } from "@/types";
import Header from "@/Components/Header";
import NewAnimeForm from "@/Components/NewAnime";

export default function AdminPanel({ auth }: PageProps<{}>) {
    return (
        <>
            <Header auth={auth} />
            <div className="ml-14 ml:ml-0 max-sm:ml-0">
                <div className="m-4 border border-gray-200 rounded-lg shadow dark:border-gray-700">
                    <NewAnimeForm />
                </div>
            </div>
        </>
    );
}
