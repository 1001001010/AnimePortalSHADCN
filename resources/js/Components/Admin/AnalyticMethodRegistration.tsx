import { Analytics, PageProps } from "@/types";
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

const chartConfig = {
    desktop: {
        color: "hsl(var(--chart-1))",
    },
} satisfies ChartConfig;

export default function AnalyticMethodRegistration({
    info,
}: PageProps<{ info: Analytics }>) {
    const chartData = [
        { method: "Google", регистраций: info.registrationMethod.google },
        { method: "Логин-пароль", регистраций: info.registrationMethod.form },
    ];
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
                        {info.registrationMethod.text}
                        <TrendingUp className="h-4 w-4" />
                    </div>
                    <div className="leading-none text-muted-foreground">
                        Способ регистрации пользователей за все время
                    </div>
                </CardFooter>
            </Card>
        </>
    );
}
