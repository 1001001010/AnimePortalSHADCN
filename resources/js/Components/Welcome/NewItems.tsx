import { Card, CardContent } from "@/shadcn/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/shadcn/ui/carousel";
import { Button } from "@/shadcn/ui/button";
import { Anime, PageProps } from "@/types";
import { Link } from "@inertiajs/react";

export default function NewItems({
    auth,
    Anime,
}: PageProps<{ Anime: Anime[] }>) {
    return (
        <div>
            <header>
                <h2 className="text-lg font-medium pb-3 max-lg:mx-10">
                    Новинки
                </h2>
            </header>
            <div className="flex justify-center max-lg:mx-10 min-h-60">
                <Carousel
                    opts={{
                        align: "start",
                    }}
                    className="w-full md:w-11/12 lg:w-11/12 xl:w-11/12"
                >
                    <CarouselPrevious className="mr-2" />
                    <div className="flex justify-center">
                        <CarouselContent>
                            {Anime.map((anime, index) => (
                                <CarouselItem
                                    key={index}
                                    className="basis-full md:basis-1/2 lg:basis-1/3 xl:basis-1/5 min-h-96"
                                >
                                    <div className="p-1 h-full">
                                        <Card className="h-full flex flex-col justify-between">
                                            <CardContent className="flex w-full justify-center items-center p-2 h-full">
                                                <img
                                                    src={anime.cover}
                                                    alt="Лого"
                                                    className="min-w-full max-h-full object-cover"
                                                    style={{
                                                        width: "300px",
                                                        height: "400px",
                                                    }}
                                                />
                                            </CardContent>
                                            <div className="py-2 max-w-full">
                                                <div className="w-full flex flex-col items-center gap-2 px-5">
                                                    <div className="max-sm:text-center">
                                                        <p className="text-ellipsis">
                                                            {anime.name}
                                                        </p>
                                                    </div>
                                                    <Link
                                                        href={route("anime", [
                                                            anime.unix,
                                                        ])}
                                                        className="min-w-full"
                                                    >
                                                        <Button
                                                            variant="outline"
                                                            className="max-sm:p-2 min-w-full"
                                                        >
                                                            Смотреть
                                                        </Button>
                                                    </Link>
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
        </div>
    );
}
