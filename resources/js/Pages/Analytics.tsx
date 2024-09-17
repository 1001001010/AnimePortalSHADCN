"use client";
import { Analytics, FriendShips, PageProps } from "@/types";
import Header from "@/Components/Header";
import AnalyticMethodRegistration from "@/Components/Admin/AnalyticMethodRegistration";
import AnalyticsRegistration from "@/Components/Admin/AnalyticsRegistration";

export default function Analytic({
    auth,
    friendship,
    analytic,
}: PageProps<{
    user: { name: string; email: string; created_at: string };
    users: any[];
    friendship: FriendShips;
    analytic: Analytics;
}>) {
    return (
        <>
            <Header auth={auth} friendship={friendship} />
            <div className="ml-14 ml:ml-0 max-sm:ml-0 w-1/2 max-lg:w-11/12 max-sm:w-full">
                <div className="m-4 max-sm:m-1 max-sm:p-1 rounded-lg shadow flex justify-between gap-5 max-md:flex-col">
                    <AnalyticsRegistration auth={auth} info={analytic} />
                    <AnalyticMethodRegistration auth={auth} info={analytic} />
                </div>
            </div>
        </>
    );
}
