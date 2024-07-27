import { PageProps } from "../types";
import { Link } from "@inertiajs/react";
import { Button } from "@/shadcn/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/shadcn/ui/sheet";
import { useEffect, FormEventHandler } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/shadcn/ui/dropdown-menu";
import { Input } from "@/shadcn/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/shadcn/ui/avatar";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/shadcn/ui/tooltip";
import {
    Home,
    LineChart,
    Package,
    Package2,
    PanelLeft,
    Search,
    PencilRuler,
    Settings,
    ShoppingCart,
    Users2,
    MoonStar,
    SunMedium,
} from "lucide-react";

export default function Header({ auth }: PageProps<{}>) {
    const handleToggleDarkMode = () => {
        document.documentElement.classList.toggle("dark");
    };
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        route("logout");
    };
    return (
        <div className="flex w-full flex-col bg-muted/40">
            <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
                <nav className="flex flex-col items-center gap-4 px-2 py-4">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href={route("index")}
                                    className="flex h-9 w-9 items-center justify-center bg-accent text-accent-foreground rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8"
                                >
                                    <Home className="h-5 w-5" />
                                    <span className="sr-only">Главная</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">
                                Главная
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        href="#"
                                        className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                                        onClick={handleToggleDarkMode}
                                    >
                                        {document.documentElement.classList.contains(
                                            "dark"
                                        ) ? (
                                            <SunMedium className="h-5 w-5" />
                                        ) : (
                                            <MoonStar className="h-5 w-5" />
                                        )}
                                        <span className="sr-only">
                                            Случайные аниме
                                        </span>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                    Сменить тему
                                </TooltipContent>
                            </Tooltip>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href="#"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                                >
                                    <ShoppingCart className="h-5 w-5" />
                                    <span className="sr-only">Категории</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">
                                Категории
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href="#"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                                >
                                    <Package className="h-5 w-5" />
                                    <span className="sr-only">
                                        Случайные аниме
                                    </span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">
                                Случайные аниме
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href={route("friends.index")}
                                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                                >
                                    <Users2 className="h-5 w-5" />
                                    <span className="sr-only">Друзья</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Друзья</TooltipContent>
                        </Tooltip>
                        {auth.user && auth.user.is_admin == 1 ? (
                            <div className="gap-4 flex flex-col">
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Link
                                            href={route("analytics.index")}
                                            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                                        >
                                            <LineChart className="h-5 w-5" />
                                            <span className="sr-only">
                                                Analytics
                                            </span>
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent side="right">
                                        Analytics
                                    </TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Link
                                            href={route("adminPanel.index")}
                                            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                                        >
                                            <PencilRuler className="h-5 w-5" />
                                            <span className="sr-only">
                                                Admin
                                            </span>
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent side="right">
                                        Admin
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                        ) : null}
                    </TooltipProvider>
                </nav>
                {auth.user ? (
                    <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        href={route("profile.edit")}
                                        className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                                    >
                                        <Settings className="h-5 w-5" />
                                        <span className="sr-only">
                                            Настройки
                                        </span>
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                    Настройки
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </nav>
                ) : null}
            </aside>
            <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
                <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                size="icon"
                                variant="outline"
                                className="sm:hidden"
                            >
                                <PanelLeft className="h-5 w-5" />
                                <span className="sr-only">Toggle Menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="sm:max-w-xs">
                            <nav className="grid gap-6 text-lg font-medium">
                                <Link
                                    href="#"
                                    className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                                >
                                    <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                                    <span className="sr-only">Acme Inc</span>
                                </Link>
                                <Link
                                    href="#"
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                >
                                    <Home className="h-5 w-5" />
                                    Главная
                                </Link>
                                <Button
                                    className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:text-foreground md:h-8 md:w-8"
                                    onClick={handleToggleDarkMode}
                                >
                                    <img
                                        src={
                                            document.documentElement.classList.contains(
                                                "dark"
                                            )
                                                ? "/img/svg/moon.svg"
                                                : "/img/svg/sun.svg"
                                        }
                                        alt={
                                            document.documentElement.classList.contains(
                                                "dark"
                                            )
                                                ? "moon"
                                                : "sun"
                                        }
                                        className=""
                                    />
                                    <span className="sr-only">
                                        Сменить тему
                                    </span>
                                </Button>
                                <Link
                                    href="#"
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                >
                                    <ShoppingCart className="h-5 w-5" />
                                    Категории
                                </Link>
                                <Link
                                    href="#"
                                    className="flex items-center gap-4 px-2.5 text-foreground"
                                >
                                    <Package className="h-5 w-5" />
                                    Случайные аниме
                                </Link>
                                <Link
                                    href={route("friends.index")}
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                >
                                    <Users2 className="h-5 w-5" />
                                    Друзья
                                </Link>
                                <Link
                                    href={route("analytics.index")}
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                >
                                    <LineChart className="h-5 w-5" />
                                    Analytics
                                </Link>
                                <Link
                                    href="#"
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                >
                                    <PencilRuler className="h-5 w-5" />
                                    Admin
                                </Link>
                            </nav>
                        </SheetContent>
                    </Sheet>
                    <div className="relative ml-auto flex-1 md:grow-0">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="search"
                            placeholder="Search..."
                            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[320px]"
                        />
                    </div>
                    {auth.user ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="overflow-hidden rounded-full"
                                >
                                    {auth.user.profile_image ? (
                                        <Avatar>
                                            <AvatarImage
                                                src={auth.user.profile_image}
                                                alt="@avatar"
                                            />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                    ) : (
                                        <Avatar>
                                            <AvatarImage
                                                src="/img/defaultAvatar.png"
                                                alt="@avatar"
                                            />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                    )}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <Link
                                    href={route("profile")}
                                    as="button"
                                    className="w-full"
                                >
                                    <DropdownMenuItem>Профиль</DropdownMenuItem>
                                </Link>
                                <DropdownMenuSeparator />
                                <Link
                                    href={route("profile.edit")}
                                    as="button"
                                    className="w-full"
                                >
                                    <DropdownMenuItem>
                                        Настройки
                                    </DropdownMenuItem>
                                </Link>
                                <DropdownMenuSeparator />
                                <form onSubmit={submit}>
                                    <Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                        className="w-full"
                                    >
                                        <DropdownMenuItem>
                                            Выход
                                        </DropdownMenuItem>
                                    </Link>
                                </form>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Button asChild>
                            <Link href={route("login")}>Вход</Link>
                        </Button>
                    )}
                </header>
            </div>
        </div>
    );
}
