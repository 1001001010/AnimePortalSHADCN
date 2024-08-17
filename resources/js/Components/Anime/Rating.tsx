import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/shadcn/ui/dialog";
import { Anime, PageProps, Ratings } from "@/types";
import { Button } from "@/shadcn/ui/button";
import { useForm } from "@inertiajs/react";
import { Star } from "lucide-react";

export default function Rating({
    Anime,
    rating,
}: PageProps<{
    Anime: Anime;
    rating: Ratings;
}>) {
    const [ratingNumber, setRatingNumber] = useState(Number(rating));
    const [hoverIndex, setHoverIndex] = useState(-1);
    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            anime: Anime.id,
            rating: null as number | null,
        });

    const submit: React.FormEventHandler = (e) => {
        e.preventDefault();

        post(route("anime.grade"));
    };
    return (
        <>
            <Dialog>
                <DialogTrigger>
                    <Button variant={"outline"} className="w-full">
                        Оценить
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Оценить фильм</DialogTitle>
                        <DialogDescription className="flex justify-center gap-4 p-4">
                            <div className="flex gap-2">
                                {Array(5)
                                    .fill(1)
                                    .map((_, index) => (
                                        <div key={index}>
                                            <input
                                                type="checkbox"
                                                id={`rating-${index + 1}`}
                                                key={index}
                                                value={index + 1}
                                                checked={
                                                    ratingNumber >= index + 1
                                                }
                                                onClick={(e) => {
                                                    setRatingNumber(index + 1);
                                                    setData(
                                                        "rating",
                                                        index + 1
                                                    );
                                                }}
                                                className="hidden"
                                            />
                                            <label
                                                htmlFor={`rating-${index + 1}`}
                                                onMouseOver={() =>
                                                    setHoverIndex(index)
                                                }
                                                onMouseOut={() =>
                                                    setHoverIndex(-1)
                                                }
                                                className={`${
                                                    ratingNumber >= index + 1 ||
                                                    hoverIndex >= index
                                                        ? "text-yellow-500"
                                                        : "text-gray-500"
                                                } cursor-pointer`}
                                            >
                                                <Star className="h-7 w-7" />
                                            </label>
                                        </div>
                                    ))}
                            </div>
                        </DialogDescription>
                        <Button onClick={submit}>Отправить</Button>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    );
}
