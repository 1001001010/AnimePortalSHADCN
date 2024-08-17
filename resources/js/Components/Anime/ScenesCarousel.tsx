import { Card, CardContent } from "@/shadcn/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/shadcn/ui/carousel";
import { PageProps } from "@/types";
import type { Anime } from "@/types";

export default function ScrenesCarousel({
    Anime,
}: PageProps<{ Anime: Anime }>) {
    const imageDataArray: string[] = JSON.parse(Anime.screens);
    return (
        <div>
            <header>
                <h2 className="text-lg font-medium pb-3 mx-10">Кадры</h2>
            </header>
            <div className="flex justify-center">
                <Carousel
                    opts={{
                        align: "start",
                    }}
                    className="w-full md:w-11/12 lg:w-11/12 xl:w-11/12"
                >
                    <div className="block max-lg:hidden">
                        <CarouselPrevious className="" />
                    </div>
                    <div className="flex justify-center">
                        <CarouselContent>
                            {[...imageDataArray]
                                .sort(() => Math.random() - 0.5)
                                .map((item, index) => (
                                    <CarouselItem
                                        key={index}
                                        className="basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                                    >
                                        <div className="p-1 max-sm:p-0">
                                            <Card>
                                                <CardContent className="flex aspect-ratio-1/1 items-center justify-center p-2">
                                                    <img
                                                        src={item}
                                                        alt="Кадры"
                                                        className="object-cover"
                                                    />
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </CarouselItem>
                                ))}
                        </CarouselContent>
                    </div>
                    <div className="block max-lg:hidden">
                        <CarouselNext className="" />
                    </div>
                </Carousel>
            </div>
        </div>
    );
}
