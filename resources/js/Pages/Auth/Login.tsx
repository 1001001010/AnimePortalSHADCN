import { Card } from "@/shadcn/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shadcn/ui/tabs";
import { Link } from "@inertiajs/react";
import RegisterForm from "@/Components/RegisterForm";
import LoginForm from "@/Components/LoginForm";

export default function Header() {
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
                <TabsContent value="register">
                    <Card>
                        <RegisterForm />
                    </Card>
                </TabsContent>
                <Link
                    href={route("index")}
                    className="flex items-center justify-center mt-4"
                >
                    На главную
                </Link>
            </Tabs>
        </div>
    );
}
