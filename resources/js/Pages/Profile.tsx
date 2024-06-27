import { Link, Head } from "@inertiajs/react";
import { PageProps } from "@/types";
import Header from "@/Components/Header";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/shadcn/ui/card";
import { Input } from "@/shadcn/ui/input";
import { Button } from "@/shadcn/ui/button";
import { Checkbox } from "@/shadcn/ui/checkbox";

export default function Profile({
    auth,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    const handleImageError = () => {
        document
            .getElementById("screenshot-container")
            ?.classList.add("!hidden");
        document.getElementById("docs-card")?.classList.add("!row-span-1");
        document
            .getElementById("docs-card-content")
            ?.classList.add("!flex-row");
        document.getElementById("background")?.classList.add("!hidden");
    };

    return (
        <>
            <div className="flex min-h-screen w-full flex-col">
                <Header auth={auth} />
                <main className="flex-1 flex-col p-4 md:p-10">
                    <div className="mx-auto grid w-full max-w-6xl gap-2">
                        <h1 className="text-3xl font-semibold">Настройки</h1>
                    </div>
                    <div className="mx-auto grid w-full max-w-6xl items-start md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
                        <nav className="grid gap-4 text-sm text-muted-foreground">
                            <Link
                                href="#"
                                className="font-semibold text-primary"
                            >
                                General
                            </Link>
                            <Link href="#">Security</Link>
                            <Link href="#">Integrations</Link>
                            <Link href="#">Support</Link>
                            <Link href="#">Organizations</Link>
                            <Link href="#">Advanced</Link>
                        </nav>
                        <div className="grid gap-6">
                            <Card x-chunk="dashboard-04-chunk-1">
                                <CardHeader>
                                    <CardTitle>Store Name</CardTitle>
                                    <CardDescription>
                                        Used to identify your store in the
                                        marketplace.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form>
                                        <Input placeholder="Store Name" />
                                    </form>
                                </CardContent>
                                <CardFooter className="border-t px-6 py-4">
                                    <Button>Save</Button>
                                </CardFooter>
                            </Card>
                            <Card x-chunk="dashboard-04-chunk-2">
                                <CardHeader>
                                    <CardTitle>Plugins Directory</CardTitle>
                                    <CardDescription>
                                        The directory within your project, in
                                        which your plugins are located.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form className="flex flex-col gap-4">
                                        <Input
                                            placeholder="Project Name"
                                            defaultValue="/content/plugins"
                                        />
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="include"
                                                defaultChecked
                                            />
                                            <label
                                                htmlFor="include"
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                Allow administrators to change
                                                the directory.
                                            </label>
                                        </div>
                                    </form>
                                </CardContent>
                                <CardFooter className="border-t px-6 py-4">
                                    <Button>Save</Button>
                                </CardFooter>
                            </Card>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
