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

export default function HighestScoreItems() {
    return (
        <div className="mt-4">
            <div className="flex justify-around max-lg:mx-10 gap-4">
                <div className="p-2 text-gray-900 dark:text-gray-100 w-full md:w-2/3 border border-gray-200 rounded-lg">
                    <h2 className="text-lg font-medium p-1">Список Аниме</h2>
                    <div className="grid grid-cols-3 items-center justify-items-center">
                        <Card className="w-11/12 m-2">
                            <CardContent className="flex aspect-square items-center justify-center p-2">
                                <img src="/img/Poster.jpg" alt="Лого" />
                            </CardContent>
                            <div className="flex items-start justify-start py-2">
                                <div className="w-full flex items-center justify-between px-5 max-sm:flex-col">
                                    <div>
                                        <p className="font-semibold">Берсерк</p>
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
                        <Card className="w-11/12 m-2">
                            <CardContent className="flex aspect-square items-center justify-center p-2">
                                <img src="/img/Poster.jpg" alt="Лого" />
                            </CardContent>
                            <div className="flex items-start justify-start py-2">
                                <div className="w-full flex items-center justify-between px-5 max-sm:flex-col">
                                    <div>
                                        <p className="font-semibold">Берсерк</p>
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
                        <Card className="w-11/12 m-2">
                            <CardContent className="flex aspect-square items-center justify-center p-2">
                                <img src="/img/Poster.jpg" alt="Лого" />
                            </CardContent>
                            <div className="flex items-start justify-start py-2">
                                <div className="w-full flex items-center justify-between px-5 max-sm:flex-col">
                                    <div>
                                        <p className="font-semibold">Берсерк</p>
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
                        <Card className="w-11/12 m-2">
                            <CardContent className="flex aspect-square items-center justify-center p-2">
                                <img src="/img/Poster.jpg" alt="Лого" />
                            </CardContent>
                            <div className="flex items-start justify-start py-2">
                                <div className="w-full flex items-center justify-between px-5 max-sm:flex-col">
                                    <div>
                                        <p className="font-semibold">Берсерк</p>
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
                        <Card className="w-11/12 m-2">
                            <CardContent className="flex aspect-square items-center justify-center p-2">
                                <img src="/img/Poster.jpg" alt="Лого" />
                            </CardContent>
                            <div className="flex items-start justify-start py-2">
                                <div className="w-full flex items-center justify-between px-5 max-sm:flex-col">
                                    <div>
                                        <p className="font-semibold">Берсерк</p>
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
                </div>
                <div className="p-2 text-gray-900 dark:text-gray-100 w-full md:w-1/3 border border-gray-200 rounded-lg">
                    <h2 className="text-lg font-medium p-1">Критерии</h2>
                </div>
            </div>
        </div>
    );
}
