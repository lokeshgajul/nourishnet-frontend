import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; // Make sure react is here too!
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
