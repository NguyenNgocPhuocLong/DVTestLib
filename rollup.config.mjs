import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

import { readFileSync } from "fs";
const pkg = JSON.parse(readFileSync("package.json", { encoding: "utf8" }));
export default [
  {
    input: "src/index.ts",
    external: ["react", "react-dom"],
    output: [
      {
        file: pkg.main,
        format: "cjs",
        sourcemap: true,
        emptyOutDir: true,
      },
      {
        file: pkg.module,
        format: "esm",
        sourcemap: true,
        emptyOutDir: true,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
    ],
  },
  {
    input: "dist/esm/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
  },
];
