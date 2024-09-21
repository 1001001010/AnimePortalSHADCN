import InputError from "@/Components/InputError";
import { Input } from "@/shadcn/ui/input";
import { useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { Card } from "@/shadcn/ui/card";
import { Tabs, TabsContent } from "@/shadcn/ui/tabs";
import { Link } from "@inertiajs/react";
import { Label } from "@/shadcn/ui/label";
import { toast } from "sonner";
import {
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/shadcn/ui/card";
import { Button } from "@/shadcn/ui/button";

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
    });
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("password.email"), {
            onSuccess: () => {
                toast("Проверьте вашу Email почту", {
                    description: "Мы отправили вам письмо для сброса пароля",
                });
            },
        });
    };
    return (
        <div className="flex justify-center items-center h-screen">
            <Tabs defaultValue="login" className="w-[400px]">
                <TabsContent value="login">
                    <Card>
                        <form onSubmit={submit}>
                            <CardHeader>
                                <CardTitle>Восстановление пароля</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="mb-4 text-sm text-gray-600">
                                    Забыли пароль? Укажите ваш Email-адресс и мы
                                    отправим вам письмо со сбросом пароля
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        className="mt-1 block w-full"
                                        onChange={(e) =>
                                            setData("email", e.target.value)
                                        }
                                    />
                                    <InputError
                                        message={errors.email}
                                        className="mt-2"
                                    />
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
