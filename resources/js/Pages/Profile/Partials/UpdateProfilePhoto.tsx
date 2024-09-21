import { useForm, usePage } from "@inertiajs/react";
import React, { FormEventHandler } from "react";
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

    const { data, setData, post, processing, errors, reset } = useForm({
        updated_at: user.updated_at,
        photo: null as File | null,
    });
    const [selectedFile, setSelectedFile] = React.useState<null | File>(null);
    const [preview, setPreview] = React.useState<null | string>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedFile(event.target.files[0]);
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === "string") {
                    setPreview(reader.result);
                }
            };
            reader.readAsDataURL(event.target.files[0]);
            setData("photo", event.target.files[0]);
        }
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route("profile.photo"), {
            onSuccess: () => {
                toast("Фото профиля успешно обновлено");
            },
            onError: (errors) => {
                toast("Ошибка изменения фото профиля", {
                    description: "Проверьте формат загружаемого файла!",
                });

                if (errors.password) {
                    reset("photo");
                }
            },
        });
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
                        onChange={handleFileChange}
                    />
                    {preview ? (
                        <img src={preview} className="w-24 h-24 m-2" />
                    ) : null}
                </div>

                <div className="flex items-center gap-4">
                    <Button variant="outline" disabled={processing}>
                        Сохранить
                    </Button>
                </div>
            </form>
        </section>
    );
}
