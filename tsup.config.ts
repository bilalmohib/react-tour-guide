import { defineConfig } from "tsup";
import { copyFileSync } from "fs";
import { join } from "path";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  treeshake: true,
  minify: true,
  external: ["react", "react-dom"],
  onSuccess: async () => {
    // Copy CSS file to dist
    copyFileSync(
      join(process.cwd(), "src/styles/tour.css"),
      join(process.cwd(), "dist/tour.css")
    );
  },
});
