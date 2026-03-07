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
          "vendor-react":  ["react", "react-dom"],
          "vendor-router": ["react-router-dom"],
          "vendor-motion": ["framer-motion"],
          "vendor-icons":  ["lucide-react"],
          "vendor-i18n":   ["i18next", "react-i18next", "i18next-browser-languagedetector"],
          "vendor-ui":     ["clsx", "tailwind-merge", "sonner", "axios", "react-helmet-async"],
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
});
