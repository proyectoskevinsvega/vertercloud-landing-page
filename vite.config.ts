import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "127.0.0.1",
    port: 3006,
    allowedHosts: ["bravexcolombia.com"],
    proxy: {
      "/api": {
        target: "https://gateway.bravexcolombia.com",
        changeOrigin: true,
      },
    },
    hmr: {
      host: "bravexcolombia.com",
      protocol: "wss",
    },
  },
  preview: {
    host: "127.0.0.1",
    port: 3006,
    allowedHosts: ["bravexcolombia.com"],
    proxy: {
      "/api": {
        target: "https://gateway.bravexcolombia.com",
        changeOrigin: true,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Routing
          "vendor-router": ["react-router-dom"],

          // Animations — más pesada, cacheable por separado
          "vendor-motion": ["framer-motion"],

          // Icons
          "vendor-icons":  ["lucide-react"],

          // i18n stack
          "vendor-i18n":   ["i18next", "react-i18next", "i18next-browser-languagedetector"],

          // UI utilities (sin axios ni react-helmet-async para evitar circular imports)
          "vendor-ui":     ["clsx", "tailwind-merge", "sonner"],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
});
