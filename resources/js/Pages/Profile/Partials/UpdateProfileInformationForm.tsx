import InputError from "@/Components/InputError";
import { Link, useForm, usePage } from "@inertiajs/react";
import { FormEventHandler } from "react";
import { PageProps } from "@/types";
import { toast } from "sonner";
import { Input } from "@/shadcn/ui/input";
import { Label } from "@/shadcn/ui/label";
import { Button } from "@/shadcn/ui/button";

export default function UpdateProfileInformation({
    className = "",
}: {
    mustVerifyEmail: boolean;
    status?: string;
    className?: string;
}) {
    const user = usePage<PageProps>().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
            updated_at: user.updated_at,
        });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route("profile.update"));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium">Профиль</h2>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                <div className="flex items-center gap-4">
                    <Button
                        variant="outline"
                        disabled={processing}
                        onClick={() => {
                            const updatedAt = new Date(data.updated_at);
                            const formattedUpdatedAt =
                                updatedAt.toLocaleString();

                            toast("Изменения успешно сохранены", {
                                description: `Дата изменения: ${formattedUpdatedAt}`,
                            });
                        }}
                    >
                        Сохранить
                    </Button>
                </div>
            </form>
        </section>
    );
}
