import { defineConfig } from "@rslib/core";
import { pluginBabel } from "@rsbuild/plugin-babel";
import { pluginVue } from "@rsbuild/plugin-vue";
import { pluginVueJsx } from "@rsbuild/plugin-vue-jsx";
import { resolve } from "node:path";

export default defineConfig({
  plugins: [
    pluginBabel({
      include: /\.(?:jsx|tsx)$/,
    }),
    pluginVue(),
    pluginVueJsx(),
  ],
  lib: [
    {
      format: "esm",
      dts: true,
    },
  ],
  output: {
    target: "web",
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
