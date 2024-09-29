import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/shadcn/ui/dialog";
("use client");
import React, { FormEventHandler } from "react";
import { Button } from "@/shadcn/ui/button";
import { Anime, Episode, PageProps } from "@/types";
import { useForm } from "@inertiajs/react";
import { toast } from "sonner";

export default function DeleteEpisode({
    auth,
    anime,
    currentEpisode,
}: PageProps<{
    anime: Anime;
    currentEpisode?: Episode;
}>) {
    const {
        data,
        setData,
        errors,
        delete: destroy,
        reset,
        processing,
    } = useForm({
        episode_id: currentEpisode?.id,
    });
    console.log(currentEpisode?.id);
    const [isOpen, setIsOpen] = React.useState(false);
    const deleteEpisode: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route("anime.episode.delete"), {
            onSuccess: () => {
                setIsOpen(false);
                toast("Успешно", {
                    description: `Эпизод ${currentEpisode?.number} из ${currentEpisode?.season?.number} сезона удален`,
                });
            },
            onError: () => {
                toast("Ошибка", {
                    description:
                        "Ошибка при удалении эпизода. Пожалуйста, попробуйте снова",
                });
            },
        });
    };

    return (
        <>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button variant="outline">Удалить эпизод</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <form onSubmit={deleteEpisode}>
                        <DialogHeader>
                            <DialogTitle>Удаление эпизода</DialogTitle>
                        </DialogHeader>
                        <DialogDescription className="py-3">
                            Вы уверены, что хотете удалить{" "}
                            {currentEpisode?.number} эпизод{" "}
                            {currentEpisode?.season?.number} сезона?
                            <p>Все следующие серии сдвинутся на его место</p>
                        </DialogDescription>
                        <DialogFooter>
                            <Button
                                disabled={processing}
                                variant={"outline"}
                                onClick={() =>
                                    setData("episode_id", currentEpisode?.id)
                                }
                            >
                                Удалить
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}
