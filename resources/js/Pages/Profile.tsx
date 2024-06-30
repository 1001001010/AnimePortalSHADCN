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
            <div className="ml-14">
                <div className="m-4 border border-gray-200 rounded-lg shadow dark:border-gray-700">
                    <div className="p-6 text-gray-900 dark:text-gray-100 flex flex-col gap-4">
                        <div>
                            Дата регистрации:{" "}
                            {new Date(user.created_at).toLocaleDateString()}
                        </div>
                        <div>Имя: {user.name}</div>
                        <div>Email: {user.email}</div>
                    </div>
                </div>
            </div>
        </>
    );
}
