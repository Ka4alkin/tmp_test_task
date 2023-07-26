import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import dotenv from "dotenv"

// https://vitejs.dev/config/
dotenv.config()

export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
  },
  build: {
    outDir: "build",
    sourcemap: true,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/setupTests",
    mockReset: true,
  },
})
