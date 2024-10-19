"use client"

import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/shadcn/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/shadcn/ui/chart"
import {Analytics, PageProps} from "@/types";

export const description = "A pie chart with no separator"

const createChartData = (popularList:any) => {
    return popularList.map((item:any, index: number) => ({
        anime: item.anime.name,
        views: item.views_count,
        fill: `hsl(var(--chart-${index + 1})`,
    }));
};

interface AnimeConfig {
    label: string;
    color: string;
}

interface ChartConfig {
    views: {
        label: string;
    };
    [key: string]: AnimeConfig | { label: string };
}

const createChartConfig = (popularList: any): ChartConfig => {
    const config: ChartConfig = {
        views: {
            label: "Views",
        },
    };

    popularList.forEach((item: any, index: number) => {
        config[item.anime.name] = {
            label: item.anime.name,
            color: `hsl(var(--chart-${index + 1}))`,
        };
    });

    return config;
};
export default function AnalyticsPopularAnime({
  info
}:PageProps<{info:Analytics}>) {
    const chartData = createChartData(info.popularList);
    const chartConfig = createChartConfig(info.popularList);

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-start pb-0">
                <CardTitle>Popular Anime</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="views"
                            nameKey="anime"
                            stroke="0"
                        />
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                    {info.registrationMethod.text}
                    <TrendingUp className="h-4 w-4" />
                </div>
                <div className="leading-none text-muted-foreground">
                    Способ регистрации пользователей за все время
                </div>
            </CardFooter>
        </Card>
    )
}
