import { Card, CardContent } from "@/shadcn/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/shadcn/ui/carousel";
import { Button } from "@/shadcn/ui/button";
import { ChevronsRight } from "lucide-react";

export default function NewItems() {
    return (
        <div>
            <header>
                <h2 className="text-lg font-medium pb-3 mx-10">Новинки</h2>
            </header>
            <div className="flex justify-center max-lg:mx-10">
                <Carousel
                    opts={{
                        align: "start",
                    }}
                    className="w-full md:w-11/12 lg:w-11/12 xl:w-11/12"
                >
                    <CarouselPrevious className="mr-2" />
                    <div className="flex justify-center">
                        <CarouselContent>
                            {Array.from({ length: 15 }).map((_, index) => (
                                <CarouselItem
                                    key={index}
                                    className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5"
                                >
                                    <div className="p-1 max-sm:p-0">
                                        <Card>
                                            <CardContent className="flex aspect-square items-center justify-center p-2">
                                                <img
                                                    src="/img/Poster.jpg"
                                                    alt="Лого"
                                                />
                                            </CardContent>
                                            <div className="flex items-start justify-start py-2">
                                                <div className="w-full flex items-center justify-between px-5 max-sm:flex-col">
                                                    <div className="max-sm:text-center">
                                                        <p className="font-semibold">
                                                            Берсерк
                                                        </p>
                                                        <p className="text-gray-600 font-medium">
                                                            Studio 4°C
                                                        </p>
                                                    </div>
                                                    <Button
                                                        variant="outline"
                                                        className="max-sm:p-2"
                                                    >
                                                        Смотреть
                                                    </Button>
                                                </div>
                                            </div>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            ))}
                            <CarouselItem className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
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
                        </CarouselContent>
                    </div>
                    <CarouselNext className="ml-2" />
                </Carousel>
            </div>
        </div>
    );
}
