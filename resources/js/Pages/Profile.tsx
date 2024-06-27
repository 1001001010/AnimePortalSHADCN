import { Link, Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import Header from "@/Components/Header";
import { Popover, PopoverContent, PopoverTrigger } from "@/shadcn/ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Button } from "@/shadcn/ui/button";
import { Calendar } from "@/shadcn/ui/calendar";
import * as React from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export default function Profile({
    auth,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    const handleImageError = () => {
        document
            .getElementById("screenshot-container")
            ?.classList.add("!hidden");
        document.getElementById("docs-card")?.classList.add("!row-span-1");
        document
            .getElementById("docs-card-content")
            ?.classList.add("!flex-row");
        document.getElementById("background")?.classList.add("!hidden");
    };
    export function DatePickerDemo() {
        const [date, setDate] = React.useState<Date>()
    return (
        <>
            <Header auth={auth} />

            <div className="ml-14">
                <div className="m-4 border border-gray-200 rounded-lg shadow dark:border-gray-700">
                    <div className="p-6 text-gray-900 dark:text-gray-100 grid grid-cols-4 gap-4">
                        <div>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-[240px] justify-start text-left font-normal",
                                            !date && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {date ? (
                                            format(date, "PPP")
                                        ) : (
                                            <span>Pick a date</span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                    className="w-auto p-0"
                                    align="start"
                                >
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
