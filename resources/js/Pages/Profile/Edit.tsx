import { PageProps } from "@/types";
import Header from "@/Components/Header";
import DeleteUserForm from "./Partials/DeleteUserForm";
import ActiveSession from "./Partials/ActiveSession";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import { Toaster } from "@/shadcn/ui/sonner";
import { CalendarIcon } from "@radix-ui/react-icons";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/shadcn/ui/hover-card";

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
            <div className="ml-14 ml:ml-0">
                <div className="m-4 border border-gray-200 rounded-lg shadow dark:border-gray-700 flex flex-wrap md:flex-nowrap">
                    <div className="p-6 text-gray-900 dark:text-gray-100 w-full md:w-2/3">
                        <div className="mb-4 border border-gray-200 rounded-lg shadow dark:border-gray-700 w-full p-4">
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="mb-4"
                            />
                        </div>
                        <div className="mb-4 border border-gray-200 rounded-lg shadow dark:border-gray-700 w-full p-4">
                            <UpdatePasswordForm className="mb-4" />
                        </div>
                        <div className="mb-4 border border-gray-200 rounded-lg shadow dark:border-gray-700 w-full p-4">
                            <DeleteUserForm />
                        </div>
                    </div>
                    <div className="p-6 text-gray-900 dark:text-gray-100 w-full md:w-1/3">
                        <h2 className="mb-4 text-lg font-medium">Сессии</h2>
                        <ActiveSession activeSessions={activeSession} />
                    </div>
                </div>
            </div>
            <Toaster />
        </>
    );
}
