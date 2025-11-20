import {
  defineConfig,
  loadEnv,
  type InlineConfig,
  type UserConfig,
} from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const isProduction = mode === "production";

  return {
    base: env.VITE_BASE_PATH || "/",
    plugins: [react(), tailwindcss()],
    server: {
      port: Number(env.VITE_DEV_SERVER_PORT) || 3000,
      open: true,
      hmr: true,
    },
    resolve: {
      alias: {
        "@": path.resolve(process.cwd(), "src"),
      },
    },
    build: {
      outDir: "dist",
      sourcemap: !isProduction,
      minify: isProduction,
      rollupOptions: {
        output: {
          manualChunks: {
            react: ["react", "react-dom"],
            vendor: ["axios"],
            ui: ["framer-motion"],
          },
          entryFileNames: isProduction
            ? "assets/js/[name]-[hash].js"
            : "assets/js/[name].js",
          chunkFileNames: isProduction
            ? "assets/js/[name]-[hash].js"
            : "assets/js/[name].js",
          assetFileNames: isProduction
            ? "assets/[ext]/[name]-[hash].[ext]"
            : "assets/[ext]/[name].[ext]",
        },
      },
      cssCodeSplit: true,
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: ["./vitest.setup.ts"],
      include: ["src/**/*.test.{ts,tsx}", "src/**/*.spec.{ts,tsx}"],
      testTimeout: 30000,
      hookTimeout: 15000,
      pool: "threads",
      poolOptions: {
        threads: {
          maxThreads: Number(env.VITE_TEST_MAX_THREADS) || 0,
          minThreads: 1,
        },
      },
      coverage: {
        provider: "v8",
        reporter: ["html", "json", "text", "lcov", "clover"],
        reportsDirectory: "./coverage-vitest",
        exclude: [
          // Test files
          "**/*.test.{ts,tsx}",
          "**/*.spec.{ts,tsx}",
          "**/test/**",
          "vitest.setup.ts",
          // Types
          "**/*.d.ts",
          "**/*.types.ts",
          "**/types/**",
          // Constants and static data
          "**/constants/**",
          "**/*.constants.{ts,tsx}",
          // Generated files
          "dist/**",
          // Other files to exclude
          "node_modules/**",
          "public/**",
          "coverage/**",
        ],
      },
    },
  } as UserConfig & { test: InlineConfig };
});
