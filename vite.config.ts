import { defineConfig } from "vite";

export default defineConfig({
  base: "/weather-cast-v3/",

  build: {
    assetsInlineLimit: 0
  },

  resolve: {
    tsconfigPaths: true
  }
});
