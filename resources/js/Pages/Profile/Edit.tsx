import { PageProps } from "@/types";
import Header from "@/Components/Header";
import ActiveSession from "./Partials/ActiveSession";
import VerifyEmail from "./Partials/VerifiedEmail";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import UpdateProfilePhoto from "./Partials/UpdateProfilePhoto";

export default function Edit({
    auth,
    mustVerifyEmail,
    status,
    activeSession,
}: PageProps<{
    mustVerifyEmail: boolean;
    status?: string;
    activeSession: any[];
}>) {
    return (
        <>
            <Header auth={auth} />
            <div className="ml-14 ml:ml-0 max-sm:ml-0">
                <div className="m-4 max-sm:m-1 max-sm:p-1 border rounded-lg shadow flex flex-wrap md:flex-nowrap">
                    <div className="p-4 max-sm:p-1 text-gray-900 dark:text-gray-100 w-full md:w-2/3">
                        <div className="mb-4 border rounded-lg shadow w-full p-4">
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="mb-4"
                            />
                        </div>
                        <div className="mb-4 border rounded-lg shadow w-full p-4">
                            <UpdateProfilePhoto className="mb-4" />
                        </div>
                        {auth.user.regist_method == "default" ? (
                            <div className="mb-4 border rounded-lg shadow w-full p-4">
                                <UpdatePasswordForm className="mb-4" />
                            </div>
                        ) : null}
                    </div>
                    <div className="p-4 text-gray-900 dark:text-gray-100 w-full md:w-1/3 max-sm:p-1">
                        <h2 className="mb-4 text-lg font-medium">Сессии</h2>
                        <ActiveSession activeSessions={activeSession} />
                    </div>
                </div>
            </div>
        </>
    );
}
