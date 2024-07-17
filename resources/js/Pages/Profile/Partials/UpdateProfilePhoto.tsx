import { useForm, usePage } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { PageProps } from "@/types";
import { toast } from "sonner";
import { Input } from "@/shadcn/ui/input";
import { Label } from "@/shadcn/ui/label";
import { Button } from "@/shadcn/ui/button";

export default function UpdateProfilePhoto({
    className = "",
}: {
    className?: string;
}) {
    const user = usePage<PageProps>().props.auth.user;

    const { data, setData, post, processing } =
        useForm({
            updated_at: user.updated_at,
            photo: null as File | null,
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("profile.photo"));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium">Фото профиля</h2>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <Label htmlFor="photo">Фото</Label>
                    <Input
                        id="photo"
                        type="file"
                        className="custom-file-input text-gray-900 dark:text-gray-100"
                        onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                                setData("photo", file);
                            }
                        }}
                    />
                </div>

                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        disabled={processing}
                        onClick={() => {
                            const updatedAt = new Date(data.updated_at);
                            const formattedUpdatedAt =
                                updatedAt.toLocaleString();

                            toast("Фото профиля успешно изменено");
                        }}
                    >
                        Сохранить
                    </Button>
                </div>
            </form>
        </section>
    );
}
