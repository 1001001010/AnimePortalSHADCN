import { PageProps, User } from "@/types";
import Header from "@/Components/Header";
import ProfileImage from "@/Components/Profile/ProfileImage";

export default function Profile({
    auth,
    user_info,
}: PageProps<{
    user: User;
    user_info: User;
}>) {
    const date = new Date(auth.user.created_at);
    const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
    } as const;
    const formattedDate = date
        .toLocaleString("ru-RU", options)
        .replace(" г.", "")
        .replace(".", "");
    return (
        <>
            <Header auth={auth} />
            <div className="ml-14 ml:ml-0 max-sm:ml-0">
                <div className="m-4 max-sm:m-1 max-sm:p-1 border rounded-lg shadow">
                    <div className="flex">
                        <ProfileImage auth={auth} user_info={user_info} />
                        <div className="m-2 text-gray-900 dark:text-gray-100 flex flex-col">
                            {user_info ? (
                                <div className="flex flex-col gap-4">
                                    <h3>{user_info.name}</h3>
                                    <p>Регистрация: {formattedDate}</p>
                                    {auth.user.is_admin == 1 ? (
                                        <div>
                                            <p>
                                                <b>Email:</b> {user_info.email}
                                            </p>
                                            <p>
                                                <b>Права: </b>
                                                {user_info.is_admin === 1
                                                    ? "Администратор"
                                                    : "Пользователь"}
                                            </p>
                                            <p>
                                                <b>Верификация: </b>
                                                {user_info.email_verified_at !=
                                                null
                                                    ? ` ${new Date(
                                                          user_info.created_at
                                                      ).toLocaleString()}`
                                                    : "Не верифицирован"}
                                            </p>
                                            <p>
                                                <b>Способ регистрации: </b>
                                                {user_info.regist_method ===
                                                "default"
                                                    ? "Форма регистрации"
                                                    : "Яндекс"}
                                            </p>
                                        </div>
                                    ) : null}
                                </div>
                            ) : (
                                <div className="flex flex-col gap-4">
                                    <h3>{auth.user.name}</h3>
                                    <p>Регистрация: {formattedDate}</p>
                                    {auth.user.is_admin == 1 ? (
                                        <div>
                                            <p>
                                                <b>Email:</b> {auth.user.email}
                                            </p>
                                            <p>
                                                <b>Права: </b>
                                                {auth.user.is_admin === 1
                                                    ? "Администратор"
                                                    : "Пользователь"}
                                            </p>
                                            <p>
                                                <b>Верификация: </b>
                                                {auth.user.email_verified_at !=
                                                null
                                                    ? ` ${new Date(
                                                          auth.user.created_at
                                                      ).toLocaleString()}`
                                                    : "Не верифицирован"}
                                            </p>
                                            <p>
                                                <b>Способ регистрации: </b>
                                                {auth.user.regist_method ===
                                                "default"
                                                    ? "Форма регистрации"
                                                    : "Яндекс"}
                                            </p>
                                        </div>
                                    ) : null}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
