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
import { FriendShips, PageProps } from "@/types";
import Header from "@/Components/Header";
import AnalyticsRegistration from "@/Components/Admin/AnalyticRegistration";

export default function Analytics({
    auth,
    friendship,
}: PageProps<{
    user: { name: string; email: string; created_at: string };
    users: any[];
    friendship: FriendShips;
}>) {
    const chartData = [
        { browser: "chrome", visitors: 1, fill: "var(--color-chrome)" },
        { browser: "safari", visitors: 0, fill: "var(--color-safari)" },
        { browser: "firefox", visitors: 0, fill: "var(--color-firefox)" },
        { browser: "edge", visitors: 0, fill: "var(--color-edge)" },
        { browser: "other", visitors: 0, fill: "var(--color-other)" },
    ];

    const chartConfig = {
        visitors: {
            label: "Visitors",
        },
        chrome: {
            label: "Chrome",
            color: "hsl(var(--chart-1))",
        },
        safari: {
            label: "Safari",
            color: "hsl(var(--chart-2))",
        },
        firefox: {
            label: "Firefox",
            color: "hsl(var(--chart-3))",
        },
        edge: {
            label: "Edge",
            color: "hsl(var(--chart-4))",
        },
        other: {
            label: "Other",
            color: "hsl(var(--chart-5))",
        },
    } satisfies ChartConfig;

    return (
        <>
            <Header auth={auth} friendship={friendship} />
            <div className="ml-14 ml:ml-0 max-sm:ml-0 w-1/2 max-lg:w-11/12 max-sm:w-full">
                <div className="m-4 rounded-lg shadow w-full flex justify-between gap-5">
                    <Card className="w-full">
                        <CardHeader>
                            <CardTitle>Статистика посещения</CardTitle>
                            <CardDescription>За все время</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={chartConfig}>
                                <BarChart
                                    accessibilityLayer
                                    data={chartData}
                                    layout="vertical"
                                    margin={{
                                        left: 0,
                                    }}
                                >
                                    <YAxis
                                        dataKey="browser"
                                        type="category"
                                        tickLine={false}
                                        tickMargin={10}
                                        axisLine={false}
                                        tickFormatter={(value) =>
                                            chartConfig[
                                                value as keyof typeof chartConfig
                                            ]?.label
                                        }
                                    />
                                    <XAxis
                                        dataKey="visitors"
                                        type="number"
                                        hide
                                    />
                                    <ChartTooltip
                                        cursor={false}
                                        content={
                                            <ChartTooltipContent hideLabel />
                                        }
                                    />
                                    <Bar
                                        dataKey="visitors"
                                        layout="vertical"
                                        radius={5}
                                    />
                                </BarChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                    <AnalyticsRegistration auth={auth} />
                </div>
            </div>
        </>
    );
}
