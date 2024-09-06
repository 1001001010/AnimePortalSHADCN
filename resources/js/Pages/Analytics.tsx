"use client";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis } from "recharts";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/shadcn/ui/card";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/shadcn/ui/chart";
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
                <div className="m-4 rounded-lg shadow flex justify-between gap-5 max-md:flex-col">
                    <AnalyticsRegistration auth={auth} info={analytic} />
                    <AnalyticMethodRegistration auth={auth} info={analytic} />
                </div>
            </div>
        </>
    );
}
