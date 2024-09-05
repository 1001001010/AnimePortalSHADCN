import { useEffect, FormEventHandler } from "react";
import { Link, useForm } from "@inertiajs/react";
import { Label } from "@/shadcn/ui/label";
import { Input } from "@/shadcn/ui/input";
import InputError from "@/Components/InputError";
import {
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/shadcn/ui/card";
import { Button } from "@/shadcn/ui/button";
import { PageProps } from "@/types";

export default function LoginForm() {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset("password");
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("login"));
    };

    return (
        <form onSubmit={submit}>
            <CardHeader>
                <CardTitle>Вход</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="off"
                        onChange={(e) => setData("email", e.target.value)}
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="password">Пароль</Label>
                    <Input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="off"
                        onChange={(e) => setData("password", e.target.value)}
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>
                <div className="items-center flex justify-between">
                    <hr className="mr-2 w-full" />
                    <p className="text-zinc-700">Или</p>
                    <hr className="ml-2 w-full" />
                </div>
                <a
                    href={route("login.google")}
                    className="w-full h-9 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground"
                >
                    Google
                </a>
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button disabled={processing}>Войти</Button>
            </CardFooter>
        </form>
    );
}
