import { defineConfig } from "vite";

export default defineConfig({
  base: "/weather-cast/",

  build: {
    assetsInlineLimit: 0
  },

  resolve: {
    tsconfigPaths: true
  }
});
