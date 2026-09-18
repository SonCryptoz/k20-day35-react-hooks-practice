import react from "@vitejs/plugin-react";
import { env } from "node:process";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
    base: env.GITHUB_ACTIONS
        ? `/${env.GITHUB_REPOSITORY.split("/")[1]}/`
        : "/",
    plugins: [react(), tailwindcss()],
});
