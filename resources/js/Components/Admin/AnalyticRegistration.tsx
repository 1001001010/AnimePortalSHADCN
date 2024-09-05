import { PageProps } from "@/types";
("use client");
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
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

const chartData = [
    { method: "Google", регистраций: 1 },
    { method: "Форма", регистраций: 0 },
];
const chartConfig = {
    desktop: {
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig;

export default function AnalyticsRegistration({}: PageProps<{}>) {
    return (
        <>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Способ регистрации</CardTitle>
                    <CardDescription>За все время</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig}>
                        <BarChart
                            accessibilityLayer
                            data={chartData}
                            margin={{
                                top: 20,
                            }}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="method"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                            />
                            <Bar
                                dataKey="регистраций"
                                fill="var(--color-desktop)"
                                radius={8}
                            >
                                <LabelList
                                    position="top"
                                    offset={12}
                                    className="fill-foreground"
                                    fontSize={12}
                                />
                            </Bar>
                        </BarChart>
                    </ChartContainer>
                </CardContent>
                <CardFooter className="flex-col items-start gap-2 text-sm">
                    <div className="flex gap-2 font-medium leading-none">
                        Регистраций через Google больше на 5.2%
                        <TrendingUp className="h-4 w-4" />
                    </div>
                </CardFooter>
            </Card>
        </>
    );
}
