import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import react from "@vitejs/plugin-react";
import vitePluginRequire from "vite-plugin-require";

export default defineConfig({
    plugins: [
        vitePluginRequire.default(),
        laravel({
            input: "resources/js/app.tsx",
            refresh: true,
        }),
        react(),
    ],
});
