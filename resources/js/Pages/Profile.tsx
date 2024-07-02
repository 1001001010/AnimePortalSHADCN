import { PageProps } from "@/types";
import Header from "@/Components/Header";

export default function Profile({
    auth,
    user,
}: PageProps<{
    user: { name: string; email: string; created_at: string };
}>) {
    return (
        <>
            <Header auth={auth} />
            <div className="ml-14 max-md:ml-0">
                <div className="m-4 border border-gray-200 rounded-lg shadow dark:border-gray-700">
                    <div className="p-6 text-gray-900 dark:text-gray-100 flex flex-col gap-4">
                        <div>
                            Дата регистрации: {`${new Date(auth.user.created_at).toLocaleString()}`}
                        </div>
                        <div>Имя: {auth.user.name}</div>
                        <div>Email: {auth.user.email}</div>
                    </div>
                </div>
            </div>
        </>
    );
}
