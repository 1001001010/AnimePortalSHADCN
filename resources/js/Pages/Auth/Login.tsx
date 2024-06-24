import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/shadcn/ui/card";
import { Button } from "@/shadcn/ui/button";
import { Input } from "@/shadcn/ui/input";
import { Label } from "@/shadcn/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shadcn/ui/tabs";

export default function Header() {
    return (
        <div className="flex justify-center items-center h-screen">
            <Tabs defaultValue="account" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="account">Account</TabsTrigger>
                    <TabsTrigger value="password">Password</TabsTrigger>
                </TabsList>
                <TabsContent value="account">
                    <Card>
                        <CardHeader>
                            <CardTitle>Account</CardTitle>
                            <CardDescription>
                                Make changes to your account here. Click save
                                when you're done.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" defaultValue="Pedro Duarte" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="username">Username</Label>
                                <Input id="username" defaultValue="@peduarte" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Save changes</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value="password">
                    <Card>
                        <CardHeader>
                            <CardTitle>Password</CardTitle>
                            <CardDescription>
                                Change your password here. After saving, you'll
                                be logged out.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="space-y-1">
                                <Label htmlFor="current">
                                    Current password
                                </Label>
                                <Input id="current" type="password" />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="new">New password</Label>
                                <Input id="new" type="password" />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Save password</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
// <div className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//     <div className="container flex h-14 max-w-screen-2xl items-center">
//         <div className="mr-4 hidden md:flex">
//             <a href="#" className="mr-6 flex items-center space-x-2">
//                 <span className="hidden font-bold sm:inline-block">
//                     Текст
//                 </span>
//                 <nav className="flex items-center gap-4 text-sm lg:gap-6">
//                     <a
//                         href="#"
//                         className="transition-colors hover:text-foreground/80 text-foreground/60"
//                     >
//                         Текст 1
//                     </a>
//                     <a
//                         href="#"
//                         className="transition-colors hover:text-foreground/80 text-foreground/60"
//                     >
//                         Текст 2
//                     </a>
//                     <a
//                         href="#"
//                         className="transition-colors hover:text-foreground/80 text-foreground/60"
//                     >
//                         Текст 3
//                     </a>
//                     <a
//                         href="#"
//                         className="transition-colors hover:text-foreground/80 text-foreground/60"
//                     >
//                         Текст 4
//                     </a>
//                 </nav>
//             </a>
//         </div>
//         <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
//             <nav className="flex items-center">
//                 {auth.user ? (
//                     <Link
//                         href={route("dashboard")}
//                         className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
//                     >
//                         Dashboard
//                     </Link>
//                 ) : (
//                     <div className="hidden lg:flex lg:flex-1 lg:justify-end">
//                         <a
//                             href={route("login")}
//                             className="text-sm font-semibold leading-6 text-gray-900"
//                         >
//                             Log in{" "}
//                             <span aria-hidden="true">&rarr;</span>
//                         </a>
//                     </div>
//                 )}
//             </nav>
//         </div>
//     </div>
// </div>
