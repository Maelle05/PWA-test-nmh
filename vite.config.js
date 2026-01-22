import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    tailwindcss(),
    vue(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "BioPaysages - Outil de gestion des données",
        short_name: "BioPaysages",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        icons: [
          { src: "./assets/Logo.png", sizes: "192x192", type: "image/png" },
          { src: "./assets/Logo.png", sizes: "512x512", type: "image/png" },
        ],
      },
    }),
  ],
});
