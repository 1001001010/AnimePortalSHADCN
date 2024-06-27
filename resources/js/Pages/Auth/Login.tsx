import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/shadcn/ui/card";
import { Button } from "@/shadcn/ui/button";
import { Label } from "@/shadcn/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shadcn/ui/tabs";
import { Link, useForm } from "@inertiajs/react";
import { Input } from "@/shadcn/ui/input";
import RegisterForm from "@/Components/RegisterForm";

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
                        <CardHeader>
                            <CardTitle>Вход</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" name="password" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit">Войти</Button>
                        </CardFooter>
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
