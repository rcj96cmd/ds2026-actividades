import { defineConfig } from "vitest/config";
import { loadEnv } from "vite";

// Lee el .env del backend
const env = loadEnv("test", process.cwd(), "");

const databaseUrl = process.env.DATABASE_URL ?? env.DATABASE_URL?.replace("@db:", "@localhost:") ?? "";

export default defineConfig({
  test: {
    env: {
      JWT_SECRET: "secreto-solo-para-tests",
      DATABASE_URL: databaseUrl,
    },
  },
});
