import { fileURLToPath, URL } from "node:url";
import { mergeConfig } from "vite";
import { defineConfig } from "vitest/config";
import { version as pkgVersion } from "./package.json";
import viteConfig from "./vite.config";

process.env.VITE_APP_VERSION = pkgVersion;
if (process.env.NODE_ENV === "production") {
  process.env.VITE_APP_BUILD_EPOCH = new Date().getTime().toString();
}

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: "jsdom",
      include: ["tests/unit/**/*.test.ts"],
    },
  })
);
