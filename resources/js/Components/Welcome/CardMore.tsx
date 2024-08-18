import { PageProps } from "@/types";
import { Button } from "@/shadcn/ui/button";
import { CarouselItem } from "@/shadcn/ui/carousel";
import { Card, CardContent } from "@/shadcn/ui/card";
import { ChevronsRight } from "lucide-react";

export default function CardMore({}: PageProps<{}>) {
    return (
        <>
            <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 min-w-72 min-h-96">
                <div className="p-1 h-full">
                    <Card className="h-full">
                        <CardContent className="flex w-full justify-center items-center p-2 h-full">
                            <Button
                                variant="outline"
                                className="p-10 max-sm:p-2 rounded-full border-dashed border-2"
                            >
                                Больше
                                <ChevronsRight className="h-5 w-5 pt-0.5" />
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </CarouselItem>
        </>
    );
}
