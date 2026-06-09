import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["src/**/*.unit.test.ts", "src/**/*.integration.test.ts"],

    globalSetup: ["./src/__tests__/setup/index.ts"],

    coverage: {
      provider: "v8",
      reporter: ["text", "html", "json-summary"],
      exclude: [
        "src/generated/**",
        "src/__tests__/**",
        "src/config/**",
        "**/*.d.ts",
        "src/index.ts",
        "src/app.ts",
      ],
    },
  },
});
