"use client";

import { Anime, Friends, FriendShips, PageProps } from "@/types";
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
import React, { FormEventHandler } from "react";
import { toast } from "sonner";

export default function NewGroup({ auth, anime }: PageProps<{ anime: Anime }>) {
    const [open, setOpen] = React.useState(false);
    const { data, setData, post, reset, errors } = useForm({
        name: "",
        passwrod: "",
        anime: anime,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("NewGroup"), {
            onSuccess: () => {
                setOpen(false);
                toast("Группа успешно создана");
            },
            onError: () => {
                toast("Ошибка создании группы", {
                    description: "Попробуйте позже",
                });
            },
        });
    };
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Смотреть в группе</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Просмотр в группе</DialogTitle>
                        <DialogDescription>
                            Для совместного просмотра создайте группу и
                            поделитель ссылкой на нее с друзьями
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={submit}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Название
                                </Label>
                                <Input id="name" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="password"
                                    className="text-right"
                                >
                                    Пароль
                                </Label>
                                <Input id="password" className="col-span-3" />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">Добавить группу</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}
