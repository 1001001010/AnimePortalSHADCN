"use client";
import { Analytics, PageProps } from "@/types";
import Header from "@/Components/Header";
import AnalyticsMethodRegistration from "@/Components/Admin/AnalyticsMethodRegistration";
import AnalyticsRegistration from "@/Components/Admin/AnalyticsRegistration";
import AnalyticsPopularAnime from "@/Components/Admin/AnalyticsPopularAnime";

export default function Analytic({
    auth,
    analytic,
}: PageProps<{
    user: { name: string; email: string; created_at: string };
    users: any[];
    analytic: Analytics;
}>) {
    return (
        <>
            <Header auth={auth} />
            <div className="ml-14 ml:ml-0 max-sm:ml-0">
                <div className="m-4 p-2 grid grid-cols-3 gap-5">
                    <AnalyticsRegistration auth={auth} info={analytic} />
                    <AnalyticsMethodRegistration auth={auth} info={analytic} />
                    <AnalyticsPopularAnime auth={auth} info={analytic} />
                </div>
            </div>
        </>
    );
}
