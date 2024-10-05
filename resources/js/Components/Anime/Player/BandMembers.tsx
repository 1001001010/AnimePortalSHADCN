import { PageProps } from "@/types";
import "plyr-react/plyr.css";
import { Alert, AlertDescription, AlertTitle } from "@/shadcn/ui/alert";
import { Users } from "lucide-react";
import { Button } from "@/shadcn/ui/button";
import { toast } from "sonner";

export default function BandMembers({
    auth,
    invite_link,
    InGroup,
}: PageProps<{
    invite_link: string;
    InGroup: boolean;
}>) {
    const copyInviteLink = async () => {
        try {
            await navigator.clipboard.writeText(invite_link);
            toast("Успешно", {
                description: "Ссылка скопирована в буфер обмена",
            });
        } catch (err) {
            toast("Ошибка", {
                description: "Ошибка при копировании ссылки! Попробуйте позже",
            });
        }
    };
    return (
        <>
            <div className="grid grid-cols-4 gap-4">
                <Button
                    asChild
                    variant={"outline"}
                    className="w-full h-full"
                    onClick={() => copyInviteLink()}
                >
                    <Alert className="">
                        <AlertTitle>Пригласить участников</AlertTitle>
                    </Alert>
                </Button>
                <Alert>
                    <Users className="h-4 w-4" />
                    <AlertTitle>Heads up!</AlertTitle>
                    <AlertDescription>
                        You can add components and dependencies to your app
                        using the cli.
                    </AlertDescription>
                </Alert>
                <Alert>
                    <Users className="h-4 w-4" />
                    <AlertTitle>Heads up!</AlertTitle>
                    <AlertDescription>
                        You can add components and dependencies to your app
                        using the cli.
                    </AlertDescription>
                </Alert>
                <Alert>
                    <Users className="h-4 w-4" />
                    <AlertTitle>Heads up!</AlertTitle>
                    <AlertDescription>
                        You can add components and dependencies to your app
                        using the cli.
                    </AlertDescription>
                </Alert>
                <Alert>
                    <Users className="h-4 w-4" />
                    <AlertTitle>Heads up!</AlertTitle>
                    <AlertDescription>
                        You can add components and dependencies to your app
                        using the cli.
                    </AlertDescription>
                </Alert>
                <Alert>
                    <Users className="h-4 w-4" />
                    <AlertTitle>Heads up!</AlertTitle>
                    <AlertDescription>
                        You can add components and dependencies to your app
                        using the cli.
                    </AlertDescription>
                </Alert>
                <Alert>
                    <Users className="h-4 w-4" />
                    <AlertTitle>Heads up!</AlertTitle>
                    <AlertDescription>
                        You can add components and dependencies to your app
                        using the cli.
                    </AlertDescription>
                </Alert>
            </div>
        </>
    );
}
