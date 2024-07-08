import { Card, CardContent } from "@/shadcn/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/shadcn/ui/carousel";
import { Button } from "@/shadcn/ui/button";

export default function NewItems() {
    return (
        <div className="flex justify-center">
            <Carousel
                opts={{
                    align: "start",
                }}
                className="w-11/12"
            >
                <CarouselPrevious className="mr-2" />{" "}
                <div className="flex justify-center">
                    <CarouselContent>
                        {Array.from({ length: 15 }).map((_, index) => (
                            <CarouselItem
                                key={index}
                                className="md:basis-1/5 lg:basis-1/5"
                            >
                                <div className="p-1">
                                    <Card>
                                        <CardContent className="flex aspect-square items-center justify-center p-2">
                                            <img
                                                src="/img/Poster.jpg"
                                                alt="Лого"
                                            />
                                        </CardContent>
                                        <div className="flex items-start justify-start py-2">
                                            <div className="w-full flex items-center justify-between px-5">
                                                <p>Берсерк</p>
                                                <Button
                                                    variant="outline"
                                                    className=""
                                                >
                                                    Смотреть
                                                </Button>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </div>
                <CarouselNext className="ml-2" />
            </Carousel>
        </div>
    );
}
