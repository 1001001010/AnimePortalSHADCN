import { useForm, usePage } from "@inertiajs/react";
import React, { FormEventHandler } from "react";
import { PageProps } from "@/types";
import { toast } from "sonner";
import { Input } from "@/shadcn/ui/input";
import { Label } from "@/shadcn/ui/label";
import { Button } from "@/shadcn/ui/button";
import {description} from "@/Components/Admin/AnalyticsPopularAnime";

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
            const file = event.target.files[0];

            // Проверка MIME типа файла
            const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
            if (!validImageTypes.includes(file.type)) {
                toast('Ошибка загрузки фото', {
                    description:
                        "Пожалуйста, выберите файл изображения с расширением JPEG, PNG, GIF или WebP."
                });
                return;
            }

            // Проверка расширния файла
            const fileName = file.name.toLowerCase();
            const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
            const fileExtension = `.${fileName.split('.').pop()}`;
            if (!validExtensions.includes(fileExtension)) {
                toast('Ошибка загрузки фото', {
                    description:
                        "Пожалуйста, выберите файл изображения с расширением JPEG, PNG, GIF или WebP."
                });
                // alert('Пожалуйста, выберите файл изображения с расширением JPEG, PNG, GIF или WebP.');
                return;
            }

            setSelectedFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                if (typeof reader.result === "string") {
                    setPreview(reader.result);
                }
            };
            reader.readAsDataURL(file);
            setData("photo", file);
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
                        accept="image/*"
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
