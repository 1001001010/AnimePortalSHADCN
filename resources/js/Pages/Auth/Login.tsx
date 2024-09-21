import { Card } from "@/shadcn/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shadcn/ui/tabs";
import { Link } from "@inertiajs/react";
import RegisterForm from "@/Components/Login/RegisterForm";
import LoginForm from "@/Components/Login/LoginForm";
import { PageProps } from "@/types";

export default function Login({
    ErrorMsg,
}: PageProps<{
    ErrorMsg?: any;
}>) {
    return (
        <div className="flex justify-center items-center h-screen">
            <Tabs defaultValue="login" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Вход</TabsTrigger>
                    <TabsTrigger value="register">Регистрация</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                    <Card>
                        <LoginForm />
                    </Card>
                </TabsContent>
                <div className="text-red-600 text-center">{ErrorMsg}</div>
                <TabsContent value="register">
                    <Card>
                        <RegisterForm />
                    </Card>
                </TabsContent>
                <Link
                    href={route("password.request")}
                    className="flex items-center justify-center mt-2"
                >
                    Забыли пароль?
                </Link>
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
