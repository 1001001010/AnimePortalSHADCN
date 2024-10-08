"use client";

import { Anime, Friends, FriendShips, GroupMembers, PageProps } from "@/types";
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

export default function NewGroup({
    auth,
    anime,
    user_group_info,
}: PageProps<{ anime: Anime; user_group_info?: GroupMembers }>) {
    const [isOpen, setIsOpen] = React.useState(false);
    const {
        data,
        setData,
        delete: destroy,
        post,
        reset,
        errors,
    } = useForm({
        name: "",
        password: "",
        anime: anime.id,
        group_id: 0,
        method: user_group_info ? "delete" : "new",
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        if (data.method === "delete") {
            destroy(route("group.leave"), {
                onSuccess: () => {
                    setIsOpen(false);
                    toast("Успешно", {
                        description: "Вы успешно покинули группу",
                    });
                },
                onError: () => {
                    setIsOpen(false);
                    toast("Ошибка", {
                        description: "Ошибка при выходе из группы",
                    });
                },
            });
        } else {
            post(route("group.add"), {
                onSuccess: () => {
                    setIsOpen(false);
                    toast("Успешно", {
                        description: "Новая группа успешно создана",
                    });
                },
                onError: () => {
                    setIsOpen(false);
                    toast("Ошибка", {
                        description: "Ошибка создания группы, попробуйте позже",
                    });
                },
            });
        }
    };

    return (
        <>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button>Смотреть в группе</Button>
                </DialogTrigger>
                {user_group_info ? (
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Просмотр в группе</DialogTitle>
                            <DialogDescription>
                                Вы уже состоите в группе:
                                <b> {user_group_info.group.name}</b>
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <form onSubmit={submit}>
                                <Button
                                    type="submit"
                                    onClick={() => {
                                        setData("group_id", user_group_info.id);
                                    }}
                                >
                                    Покинуть группу
                                </Button>
                            </form>
                        </DialogFooter>
                    </DialogContent>
                ) : (
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
                                    <Label
                                        htmlFor="name"
                                        className="text-right"
                                    >
                                        Название
                                    </Label>
                                    <Input
                                        id="name"
                                        className="col-span-3"
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="password"
                                        className="text-right"
                                    >
                                        Пароль
                                    </Label>
                                    <Input
                                        id="password"
                                        className="col-span-3"
                                        type="password"
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">Добавить группу</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                )}
            </Dialog>
        </>
    );
}
