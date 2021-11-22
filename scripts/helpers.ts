import { resolve, join } from "path";
import packageJson from "../package.json";
import type { BuildOptions } from "esbuild";

export type Format = NonNullable<BuildOptions["format"]>;
export const PKG_ROOT = resolve(join(__dirname, ".."));
export const BUILD_DIR = join(PKG_ROOT, "build");

function readExternal() {
  const deps = packageJson.dependencies;
  return Object.keys(deps);
}

export const baseOpts: BuildOptions = {
  write: true,
  entryPoints: [join(PKG_ROOT, "src", "index.ts")],
  platform: "node",
  tsconfig: join(PKG_ROOT, "tsconfig.json"),
  bundle: true,
  external: readExternal()
};

export const formats: Format[] = ["cjs", "esm", "iife"];
export type { BuildOptions } from "esbuild";
