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
import { Analytics, PageProps } from "@/types";

export default function AnalyticsRegistration({
    info,
}: PageProps<{ info: Analytics }>) {
    const monthTranslations = {
        January: "Январь",
        February: "Февраль",
        March: "Март",
        April: "Апрель",
        May: "Май",
        June: "Июнь",
        July: "Июль",
        August: "Август",
        September: "Сентябрь",
        October: "Октябрь",
        November: "Ноябрь",
        December: "Декабрь",
    };

    const chartData = Object.keys(info.registration.google)
        .sort((b, a) => b.localeCompare(a))
        .map((month, index) => {
            return {
                month: monthTranslations[
                    month as keyof typeof monthTranslations
                ],
                google: info.registration.google[month],
                default: info.registration.default[month],
            };
        });

    const chartConfig = {
        google: {
            label: "Google",
            color: "hsl(var(--chart-1))",
        },
        default: {
            label: "Форма",
            color: "hsl(var(--chart-2))",
        },
    } satisfies ChartConfig;
    return (
        <>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Регистрации</CardTitle>
                    {/* <CardDescription>January - June 2024</CardDescription> */}
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
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={
                                    <ChartTooltipContent indicator="dashed" />
                                }
                            />
                            <Bar
                                dataKey="google"
                                fill="var(--color-google)"
                                radius={4}
                            />
                            <Bar
                                dataKey="default"
                                fill="var(--color-default)"
                                radius={4}
                            />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
                <CardFooter className="flex-col items-start gap-2 text-sm">
                    <div className="leading-none text-muted-foreground">
                        Статистика регистраций пользователей за последние 6
                        месяцев
                    </div>
                </CardFooter>
            </Card>
        </>
    );
}
