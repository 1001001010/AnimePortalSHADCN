import { useRef, useState, FormEventHandler } from "react";
import InputError from "@/Components/InputError";
import Modal from "@/Components/Modal";
import SecondaryButton from "@/Components/SecondaryButton";
import { Input } from "@/shadcn/ui/input";
import { Button } from "@/shadcn/ui/button";
import { Label } from "@/shadcn/ui/label";
import { useForm } from "@inertiajs/react";
// import { Button } from "react-day-picker";

export default function DeleteUserForm({
    className = "",
}: {
    className?: string;
}) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef<HTMLInputElement>(null);

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: "",
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser: FormEventHandler = (e) => {
        e.preventDefault();

        destroy(route("profile.destroy"), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current?.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium">Удаление аккаунта</h2>
            </header>

            <Button variant="outline" onClick={confirmUserDeletion}>
                Удалить аккаунт
            </Button>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6 dark:bg-background">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Вы уверены, что хотите удалить ваш аккаунт?
                    </h2>
                    <div className="mt-6 ">
                        <Label htmlFor="password" className="sr-only">
                            Подтверждение пароля
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            className="mt-1 block w-3/4"
                            placeholder="Password"
                        />

                        <InputError
                            message={errors.password}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            Закрыть
                        </SecondaryButton>

                        <Button
                            variant="outline"
                            className="ms-3"
                            disabled={processing}
                        >
                            Удалить аккаунт
                        </Button>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
