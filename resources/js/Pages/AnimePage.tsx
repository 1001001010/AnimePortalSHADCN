import * as React from "react";
import { PageProps } from "@/types";
import Header from "@/Components/Header";
import { Star } from "lucide-react";
import { Button } from "@/shadcn/ui/button";
import { Badge } from "@/shadcn/ui/badge";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import ScrenesCarousel from "@/Components/ScenesCarousel";

export default function AnimePage({
    auth,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    const plyrProps = {
        source: {
            type: "video" as const,
            sources: [
                {
                    src: "/img/screnes/Berserk.mp4",
                    type: "video/mp4" as const,
                    size: 1080,
                },
            ],
        },
        options: {
            controls: [
                "play",
                "progress",
                "current-time",
                "mute",
                "volume",
                "settings",
                "pip",
                "fullscreen",
            ],
        },
    };
    return (
        <>
            <Header auth={auth} />
            <div className="ml-14 ml:ml-0 max-sm:ml-0">
                <div className="m-4 border border-gray-200 rounded-lg shadow dark:border-gray-700">
                    <div className="flex flex-row max-md:flex-col ">
                        <div className="w-2/12 max-md:w-full py-2 px-2 max-md:items-center">
                            <img
                                src="/img/Poster.jpg"
                                className="rounded mb-2 mx-auto"
                            ></img>
                            <Button
                                variant="outline"
                                className="w-full border-gray-200 dark:border-gray-700"
                            >
                                Смотреть
                            </Button>
                        </div>
                        <div className="text-gray-900 dark:text-gray-100 flex flex-col w-3/12 max-md:w-full gap-2 p-4">
                            <h1 className="text-2xl">Берсерк</h1>
                            <div className="flex items-center gap-2">
                                <Star />
                                <p className="text-xl">5/5</p>
                            </div>
                            <div className="flex justify-between w-full">
                                <p className="font-bold">Тип</p>
                                <p>ТВ Сериал</p>
                            </div>
                            <div className="flex justify-between w-full">
                                <p className="font-bold">Эпизоды</p>
                                <p>25</p>
                            </div>
                            <div className="flex justify-between w-full">
                                <p className="font-bold">Статус</p>
                                <p>Вышел</p>
                            </div>
                            <div className="flex justify-between w-full">
                                <p className="font-bold">Первоисточник</p>
                                <p>Манга</p>
                            </div>
                            <div className="flex justify-between w-full">
                                <p className="font-bold">Студия</p>
                                <p>Oriental Light and Magic</p>
                            </div>
                            <div className="flex justify-between w-full">
                                <p className="font-bold">
                                    Возрастные ограничения
                                </p>
                                <Badge>18+</Badge>
                            </div>
                            <div className="flex justify-between w-full">
                                <p className="font-bold">Озвучка</p>
                                <p>MC Entertainment</p>
                            </div>
                            <div className="flex justify-between w-full">
                                <p className="font-bold">Режиссёр</p>
                                <p>Такахаси Наохито</p>
                            </div>
                            <div className="flex justify-between w-full">
                                <p className="font-bold">Автор оригинала</p>
                                <p>Кэнтаро Миура</p>
                            </div>
                        </div>
                    </div>
                    <div className="description p-4 mt-5">
                        Боль, кровь и слёзы. На престол восходит новый
                        правитель. Его слуги, подручные демоны безнаказанно
                        творят бесчинства в городе. Все меняется когда в город,
                        скрытый темнотой ночи, попадает тяжёлый воин. С
                        разнообразным вооружением для самых непредвиденных
                        моментов, в броне, тело его все покрыто шрамами – черный
                        мечник. Его меч настолько огромен, что может сравниться
                        с его лютой злобой к королю и демонам.
                        <br />
                        <br />
                        Эта история по сути военная драма. Происходящая в
                        средневековье, включает в себя хоррор перемешанный с
                        фэнтези. В центре действий Гатс, его судьба. В прошлом
                        наёмник, а теперь он охотится за демонами. Его путь
                        определенный свыше. Предательство, верность, магия,
                        темные существа и эльфы.
                        <br />
                        <br />
                        «Наша судьба принадлежит нам, не ей решать, как и когда
                        нам умереть!» - вот основная идея Берсерка. Эта мысль
                        открывается на протяжении всего сериала. И еще одно,
                        может ли человек переступить грань дозволенного, уйти за
                        точку невозврата и где это придел способностей
                        человеческого вида в достижении мечты.
                    </div>
                    <ScrenesCarousel />
                    <div className="m-4 border border-gray-200 rounded-lg shadow dark:border-gray-700 flex justify-between max-md:flex-col max-md:items-center max-md:p-4">
                        <div className="m-4 w-1/2 max-md:w-full max-md:mb-4">
                            <div>
                                <Plyr {...plyrProps} />
                            </div>
                        </div>
                        <div className="m-4 border border-gray-200 rounded-lg shadow dark:border-gray-700 w-1/2 max-md:w-full">
                            <div className="m-4">
                                <h1>Серии</h1>
                                <div className="mt-4 grid grid-cols-4 gap-4 max-sm:grid-cols-3">
                                    <Button variant="outline">Серия 2</Button>
                                    <Button variant="outline">Серия 3</Button>
                                    <Button variant="outline">Серия 4</Button>
                                    <Button variant="outline">Серия 5</Button>
                                    <Button variant="outline">Серия 6</Button>
                                    <Button variant="outline">Серия 7</Button>
                                    <Button variant="outline">Серия 8</Button>
                                    <Button variant="outline">Серия 9</Button>
                                    <Button variant="outline">Серия 10</Button>
                                    <Button variant="outline">Серия 11</Button>
                                    <Button variant="outline">Серия 12</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
