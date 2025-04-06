import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { createCSSJSImportPlugin } from 'vite-css-in-js';
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), tsconfigPaths(), createCSSJSImportPlugin()],
});
