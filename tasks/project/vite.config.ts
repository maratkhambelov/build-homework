import { defineConfig } from "vite";
import path from "node:path";
import tsconfigPaths from "vite-tsconfig-paths";

/** @type {import('vite').UserConfig} */
export default defineConfig({
  base: "/vite/",
  plugins: [tsconfigPaths()],
  build: {
      sourcemap: 'hidden',
      outDir: path.resolve(import.meta.dirname, `./dist/vite/`),
      rollupOptions: {
          output: {
              entryFileNames: `[name]_[hash].js`,
              chunkFileNames: `[name]_[hash].js`,
              assetFileNames: `[name]_[hash][extname]`,
          },
      },
  },
    html: {
        cspNonce: "{{NONCE_VALUE}}",
    },
});
