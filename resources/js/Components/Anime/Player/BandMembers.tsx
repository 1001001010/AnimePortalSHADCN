import { GroupMembers, Groups, PageProps } from "@/types";
import "plyr-react/plyr.css";
import { Alert, AlertDescription, AlertTitle } from "@/shadcn/ui/alert";
import { Users } from "lucide-react";
import { Button } from "@/shadcn/ui/button";
import { toast } from "sonner";
import { Link } from "@inertiajs/react";

export default function BandMembers({
    auth,
    invite_link,
    InGroup,
    groupMembers,
    user_group_info,
}: PageProps<{
    invite_link: string;
    InGroup: boolean;
    groupMembers: GroupMembers[];
    user_group_info?: GroupMembers;
}>) {
    // Подписка на канал уведомлений
    if (auth && auth.user) {
        const channel = window.Echo.channel(
            `group-${user_group_info?.group.id}`
        );
        channel.listen(".Group.join", (res: any) => {
            const friend_id: number = res.user_id;
            if (auth.user.id !== friend_id) {
                toast(`Пользователь ${friend_id} присоединился к группе`);
            }
        });
    }

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
                {groupMembers.map((group, index) => (
                    <Alert key={index}>
                        <Users className="h-4 w-4" />
                        <AlertTitle>{group.user.name}</AlertTitle>
                        <AlertDescription>
                            <Link href={route("profile", group.user.unix)}>
                                Перейти в профиль
                            </Link>
                        </AlertDescription>
                    </Alert>
                ))}
            </div>
        </>
    );
}
