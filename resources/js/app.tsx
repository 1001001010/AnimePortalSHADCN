import "./bootstrap";
import "../css/app.css";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { Toaster } from "@/shadcn/ui/sonner";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";
// Статус
export const type = [
    { status: "TV", text: "ТВ Сериал" },
    { status: "Film", text: "Фильм" },
    { status: "speshl", text: "Спешл" },
    { status: "OVA", text: "OVA" },
];

export const status = [
    { status: "ongoing", text: "Онгоинг" },
    { status: "came_out", text: "Вышел" },
    { status: "preview", text: "Анонс" },
];

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.tsx`,
            import.meta.glob("./Pages/**/*.tsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <>
                <App {...props} />
                <Toaster />
            </>
        );
    },
    progress: {
        color: "#4B5563",
    },
});
