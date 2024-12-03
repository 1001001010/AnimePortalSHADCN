import { PageProps } from "../types";
import { Link } from "@inertiajs/react";
import { Button } from "@/shadcn/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/shadcn/ui/sheet";
import { FormEventHandler } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/shadcn/ui/dropdown-menu";
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
    Package2,
    PanelLeft,
    PencilRuler,
    Table2,
    Settings,
    Users2,
    MoonStar,
    SunMedium,
    GitCompareArrows,
    Bookmark,
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
                            <TooltipTrigger asChild>
                                <Link
                                    href={route("favourite.index")}
                                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                                >
                                    <Bookmark className="h-5 w-5" />
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">
                                Избранное
                            </TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href={route("anime.random")}
                                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                                >
                                    <GitCompareArrows className="h-5 w-5" />
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">
                                Случайные аниме
                            </TooltipContent>
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
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent side="right">
                                        Статистика
                                    </TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Link
                                            href={route("adminPanel.index")}
                                            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                                        >
                                            <PencilRuler className="h-5 w-5" />
                                        </Link>
                                    </TooltipTrigger>
                                    <TooltipContent side="right">
                                        Админка
                                    </TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <a
                                            href={route("admin.exel")}
                                            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                                            target="_blank"
                                        >
                                            <Table2 className="h-5 w-5" />
                                        </a>
                                    </TooltipTrigger>
                                    <TooltipContent side="right">
                                        Отчёт
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                        ) : null}
                    </TooltipProvider>
                </nav>
                <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
                    <TooltipProvider>
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
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                    Сменить тему
                                </TooltipContent>
                            </Tooltip>
                        </Tooltip>
                    </TooltipProvider>
                    {auth.user ? (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        href={route("profile.edit")}
                                        className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                                    >
                                        <Settings className="h-5 w-5" />
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent side="right">
                                    Настройки
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    ) : null}
                </nav>
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
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="sm:max-w-xs">
                            <nav className="grid gap-6 text-lg font-medium">
                                <Link
                                    href="#"
                                    className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                                >
                                    <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                                </Link>
                                <Link
                                    href={route("index")}
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                >
                                    <Home className="h-5 w-5" />
                                    Главная
                                </Link>
                                <Link
                                    href={route("favourite.index")}
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                >
                                    <Bookmark className="h-5 w-5" />
                                    Избранное
                                </Link>
                                <Link
                                    href={route("anime.random")}
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                >
                                    <GitCompareArrows className="h-5 w-5" />
                                    Случайные аниме
                                </Link>
                                <Link
                                    href={route("analytics.index")}
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                >
                                    <LineChart className="h-5 w-5" />
                                    Статистика
                                </Link>
                                <Link
                                    href={route("adminPanel.index")}
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                >
                                    <PencilRuler className="h-5 w-5" />
                                    Админка
                                </Link>
                                <Link
                                    href="#"
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                    onClick={handleToggleDarkMode}
                                >
                                    {document.documentElement.classList.contains(
                                        "dark"
                                    ) ? (
                                        <SunMedium className="h-5 w-5" />
                                    ) : (
                                        <MoonStar className="h-5 w-5" />
                                    )}
                                    Сменить тему
                                </Link>
                                <Link
                                    href="#"
                                    className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                                >
                                    <Settings className="h-5 w-5" />
                                    Настройки
                                </Link>
                            </nav>
                        </SheetContent>
                    </Sheet>
                    <div className="relative ml-auto flex-1 md:grow-0 flex justify-end">
                        {auth.user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="rounded-full relative"
                                    >
                                        <Avatar>
                                            {auth.user.profile_image ? (
                                                <AvatarImage
                                                    src={`/../${auth.user.profile_image}`}
                                                    alt="@avatar"
                                                />
                                            ) : (
                                                <AvatarImage
                                                    src="/img/defaultAvatar.png"
                                                    alt="@avatar"
                                                />
                                            )}
                                            <AvatarFallback>AV</AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <Link
                                        href={route("profile")}
                                        as="button"
                                        className="w-full"
                                    >
                                        <DropdownMenuItem>
                                            Профиль
                                        </DropdownMenuItem>
                                    </Link>
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
                    </div>
                </header>
            </div>
        </div>
    );
}
