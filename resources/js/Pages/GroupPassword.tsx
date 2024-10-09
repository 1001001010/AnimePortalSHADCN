"use client";

import { Friends, FriendShips, Groups, PageProps, User } from "@/types";
import * as React from "react";

import { Button } from "@/shadcn/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/shadcn/ui/card";
import { Input } from "@/shadcn/ui/input";
import { Label } from "@/shadcn/ui/label";
import { useForm } from "@inertiajs/react";

export default function GroupPassword({
    auth,
    group,
}: PageProps<{ group: Groups }>) {
    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            group_id: group.id,
            password: "",
        });

    const submit: React.FormEventHandler = (e) => {
        e.preventDefault();

        post(
            route("group.join")
            // , {
            // onSuccess: () => {
            //     toast("Данные успешно обновлены");
            // },
            // onError: () => {
            //     toast("Ошибка");
            // },
            // }
        );
    };

    return (
        <>
            <div className="flex items-center justify-center min-h-screen">
                <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle>Комната: {group.name}</CardTitle>
                        <CardDescription>
                            Чтобы войти в комнату введите пароль
                        </CardDescription>
                    </CardHeader>
                    <form onSubmit={submit}>
                        <CardContent>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="password">Пароль</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Пароль от комнаты"
                                        onChange={(e) =>
                                            setData("password", e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <Button type="submit" disabled={processing}>
                                Войти
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </>
    );
}
