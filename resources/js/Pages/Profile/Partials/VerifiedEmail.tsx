import { useRef, FormEventHandler } from "react";
import { Link, useForm } from "@inertiajs/react";
import { Button } from "@/shadcn/ui/button";
import { toast } from "sonner";

export default function VerifyEmail({
    status,
    className,
}: {
    status?: string;
    className?: string;
}) {
    const { post, processing } = useForm();
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("verification.send"));
    };
    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium">Подтверждение Email</h2>
            </header>
            <form onSubmit={submit}>
                <div className="mt-4 flex items-center justify-between">
                    <Button
                        variant={"outline"}
                        disabled={processing}
                        onClick={() => {
                            toast("Письмо было отправлено");
                        }}
                    >
                        Отправить письмо
                    </Button>
                </div>
            </form>
        </section>
    );
}
