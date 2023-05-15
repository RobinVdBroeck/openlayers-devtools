import { defineConfig } from "tsup-preset-solid";

export default defineConfig(
  [
    {
      entry: "src/main.tsx",
      name: "openlayers-devtools",
    },
  ],
  {
    cjs: true,
    writePackageJson: true,
  }
);
