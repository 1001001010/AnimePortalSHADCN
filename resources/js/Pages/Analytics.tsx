"use client";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
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
import Header from "@/Components/Header";
import { FriendShips, PageProps } from "@/types";

export default function Friends({
    auth,
    friendship,
}: PageProps<{
    friendship: FriendShips;
}>) {
    const chartData = [
        { month: "January", desktop: 186, mobile: 80 },
        { month: "February", desktop: 305, mobile: 200 },
        { month: "March", desktop: 237, mobile: 120 },
        { month: "April", desktop: 73, mobile: 190 },
        { month: "May", desktop: 209, mobile: 130 },
        { month: "June", desktop: 214, mobile: 140 },
        { month: "July", desktop: 251, mobile: 160 },
        { month: "August", desktop: 192, mobile: 110 },
        { month: "September", desktop: 220, mobile: 150 },
        { month: "October", desktop: 198, mobile: 180 },
        { month: "November", desktop: 242, mobile: 120 },
        { month: "December", desktop: 278, mobile: 200 },
    ];

    const chartConfig = {
        desktop: {
            label: "Desktop",
            color: "hsl(var(--chart-1))",
        },
        mobile: {
            label: "Mobile",
            color: "hsl(var(--chart-2))",
        },
    } satisfies ChartConfig;

    return (
        <>
            <Header auth={auth} friendship={friendship} />
            <div className="ml-14 ml:ml-0 max-sm:ml-0 w-1/3 max-lg:w-11/12 max-sm:w-full">
                <div className="m-4 border border-gray-200 rounded-lg shadow dark:border-gray-700">
                    <Card>
                        <CardHeader>
                            <CardTitle>Bar Chart - Multiple</CardTitle>
                            <CardDescription>
                                January - June 2024
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ChartContainer config={chartConfig}>
                                <BarChart accessibilityLayer data={chartData}>
                                    <CartesianGrid vertical={false} />
                                    <XAxis
                                        dataKey="month"
                                        tickLine={false}
                                        tickMargin={10}
                                        axisLine={false}
                                        tickFormatter={(value) =>
                                            value.slice(0, 3)
                                        }
                                    />
                                    <ChartTooltip
                                        cursor={false}
                                        content={
                                            <ChartTooltipContent indicator="dashed" />
                                        }
                                    />
                                    <Bar
                                        dataKey="desktop"
                                        fill="var(--color-desktop)"
                                        radius={4}
                                    />
                                    <Bar
                                        dataKey="mobile"
                                        fill="var(--color-mobile)"
                                        radius={4}
                                    />
                                </BarChart>
                            </ChartContainer>
                        </CardContent>
                        <CardFooter className="flex-col items-start gap-2 text-sm">
                            <div className="flex gap-2 font-medium leading-none">
                                Trending up by 5.2% this month{" "}
                                <TrendingUp className="h-4 w-4" />
                            </div>
                            <div className="leading-none text-muted-foreground">
                                Showing total visitors for the last 6 months
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </>
    );
}
