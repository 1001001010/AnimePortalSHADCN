import { FormEventHandler } from "react";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { Head, useForm } from "@inertiajs/react";
import { Label } from "@/shadcn/ui/label";
import { Input } from "@/shadcn/ui/input";

import { Card } from "@/shadcn/ui/card";
import { Tabs, TabsContent } from "@/shadcn/ui/tabs";
import { Link } from "@inertiajs/react";
import { toast } from "sonner";
import {
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/shadcn/ui/card";
import { Button } from "@/shadcn/ui/button";
export default function ResetPassword({
    token,
    email,
}: {
    token: string;
    email: string;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        token: token,
        email: email,
        password: "",
        password_confirmation: "",
    });
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("password.store"), {
            onFinish: () => reset("password", "password_confirmation"),
        });
    };
    return (
        // <form onSubmit={submit}>
        //     <div>
        //         <Label htmlFor="email">Email</Label>
        //         <Input
        //             id="email"
        //             type="email"
        //             name="email"
        //             value={data.email}
        //             className="mt-1 block w-full"
        //             autoComplete="username"
        //             onChange={(e) => setData("email", e.target.value)}
        //         />
        //         <InputError message={errors.email} className="mt-2" />
        //     </div>
        //     <div className="mt-4">
        //         <Label htmlFor="password">Пароль</Label>
        //         <Input
        //             id="password"
        //             type="password"
        //             name="password"
        //             value={data.password}
        //             className="mt-1 block w-full"
        //             autoComplete="new-password"
        //             onChange={(e) => setData("password", e.target.value)}
        //         />
        //         <InputError message={errors.password} className="mt-2" />
        //     </div>
        //     <div className="mt-4">
        //         <Label htmlFor="password_confirmation">
        //             Подтверждение пароля
        //         </Label>
        //         <Input
        //             type="password"
        //             name="password_confirmation"
        //             value={data.password_confirmation}
        //             className="mt-1 block w-full"
        //             autoComplete="new-password"
        //             onChange={(e) =>
        //                 setData("password_confirmation", e.target.value)
        //             }
        //         />
        //         <InputError
        //             message={errors.password_confirmation}
        //             className="mt-2"
        //         />
        //     </div>
        //     <div className="flex items-center justify-end mt-4">
        //         <PrimaryButton className="ms-4" disabled={processing}>
        //             Reset Password
        //         </PrimaryButton>
        //     </div>
        // </form>
        <div className="flex justify-center items-center h-screen">
            <Tabs defaultValue="login" className="w-[400px]">
                <TabsContent value="login">
                    <Card>
                        <form onSubmit={submit}>
                            <CardHeader>
                                <CardTitle>Восстановление пароля</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="space-y-1">
                                    <div>
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            className="mt-1 block w-full"
                                            autoComplete="username"
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                        />
                                        <InputError
                                            message={errors.email}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <Label htmlFor="password">Пароль</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            name="password"
                                            value={data.password}
                                            className="mt-1 block w-full"
                                            autoComplete="new-password"
                                            onChange={(e) =>
                                                setData(
                                                    "password",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.password}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="mt-4">
                                        <Label htmlFor="password_confirmation">
                                            Подтверждение пароля
                                        </Label>
                                        <Input
                                            type="password"
                                            name="password_confirmation"
                                            value={data.password_confirmation}
                                            className="mt-1 block w-full"
                                            autoComplete="new-password"
                                            onChange={(e) =>
                                                setData(
                                                    "password_confirmation",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <InputError
                                            message={
                                                errors.password_confirmation
                                            }
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-end">
                                <Button disabled={processing}>
                                    Сбросить пароль
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </TabsContent>
                <Link
                    href={route("index")}
                    className="flex items-center justify-center mt-2"
                >
                    На главную
                </Link>
            </Tabs>
        </div>
    );
}
