import { useEffect, FormEventHandler } from "react";
import { useForm } from "@inertiajs/react";
import { Label } from "@/shadcn/ui/label";
import { Input } from "@/shadcn/ui/input";
import PrimaryButton from "@/Components/PrimaryButton";
import InputError from "@/Components/InputError";
import {
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/shadcn/ui/card";

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
                    <Label htmlFor="password">Password</Label>
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
            </CardContent>
            <CardFooter>
                <PrimaryButton disabled={processing}>Войти</PrimaryButton>
            </CardFooter>
        </form>
    );
}
