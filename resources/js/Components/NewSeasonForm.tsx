import { Anime, PageProps } from "@/types";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/shadcn/ui/dialog";
import { Button } from "@/shadcn/ui/button";
import { Input } from "@/shadcn/ui/input";
import { Label } from "@/shadcn/ui/label";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { useState } from "react";

export default function NewSeasonFor({
    auth,
    Anime,
}: PageProps<{ Anime: Anime }>) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
    });
    const [isOpen, setIsOpen] = useState(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("NewSeason", Anime.id), {
            onSuccess: () => {
                setIsOpen(false);
                reset();
            },
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="w-1/2"
                    onClick={() => setIsOpen(true)}
                >
                    Добавить Сезон
                </Button>
            </DialogTrigger>
            <form onSubmit={submit}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Добавление сезона</DialogTitle>
                        <DialogDescription>
                            Для добавление сезона введите название (Название не
                            обязательно)
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">
                                Название
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                className="col-span-3"
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button onClick={submit} disabled={processing}>
                            Добавить
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
}
