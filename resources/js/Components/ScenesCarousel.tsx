import { Card, CardContent } from "@/shadcn/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/shadcn/ui/carousel";
import { Button } from "@/shadcn/ui/button";

const imageData = [
    { id: 1, title: "Берсерк" },
    { id: 2, title: "Title 2" },
    { id: 3, title: "Title 3" },
    { id: 4, title: "Title 4" },
    { id: 5, title: "Title 5" },
    { id: 6, title: "Title 6" },
    { id: 7, title: "Title 7" },
    { id: 8, title: "Title 8" },
    { id: 9, title: "Title 9" },
];

export default function ScrenesCarousel() {
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
                            {imageData.map((item) => (
                                <CarouselItem
                                    key={item.id}
                                    className="basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                                >
                                    <div className="p-1 max-sm:p-0">
                                        <Card>
                                            <CardContent className="flex aspect-ratio-1/1 items-center justify-center p-2">
                                                <img
                                                    src={`/img/screnes/${item.id}.jpg`}
                                                    alt={item.title}
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
