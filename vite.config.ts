import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { createCSSJSImportPlugin } from 'vite-css-in-js';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact(), createCSSJSImportPlugin()],
});
